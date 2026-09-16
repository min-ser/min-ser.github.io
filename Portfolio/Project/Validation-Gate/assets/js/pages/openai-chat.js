document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const consoleEl = document.getElementById("openaiConsole");
  const rawEl = document.getElementById("rawResponse");
  const messagesEl = document.getElementById("chatMessages");
  const stateEl = document.getElementById("connectionState");
  const logLines = [];
  let activeAuth = null;
  let testType = "chat";
  const time = () => new Date().toLocaleTimeString("ko-KR", { hour12: false });

  function safe(value){ const div=document.createElement("div"); div.textContent=value; return div.innerHTML; }
  function log(level, stage, message){
    const text=`${time()} [${level}] ${stage.padEnd(14," ")} ${message}`;
    logLines.push(text);
    const css=level==="PASS"?"pass":level==="WARN"?"warn":level==="ERROR"?"error":"";
    consoleEl.insertAdjacentHTML("beforeend",`<div class="${css}">${safe(text)}</div>`);
    consoleEl.scrollTop=consoleEl.scrollHeight;
  }
  function payloadFor(mode){
    const prefix=mode==="key"?"key":"wi";
    return {
      endpoint:document.getElementById(`${prefix}Endpoint`).value,
      apiVersion:document.getElementById(`${prefix}ApiVersion`).value,
      deployment:document.getElementById(`${prefix}Deployment`).value,
      credential:mode==="key"?"KMS_DEMO_KEY_NOT_VALID":document.getElementById("clientId").value
    };
  }
  async function connect(mode){
    const payload=payloadFor(mode);
    log("INFO","REQUEST",`${mode.toUpperCase()} connection validation started`);
    log("DEBUG","INPUT",`endpoint=${payload.endpoint}`);
    const result=await OpenAIDemoApi.checkConnection(mode,payload);
    activeAuth=mode;
    stateEl.textContent=mode==="key"?"ACCESS KEY CONNECTED":"WORKLOAD IDENTITY CONNECTED";
    stateEl.className="connection-state connected";
    rawEl.textContent=JSON.stringify(result,null,2);
    log("PASS","AUTHENTICATION",`${result.authentication} demo credential accepted`);
    log("PASS","RESULT","Azure OpenAI connection simulation completed`".replace("`",""));
  }
  function addMessage(role,text){
    const node=document.createElement("div"); node.className=`message ${role}`;
    node.innerHTML=`<span class="avatar">${role==="user"?"ME":"AI"}</span><div><strong>${role==="user"?"User":"Validation Assistant"}</strong><p>${safe(text)}</p></div>`;
    messagesEl.appendChild(node); messagesEl.scrollTop=messagesEl.scrollHeight;
  }
  document.querySelectorAll("[data-auth]").forEach(btn=>btn.addEventListener("click",()=>connect(btn.dataset.auth)));
  document.querySelectorAll("[data-test-type]").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-test-type]").forEach(item=>item.classList.remove("active")); btn.classList.add("active"); testType=btn.dataset.testType;
    log("INFO","MODE",`${testType.toUpperCase()} selected`);
  }));
  document.getElementById("chatForm").addEventListener("submit",async event=>{
    event.preventDefault(); const input=document.getElementById("chatInput"); const message=input.value.trim();
    if(!message) return;
    if(!activeAuth){ log("WARN","VALIDATION","Authentication connection check is required"); stateEl.textContent="CONNECTION REQUIRED"; return; }
    if(testType!=="chat"){ log("WARN","MODE","Embedding Vector is implemented in the next module"); return; }
    addMessage("user",message); input.value="";
    const source=payloadFor(activeAuth);
    log("INFO","REQUEST","Chat Completion request created");
    log("DEBUG","HEADERS",`api-version=${source.apiVersion}`);
    const result=await OpenAIDemoApi.chat({message,deployment:source.deployment,systemPrompt:document.getElementById("systemPrompt").value});
    addMessage("assistant",result.choices[0].message.content); rawEl.textContent=JSON.stringify(result,null,2);
    log("PASS","RESPONSE",`finish_reason=${result.choices[0].finish_reason}`);
    log("INFO","TOKEN",`total_tokens=${result.usage.total_tokens}`);
  });
  document.getElementById("loadSample").addEventListener("click",()=>{document.getElementById("chatInput").value="Private Endpoint와 Workload Identity 검증 흐름을 요약해줘."; log("INFO","SAMPLE","Sample prompt loaded");});
  document.getElementById("clearLogs").addEventListener("click",()=>{logLines.length=0;consoleEl.innerHTML="";});
  document.getElementById("copyLogs").addEventListener("click",async()=>{await navigator.clipboard?.writeText(logLines.join("\n"));log("INFO","COPY","Execution logs copied");});
  document.getElementById("clearRaw").addEventListener("click",()=>{rawEl.textContent="{}";});
  document.getElementById("copyRaw").addEventListener("click",async()=>{await navigator.clipboard?.writeText(rawEl.textContent);log("INFO","COPY","Raw response copied");});
  log("INFO","READY","OPENAI_CHAT_VALIDATION_READY demoMode=true");
});
