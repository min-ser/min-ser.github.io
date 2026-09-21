document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const consoleEl = document.getElementById("networkConsole");
  const requestEl = document.getElementById("rawRequest");
  const responseEl = document.getElementById("rawResponse");
  const summaryEl = document.getElementById("summaryBanner");
  const logLines = [];

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const escapeHtml = value => String(value).replace(/[&<>]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]));
  const time = () => new Date().toLocaleTimeString("ko-KR", { hour12: false });

  function addLog(level, message) {
    const text = `${time()} [${level.padEnd(5)}] ${message}`;
    const css = level === "PASS" ? "pass" : level === "ERROR" ? "error" : level === "WARN" ? "warn" : "info";
    logLines.push(text);
    consoleEl.insertAdjacentHTML("beforeend", `<div class="log-line log-${css}">${escapeHtml(text)}</div>`);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  async function run(type, payload) {
    requestEl.textContent = JSON.stringify({ type, ...payload, demoMode: true }, null, 2);
    responseEl.textContent = "{}";
    summaryEl.innerHTML = `<strong>[ REPORT_DECODING ]</strong><p>${type} 진단을 실행하고 있습니다.</p>`;
    addLog("INFO", `${type}_REQUEST_RECEIVED`);
    await sleep(180);
    addLog("DEBUG", `INPUT_NORMALIZED ${Object.values(payload).join(":")}`);
    await sleep(170);

    let result;
    if (type === "ACCESS_PING") {
      addLog("INFO", "SIMULATED_ROUTE_LOOKUP");
      await sleep(180);
      addLog("PASS", "PING_ROUTE_AVAILABLE latencyMs=12 packetLoss=0%");
      result = { success: true, target: payload.target, latencyMs: 12, packetLoss: "0%", demoMode: true };
    } else if (type === "DNS_QUERY") {
      addLog("INFO", "QUERY_A_RECORD resolver=kms-demo-private-dns");
      await sleep(180);
      addLog("PASS", "DNS_RESOLVED address=10.20.30.40 private=true");
      result = { success: true, domain: payload.domain, address: "10.20.30.40", privateEndpoint: true, demoMode: true };
    } else {
      addLog("INFO", `TCP_CONNECT host=${payload.host} port=${payload.port}`);
      await sleep(180);
      addLog("PASS", `PORT_${payload.port}_OPEN tls=TLSv1.3`);
      result = { success: true, host: payload.host, port: payload.port, tcp: "OPEN", tls: "TLSv1.3", demoMode: true };
    }

    responseEl.textContent = JSON.stringify(result, null, 2);
    summaryEl.innerHTML = `<strong>[ REPORT_DECODED ]</strong><p>✅ ${type} 검증이 성공했습니다. 실제 네트워크 요청은 수행하지 않았습니다.</p>`;
  }

  document.getElementById("runPing").addEventListener("click", () => run("ACCESS_PING", {
    target: document.getElementById("pingTarget").value.trim()
  }));
  document.getElementById("runDns").addEventListener("click", () => run("DNS_QUERY", {
    domain: document.getElementById("dnsDomain").value.trim()
  }));
  document.getElementById("runPort").addEventListener("click", () => run("PORT_SCAN", {
    host: document.getElementById("portHost").value.trim(),
    port: Number(document.getElementById("portNumber").value)
  }));

  document.getElementById("loadSample").addEventListener("click", () => {
    document.getElementById("pingTarget").value = "kms-private-endpoint.local";
    document.getElementById("dnsDomain").value = "kms-storage.blob.core.windows.net";
    document.getElementById("portHost").value = "kms-storage.blob.core.windows.net";
    document.getElementById("portNumber").value = "443";
    addLog("INFO", "SAMPLE_VALUES_LOADED");
  });
  document.getElementById("clearLogs").addEventListener("click", () => {
    logLines.length = 0;
    consoleEl.innerHTML = "";
    requestEl.textContent = "{}";
    responseEl.textContent = "{}";
    summaryEl.innerHTML = "<strong>[ REPORT_DECODED ]</strong><p>대기 중입니다. 위 진단 기능 중 하나를 실행하세요.</p>";
  });
  document.getElementById("copyLogs").addEventListener("click", async () => {
    await navigator.clipboard?.writeText(logLines.join("\n"));
    addLog("INFO", "LOG_COPY_COMPLETED");
  });

  addLog("INFO", "NETWORK_TEST_READY demoMode=true");
});
