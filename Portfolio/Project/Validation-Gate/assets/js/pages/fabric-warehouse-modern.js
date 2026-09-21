document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const $ = id => document.getElementById(id);
  const consoleEl = $("warehouseConsole");
  const rawEl = $("rawResult");
  const resultSummary = $("resultSummary");
  const resultBadge = $("resultBadge");
  const logLines = [];
  const now = () => new Date().toLocaleTimeString("ko-KR", { hour12: false });
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function log(level, stage, message) {
    const line = `${now()} [${level}] ${stage.padEnd(15)} ${message}`;
    logLines.push(line);
    const cls = level === "PASS" ? "pass" : level === "WARN" ? "warn" : level === "ERROR" ? "error" : level === "DEBUG" ? "debug" : "";
    consoleEl.insertAdjacentHTML("beforeend", `<div class="${cls}"><span class="time">${now()}</span> [${level}] ${stage.padEnd(15)} ${message}</div>`);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function payload() {
    return {
      endpoint: $("warehouseEndpoint").value.trim(),
      database: $("databaseName").value.trim(),
      workspace: $("workspaceName").value.trim(),
      clientId: $("clientId").value.trim(),
      schema: $("schemaName").value.trim(),
      procedure: $("procedureName").value.trim(),
      parameters: $("procedureParams").value
    };
  }

  function setStatus(id, text, kind = "pass") {
    const el = $(id); el.textContent = text;
    el.style.color = kind === "error" ? "#b42318" : kind === "warn" ? "#a76500" : "#15945b";
  }

  function render(result) {
    resultBadge.className = `result-badge ${result.success ? "pass" : result.code === 403 ? "warn" : "error"}`;
    resultBadge.textContent = result.success ? "PASS" : result.code === 403 ? "WARN" : "FAIL";
    resultSummary.textContent = result.message || (result.success ? "검증이 정상 완료되었습니다." : "검증 중 오류가 발생했습니다.");
    $("metricOperation").textContent = result.operation || "-";
    $("metricCode").textContent = result.code ?? "-";
    $("metricElapsed").textContent = result.elapsedMs ? `${result.elapsedMs} ms` : "-";
    $("metricRows").textContent = result.rows ?? "-";
    rawEl.textContent = JSON.stringify(result, null, 2);
  }

  async function run(action) {
    const data = payload();
    log("INFO", "REQUEST", `${action.toUpperCase()} started; demoMode=true`);
    log("DEBUG", "INPUT", `endpoint=${data.endpoint}; database=${data.database}`);
    await sleep(150);

    let result;
    if (action === "token") {
      log("INFO", "CREDENTIAL", "WorkloadIdentityCredential chain initialized");
      log("DEBUG", "TOKEN", "audience=https://database.windows.net/");
      result = await WarehouseDemoAPI.token(data);
      setStatus("authStatus", "PASS");
      log("PASS", "TOKEN", "Demo access token acquired; HTTP 200");
    } else if (action === "connection") {
      log("INFO", "DNS", `Resolving ${data.endpoint}`);
      log("PASS", "TCP", "Port 1433 connection simulated");
      log("PASS", "TLS", "TLS 1.2 handshake completed");
      result = await WarehouseDemoAPI.connection(data);
      setStatus("networkStatus", result.success ? "PASS" : "FAIL", result.success ? "pass" : "error");
      setStatus("databaseStatus", result.success ? "CONNECTED" : "ERROR", result.success ? "pass" : "error");
      log(result.success ? "PASS" : "ERROR", "DATABASE", result.success ? "SELECT 1 returned TEST_RESULT=1" : result.message);
    } else if (action === "procedure") {
      log("INFO", "AUTHORIZATION", "Warehouse EXECUTE permission check started");
      log("DEBUG", "SQL", `EXEC [${data.schema}].[${data.procedure}]`);
      result = await WarehouseDemoAPI.procedure(data);
      setStatus("procedureStatus", result.success ? "COMPLETED" : "FAILED", result.success ? "pass" : "error");
      log(result.success ? "PASS" : "ERROR", "RESULT", result.success ? "Stored Procedure returned 1 result row" : result.message);
    } else {
      log("INFO", "AUTHORIZATION", "Insufficient permission scenario selected");
      result = await WarehouseDemoAPI.permission(data);
      setStatus("procedureStatus", "403 DENIED", "warn");
      log("WARN", "HTTP", "403 AuthorizationFailed simulated");
      log("WARN", "RBAC", "Required database permission: EXECUTE");
    }
    render(result);
  }

  document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => run(button.dataset.action)));
  $("sampleButton").addEventListener("click", () => {
    $("warehouseEndpoint").value = "kms-prd-warehouse.datawarehouse.fabric.microsoft.com";
    $("databaseName").value = "kms_demo_warehouse";
    $("workspaceName").value = "kms-prd-fabric";
    $("schemaName").value = "dbo";
    $("procedureName").value = "usp_validation_gate";
    $("procedureParams").value = JSON.stringify({ environment: "prd", requestId: "kms-demo-001" }, null, 2);
    log("INFO", "SAMPLE", "Sample Warehouse configuration loaded");
  });
  $("clearButton").addEventListener("click", () => {
    consoleEl.innerHTML = ""; logLines.length = 0; rawEl.textContent = "{}";
    resultSummary.textContent = "검증 항목을 실행하면 결과가 표시됩니다.";
    resultBadge.className = "result-badge neutral"; resultBadge.textContent = "READY";
    ["metricOperation","metricCode","metricElapsed","metricRows"].forEach(id => $(id).textContent = "-");
    ["authStatus","networkStatus","databaseStatus","procedureStatus"].forEach(id => setStatus(id,"READY"));
  });
  $("copyButton").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(logLines.join("\n")); log("PASS", "COPY", "Console log copied"); }
    catch { log("WARN", "COPY", "Clipboard API unavailable in local file mode"); }
  });

  log("INFO", "READY", "FABRIC_WAREHOUSE_VALIDATION_READY demoMode=true");
  log("DEBUG", "POLICY", "No real Fabric or SQL API call will be executed");
});
