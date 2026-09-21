
window.ValidationNetworkApi=(()=>{
const S={
 success:{label:"Private Endpoint Success",host:"kms-prd-fabric.privatelink.fabric.microsoft.com",port:443,protocol:"https",timeout:5000,dns:{ok:true,ip:"10.10.20.15",cname:"koreacentral.fabric.privatelink.microsoft.com",private:true,ms:18},tcp:{ok:true,ms:23},tls:{ok:true,version:"TLSv1.3",cipher:"TLS_AES_256_GCM_SHA384",subject:"CN=*.fabric.microsoft.com",issuer:"CN=Microsoft Azure RSA TLS Issuing CA 08",serial:"DEMO-4A-77-21-NOT-VALID",validFrom:"2026-05-01T00:00:00Z",validTo:"2027-05-01T23:59:59Z",ms:41},http:{status:401,text:"Unauthorized",ms:37}},
 dnsFailure:{label:"DNS Resolution Failure",host:"missing-endpoint.demo.invalid",port:443,protocol:"https",timeout:3000,dns:{ok:false,ip:"-",cname:null,private:false,ms:52,error:"ENOTFOUND"},tcp:{ok:false,ms:0},tls:{ok:false,ms:0},http:{status:0,text:"Skipped",ms:0}},
 tlsFailure:{label:"TLS Certificate Failure",host:"expired.demo.validation.local",port:443,protocol:"https",timeout:5000,dns:{ok:true,ip:"10.41.9.91",cname:null,private:true,ms:16},tcp:{ok:true,ms:28},tls:{ok:false,version:"TLSv1.2",cipher:"ECDHE-RSA-AES256-GCM-SHA384",subject:"CN=expired.demo.validation.local",issuer:"CN=Validation Gate Demo CA",serial:"DEMO-EXPIRED-0001",validFrom:"2024-01-01T00:00:00Z",validTo:"2025-01-01T00:00:00Z",error:"CERT_HAS_EXPIRED",ms:46},http:{status:0,text:"Skipped",ms:0}}
};
function normalize(raw){const p=String(raw.protocol||"https").toLowerCase();const h=String(raw.host||"").trim().replace(/^[a-z]+:\/\//i,"").split("/")[0].split(":")[0].toLowerCase();return{environment:String(raw.environment||"prd").toLowerCase(),host:h,port:Number(raw.port||(p==="https"?443:80)),protocol:p,timeout:Math.max(500,Math.min(30000,Number(raw.timeout||5000)))}}
function execute(raw,id="success"){
 const input=normalize(raw),s=JSON.parse(JSON.stringify(S[id]||S.success));
 const valid=/^[a-z0-9.-]+$/i.test(input.host)&&input.port>0&&input.port<=65535;
 if(!valid)return{input,request:null,response:null,result:{overall:"FAIL",dns:"SKIP",tcp:"SKIP",tls:"SKIP",elapsedMs:0},logs:[{level:"ERROR",stage:"VALIDATE",message:"Host or port format is invalid"}]};
 const request={method:input.protocol==="tcp"?"CONNECT":"HEAD",url:`${input.protocol}://${input.host}:${input.port}/`,headers:{"User-Agent":"Validation-Gate/0.4.0-demo","X-Demo-Mode":"true","X-Request-ID":ValidationDemoData.requestId,"X-Correlation-ID":ValidationDemoData.correlationId},timeoutMs:input.timeout,scenario:id};
 const tlsRequired=input.protocol==="https",dns=s.dns.ok?"PASS":"FAIL",tcp=s.dns.ok&&s.tcp.ok?"PASS":"SKIP",tls=!tlsRequired?"SKIP":s.dns.ok&&s.tcp.ok?(s.tls.ok?"PASS":"FAIL"):"SKIP";
 const overall=dns==="PASS"&&tcp==="PASS"&&(tls==="PASS"||tls==="SKIP")?"PASS":"FAIL";
 const result={overall,dns,tcp,tls,http:overall==="PASS"?s.http.status:0,privateEndpoint:s.dns.private,resolvedIp:s.dns.ip,tlsVersion:s.tls.version||"-",cipher:s.tls.cipher||"-",certificateSubject:s.tls.subject||"-",elapsedMs:s.dns.ms+s.tcp.ms+s.tls.ms+s.http.ms};
 const L=[
 ["INFO","REQUEST","Network validation request received"],["DEBUG","INPUT",`environment=${input.environment}`],["DEBUG","INPUT",`host=${input.host}`],["DEBUG","INPUT",`port=${input.port}, protocol=${input.protocol}, timeoutMs=${input.timeout}`],
 ["TRACE","NORMALIZE","Removing URL scheme, path and whitespace"],["PASS","NORMALIZE",`endpoint=${input.protocol}://${input.host}:${input.port}`],["INFO","VALIDATE","Validating host syntax, protocol and port range"],["PASS","VALIDATE","Input validation completed"],
 ["DEBUG","CONFIG",`scenario=${id} (${s.label})`],["WARN","DEMO","No real socket or HTTP request will be sent"],["INFO","DNS",`Starting DNS lookup for ${input.host}`],["TRACE","DNS","Resolver order=Private DNS Zone > VNet DNS > Azure resolver"],["DEBUG","DNS",`queryType=A, timeoutMs=${input.timeout}`]
 ];
 if(!s.dns.ok){L.push(["ERROR","DNS",`Resolution failed: ${s.dns.error}`],["DEBUG","DNS",`elapsedMs=${s.dns.ms}`],["SKIP","TCP","Skipped because no IP was resolved"],["SKIP","TLS","Skipped because TCP was not attempted"],["SKIP","HTTP","Skipped because endpoint is unreachable"],["ERROR","SUMMARY","Overall result=FAIL, failedStage=DNS"])}
 else{
  L.push(["PASS","DNS",`Resolved address=${s.dns.ip}`],["DEBUG","DNS",`cname=${s.dns.cname||"none"}`],[s.dns.private?"PASS":"WARN","NETWORK",s.dns.private?"Private endpoint address detected":"Public address detected"],["DEBUG","DNS",`elapsedMs=${s.dns.ms}`],["INFO","TCP",`Opening TCP connection to ${s.dns.ip}:${input.port}`],["TRACE","TCP","sourceAddress=10.10.10.20, keepAlive=false"],["PASS","TCP",`Connected remote=${s.dns.ip}:${input.port}`],["DEBUG","TCP",`elapsedMs=${s.tcp.ms}`]);
  if(tlsRequired){
   L.push(["INFO","TLS","Starting TLS handshake"],["TRACE","TLS",`SNI=${input.host}`],["DEBUG","TLS","offeredVersions=TLSv1.2,TLSv1.3"],[s.tls.ok?"PASS":"ERROR","TLS",s.tls.ok?`Negotiated protocol=${s.tls.version}`:`Handshake failed: ${s.tls.error}`],["DEBUG","CERT",`subject=${s.tls.subject}`],["DEBUG","CERT",`issuer=${s.tls.issuer}`],["DEBUG","CERT",`serial=${s.tls.serial}`],["DEBUG","CERT",`validFrom=${s.tls.validFrom}`],["DEBUG","CERT",`validTo=${s.tls.validTo}`],[s.tls.ok?"PASS":"ERROR","CERT",`certificateChainVerified=${s.tls.ok}`],["DEBUG","TLS",`cipher=${s.tls.cipher}, elapsedMs=${s.tls.ms}`])
  }else L.push(["SKIP","TLS",`TLS not required for protocol=${input.protocol}`]);
  if(!s.tls.ok&&tlsRequired)L.push(["SKIP","HTTP","Skipped because TLS verification failed"],["ERROR","SUMMARY","Overall result=FAIL, failedStage=TLS"]);
  else L.push(["INFO","REQUEST",`Building ${request.method} request`],["DEBUG","REQUEST",`url=${request.url}`],["TRACE","HEADERS",`User-Agent=${request.headers["User-Agent"]}`],["TRACE","HEADERS",`X-Request-ID=${request.headers["X-Request-ID"]}`],["INFO","HTTP","Sending simulated endpoint probe"],["PASS","HTTP",`Received status=${s.http.status} ${s.http.text}`],["DEBUG","HTTP",`elapsedMs=${s.http.ms}`],["INFO","ANALYZE","Aggregating DNS, TCP, TLS and HTTP results"],[s.dns.private?"PASS":"WARN","ANALYZE",`privateEndpoint=${s.dns.private}`],["PASS","SUMMARY",`Overall result=${overall}, totalElapsedMs=${result.elapsedMs}`])
 }
 return{input,request,response:{mode:"demo",scenario:id,dns:s.dns,tcp:s.tcp,tls:s.tls,http:s.http,summary:result},result,logs:L.map(([level,stage,message])=>({level,stage,message}))}
}
return{scenarios:S,execute};
})();
