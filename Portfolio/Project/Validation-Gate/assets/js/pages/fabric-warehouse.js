document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const $ = id => document.getElementById(id);
  const consoleEl = $("warehouseConsole");
  const bodyEl = $("queryResultBody");
  const stateEl = $("queryState");
  const rowBadge = $("rowCountBadge");
  const logLines = [];
  const now = () => new Date().toLocaleTimeString("ko-KR");

  function addLog(level, message, cls = "info") {
    const text = `[${now()}] [${level}] ${message}`;
    logLines.push(text);
    consoleEl.insertAdjacentHTML("beforeend", `<div class="${cls}"><span class="time">[${now()}]</span> <strong>[${level}]</strong> ${message}</div>`);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function payload() {
    return {
      endpoint: $("warehouseEndpoint").value.trim(),
      database: $("databaseName").value.trim(),
      schema: $("schemaName").value.trim(),
      table: $("tableName").value.trim(),
      mode: $("queryMode").value,
      top: $("topCount").value
    };
  }

  function renderRows(rows) {
    bodyEl.innerHTML = rows.map(row => `<tr>
      <td>${row.MATERIAL_NUMBER}</td>
      <td>${row.MATERIAL_CODE}</td>
      <td>${row.TEMPORARY_MATERIAL_CODE}</td>
      <td>${row.SAP_MATERIAL_NAME}</td>
      <td>${row.MATERIAL_TYPE_CODE}</td>
      <td>${row.MATERIAL_VERSION}</td>
    </tr>`).join("");
    rowBadge.textContent = `Rows: ${rows.length}`;
  }

  async function execute() {
    const button = $("executeQuery");
    const data = payload();
    $("rawRequest").textContent = JSON.stringify(data, null, 2);
    button.disabled = true;
    stateEl.textContent = "Warehouse 연결 및 쿼리 실행 중...";
    addLog("INFO", ">>> Fabric Warehouse 접속 테스트 시작...", "info");
    addLog("DEBUG", `Diagnostic host: kms-demo-runner / pid=${Math.floor(1000 + Math.random()*8000)}`, "info");
    addLog("INFO", `Connecting via pyodbc (MS ODBC Driver)...`, "info");
    addLog("DEBUG", `Using Connection String: Driver={ODBC Driver 17 for SQL Server};Server=${data.endpoint};Database=${data.database};`, "info");

    const result = await WarehouseDemoAPI.query(data);
    $("rawResponse").textContent = JSON.stringify(result, null, 2);
    if (!result.success) {
      renderRows([]);
      stateEl.textContent = result.message;
      addLog("ERROR", `${result.error}: ${result.message}`, "error");
      button.disabled = false;
      return;
    }
    addLog("SUCCESS", "pyodbc connection established", "pass");
    addLog("SQL", result.sql, "sql");
    renderRows(result.rows);
    stateEl.textContent = `${result.rowCount}건의 데모 데이터를 조회했습니다.`;
    addLog("SUCCESS", `${result.rowCount} rows fetched`, "pass");
    addLog("INFO", ">>> 최종 처리 완료", "pass");
    button.disabled = false;
  }

  $("executeQuery").addEventListener("click", execute);
  $("sampleButton").addEventListener("click", () => {
    $("warehouseEndpoint").value = "kms-prd-warehouse.datawarehouse.fabric.microsoft.com";
    $("databaseName").value = "KMS_DEMO_WH";
    $("schemaName").value = "KMS";
    $("tableName").value = "KMS_SAMPLE_DATA";
    $("queryMode").value = "recent";
    $("topCount").value = "5";
    addLog("INFO", "Sample Warehouse values loaded", "info");
  });
  $("clearButton").addEventListener("click", () => {
    consoleEl.innerHTML = "";
    bodyEl.innerHTML = "";
    rowBadge.textContent = "Rows: 0";
    stateEl.textContent = "쿼리를 실행하면 결과가 표시됩니다.";
    $("rawRequest").textContent = "{}";
    $("rawResponse").textContent = "{}";
    logLines.length = 0;
  });
  $("copyButton").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(logLines.join("\n")); addLog("PASS", "Execution log copied", "pass"); }
    catch { addLog("WARN", "Clipboard API unavailable in local file mode", "warn"); }
  });

  addLog("INFO", "FABRIC_WAREHOUSE_QUERY_READY demoMode=true", "info");
  addLog("DEBUG", "No real Fabric or SQL API call will be executed", "info");
});
