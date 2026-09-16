(() => {
  let logs = [];
  const $ = (id) => document.getElementById(id);
  const now = () => new Intl.DateTimeFormat("ko-KR", {hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date());
  const mask = (value) => value ? `${value.slice(0,3)}***${value.slice(-3)}` : "***";

  function emit(level, stage, message) {
    logs.push({time:now(),level,stage,message});
    renderLogs();
  }

  function renderLogs() {
    $("redisConsole").innerHTML = logs.map(log => `<div class="redis-log ${log.level}"><span class="redis-log-time">${log.time}</span><span class="redis-log-level">[${log.level}]</span><span class="redis-log-stage">${log.stage}</span><span class="redis-log-message">${log.message}</span></div>`).join("");
    $("redisConsole").scrollTop = $("redisConsole").scrollHeight;
  }

  function setBusy(form, busy) {
    [...form.querySelectorAll("input,button")].forEach(el => el.disabled = busy);
    const button = form.querySelector("button");
    if (button) {
      if (!button.dataset.label) button.dataset.label = button.textContent;
      button.textContent = busy ? "검증 중..." : button.dataset.label;
    }
  }

  function renderResult(type, result) {
    const warn = result.status === "WARN";
    $("resultBadge").className = `badge ${warn ? "badge-warning" : "badge-success"}`;
    $("resultBadge").textContent = result.status;
    const fields = type === "ttl" ? [
      ["Authentication", result.authMode], ["Pattern", result.pattern], ["Scanned Keys", result.scannedKeys],
      ["Expiring Keys", result.expiringKeys], ["Persistent Keys", result.persistentKeys], ["Average TTL", `${result.averageTtlSeconds}s`]
    ] : [
      ["Authentication", result.authMode], ["Endpoint", result.endpoint], ["TLS", result.tls],
      ["Command", result.command || "PING"], ["Response", result.response], ["Latency", `${result.latencyMs}ms`]
    ];
    $("resultSummary").innerHTML = `<div class="result-grid">${fields.map(([k,v]) => `<div class="result-item"><span>${k}</span><strong>${v}</strong></div>`).join("")}</div>`;
    const safe = JSON.parse(JSON.stringify(result));
    if (safe.token) safe.token = "eyJ...DEMO_SIGNATURE_NOT_VALID";
    $("rawResult").textContent = JSON.stringify(safe,null,2);
  }

  async function run(form, type, input, fn) {
    setBusy(form,true);
    logs = [];
    emit("INFO","REQUEST",`${type.toUpperCase()} validation started; demoMode=true`);
    try {
      const result = await fn(input,emit);
      renderResult(type,result);
    } catch (error) {
      emit("ERROR","RESULT",error.message || "Unexpected demo error");
      $("resultBadge").className="badge badge-error";
      $("resultBadge").textContent="ERROR";
    } finally { setBusy(form,false); }
  }

  function initialize() {
    ValidationTheme.initialize();
    ValidationCommon.initialize();
    emit("INFO","READY","REDIS_VALIDATION_READY demoMode=true");

    $("accessKeyForm").addEventListener("submit", e => {
      e.preventDefault();
      const input={host:$("accessHost").value.trim(),port:Number($("accessPort").value),username:$("accessUsername").value.trim(),password:$("accessPassword").value};
      run(e.currentTarget,"access-key",input,RedisDemoApi.accessKey);
    });
    $("identityForm").addEventListener("submit", e => {
      e.preventDefault();
      const input={host:$("identityHost").value.trim(),port:Number($("identityPort").value),clientId:$("identityClientId").value.trim()};
      run(e.currentTarget,"workload-identity",input,RedisDemoApi.workloadIdentity);
    });
    $("ttlForm").addEventListener("submit", e => {
      e.preventDefault();
      const input={host:$("ttlHost").value.trim(),port:Number($("ttlPort").value),pattern:$("ttlPattern").value.trim()};
      run(e.currentTarget,"ttl",input,RedisDemoApi.ttlCheck);
    });
    $("clearConsole").addEventListener("click",()=>{logs=[];renderLogs();});
    $("copyConsole").addEventListener("click",async()=>{await navigator.clipboard.writeText(logs.map(x=>`${x.time} [${x.level}] ${x.stage} ${x.message}`).join("\n"));emit("INFO","COPY","Console logs copied");});
    $("loadSample").addEventListener("click",()=>{
      $("ttlPattern").value="kms:validation:*";
      $("accessPassword").value="KMS_DEMO_ACCESS_KEY_NOT_VALID";
      emit("INFO","SAMPLE",`Sample values loaded; password=${mask($("accessPassword").value)}`);
    });
  }
  document.addEventListener("DOMContentLoaded",initialize);
})();
