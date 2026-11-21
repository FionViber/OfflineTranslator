(() => {
  "use strict";

  const messages = {
    "en-US": {
      skip: "Skip to the translator", nav: "Page navigation",
      workspace: "Translator", models: "Model library", title: "Translator",
      intro: "Translate text on your device with Firefox translation models.", fromLanguage: "From", toLanguage: "To", viaEnglish: "Via English",
      direction: "Translation direction", zhen: "Simplified Chinese → English", enzh: "English → Simplified Chinese",
      en: "English", zh: "Simplified Chinese", source: "Source text", result: "Translation",
      sourcePlaceholder: "Type or paste your text here.", resultPlaceholder: "Your translation will appear here.",
      translate: "Translate", translating: "Translating…", preparing: "Loading model…", modelIdle: "Select Translate to load the selected model.", modelLoading: "Loading the selected model…",
      staleSource: "Source text edited. Select Translate to update the result.",
      staleDirection: "Translation direction changed. Select Translate to update the result.",
      staleBoth: "Source text and direction changed. Select Translate to update the result.",
      copy: "Copy translation", copied: "Copied", selectCopy: "Text selected. Use your device’s Copy command.",
      retention: "Models unload after 1 minute of inactivity", model: "Translation model", disk: "From server", ram: "In memory (RAM)",
      bundled: "Loaded", cached: "Loaded", missing: "Not loaded", available: "Not loaded",
      checking: "Checking…", saving: "Loading…", unloaded: "Not loaded", loading: "Loading…", loaded: "Loaded", unknown: "Unavailable",
      "reading-local": "Reading local files…", transfer: "Loading from server…",
      memory: "Loading into memory…", initializing: "Initializing model…",
      interface: "Interface language", directory: "Project directory",
      "model-missing": "The model for this direction is unavailable.",
      "model-corrupt": "The model files are incomplete or damaged.",
      "engine-missing": "The translation engine is unavailable.",
      unsupported: "This browser cannot run the translation engine. Use a current desktop browser with WebAssembly support.",
      "translation-failed": "Translation could not finish. Try a shorter passage or reopen the page.",
      "model-load-failed": "The model could not be loaded. Please try again."
    },
    "zh-Hans": {
      skip: "跳到翻译区", nav: "页面导航", workspace: "翻译", models: "模型列表", title: "翻译",
      intro: "使用 Firefox 翻译模型在设备本地翻译文本。", fromLanguage: "源语言", toLanguage: "目标语言", viaEnglish: "经英语中转",
      direction: "翻译方向", zhen: "简体中文 → 英语", enzh: "英语 → 简体中文",
      en: "英语", zh: "简体中文", source: "原文", result: "译文",
      sourcePlaceholder: "在此输入或粘贴原文。", resultPlaceholder: "翻译结果将在此显示。",
      translate: "翻译", translating: "正在翻译…", preparing: "正在加载模型…", modelIdle: "点击“翻译”后才会加载所选模型。", modelLoading: "正在加载所选模型…",
      staleSource: "原文已修改。请点击“翻译”更新译文。",
      staleDirection: "翻译方向已更改。请点击“翻译”更新译文。",
      staleBoth: "原文和翻译方向均已更改。请点击“翻译”更新译文。",
      copy: "复制译文", copied: "已复制", selectCopy: "已选中译文，请使用设备的复制功能。",
      retention: "模型闲置 1 分钟后自动从内存卸载", model: "翻译模型", disk: "从服务器加载", ram: "内存中（RAM）",
      bundled: "已加载", cached: "已加载", missing: "未加载", available: "未加载",
      checking: "正在检查…", saving: "正在加载…", unloaded: "未加载", loading: "正在加载…", loaded: "已加载", unknown: "不可用",
      "reading-local": "正在读取本地文件…", transfer: "正在从服务器加载…",
      memory: "正在载入内存…", initializing: "正在初始化模型…",
      interface: "界面语言", directory: "项目目录",
      "model-missing": "此翻译方向的模型不可用。",
      "model-corrupt": "模型文件不完整或已损坏。",
      "engine-missing": "翻译引擎不可用。",
      unsupported: "当前浏览器无法运行翻译引擎。请使用支持 WebAssembly 的新版桌面浏览器。",
      "translation-failed": "翻译未能完成。请尝试缩短原文，或重新打开页面。",
      "model-load-failed": "无法加载模型。请重试。"
    },
    "zh-Hant": {
      skip: "跳至翻譯區", nav: "頁面導覽", workspace: "翻譯", models: "模型清單", title: "翻譯",
      intro: "使用 Firefox 翻譯模型在裝置本機翻譯文字。", fromLanguage: "來源語言", toLanguage: "目標語言", viaEnglish: "經英語轉譯",
      direction: "翻譯方向", zhen: "簡體中文 → 英語", enzh: "英語 → 簡體中文",
      en: "英語", zh: "簡體中文", source: "原文", result: "譯文",
      sourcePlaceholder: "在此輸入或貼上原文。", resultPlaceholder: "譯文將顯示在這裡。",
      translate: "翻譯", translating: "正在翻譯…", preparing: "正在載入模型…", modelIdle: "點選「翻譯」後才會載入所選模型。", modelLoading: "正在載入所選模型…",
      staleSource: "原文已修改。請點選「翻譯」更新譯文。",
      staleDirection: "翻譯方向已變更。請點選「翻譯」更新譯文。",
      staleBoth: "原文與翻譯方向均已變更。請點選「翻譯」更新譯文。",
      copy: "複製譯文", copied: "已複製", selectCopy: "已選取譯文，請使用裝置的複製功能。",
      retention: "模型閒置 1 分鐘後會自動從記憶體卸載", model: "翻譯模型", disk: "從伺服器載入", ram: "記憶體中（RAM）",
      bundled: "已載入", cached: "已載入", missing: "尚未載入", available: "尚未載入",
      checking: "正在檢查…", saving: "正在載入…", unloaded: "尚未載入", loading: "正在載入…", loaded: "已載入", unknown: "無法使用",
      "reading-local": "正在讀取本機檔案…", transfer: "正在從伺服器載入…",
      memory: "正在載入記憶體…", initializing: "正在初始化模型…",
      interface: "介面語言", directory: "專案目錄",
      "model-missing": "此翻譯方向的模型無法使用。",
      "model-corrupt": "模型檔案不完整或已損毀。",
      "engine-missing": "翻譯引擎無法使用。",
      unsupported: "目前的瀏覽器無法執行翻譯引擎。請使用支援 WebAssembly 的新版桌面瀏覽器。",
      "translation-failed": "翻譯未能完成。請嘗試縮短原文，或重新開啟頁面。",
      "model-load-failed": "無法載入模型。請再試一次。"
    }
  };

  const byId = (id) => document.getElementById(id);
  const source = byId("source");
  const result = byId("result");
  // Native resize handles update the textarea's inline height. Mirror only that
  // dimension so the stylesheet still controls widths and initial mobile sizing.
  const linkedHeights = new MutationObserver((changes) => {
    const edited = changes[changes.length - 1].target;
    const other = edited === source ? result : source;
    if (other.style.height !== edited.style.height) other.style.height = edited.style.height;
  });
  for (const editor of [source, result]) {
    linkedHeights.observe(editor, { attributes: true, attributeFilter: ["style"] });
  }
  const fromSelect = byId("from-language");
  const toSelect = byId("to-language");
  const catalog = globalThis.BUNDLE_CATALOG;
  const directions = Object.keys(catalog).sort();
  const sourceCodes = [...new Set(directions.map(pair => pair.split(":")[0]))];
  const targetCodes = [...new Set(directions.map(pair => pair.split(":")[1]))];
  const selectedDirection = () => fromSelect.value + ":" + toSelect.value;
  let displayNames;
  let rowsCreated = false;

  function languageName(code) {
    const special = {
      "zh-Hans": ["Simplified Chinese","简体中文","簡體中文"],
      "zh-Hant": ["Traditional Chinese","繁体中文","繁體中文"],
      hbs: ["Serbo-Croatian","塞尔维亚-克罗地亚语","塞爾維亞-克羅埃西亞語"],
      no: ["Norwegian","挪威语","挪威語"],
    };
    const index = locale === "zh-Hans" ? 1 : locale === "zh-Hant" ? 2 : 0;
    if (special[code]) return special[code][index];
    try { return displayNames?.of(code) || code; } catch { return code; }
  }

  function languageOptions(codes) {
    return codes.map(code => [languageName(code), code])
      .sort(([left],[right]) => left.localeCompare(right, locale))
      .map(([name, code]) => new Option(name, code));
  }

  function updateTargets(preferred) {
    const allowed = targetCodes.filter(code => globalThis.LocalTranslator.route(fromSelect.value + ":" + code).length);
    toSelect.replaceChildren(...languageOptions(allowed));
    if (allowed.includes(preferred)) toSelect.value = preferred;
    else if (allowed.includes("en")) toSelect.value = "en";
  }

  function buildModelRows() {
    if (rowsCreated) return;
    rowsCreated = true;
    const rowTemplate = '<th scope="row"><span class="model-language"></span><span class="model-spec"></span></th>'
      + ["disk", "ram"].map(key => '<td><span class="mobile-label" data-text="' + key + '"></span><div class="model-state"><span data-' + key + '></span><div class="progress-detail" hidden><progress></progress><span class="progress-value"></span></div></div></td>').join("");
    byId("model-rows").replaceChildren(...directions.map(direction => {
      const row = document.createElement("tr");
      row.dataset.direction = direction;
      row.innerHTML = rowTemplate;
      return row;
    }));
  }
  const translateButton = byId("translate");
  const copyButton = byId("copy");
  const localeSelect = byId("interface-language");
  const status = byId("match-status");
  const errorBox = byId("error");
  const modelStatus = byId("model-status");
  const supportedErrorCodes = [
    "engine-missing", "model-missing", "model-corrupt", "unsupported", "translation-failed", "model-load-failed"
  ];
  let locale = "en-US";
  let last = null;
  let pending = null;
  let models = {};
  let errorCode = "";
  let copyMessage = "";
  let copyTimer;
  let refreshId = 0;

  try {
    const saved = localStorage.getItem("fionviber-translator-locale");
    if (Object.hasOwn(messages, saved)) locale = saved;
  } catch {
    // Language selection remains available when browser storage is disabled.
  }

  const t = (key) => messages[locale][key] || "";
  function renderEditor() {
    const [from, to] = selectedDirection().split(":");
    const shownTarget = last ? last.direction.split(":")[1] : to;
    byId("source-language").textContent = languageName(from);
    byId("target-language").textContent = languageName(shownTarget);
    byId("route-note").textContent = globalThis.LocalTranslator.route(selectedDirection()).length > 1 ? t("viaEnglish") : "";
    source.lang = from === "zh" ? "zh-Hans" : from;
    source.dir = "auto";
    result.lang = shownTarget === "zh" ? "zh-Hans" : shownTarget;
    result.dir = "auto";
    translateButton.disabled = Boolean(pending) || !source.value.trim();
    copyButton.disabled = !last;
    let action = "translate";
    if (pending) action = globalThis.LocalTranslator.route(pending.direction).every(step => models[step]?.ram === "loaded") ? "translating" : "preparing";
    translateButton.querySelector("span").textContent = t(action);
    translateButton.setAttribute("aria-busy", pending ? "true" : "false");
    const sourceEdited = last && last.text !== source.value;
    const directionChanged = last && last.direction !== selectedDirection();
    let reason = "";
    if (sourceEdited && directionChanged) reason = "staleBoth";
    else if (sourceEdited) reason = "staleSource";
    else if (directionChanged) reason = "staleDirection";
    result.dataset.match = reason ? "stale" : last ? "current" : "";
    const statusText = t(reason);
    if (status.textContent !== statusText) status.textContent = statusText;
    errorBox.hidden = !errorCode;
    if (errorBox.textContent !== t(errorCode)) errorBox.textContent = t(errorCode);
    copyButton.querySelector("span").textContent = t(copyMessage || "copy");
    if (modelStatus) {
      const job = pending && globalThis.LocalTranslator.route(pending.direction)
        .map(step => models[step]).find(state => state?.transferProgress || state?.memoryProgress);
      const progress = job?.transferProgress || job?.memoryProgress;
      modelStatus.textContent = progress?.total > 0
        ? t(progress.phase) + " " + Math.floor(progress.loaded * 100 / progress.total) + "%"
        : pending ? t(action) : "";
    }
  }

  function formatMB(bytes) {
    return (bytes / 1000000).toLocaleString(locale, { maximumFractionDigits: 1 });
  }

  function renderModelState(row, column, state, progress) {
    const status = row.querySelector("[data-" + column + "]");
    const detail = status.nextElementSibling;
    const bar = detail.querySelector("progress");
    const value = detail.querySelector(".progress-value");
    let phase = progress?.phase;
    if (phase === "transfer" && (state === "reading-local" || location.protocol === "file:")) {
      phase = "reading-local";
    }
    status.dataset.state = state || "unknown";
    const statusText = t(phase || state) || t("unknown");
    if (status.textContent !== statusText) status.textContent = statusText;
    detail.hidden = !progress;
    if (!progress) return;

    const directionName = row.querySelector("th .model-language")?.textContent || row.querySelector("th")?.textContent || "";
    bar.setAttribute("aria-label", [directionName, t(column), status.textContent].join(" · "));
    if (progress.total > 0) {
      const loaded = Math.max(0, Math.min(progress.loaded, progress.total));
      bar.max = progress.total;
      bar.value = loaded;
      // Reserve 100% for a completed byte count.
      const percent = Math.floor(loaded * 100 / progress.total);
      const label = percent + "% · " + formatMB(loaded) + " / " + formatMB(progress.total) + " MB";
      value.textContent = label;
      bar.setAttribute("aria-valuetext", label);
    } else {
      bar.removeAttribute("value");
      bar.removeAttribute("aria-valuetext");
      value.textContent = "";
    }
  }

  function renderModels() {
    if (!modelDetails.open) return;
    buildModelRows();
    document.querySelectorAll("#model-rows tr").forEach(row => {
      const key = row.dataset.direction;
      const state = models[key] || {};
      const [from, to] = key.split(":");
      row.querySelector(".model-language").textContent = languageName(from) + " → " + languageName(to);
      const compressed = catalog[key].assets.reduce((sum, asset) => sum + asset.compressedBytes, 0);
      const kind = catalog[key].architecture === "base" ? "BASE" : catalog[key].architecture;
      row.querySelector(".model-spec").textContent = kind + " · " + formatMB(compressed) + " MB";
      for (const label of row.querySelectorAll(".mobile-label")) label.textContent = t(label.dataset.text);
      renderModelState(row, "disk", state.disk, state.transferProgress);
      renderModelState(row, "ram", state.ram, state.memoryProgress);
    });
  }

  const modelDetails = byId("models");
  modelDetails?.addEventListener("toggle", () => {
    if (!modelDetails.open) return;
    refreshModels();
    globalThis.LocalTranslator.inspectCache().then(refreshModels);
  });

  async function refreshModels() {
    const version = ++refreshId;
    let snapshot = {};
    try { snapshot = await window.LocalTranslator?.getState() || {}; } catch { /* Unknown state is displayed. */ }
    if (version !== refreshId) return;
    models = snapshot;
    renderModels();
    renderEditor();
  }

  function applyLocale() {
    document.documentElement.lang = locale;
    document.title = t("title") + " · FionViber";
    localeSelect.value = locale;
    const from = fromSelect.value || (sourceCodes.includes("zh-Hans") ? "zh-Hans" : sourceCodes[0]);
    const to = toSelect.value || "en";
    displayNames = new Intl.DisplayNames([locale], {type:"language"});
    fromSelect.replaceChildren(...languageOptions(sourceCodes));
    fromSelect.value = from;
    updateTargets(to);
    document.querySelectorAll("[data-text]").forEach((element) => {
      element.textContent = t(element.dataset.text);
    });
    document.querySelectorAll("[data-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.label));
    });
    source.placeholder = t("sourcePlaceholder");
    result.placeholder = t("resultPlaceholder");
    renderModels();
    renderEditor();
  }

  translateButton.addEventListener("click", async () => {
    if (pending || !source.value.trim()) return;
    const submission = { direction: selectedDirection(), text: source.value };
    pending = submission;
    errorCode = "";
    clearTimeout(copyTimer);
    copyMessage = "";
    renderEditor();
    try {
      if (!window.LocalTranslator) throw Object.assign(new Error(), { code: "engine-missing" });
      const translated = await window.LocalTranslator.translate(submission.direction, submission.text);
      if (typeof translated !== "string" || !translated.trim()) throw new Error();
      result.value = translated;
      last = submission;
    } catch (error) {
      errorCode = supportedErrorCodes.includes(error?.code) ? error.code : "translation-failed";
    } finally {
      pending = null;
      renderEditor();
      refreshModels();
    }
  });

  function onEdit() {
    errorCode = "";
    renderEditor();
  }
  source.addEventListener("input", onEdit);
  fromSelect.addEventListener("change", () => { updateTargets(toSelect.value); onEdit(); });
  toSelect.addEventListener("change", onEdit);
  document.querySelector('.nav a[href="#models"]')?.addEventListener("click", () => { modelDetails.open = true; });
  window.addEventListener("translatorstatechange", refreshModels);

  copyButton.addEventListener("click", async () => {
    if (!last) return;
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText(result.value);
      copyMessage = "copied";
    } catch {
      result.focus();
      result.select();
      let copied = false;
      try { copied = document.execCommand("copy"); } catch { /* Keep text selected for manual copying. */ }
      copyMessage = copied ? "copied" : "selectCopy";
    }
    renderEditor();
    copyTimer = setTimeout(() => { copyMessage = ""; renderEditor(); }, 3000);
  });

  localeSelect.addEventListener("change", () => {
    locale = localeSelect.value;
    try { localStorage.setItem("fionviber-translator-locale", locale); } catch { /* Session only. */ }
    applyLocale();
  });

  function updateNavigation() {
    const target = location.hash === "#models" ? "#models" : "#workspace";
    document.querySelectorAll(".nav a").forEach((link) => {
      if (link.hash === target) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("hashchange", updateNavigation);
  updateNavigation();
  applyLocale();
  refreshModels();
})();
