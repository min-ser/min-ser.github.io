document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const $ = id => document.getElementById(id);
  const consoleEl = $("kvConsole");
  const resultEl = $("kvResult");
  const rawEl = $("kvRawResult");
  const badgeEl = $("kvResultBadge");
  const inventoryHead = $("kvInventoryHead");
  const inventoryBody = $("kvInventoryBody");
  const inventoryTab = $("inventoryTab");
  const failureTab = $("failureTab");

  const logs = [];
  let inventoryData = [];
  let failureData = [];
  let activeTab = "inventory";

  const nowTime = () => new Date().toLocaleTimeString("ko-KR", { hour12: false });
  const nowDateTime = () => new Date().toLocaleString("ko-KR");
  const escapeHtml = value => {
    const node = document.createElement("div");
    node.textContent = String(value ?? "");
    return node.innerHTML;
  };

  function vaultName() {
    return $("kvVaultName").value.trim().toLowerCase();
  }

  function vaultUrl() {
    return `https://${vaultName()}.vault.azure.net`;
  }

  function validateVaultName(name) {
    if (!name) return "Vault Name이 비어 있습니다.";
    if (name.includes("https://") || name.includes(".vault.azure.net")) return "Vault Name에는 URL이 아닌 리소스 이름만 입력해야 합니다.";
    if (!/^[a-z0-9-]{3,24}$/.test(name)) return "Vault Name은 영문 소문자, 숫자, 하이픈만 사용하며 3~24자여야 합니다.";
    if (name.startsWith("-") || name.endsWith("-") || name.includes("--")) return "Vault Name의 하이픈 위치가 올바르지 않습니다.";
    if (/fail|error|missing|invalid/.test(name)) return "Network Error";
    return "";
  }

  function log(level, stage, message) {
    const line = `${nowTime()} [${level}] ${stage.padEnd(14, " ")} ${message}`;
    logs.push(line);
    const cls = level === "PASS" ? "pass" : level === "WARN" ? "warn" : level === "ERROR" ? "error" : level === "DEBUG" ? "debug" : "";
    consoleEl.insertAdjacentHTML("beforeend", `<div class="${cls}">${escapeHtml(line)}</div>`);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function setBadge(status) {
    const value = status || "READY";
    const cls = value === "PASS" ? "pass" : value === "WARN" ? "warn" : value === "ERROR" ? "error" : "idle";
    badgeEl.className = `result-badge ${cls}`;
    badgeEl.textContent = value;
  }

  function renderResult(result, message) {
    resultEl.innerHTML = `<p><strong>${escapeHtml(result.operation || result.status || "RESULT")}</strong></p><p>${escapeHtml(message)}</p>`;
    const safe = { ...result };
    if (safe.token) safe.token = "***MASKED***";
    if (safe.value) safe.value = "***MASKED***";
    rawEl.textContent = JSON.stringify(safe, null, 2);
    setBadge(result.status);
  }

  function updateSummary() {
    $("successCount").textContent = inventoryData.length;
    $("failureSummaryCount").textContent = failureData.length;
    const vaults = new Set([
      ...inventoryData.map(row => row.vault),
      ...failureData.map(row => row.resource)
    ].filter(Boolean));
    $("vaultSummaryCount").textContent = Math.max(1, vaults.size);
  }

  function renderInventory() {
    updateSummary();
    inventoryTab.classList.toggle("active", activeTab === "inventory");
    failureTab.classList.toggle("active", activeTab === "failures");

    if (activeTab === "failures") {
      inventoryHead.innerHTML = `<tr><th>리소스 명</th><th>실패 원인</th><th>발생 시간</th></tr>`;
      if (!failureData.length) {
        inventoryBody.innerHTML = `<tr class="inventory-empty"><td colspan="3">수집 실패 항목이 없습니다.</td></tr>`;
        return;
      }
      inventoryBody.innerHTML = failureData.map(row => `<tr class="failure-row">
        <td><span class="failure-resource">${escapeHtml(row.resource)}</span></td>
        <td><span class="failure-reason">${escapeHtml(row.reason)}</span></td>
        <td>${escapeHtml(row.occurredAt)}</td>
      </tr>`).join("");
      return;
    }

    inventoryHead.innerHTML = `<tr><th>VAULT</th><th>인증서 이름</th><th>상태</th><th>생성일</th><th>만료일</th></tr>`;
    if (!inventoryData.length) {
      inventoryBody.innerHTML = `<tr class="inventory-empty"><td colspan="5">인증서 수집 시작을 누르면 보유 인증서가 표시됩니다.</td></tr>`;
      return;
    }
    inventoryBody.innerHTML = inventoryData.map(row => `<tr>
      <td><span class="cert-vault">${escapeHtml(row.vault)}</span></td>
      <td><span class="cert-name">${escapeHtml(row.name)}</span></td>
      <td><span class="cert-status ${escapeHtml(row.status)}">${escapeHtml(row.status.toUpperCase())}</span></td>
      <td>${escapeHtml(row.createdOn)}</td>
      <td>${escapeHtml(row.expiresOn)}</td>
    </tr>`).join("");
  }

  function addFailure(resource, reason) {
    failureData.unshift({ resource: resource || "(empty)", reason, occurredAt: nowDateTime() });
    activeTab = "failures";
    renderInventory();
  }

  $("collectKvCertificates").addEventListener("click", async () => {
    const name = vaultName();
    const validationError = validateVaultName(name);
    log("INFO", "REQUEST", `Certificate inventory collection started; vault=${name || "(empty)"}`);

    if (validationError) {
      log("ERROR", "INVENTORY", `${validationError}; vault=${name || "(empty)"}`);
      addFailure(name, validationError);
      renderResult({ status: "ERROR", operation: "LIST_CERTIFICATES", vaultName: name, error: validationError }, "인증서 수집에 실패했고 Failures 탭에 기록했습니다.");
      return;
    }

    activeTab = "inventory";
    inventoryHead.innerHTML = `<tr><th>VAULT</th><th>인증서 이름</th><th>상태</th><th>생성일</th><th>만료일</th></tr>`;
    inventoryBody.innerHTML = `<tr class="inventory-loading"><td colspan="5">인증서 인벤토리를 조회하고 있습니다...</td></tr>`;
    log("DEBUG", "API", `${vaultUrl()}/certificates?api-version=7.4`);
    log("INFO", "TOKEN", "Demo Workload Identity token prepared automatically");

    try {
      const result = await KeyVaultDemoApi.collectCertificates({ vaultUrl: vaultUrl(), clientId: $("kvClientId").value.trim(), vaultName: name });
      inventoryData = result.certificates.map(item => ({ ...item, vault: name }));
      activeTab = "inventory";
      renderInventory();
      log("PASS", "INVENTORY", `${inventoryData.length} certificate(s) discovered from ${name}`);
      renderResult({ status: "PASS", operation: "LIST_CERTIFICATES", vaultName: name, certificates: inventoryData.length, httpStatus: 200 }, "인증서 이름, 상태, 생성일, 만료일 조회가 완료되었습니다.");
    } catch (error) {
      const reason = error?.message || "Network Error";
      log("ERROR", "INVENTORY", reason);
      addFailure(name, reason);
      renderResult({ status: "ERROR", operation: "LIST_CERTIFICATES", vaultName: name, error: reason }, "인증서 수집에 실패했고 Failures 탭에 기록했습니다.");
    }
  });

  $("getKvSecret").addEventListener("click", async () => {
    const name = vaultName();
    const secretName = $("secretName").value.trim();
    const validationError = validateVaultName(name);
    if (validationError) {
      addFailure(name, `Secret ${validationError}`);
      log("ERROR", "SECRET", validationError);
      return;
    }
    if (!secretName || !/^[a-zA-Z0-9-]{1,127}$/.test(secretName)) {
      const reason = "Secret Name 형식이 올바르지 않습니다.";
      addFailure(name, reason);
      log("ERROR", "SECRET", reason);
      renderResult({ status: "ERROR", operation: "GET_SECRET", vaultName: name, secretName, error: reason }, "Secret 조회 실패가 Failures 탭에 기록되었습니다.");
      return;
    }
    log("INFO", "REQUEST", `GET /secrets/${secretName}`);
    log("DEBUG", "MASKING", "Secret value masking enabled");
    const result = await KeyVaultDemoApi.getSecret({ vaultUrl: vaultUrl(), secretName, secretVersion: "" });
    $("secretValueDisplay").textContent = "***MASKED-DEMO-SECRET***";
    log("PASS", "RESPONSE", `HTTP ${result.httpStatus}; secret metadata received`);
    renderResult(result, "Secret 메타데이터를 조회했으며 값은 마스킹했습니다.");
  });

  inventoryTab.addEventListener("click", () => { activeTab = "inventory"; renderInventory(); });
  failureTab.addEventListener("click", () => { activeTab = "failures"; renderInventory(); });

  $("resetKvInventory").addEventListener("click", () => {
    inventoryData = [];
    failureData = [];
    activeTab = "inventory";
    renderInventory();
    log("INFO", "INVENTORY", "Certificate inventory and failures cleared");
  });

  $("loadKvSample").addEventListener("click", () => {
    $("kvVaultName").value = "kms-prd-kv";
    $("secretName").value = "kms-demo-secret";
    log("INFO", "SAMPLE", "Key Vault sample values loaded");
  });

  $("clearKvConsole").addEventListener("click", () => {
    logs.length = 0;
    consoleEl.innerHTML = "";
  });

  $("copyKvConsole").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(logs.join("\n"));
      log("PASS", "COPY", "Execution logs copied");
    } catch (_) {
      log("WARN", "COPY", "Clipboard API is unavailable in this browser context");
    }
  });

  renderInventory();
  log("INFO", "READY", "KEY_VAULT_VALIDATION_READY demoMode=true");
});
