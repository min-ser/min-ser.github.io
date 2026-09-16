window.FabricDataAgentDemoAPI = (() => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  async function ask(payload, onStage) {
    const stage = async (name, delay=420) => { onStage?.(name); await wait(delay); };
    if (!payload.workspaceId || !payload.agentId || !payload.question) return {success:false,status:400,error:"INVALID_INPUT",message:"필수 입력값을 확인하세요."};
    if (payload.scenario === "unauthorized") { await stage("thread"); return {success:false,status:401,error:"UNAUTHORIZED",message:"Data Agent API 토큰이 유효하지 않습니다."}; }
    if (payload.scenario === "forbidden") { await stage("thread"); await stage("run"); return {success:false,status:403,error:"FORBIDDEN",message:"Workspace 또는 Data Agent 실행 권한이 없습니다."}; }
    if (payload.scenario === "notfound") { await stage("thread"); return {success:false,status:404,error:"NOT_FOUND",message:"Data Agent endpoint 또는 Agent ID를 찾을 수 없습니다."}; }
    await stage("thread"); await stage("run"); await stage("poll",700); await stage("answer");
    return {success:true,status:200,threadId:"thread_kms_demo_001",runId:"run_kms_demo_001",runStatus:"completed",answer:"최근 30일 기준 주문 건수는 총 1,248건입니다. 상위 카테고리는 Platform 412건, Data 336건, AI 291건이며 나머지는 기타 209건입니다.",sql:"SELECT TOP (3) category, COUNT(*) AS order_count FROM KMS.ORDER_SUMMARY WHERE order_date >= DATEADD(day,-30,GETDATE()) GROUP BY category ORDER BY order_count DESC",citations:[{title:"KMS_ORDER_SUMMARY",type:"Warehouse Table",detail:"KMS.ORDER_SUMMARY · 최근 30일 집계"},{title:"KMS_CATEGORY_DIM",type:"Semantic Model",detail:"카테고리 표준 명칭 매핑"}],usage:{promptTokens:38,completionTokens:74,totalTokens:112},demoMode:true};
  }
  return { ask };
})();
