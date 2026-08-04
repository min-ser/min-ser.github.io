window.ValidationNamingApi = (() => {
  const resourceRules = {
    storage: { label: "Storage Account", token: "sa", min: 3, max: 24, pattern: /^[a-z0-9]+$/, separators: false, example: "kmsprdsa01" },
    openai: { label: "Azure OpenAI", token: "openai", min: 2, max: 64, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-openai-chat-001" },
    search: { label: "AI Search", token: "search", min: 2, max: 60, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-search-001" },
    redis: { label: "Azure Managed Redis", token: "redis", min: 1, max: 63, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-redis-common-001" },
    keyvault: { label: "Key Vault", token: "kv", min: 3, max: 24, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-kv-common" },
    apim: { label: "API Management", token: "apim", min: 1, max: 50, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-apim-main-001" },
    aks: { label: "Azure Kubernetes Service", token: "aks", min: 1, max: 63, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-aks-platform-001" },
    acr: { label: "Container Registry", token: "acr", min: 5, max: 50, pattern: /^[a-z0-9]+$/, separators: false, example: "kmsprdacr01" },
    identity: { label: "Managed Identity", token: "mi", min: 3, max: 128, pattern: /^[a-z0-9-_]+$/, separators: true, example: "kms-prd-mi-platform" },
    vnet: { label: "Virtual Network", token: "vnet", min: 2, max: 64, pattern: /^[a-z0-9-_.]+$/, separators: true, example: "kms-prd-vnet-main-001" },
    pe: { label: "Private Endpoint", token: "pe", min: 2, max: 64, pattern: /^[a-z0-9-_.]+$/, separators: true, example: "kms-prd-pe-openai-001" },
    fabric: { label: "Microsoft Fabric Capacity", token: "fabric", min: 3, max: 64, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-fabric" },
    log: { label: "Log Analytics Workspace", token: "log", min: 4, max: 63, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-log-main-001" },
    appi: { label: "Application Insights", token: "appi", min: 1, max: 260, pattern: /^[a-z0-9-_.()]+$/, separators: true, example: "kms-prd-appi-validation-gate" },
    sql: { label: "Azure SQL Server", token: "sql", min: 1, max: 63, pattern: /^[a-z0-9-]+$/, separators: true, example: "kms-prd-sql-main-001" }
  };

  const environmentMap = { dev: "dev", stg: "stg", prd: "prd", sandbox: "sbx" };
  const regionMap = { koreacentral: "kc", koreasouth: "ks", japaneast: "je", southeastasia: "sea", eastus: "eus" };
  const reserved = ["admin", "administrator", "root", "system", "microsoft", "azure", "windows"];

  const clean = value => String(value || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/_+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const compact = value => clean(value).replace(/[^a-z0-9]/g, "");

  function buildName(input) {
    const type = resourceRules[input.resourceType] || resourceRules.openai;
    const company = compact(input.companyPrefix || "kms");
    const env = environmentMap[input.environment] || compact(input.environment || "dev");
    const domain = compact(input.domain || "ai");
    const workload = clean(input.workload || "common");
    const instance = String(input.instance || "001").padStart(3, "0");
    const region = input.includeRegion ? regionMap[input.region] || compact(input.region) : "";

    if (["storage", "acr"].includes(input.resourceType)) {
      return [company, env, domain, type.token, region, instance.slice(-2)].filter(Boolean).join("");
    }
    if (input.resourceType === "fabric") return [company, env, domain, type.token].filter(Boolean).join("");
    if (input.resourceType === "keyvault") return [company + env, type.token, workload].filter(Boolean).join("-");
    return [company + env + domain, type.token, workload, region, instance].filter(Boolean).join("-");
  }

  function validateName(name, input) {
    const type = resourceRules[input.resourceType] || resourceRules.openai;
    const checks = [];
    const add = (id, status, reason, recommendation = "") => checks.push({ id, status, reason, recommendation });

    add("required", name.length > 0 ? "PASS" : "FAIL", name.length ? "Resource name is present." : "Resource name is required.", "Enter or generate a resource name.");
    add("lowercase", name === name.toLowerCase() ? "PASS" : "FAIL", name === name.toLowerCase() ? "Only lowercase characters are used." : "Uppercase characters are not allowed.", name.toLowerCase());
    add("length", name.length >= type.min && name.length <= type.max ? "PASS" : "FAIL", `Length ${name.length}; allowed range ${type.min}-${type.max}.`, `Keep the name between ${type.min} and ${type.max} characters.`);
    add("pattern", type.pattern.test(name) ? "PASS" : "FAIL", type.pattern.test(name) ? "Character pattern matches the resource rule." : "One or more characters are invalid for this resource type.", type.separators ? "Use lowercase letters, numbers, and approved separators." : "Use lowercase letters and numbers only.");
    add("separator", !/--|__|\.-|-\.|_\./.test(name) ? "PASS" : "FAIL", !/--|__|\.-|-\.|_\./.test(name) ? "No duplicate or mixed separators detected." : "Duplicate or mixed separators were detected.", name.replace(/[-_.]{2,}/g, "-"));
    add("boundary", !/^[-_.]|[-_.]$/.test(name) ? "PASS" : "FAIL", !/^[-_.]|[-_.]$/.test(name) ? "The name starts and ends with an alphanumeric character." : "The name cannot start or end with a separator.", name.replace(/^[-_.]+|[-_.]+$/g, ""));
    add("reserved", !reserved.some(word => name === word || name.startsWith(`${word}-`)) ? "PASS" : "FAIL", reserved.some(word => name === word || name.startsWith(`${word}-`)) ? "A reserved word is used." : "No reserved prefix was detected.", `kms-${name}`);
    add("environment", name.includes(environmentMap[input.environment] || "") ? "PASS" : "WARN", name.includes(environmentMap[input.environment] || "") ? "Environment code is included." : "Environment code is not obvious in the name.", buildName(input));
    add("resourceToken", name.includes(type.token) ? "PASS" : "WARN", name.includes(type.token) ? `Resource token '${type.token}' is included.` : `Resource token '${type.token}' was not detected.`, buildName(input));
    add("companyPrefix", name.startsWith(compact(input.companyPrefix || "kms")) ? "PASS" : "WARN", name.startsWith(compact(input.companyPrefix || "kms")) ? "Company prefix is present." : "Company prefix differs from the selected convention.", buildName(input));

    if (!type.separators) add("resourceSpecific", !/[-_.]/.test(name) ? "PASS" : "FAIL", !/[-_.]/.test(name) ? "Compact resource naming rule satisfied." : `${type.label} does not allow separators in this demo policy.`, name.replace(/[^a-z0-9]/g, ""));
    else add("resourceSpecific", "PASS", `${type.label} resource-specific rule set loaded.`);

    return checks;
  }

  function makeLogs(input, name, checks, generated) {
    const logs = [
      ["INFO","REQUEST","Naming validation request received."],
      ["DEBUG","INPUT",`Resource type=${input.resourceType}, environment=${input.environment}, region=${input.region}.`],
      ["TRACE","NORMALIZE","Trimming whitespace and normalizing case."],
      ["PASS","NORMALIZE",`Normalized resource name: ${name || "(empty)"}.`],
      ["DEBUG","VALIDATION","Loading resource rule mapping."],
      ["INFO","VALIDATION",`Rule set: ${resourceRules[input.resourceType].label}.`],
      ["TRACE","VALIDATION",`Length range: ${resourceRules[input.resourceType].min}-${resourceRules[input.resourceType].max}.`],
      ["TRACE","VALIDATION",`Allowed pattern: ${resourceRules[input.resourceType].pattern}.`],
      ["DEBUG","VALIDATION","Checking lowercase constraint."],
      [checks.find(x=>x.id==="lowercase").status,"VALIDATION",checks.find(x=>x.id==="lowercase").reason],
      ["DEBUG","VALIDATION","Checking resource name length."],
      [checks.find(x=>x.id==="length").status,"VALIDATION",checks.find(x=>x.id==="length").reason],
      ["DEBUG","VALIDATION","Checking character pattern."],
      [checks.find(x=>x.id==="pattern").status,"VALIDATION",checks.find(x=>x.id==="pattern").reason],
      ["DEBUG","VALIDATION","Checking separator policy."],
      [checks.find(x=>x.id==="separator").status,"VALIDATION",checks.find(x=>x.id==="separator").reason],
      ["DEBUG","VALIDATION","Checking reserved names."],
      [checks.find(x=>x.id==="reserved").status,"VALIDATION",checks.find(x=>x.id==="reserved").reason],
      ["TRACE","VALIDATION","Checking environment and company prefix convention."],
      [checks.find(x=>x.id==="environment").status,"VALIDATION",checks.find(x=>x.id==="environment").reason],
      [checks.find(x=>x.id==="companyPrefix").status,"VALIDATION",checks.find(x=>x.id==="companyPrefix").reason],
      ["TRACE","VALIDATION","Checking resource token convention."],
      [checks.find(x=>x.id==="resourceToken").status,"VALIDATION",checks.find(x=>x.id==="resourceToken").reason],
      ["DEBUG","RESULT","Building aggregate validation result."],
      ["INFO","RESULT",`Recommended name: ${generated}.`]
    ];
    checks.forEach((c, i) => logs.push([c.status === "WARN" ? "WARN" : c.status, "RULE", `${String(i+1).padStart(2,"0")}. ${c.id}: ${c.reason}`]));
    const failed = checks.filter(x => x.status === "FAIL").length;
    const warned = checks.filter(x => x.status === "WARN").length;
    logs.push([failed ? "ERROR" : warned ? "WARN" : "PASS", "RESULT", failed ? `${failed} blocking validation issue(s) detected.` : warned ? `Validation passed with ${warned} convention warning(s).` : "All naming rules passed."]);
    logs.push(["INFO","RESPONSE","Structured validation response generated in DEMO mode."]);
    return logs.map(([level, stage, message], i) => ({ level, stage, message, delay: i < 6 ? 90 : 55 }));
  }

  function execute(rawInput) {
    const input = { ...rawInput };
    const generated = buildName(input);
    const name = clean(input.resourceName || generated);
    const checks = validateName(name, input);
    const failed = checks.filter(x => x.status === "FAIL").length;
    const warned = checks.filter(x => x.status === "WARN").length;
    const result = {
      overall: failed ? "FAIL" : warned ? "WARN" : "PASS",
      resourceName: name,
      recommendedName: generated,
      failed,
      warned,
      passed: checks.filter(x => x.status === "PASS").length,
      checks
    };
    const request = { mode: "DEMO", input, normalizedName: name, correlationId: "vg-naming-20260731-001" };
    const response = { status: result.overall, ruleSet: resourceRules[input.resourceType], result, generatedAt: new Date().toISOString() };
    return { input, request, response, result, logs: makeLogs(input, name, checks, generated) };
  }

  return { resourceRules, buildName, execute };
})();
