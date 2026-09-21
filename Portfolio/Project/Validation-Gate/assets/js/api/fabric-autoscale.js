window.FabricAutoscaleDemoAPI=(()=>{
 const skuOrder=["F2","F4","F8","F16","F32","F64"];
 const index=s=>skuOrder.indexOf(s);
 const clampSku=(candidate,min,max)=>skuOrder[Math.min(index(max),Math.max(index(min),index(candidate)))];
 const nextUp=(current,min,max)=>clampSku(skuOrder[Math.min(skuOrder.length-1,index(current)+1)],min,max);
 const nextDown=(current,min,max)=>clampSku(skuOrder[Math.max(0,index(current)-1)],min,max);
 const inWindow=(date,time,start,end)=>{const d=new Date(`${date}T${time}:00`);const day=d.getDay();return day>=1&&day<=5&&time>=start&&time<=end;};
 async function evaluate(p,onStage){
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const stage=async(n,m,c="info")=>{onStage?.(n,m,c);await wait(220)};
  await stage("INPUT",`Target ${p.environment.toUpperCase()} / ${p.capacityName}`);
  await stage("VALIDATION",`SKU range ${p.minSku} → ${p.maxSku}, current=${p.currentSku}`,"debug");
  if(index(p.minSku)<0||index(p.maxSku)<0||index(p.currentSku)<0||index(p.minSku)>index(p.maxSku)||index(p.currentSku)<index(p.minSku)||index(p.currentSku)>index(p.maxSku))return {success:false,status:"ERROR",decision:"BLOCKED",targetSku:p.currentSku,reason:"SKU range validation failed"};
  const allowed=inWindow(p.controlDate,p.controlTime,p.startTime,p.endTime);
  await stage("WINDOW",allowed?"Dynamic control window is active":"Outside dynamic control window",allowed?"pass":"warn");
  if(!allowed)return {success:true,status:"WARN",decision:"BLOCKED",targetSku:p.currentSku,reason:"Outside weekday control window",controlWindow:false};
  await stage("METRICS",`10m average=${p.average.toFixed(1)}%, peak=${p.peak.toFixed(1)}%`);
  let decision="HOLD",target=p.currentSku,reason=`Average utilization is between ${p.downThreshold}% and ${p.upThreshold}%`;
  if(p.average>p.upThreshold){target=nextUp(p.currentSku,p.minSku,p.maxSku);decision=target===p.currentSku?"HOLD":"SCALE_UP";reason=target===p.currentSku?"Upper threshold exceeded, but maximum SKU already reached":`10-minute average utilization exceeded ${p.upThreshold}%`;}
  else if(p.average<p.downThreshold){target=nextDown(p.currentSku,p.minSku,p.maxSku);decision=target===p.currentSku?"HOLD":"SCALE_DOWN";reason=target===p.currentSku?"Lower threshold met, but minimum SKU already reached":`10-minute average utilization stayed below ${p.downThreshold}%`;}
  await stage("DECISION",`${decision}: ${p.currentSku} → ${target}`,decision==="HOLD"?"warn":"pass");
  if(decision!=="HOLD")await stage("API",`PATCH capacity SKU ${p.currentSku} → ${target} (simulation only)`,"debug");
  await stage("RESULT",`${decision} completed in demo mode`,decision==="HOLD"?"warn":"pass");
  return {success:true,status:decision==="HOLD"?"WARN":"PASS",decision,targetSku:target,reason,controlWindow:true,rule:{window:p.windowSize,elapsed:p.elapsed,upThreshold:p.upThreshold,downThreshold:p.downThreshold},metrics:{average:p.average,peak:p.peak},demoMode:true};
 }
 return {evaluate};
})();
