window.KeyVaultDemoApi = (() => {
  const wait = (ms = 420) => new Promise(resolve => setTimeout(resolve, ms));
  const demoToken = "eyJhbGciOiJub25lIn0.eyJhdWQiOiJodHRwczovL3ZhdWx0LmF6dXJlLm5ldCJ9.DEMO_SIGNATURE_NOT_VALID";

  async function authenticate(payload) {
    await wait();
    return {
      status: "PASS",
      operation: "AUTHENTICATE",
      authentication: "WORKLOAD_IDENTITY",
      vaultUrl: payload.vaultUrl,
      clientId: payload.clientId,
      tokenAudience: "https://vault.azure.net",
      token: demoToken,
      httpStatus: 200,
      demoMode: true
    };
  }

  async function getSecret(payload) {
    await wait(520);
    return {
      status: "PASS",
      operation: "GET_SECRET",
      vaultUrl: payload.vaultUrl,
      secretName: payload.secretName,
      secretVersion: payload.secretVersion || "latest",
      value: "KMS_DEMO_SECRET_VALUE_MASKED",
      contentType: "text/plain",
      enabled: true,
      createdOn: "2026-07-31T05:30:00Z",
      updatedOn: "2026-07-31T05:30:00Z",
      httpStatus: 200,
      demoMode: true
    };
  }

  async function validatePermission(payload) {
    await wait(480);
    const base = {
      operation: "VALIDATE_PERMISSION",
      vaultUrl: payload.vaultUrl,
      principalType: "ServicePrincipal",
      requiredAction: "Microsoft.KeyVault/vaults/secrets/readMetadata/action",
      scenario: payload.scenario,
      demoMode: true
    };
    if (payload.scenario === "forbidden") return {...base,status:"ERROR",stage:"AUTHORIZATION",httpStatus:403,errorCode:"ForbiddenByRbac",message:"The principal does not have permission to read secrets."};
    if (payload.scenario === "network") return {...base,status:"ERROR",stage:"NETWORK",httpStatus:0,errorCode:"PrivateEndpointConnectionFailed",message:"Vault private endpoint could not be resolved from the demo network."};
    return {...base,status:"PASS",stage:"AUTHORIZATION",httpStatus:200,role:"Key Vault Secrets User",message:"Secret read permission is available."};
  }

  async function collectCertificates(payload) {
    await wait(650);
    return {
      status: "PASS",
      operation: "LIST_CERTIFICATES",
      vaultUrl: payload.vaultUrl,
      vaultName: payload.vaultName || "kms-prd-kv",
      httpStatus: 200,
      certificates: [
        {name:"kms-api-tls",status:"active",createdOn:"2026-05-10",expiresOn:"2027-05-10"},
        {name:"kms-client-auth",status:"active",createdOn:"2026-04-02",expiresOn:"2027-04-02"},
        {name:"kms-gateway-cert",status:"expiring",createdOn:"2025-09-15",expiresOn:"2026-08-20"}
      ],
      failures: [],
      demoMode: true
    };
  }

  return { authenticate, getSecret, validatePermission, collectCertificates };
})();
