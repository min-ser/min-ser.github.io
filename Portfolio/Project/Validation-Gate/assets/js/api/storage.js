window.ValidationStorageApi = (() => {
  const scenarios = {
    success: {
      label: "Private Endpoint + Entra ID Success",
      account: "kmsprdsa01",
      container: "validation-demo",
      authMode: "entra",
      endpointMode: "private",
      dns: { ok: true, ip: "10.20.30.41", cname: "kmsprdsa01.privatelink.blob.core.windows.net", ms: 21 },
      tcp: { ok: true, ms: 18 },
      tls: { ok: true, version: "TLSv1.3", cipher: "TLS_AES_256_GCM_SHA384", ms: 36 },
      token: { ok: true, audience: "https://storage.azure.com/", expiresIn: 3540, ms: 44 },
      http: { ok: true, status: 200, text: "OK", requestId: "kms-demo-storage-req-0001", ms: 63 }
    },
    authFailure: {
      label: "Authentication Failure",
      account: "kmsprdsa01",
      container: "validation-demo",
      authMode: "entra",
      endpointMode: "private",
      dns: { ok: true, ip: "10.20.30.41", cname: "kmsprdsa01.privatelink.blob.core.windows.net", ms: 19 },
      tcp: { ok: true, ms: 20 },
      tls: { ok: true, version: "TLSv1.3", cipher: "TLS_AES_256_GCM_SHA384", ms: 33 },
      token: { ok: false, audience: "https://storage.azure.com/", expiresIn: 0, error: "AADSTS700016_DEMO", ms: 48 },
      http: { ok: false, status: 0, text: "Skipped", requestId: "-", ms: 0 }
    },
    dnsFailure: {
      label: "Private DNS Failure",
      account: "kmsstgsa02",
      container: "validation-demo",
      authMode: "entra",
      endpointMode: "private",
      dns: { ok: false, ip: "-", cname: null, error: "ENOTFOUND", ms: 57 },
      tcp: { ok: false, ms: 0 },
      tls: { ok: false, version: "-", cipher: "-", ms: 0 },
      token: { ok: true, audience: "https://storage.azure.com/", expiresIn: 3555, ms: 42 },
      http: { ok: false, status: 0, text: "Skipped", requestId: "-", ms: 0 }
    },
    publicBlocked: {
      label: "Public Network Blocked",
      account: "kmsdevsa03",
      container: "validation-demo",
      authMode: "sas",
      endpointMode: "public",
      dns: { ok: true, ip: "20.60.70.80", cname: "blob.demo.invalid", ms: 17 },
      tcp: { ok: true, ms: 24 },
      tls: { ok: true, version: "TLSv1.2", cipher: "ECDHE-RSA-AES256-GCM-SHA384", ms: 39 },
      token: { ok: true, audience: "sas", expiresIn: 1800, ms: 2 },
      http: { ok: false, status: 403, text: "PublicAccessNotPermitted", requestId: "kms-demo-storage-req-0004", ms: 51 }
    }
  };

  function normalize(raw) {
    const account = String(raw.account || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const container = String(raw.container || "").trim().toLowerCase();
    const authMode = String(raw.authMode || "entra").toLowerCase();
    const endpointMode = String(raw.endpointMode || "private").toLowerCase();
    const operation = String(raw.operation || "list").toLowerCase();
    const timeout = Math.max(1000, Math.min(30000, Number(raw.timeout || 8000)));
    return { account, container, authMode, endpointMode, operation, timeout };
  }

  function execute(raw, scenarioId = "success") {
    const input = normalize(raw);
    const scenario = JSON.parse(JSON.stringify(scenarios[scenarioId] || scenarios.success));
    const endpoint = `https://${input.account}.blob.core.windows.net/${encodeURIComponent(input.container)}`;
    const nameValid = /^[a-z0-9]{3,24}$/.test(input.account);
    const containerValid = /^(?!-)(?!.*--)[a-z0-9-]{3,63}(?<!-)$/.test(input.container);
    const valid = nameValid && containerValid;
    const tokenMask = input.authMode === "entra"
      ? "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.kms-demo.DEMO_SIGNATURE_NOT_VALID"
      : input.authMode === "sas" ? "sv=demo&sig=KMS_DEMO_SIGNATURE_NOT_VALID" : "KMS_DEMO_ACCESS_KEY_NOT_VALID";
    const request = {
      method: input.operation === "head" ? "HEAD" : "GET",
      url: `${endpoint}?restype=container&comp=list`,
      headers: {
        "x-ms-version": "2025-01-05",
        "x-ms-date": "Thu, 31 Jul 2026 04:30:00 GMT",
        "x-ms-client-request-id": "kms-storage-demo-client-0001",
        Authorization: input.authMode === "entra" ? `Bearer ${tokenMask}` : `${input.authMode.toUpperCase()} ${tokenMask}`
      },
      timeoutMs: input.timeout,
      demoMode: true
    };
    const logs = [];
    const push = (level, stage, message) => logs.push({ level, stage, message });
    push("INFO", "REQUEST", "Storage validation request received");
    push("DEBUG", "INPUT", `account=${input.account}`);
    push("DEBUG", "INPUT", `container=${input.container}`);
    push("DEBUG", "INPUT", `authMode=${input.authMode}, endpointMode=${input.endpointMode}`);
    push("TRACE", "NORMALIZE", "Lowercasing and sanitizing storage identifiers");
    push(nameValid ? "PASS" : "ERROR", "VALIDATION", `accountNameValid=${nameValid}`);
    push(containerValid ? "PASS" : "ERROR", "VALIDATION", `containerNameValid=${containerValid}`);
    if (!valid) {
      push("ERROR", "SUMMARY", "Overall result=FAIL, failedStage=VALIDATION");
      return {
        input, request: null, response: null,
        result: { overall: "FAIL", naming: "FAIL", dns: "SKIP", tcp: "SKIP", tls: "SKIP", auth: "SKIP", api: "SKIP", elapsedMs: 0 },
        logs
      };
    }
    push("PASS", "VALIDATION", "Storage naming constraints passed");
    push("INFO", "URL", `endpoint=${endpoint}`);
    push("DEBUG", "CONFIG", `scenario=${scenarioId} (${scenario.label})`);
    push("WARN", "DEMO", "No real Azure Storage request will be sent");
    push("INFO", "DNS", `Resolving ${input.account}.blob.core.windows.net`);
    push("TRACE", "DNS", input.endpointMode === "private" ? "Private DNS zone lookup requested" : "Public DNS lookup requested");
    if (!scenario.dns.ok) {
      push("ERROR", "DNS", `Resolution failed: ${scenario.dns.error}`);
      push("DEBUG", "DNS", `elapsedMs=${scenario.dns.ms}`);
      push("SKIP", "TCP", "Skipped because DNS resolution failed");
      push("SKIP", "TLS", "Skipped because TCP connection was not attempted");
      push("SKIP", "API", "Skipped because endpoint is unreachable");
      push("ERROR", "SUMMARY", "Overall result=FAIL, failedStage=DNS");
    } else {
      push("PASS", "DNS", `address=${scenario.dns.ip}`);
      push("DEBUG", "DNS", `cname=${scenario.dns.cname || "none"}`);
      push(input.endpointMode === "private" ? "PASS" : "WARN", "DNS", `endpointMode=${input.endpointMode}`);
      push("DEBUG", "DNS", `elapsedMs=${scenario.dns.ms}`);
      push("INFO", "TCP", `Connecting ${scenario.dns.ip}:443`);
      push("TRACE", "TCP", "socketTimeout inherited from request timeout");
      push("PASS", "TCP", `connected=true, elapsedMs=${scenario.tcp.ms}`);
      push("INFO", "TLS", "Starting TLS handshake");
      push("DEBUG", "TLS", `SNI=${input.account}.blob.core.windows.net`);
      push("PASS", "TLS", `protocol=${scenario.tls.version}`);
      push("DEBUG", "TLS", `cipher=${scenario.tls.cipher}`);
      push("DEBUG", "TLS", `elapsedMs=${scenario.tls.ms}`);
      push("INFO", "AUTHENTICATION", `mode=${input.authMode}`);
      if (input.authMode === "entra") {
        push("DEBUG", "TOKEN", `audience=${scenario.token.audience}`);
        push("TRACE", "TOKEN", `token=${tokenMask}`);
      } else {
        push("TRACE", "CREDENTIAL", `credential=${tokenMask}`);
      }
      if (!scenario.token.ok) {
        push("ERROR", "AUTHENTICATION", `Credential acquisition failed: ${scenario.token.error}`);
        push("SKIP", "API", "Skipped because authentication failed");
        push("ERROR", "SUMMARY", "Overall result=FAIL, failedStage=AUTHENTICATION");
      } else {
        push("PASS", "AUTHENTICATION", `credentialReady=true, expiresIn=${scenario.token.expiresIn}s`);
        push("INFO", "REQUEST", `Building ${request.method} Blob service request`);
        push("DEBUG", "HEADERS", `x-ms-version=${request.headers["x-ms-version"]}`);
        push("TRACE", "HEADERS", `x-ms-client-request-id=${request.headers["x-ms-client-request-id"]}`);
        push("TRACE", "HEADERS", "Authorization header is masked in UI");
        push("INFO", "API", "Sending simulated List Blobs request");
        push(scenario.http.ok ? "PASS" : "ERROR", "RESPONSE", `status=${scenario.http.status} ${scenario.http.text}`);
        push("DEBUG", "RESPONSE", `x-ms-request-id=${scenario.http.requestId}`);
        push("DEBUG", "RESPONSE", `elapsedMs=${scenario.http.ms}`);
        push(scenario.http.ok ? "PASS" : "WARN", "PARSE", scenario.http.ok ? "Blob list response parsed" : "Storage error payload parsed");
        push(scenario.http.ok ? "PASS" : "ERROR", "SUMMARY", `Overall result=${scenario.http.ok ? "PASS" : "FAIL"}`);
      }
    }
    const authPass = scenario.dns.ok && scenario.token.ok;
    const apiPass = authPass && scenario.http.ok;
    const result = {
      overall: apiPass ? "PASS" : "FAIL",
      naming: "PASS",
      dns: scenario.dns.ok ? "PASS" : "FAIL",
      tcp: scenario.dns.ok ? "PASS" : "SKIP",
      tls: scenario.dns.ok ? "PASS" : "SKIP",
      auth: !scenario.dns.ok ? "SKIP" : scenario.token.ok ? "PASS" : "FAIL",
      api: !authPass ? "SKIP" : scenario.http.ok ? "PASS" : "FAIL",
      endpointMode: input.endpointMode,
      resolvedIp: scenario.dns.ip,
      statusCode: scenario.http.status,
      elapsedMs: scenario.dns.ms + scenario.tcp.ms + scenario.tls.ms + scenario.token.ms + scenario.http.ms
    };
    const response = {
      mode: "demo",
      scenario: scenarioId,
      endpoint,
      dns: scenario.dns,
      tcp: scenario.tcp,
      tls: scenario.tls,
      authentication: scenario.token,
      http: scenario.http,
      body: scenario.http.ok ? {
        EnumerationResults: {
          ServiceEndpoint: `https://${input.account}.blob.core.windows.net/`,
          ContainerName: input.container,
          Blobs: [
            { Name: "kms-demo/readme.txt", ContentLength: 2048, BlobType: "BlockBlob" },
            { Name: "kms-demo/sample.json", ContentLength: 4096, BlobType: "BlockBlob" }
          ],
          NextMarker: null
        }
      } : { error: { code: scenario.http.text, message: "Simulated storage validation error." } },
      summary: result
    };
    return { input, request, response, result, logs };
  }
  return { scenarios, execute };
})();
