"use strict";

(() => {
  const base = location.hostname === "fionviber.github.io"
    ? new URL("https://raw.githubusercontent.com/FionViber/OfflineTranslator/main/")
    : new URL("./", document.baseURI);
  const fail = code => Object.assign(new Error(code), { code });

  async function appendPart(part, output, offset, signal, report) {
    const url = new URL(part.path, base);
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname + "v2/")) {
      throw fail("model-corrupt");
    }
    const response = await fetch(url, { mode: "cors", credentials: "omit", redirect: "error", signal })
      .catch(() => { throw fail("model-load-failed"); });
    if (!response.ok || !response.body) {
      throw fail(response.status === 404 ? "model-missing" : "model-load-failed");
    }
    const reader = response.body.getReader();
    let received = 0;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (received + value.length > part.bytes || offset + received + value.length > output.length) {
          throw fail("model-corrupt");
        }
        output.set(value, offset + received);
        received += value.length;
        report(offset + received);
      }
      if (received !== part.bytes) throw fail("model-corrupt");
      return offset + received;
    } catch (error) {
      await reader.cancel().catch(() => {});
      throw error;
    } finally {
      reader.releaseLock();
    }
  }

  globalThis.readTranslationModels = async ({ assets }, signal, reportProgress) => {
    if (!globalThis.crypto?.subtle) throw fail("unsupported");
    const total = assets.reduce((sum, asset) => sum + asset.compressedBytes, 0);
    let completed = 0;
    let lastUpdate = 0;
    const files = {};
    for (const asset of assets) {
      const output = new Uint8Array(asset.compressedBytes);
      let offset = 0;
      for (const part of asset.parts) {
        offset = await appendPart(part, output, offset, signal, loaded => {
          const now = performance.now();
          if (now - lastUpdate >= 80 || completed + loaded === total) {
            lastUpdate = now;
            reportProgress({ phase: "transfer", loaded: completed + loaded, total });
          }
        });
      }
      const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", output));
      const hex = Array.from(digest, byte => byte.toString(16).padStart(2, "0")).join("");
      if (offset !== output.length || hex !== asset.compressedSha256) throw fail("model-corrupt");
      files[asset.role] = output.buffer;
      completed += offset;
    }
    return files;
  };
})();
