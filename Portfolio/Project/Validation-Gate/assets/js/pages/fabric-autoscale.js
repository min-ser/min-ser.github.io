document.addEventListener("DOMContentLoaded",()=>{
  ValidationTheme.initialize();ValidationCommon.initialize();
  const $=id=>document.getElementById(id);
  const consoleEl=$("systemConsole");
  const logLines=[];
  let engineTimer=null;
  let engineTick=0;
  let currentSku=null;
  let resourceLoaded=false;
  const skuRows=[
    ["F2",2,"₩414,318.8"],["F4",4,"₩828,637.6"],["F8",8,"₩1,657,275.2"],["F16",16,"₩3,314,550.4"],["F32",32,"₩6,629,100.8"],["F64",64,"₩13,258,201.6"],["F128",128,"₩26,516,403.2"],["F256",256,"₩53,032,806.4"]
  ];
  const eventstreamSamples=[0.82,1.14,1.43,1.71,1.92,1.58,1.26,0.97];
  const write=(level,message,cls="plain")=>{
    const time=new Date().toLocaleTimeString("ko-KR");
    logLines.push(`[${time}] [${level}] ${message}`);
    consoleEl.insertAdjacentHTML("beforeend",`<div class="${cls}"><span class="time">[${time}]</span> [${level}] ${message}</div>`);
    consoleEl.scrollTop=consoleEl.scrollHeight;
  };
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const renderSkuTable=()=>{$("skuTableBody").innerHTML=skuRows.map(([sku,cu,cost])=>`<tr class="${sku===currentSku?'active':''}"><td>${sku}</td><td>${cu}</td><td>${cost}</td></tr>`).join("");};
  const setCurrentSku=(sku,action="No Action")=>{
    currentSku=sku;
    $("currentSkuStatus").textContent=sku||"-";
    $("lastAction").textContent=action;
    $("lastActionHint").textContent=action==="No Action"?"Monitoring":`${sku} applied`;
    renderSkuTable();
  };
  const validateResource=()=>{
    const name=$("capacityName").value.trim();
    const rg=$("resourceGroup").value.trim();
    const sub=$("subscriptionId").value.trim();
    return name&&rg&&sub&&!/invalid|error|fail/i.test(`${name}${rg}${sub}`);
  };
  const logDaxQuery=()=>{
    write("INFO","DAX diagnostic query loaded (reference only; live CU source is Eventstream)","info");
    $("daxQuery").value.trim().split(/\r?\n/).forEach(line=>write("DAX",line||" ","plain"));
  };
  const eventstreamEvent=(cuUsage,minute=0)=>{
    const capacityUnitMs=Math.round(cuUsage*30000);
    write("INFO",`Eventstream Capacity.Summary received: capacity=${$("capacityName").value.trim()}, window=30s, capacityUnitMs=${capacityUnitMs.toLocaleString()}, CU usage=${cuUsage.toFixed(2)}`,'info');
    if(minute) write("DEBUG",`DEMO MINUTE ${minute}: Eventstream message consumed and normalized`,'debug');
    $("liveUtilization").textContent=`${cuUsage.toFixed(2)} CU`;
    $("thresholdHint").textContent=`Scale threshold: ${Number($("threshold").value).toFixed(2)} CU`;
  };
  $("lookupButton").addEventListener("click",async()=>{
    const button=$("lookupButton");
    button.disabled=true;button.textContent="조회 중";
    write("INFO","Fabric Capacity 리소스 조회 시작","info");
    write("RESOURCE",`Subscription ID : ${$("subscriptionId").value.trim()}`,"plain");
    write("RESOURCE",`Resource Group  : ${$("resourceGroup").value.trim()}`,"plain");
    write("RESOURCE",`Capacity Name   : ${$("capacityName").value.trim()}`,"plain");
    write("DEBUG",`GET /subscriptions/${$("subscriptionId").value.trim()}/resourceGroups/${$("resourceGroup").value.trim()}/providers/Microsoft.Fabric/capacities/${$("capacityName").value.trim()}`,'debug');
    logDaxQuery();
    await delay(450);
    if(!validateResource()){
      resourceLoaded=false;currentSku=null;
      $("currentSkuStatus").textContent="-";$("capacityState").textContent="조회 실패";
      $("schedulerState").textContent="-";$("schedulerHint").textContent="리소스 확인 필요";
      $("provisionState").textContent="Failed";$("liveUtilization").textContent="- CU";
      write("ERROR","Fabric Capacity 조회 실패: ResourceNotFound (demo)","error");
    }else{
      resourceLoaded=true;
      const foundSku="F2";
      setCurrentSku(foundSku,"LOOKUP");
      $("capacityState").textContent="Active";$("provisionState").textContent="Succeeded";
      $("schedulerState").textContent="Stopped";$("schedulerHint").textContent="조회 완료 / 엔진 대기";
      write("PASS",`Capacity resource loaded: SKU=${foundSku}, state=Active, provisioning=Succeeded`,'pass');
      write("INFO",`Scheduler state loaded: Stopped, business window=${$("startTime").value}-${$("endTime").value}`,'info');
      write("INFO","Live metric source switched to Eventstream Custom App consumer",'info');
      eventstreamEvent(0.82);
    }
    button.disabled=false;button.textContent="조회";
  });
  const engineCycle=()=>{
    engineTick+=1;
    const cuUsage=eventstreamSamples[(engineTick-1)%eventstreamSamples.length];
    const threshold=Number($("threshold").value)||1.6;
    eventstreamEvent(cuUsage,engineTick);
    write("INFO",`Current SKU=${currentSku}, current CU usage=${cuUsage.toFixed(2)}, threshold=${threshold.toFixed(2)} CU`,'info');
    if(cuUsage>=threshold){
      const index=skuRows.findIndex(r=>r[0]===currentSku);
      const target=skuRows[Math.min(index+1,skuRows.length-1)][0];
      if(target!==currentSku){write("WARN",`CU threshold exceeded. Scale-up candidate ${currentSku} -> ${target}`,'warn');setCurrentSku(target,"AUTO SCALE UP");write("PASS",`SKU update simulation completed: ${target}`,'pass');}
      else write("WARN","Maximum demo SKU reached. No Action",'warn');
    }else{
      write("INFO","CU usage below threshold. No Action",'info');
      $("lastAction").textContent="No Action";$("lastActionHint").textContent="Eventstream monitoring";
    }
  };
  $("engineButton").addEventListener("click",()=>{
    if(engineTimer){
      clearInterval(engineTimer);engineTimer=null;
      $("engineButton").textContent="엔진 가동";$("engineButton").classList.remove("engine-running");
      $("schedulerState").textContent="Stopped";$("schedulerHint").textContent="사용자 중지";
      write("WARN","Autonomous engine stopped by user",'warn');return;
    }
    if(!resourceLoaded){write("WARN","먼저 조회 버튼으로 Capacity 리소스와 현재 SKU를 불러오세요.",'warn');return;}
    engineTick=0;
    $("schedulerState").textContent="Running";$("schedulerHint").textContent="1분 단위 Eventstream 조회 (데모 2초)";
    $("engineButton").textContent="엔진 중지";$("engineButton").classList.add("engine-running");
    write("INFO",`Autonomous engine started. Business=${$("startTime").value}-${$("endTime").value}, CU threshold=${Number($("threshold").value).toFixed(2)}`,'info');
    write("INFO","Demo timing: each 2 seconds represents one Eventstream monitoring minute",'info');
    engineCycle();engineTimer=setInterval(engineCycle,2000);
  });
  $("manualApplyButton").addEventListener("click",async()=>{
    if(!resourceLoaded){write("WARN","먼저 Capacity 리소스를 조회하세요.",'warn');return;}
    const sku=$("manualSku").value;if(!sku){write("WARN","수동 변경할 SKU를 선택하세요.",'warn');return;}
    write("INFO",`Manual SKU update requested: ${currentSku} -> ${sku}`,'info');
    await delay(350);setCurrentSku(sku,"MANUAL CHANGE");$("provisionState").textContent="Succeeded";
    write("PASS",`Manual SKU update completed: ${sku}`,'pass');
  });
  $("toggleEditor").addEventListener("click",()=>{const q=$("daxQuery");q.readOnly=!q.readOnly;$("toggleEditor").textContent=q.readOnly?"Change":"Lock";write("DEBUG",`DAX editor ${q.readOnly?'locked':'editable'}`,'debug');});
  $("clearConsole").addEventListener("click",()=>{consoleEl.innerHTML="";logLines.length=0;});
  $("sampleLog").addEventListener("click",()=>{write("INFO","Sample Eventstream metrics log loaded",'info');write("EVENT","Microsoft.Fabric.Capacity.Summary capacityUnitMs=34200 window=30s",'debug');write("PASS","Normalized CU usage=1.14 CU",'pass');});
  $("copyConsole").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(logLines.join("\n"));write("PASS","Console copied",'pass');}catch{write("WARN","Clipboard API unavailable in file mode",'warn');}});
  $("copyApi").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("apiSample").textContent);write("PASS","API sample copied",'pass');}catch{write("WARN","Clipboard API unavailable in file mode",'warn');}});
  $("daxQuery").readOnly=true;
  renderSkuTable();
  write("INFO","FABRIC_AUTOMATION_READY demoMode=true",'info');
  write("DEBUG","Initial state is empty. Click 조회 to load resource, SKU, scheduler, DAX reference and Eventstream CU usage.",'debug');
});