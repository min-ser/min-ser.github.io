window.RedisDemoApi = (() => {
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const demoId = () => `kms-${Date.now().toString(36)}`;

  const common = (input, authMode) => ({
    demoMode: true,
    liveApiCall: false,
    requestId: demoId(),
    endpoint: `${input.host}:${input.port}`,
    authMode,
    tls: "TLSv1.3",
    server: "Azure Cache for Redis (simulated)"
  });

  async function accessKey(input, emit) {
    emit("INFO", "INPUT", `host=${input.host} port=${input.port}`);
    await wait(170); emit("DEBUG", "DNS", "Private DNS record resolved to 10.10.24.18 (demo)");
    await wait(150); emit("PASS", "TCP", `Secure Redis port ${input.port} reachable`);
    await wait(160); emit("PASS", "TLS", "TLS negotiation completed; certificate chain accepted");
    await wait(180); emit("DEBUG", "AUTH", `username=${input.username}; password=***MASKED***`);
    await wait(220); emit("PASS", "COMMAND", "PING returned PONG");
    const result = {...common(input,"ACCESS_KEY"), status:"PASS", command:"PING", response:"PONG", latencyMs:21};
    emit("INFO", "RESULT", "Access Key authentication simulation completed");
    return result;
  }

  async function workloadIdentity(input, emit) {
    emit("INFO", "INPUT", `host=${input.host} port=${input.port}`);
    await wait(150); emit("DEBUG", "IDENTITY", `clientId=${input.clientId}`);
    await wait(180); emit("PASS", "TOKEN", "Microsoft Entra token acquired from demo credential chain");
    await wait(160); emit("PASS", "TLS", "Encrypted Redis channel established");
    await wait(220); emit("PASS", "AUTH", "Passwordless authentication accepted (simulated)");
    await wait(160); emit("PASS", "COMMAND", "PING returned PONG");
    const result = {...common(input,"WORKLOAD_IDENTITY"), status:"PASS", tokenAudience:"https://redis.azure.com", token:"eyJ...DEMO_SIGNATURE_NOT_VALID", response:"PONG", latencyMs:34};
    emit("INFO", "RESULT", "Workload Identity authentication simulation completed");
    return result;
  }

  async function ttlCheck(input, emit) {
    emit("INFO", "INPUT", `pattern=${input.pattern}`);
    await wait(140); emit("PASS", "TOKEN", "Demo Entra token prepared");
    await wait(160); emit("DEBUG", "SCAN", "SCAN cursor=0 COUNT=100 MATCH kms:validation:*");
    await wait(170); emit("INFO", "SCAN", "6 sample keys discovered");
    await wait(160); emit("DEBUG", "TTL", "PTTL requested for each discovered key");
    await wait(190); emit("WARN", "TTL", "1 key has no expiration; portfolio warning generated");
    await wait(150); emit("PASS", "RESULT", "TTL distribution analysis completed");
    return {...common(input,"WORKLOAD_IDENTITY"), status:"WARN", pattern:input.pattern, scannedKeys:6, expiringKeys:5, persistentKeys:1, minTtlSeconds:54, maxTtlSeconds:3600, averageTtlSeconds:928};
  }

  return { accessKey, workloadIdentity, ttlCheck };
})();
