document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const consoleEl = document.getElementById("storageConsole");
  const rawEl = document.getElementById("rawResponse");
  const summaryEl = document.getElementById("summaryBanner");
  const logLines = [];
  const imagePreview = document.getElementById("imagePreview");
  const sampleImage = document.getElementById("sampleImage");
  const SAMPLE_IMAGE_PATH = "../../assets/images/sample.png";
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const time = () => new Date().toLocaleTimeString("ko-KR", { hour12: false });

  function log(level, message) {
    const text = `${time()} [${level}] ${message}`;
    logLines.push(text);
    const css = level === "PASS" ? "pass" : level === "ERROR" ? "error" : "";
    consoleEl.insertAdjacentHTML("beforeend", `<div class="${css}">${text}</div>`);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function readPayload(kind) {
    if (kind === "access") return { connectionString: document.getElementById("connectionString").value };
    if (kind === "workload") return { accountUrl: document.getElementById("workloadUrl").value };
    if (kind === "image") return {
      accountUrl: document.getElementById("imageUrl").value,
      containerName: document.getElementById("containerName").value,
      blobName: document.getElementById("blobName").value
    };
    return {
      accountUrl: document.getElementById("gptUrl").value,
      containerName: document.getElementById("gptContainer").value,
      blobName: document.getElementById("gptBlob").value
    };
  }

  async function execute(kind) {
    const payload = readPayload(kind);
    summaryEl.textContent = "실행 중입니다.";
    log("INFO", `REQUEST_${kind.toUpperCase()} demoMode=true`);
    await sleep(180);
    log("INFO", "INPUT_VALIDATION_COMPLETED");
    await sleep(180);

    let result;
    if (kind === "access") {
      result = { success: true, authentication: "Access Key", message: "Connection string format validated", demoMode: true };
    } else if (kind === "workload") {
      result = { success: true, authentication: "Workload Identity", accountUrl: payload.accountUrl, token: "DEMO_SIGNATURE_NOT_VALID", message: "Credential chain simulated", demoMode: true };
    } else if (kind === "image") {
      result = await loadSampleImage(payload);
    } else {
      result = { success: true, ...payload, model: "kms-demo-vision", analysis: "Sample image contains a cloud architecture diagram.", message: "GPT image analysis simulated", demoMode: true };
    }

    log("PASS", result.message);
    summaryEl.textContent = `${result.success ? "✅" : "⚠️"} ${result.message}`;
    rawEl.textContent = JSON.stringify(result, null, 2);
  }

  function loadSampleImage(payload) {
    return new Promise(resolve => {
      const probe = new Image();
      probe.onload = () => {
        sampleImage.src = `${SAMPLE_IMAGE_PATH}?v=${Date.now()}`;
        imagePreview.hidden = false;
        resolve({ success: true, ...payload, localPath: "assets/images/sample.png", contentType: "image/png", width: probe.naturalWidth, height: probe.naturalHeight, message: "Local sample image loaded", demoMode: true });
      };
      probe.onerror = () => {
        imagePreview.hidden = true;
        resolve({ success: false, ...payload, localPath: "assets/images/sample.png", message: "Sample image not found. Add sample.png to assets/images/", demoMode: true });
      };
      probe.src = `${SAMPLE_IMAGE_PATH}?v=${Date.now()}`;
    });
  }

  document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => execute(button.dataset.action));
  });
  document.getElementById("clearLogs").addEventListener("click", () => {
    logLines.length = 0;
    consoleEl.innerHTML = "";
    rawEl.textContent = "{}";
    summaryEl.textContent = "대기 중입니다.";
    imagePreview.hidden = true;
    sampleImage.removeAttribute("src");
  });
  document.getElementById("copyLogs").addEventListener("click", async () => {
    await navigator.clipboard?.writeText(logLines.join("\n"));
    log("INFO", "LOG_COPY_COMPLETED");
  });

  log("INFO", "STORAGE_VALIDATION_READY demoMode=true");
});
