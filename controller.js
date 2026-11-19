"use strict";

(() => {
  const directoryLink = document.querySelector('.brand');
  if (directoryLink) directoryLink.href = location.hostname.endsWith('.pages.dev') ? 'https://fionviber.pages.dev/' : 'https://fionviber.github.io/';
  const catalog = globalThis.BUNDLE_CATALOG || {};
  const directions = Object.keys(catalog);
  const idleMillis = 60_000;
  const sessions = new Map();
  const disk = Object.fromEntries(directions.map(direction => [direction, "available"]));
  const fail = code => Object.assign(new Error(code), {code});
  const notify = () => window.dispatchEvent(new Event("translatorstatechange"));
  let loadEnginePromise;
  let databasePromise;
  let sequence = 0;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.onload = () => { script.remove(); resolve(); };
      script.onerror = () => { script.remove(); reject(fail("engine-missing")); };
      script.src = src;
      document.head.append(script);
    });
  }

  function ensureEngine() {
    if (!globalThis.WebAssembly || !globalThis.Worker) return Promise.reject(fail("unsupported"));
    if (!loadEnginePromise) {
      loadEnginePromise = loadScript("engine/bergamot.js?v=20261119-language-routing").then(() => {
        if (typeof globalThis.createBergamotWorker !== "function") throw fail("engine-missing");
      }).catch(error => {
        loadEnginePromise = undefined;
        throw error;
      });
    }
    return loadEnginePromise;
  }

  // Cache only verified model data, keyed by direction and content.
  function db() {
    if (!databasePromise) {
      databasePromise = new Promise(resolve => {
        try {
          const request = indexedDB.open("fionviber.zh-en.model-store", 1);
          request.onupgradeneeded = () => request.result.createObjectStore("models");
          request.onsuccess = () => resolve(request.result);
          request.onerror = request.onblocked = () => resolve(null);
        } catch { resolve(null); }
      });
    }
    return databasePromise;
  }

  function cacheKey(direction) {
    const cacheId = direction.replace("zh-Hans", "zh").replace(":", "-");
    return [cacheId, ...catalog[direction].assets.map(asset => asset.sha256)].join(":");
  }

  async function cacheOperation(direction, method, files) {
    const database = await db();
    if (!database) return null;
    return new Promise(resolve => {
      try {
        const transaction = database.transaction("models", ["put", "delete"].includes(method) ? "readwrite" : "readonly");
        const store = transaction.objectStore("models");
        const key = cacheKey(direction);
        const request = method === "put" ? store.put(files, key) : store[method](key);
        // IndexedDB returns undefined for an absent key. A null result here
        // means storage could not be checked or updated.
        transaction.oncomplete = () => resolve(request.result);
        transaction.onabort = transaction.onerror = () => resolve(null);
      } catch { resolve(null); }
    });
  }

  async function inspectDisk(direction) {
    const key = await cacheOperation(direction, "getKey");
    disk[direction] = key ? "cached" : "available";
    notify();
  }

  let cacheInspection;
  function inspectCache() {
    return cacheInspection ??= Promise.all(directions.map(inspectDisk));
  }

  async function getFiles(session) {
    const {direction} = session;
    const {signal} = session.abort;
    if (signal.aborted) throw fail("model-load-failed");
    if (!catalog[direction]) throw fail("model-missing");
    const existing = await cacheOperation(direction, "get");
    if (signal.aborted) throw fail("model-load-failed");
    if (existing) {
      disk[direction] = "cached";
      return existing.format === "gzip-v1" ? existing : { format: "raw", files: existing };
    }
    const total = catalog[direction].assets.reduce((sum, asset) => sum + asset.compressedBytes, 0);
    session.transferProgress = { phase: "transfer", loaded: 0, total };
    notify();
    try {
      const files = await globalThis.readTranslationModels(catalog[direction], signal, progress => {
        if (!signal.aborted) {
          session.transferProgress = progress;
          notify();
        }
      });
      const payload = {format: "gzip-v1", files};
      const savedKey = await cacheOperation(direction, "put", payload);
      if (!signal.aborted) disk[direction] = savedKey ? "cached" : "available";
      return payload;
    } finally {
      session.transferProgress = null;
      notify();
    }
  }

  function getState() {
    const state = {};
    for (const direction of directions) {
      const entry = catalog[direction];
      const session = sessions.get(direction);
      const transfer = session?.transferProgress;
      state[direction] = {
        disk: transfer ? "saving" : disk[direction],
        ram: session?.phase || "unloaded", bytes: entry?.bytes || 0,
        transferProgress: transfer ? {...transfer} : null,
        memoryProgress: session?.memoryProgress ? {...session.memoryProgress} : null,
      };
    }
    return state;
  }

  function close(session, reason = fail("translation-failed")) {
    if (sessions.get(session.direction) !== session) return;
    sessions.delete(session.direction);
    clearTimeout(session.idleTimer);
    clearTimeout(session.startupTimer);
    session.abort.abort();
    if (session.worker) session.worker.terminate();
    session.rejectInit?.(reason);
    for (const task of session.pending.values()) task.reject(reason);
    session.pending.clear();
    notify();
  }

  function scheduleRelease(session) {
    clearTimeout(session.idleTimer);
    if (session.users || sessions.get(session.direction) !== session) return;
    session.deadline = Date.now() + idleMillis;
    session.idleTimer = setTimeout(() => close(session), idleMillis);
  }

  function discardExpired() {
    for (const session of sessions.values()) {
      if (!session.users && session.deadline && session.deadline <= Date.now()) close(session);
    }
  }

  async function initialise(session) {
    const [payload] = await Promise.all([getFiles(session), ensureEngine()]);
    if (session.abort.signal.aborted) throw fail("model-load-failed");
    session.phase = "loading";
    session.memoryProgress = {phase: "memory", loaded: 0, total: catalog[session.direction].bytes};
    notify();
    const worker = globalThis.createBergamotWorker();
    session.worker = worker;
    return new Promise((resolve, reject) => {
      session.rejectInit = reject;
      session.startupTimer = setTimeout(() => close(session, fail("model-load-failed")), 240_000);
      worker.onerror = () => close(session, fail(session.phase === "loading" ? "model-load-failed" : "translation-failed"));
      worker.onmessageerror = worker.onerror;
      worker.onmessage = ({data}) => {
        if (data.type === "progress") {
          session.memoryProgress = {phase: data.phase, loaded: data.loaded, total: data.total};
          notify();
          return;
        }
        if (data.type === "ready") {
          clearTimeout(session.startupTimer);
          session.rejectInit = null;
          session.phase = "loaded";
          session.memoryProgress = null;
          notify();
          resolve();
          return;
        }
        if (data.type === "error") {
          console.error("Local translation engine:", data.message);
          if (data.message === "model-corrupt") {
            disk[session.direction] = "available";
            cacheOperation(session.direction, "delete");
            close(session, fail("model-corrupt"));
          } else {
            close(session, fail(session.phase === "loading" ? "model-load-failed" : "translation-failed"));
          }
          return;
        }
        const task = session.pending.get(data.id);
        if (data.type === "result" && task) {
          session.pending.delete(data.id);
          if (typeof data.text === "string" && data.text.trim()) task.resolve(data.text);
          else task.reject(fail("translation-failed"));
        }
      };
      worker.postMessage({
        type: "init", direction: session.direction, files: payload.files,
        assets: catalog[session.direction].assets, precision: catalog[session.direction].precision,
        compressed: payload.format === "gzip-v1",
      }, Object.values(payload.files));
    });
  }

  async function translateDirect(direction, text) {
    if (!directions.includes(direction) || typeof text !== "string" || !text.trim()) throw fail("translation-failed");
    discardExpired();
    let session = sessions.get(direction);
    if (!session) {
      session = {direction, phase: "unloaded", worker: null, pending: new Map(), users: 0, abort: new AbortController()};
      sessions.set(direction, session);
      session.ready = initialise(session).catch(error => { close(session, error); throw error; });
      notify();
    }
    session.users++;
    clearTimeout(session.idleTimer);
    session.deadline = 0;
    try {
      await session.ready;
      const id = ++sequence;
      return await new Promise((resolve, reject) => {
        session.pending.set(id, {resolve, reject});
        session.worker.postMessage({type: "translate", id, text});
      });
    } finally {
      session.users--;
      scheduleRelease(session);
    }
  }

  function route(direction) {
    if (Object.hasOwn(catalog, direction)) return [direction];
    const [from, to, extra] = direction.split(":");
    if (!from || !to || extra || from === to || from === "en" || to === "en") return [];
    const viaEnglish = [from + ":en", "en:" + to];
    return viaEnglish.every(pair => Object.hasOwn(catalog, pair)) ? viaEnglish : [];
  }

  async function translate(direction, text) {
    const steps = route(direction);
    if (!steps.length) throw fail("model-missing");
    for (const step of steps) text = await translateDirect(step, text);
    return text;
  }

  globalThis.LocalTranslator = Object.freeze({ getState, translate, route, inspectCache });
  window.addEventListener("pagehide", () => {
    for (const session of sessions.values()) close(session);
  });
  window.addEventListener("pageshow", discardExpired);
  window.addEventListener("focus", discardExpired);
  document.addEventListener("visibilitychange", discardExpired);
})();
