window.SearchDemoApi = (() => {
  const wait = (ms = 360) => new Promise(resolve => setTimeout(resolve, ms));
  const documents = [
    { id:"doc-001", title:"Private Endpoint connectivity validation", category:"network", score:0.9342, content:"Private Endpoint, Private DNS, TCP 443 and TLS connectivity validation procedure.", tags:["private-endpoint","dns","tls"] },
    { id:"doc-002", title:"Workload Identity authentication guide", category:"identity", score:0.8974, content:"Microsoft Entra ID federation and Workload Identity token validation flow for cloud workloads.", tags:["entra-id","workload-identity","token"] },
    { id:"doc-003", title:"Azure AI service integration pattern", category:"ai", score:0.8641, content:"Azure OpenAI embeddings can be combined with AI Search vector and hybrid retrieval.", tags:["openai","embedding","hybrid-search"] },
    { id:"doc-004", title:"Storage image processing scenario", category:"data", score:0.8138, content:"Blob image loading, metadata inspection and downstream AI analysis demo scenario.", tags:["storage","blob","image"] },
    { id:"doc-005", title:"Redis cache TTL inspection", category:"data", score:0.7886, content:"Redis key scan, PTTL inspection and persistent key warning detection.", tags:["redis","ttl","cache"] }
  ];
  function token(mode){return mode === "key" ? "KMS_DEMO_SEARCH_KEY_NOT_VALID" : "eyJhbGciOiJub25lIn0.eyJhdWQiOiJodHRwczovL3NlYXJjaC5henVyZS5jb20ifQ.DEMO_SIGNATURE_NOT_VALID";}
  async function checkConnection(mode, payload){await wait();return{status:"PASS",service:"Azure AI Search",authentication:mode === "key" ? "ACCESS_KEY" : "WORKLOAD_IDENTITY",endpoint:payload.endpoint,indexName:payload.indexName,credential:token(mode),httpStatus:200,demoMode:true};}
  async function search(payload){await wait(520);const q=payload.searchText.toLowerCase();let result=documents.filter(d=>!payload.category || payload.category === "all" || d.category === payload.category);if(q && q !== "*") result=result.filter(d=>(`${d.title} ${d.content} ${d.tags.join(" ")}`).toLowerCase().includes(q.split(" ")[0])) || documents.slice(0,4);result=result.slice(0,Number(payload.top));return{"@odata.context":"https://kms-search.search.windows.net/indexes('kms-validation-index')/$metadata#docs(*)","@odata.count":result.length,"@search.mode":payload.mode,value:result.map((d,i)=>({...d,"@search.score":Number(Math.max(.51,d.score-(i*.018)).toFixed(4)),"@search.rerankerScore":payload.mode==="hybrid"?Number((3.72-i*.21).toFixed(2)):null})),request:{...payload,vector:payload.mode==="keyword"?undefined:"[demo embedding vector omitted]"},demoMode:true};}
  return { checkConnection, search };
})();
