document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const resourceType = document.getElementById("resourceType");
  const resourceSearch = document.getElementById("resourceSearch");
  const historyList = document.getElementById("historyList");
  const resultName = document.querySelector("#nameResult strong");
  const resultPep = document.querySelector("#nameResult code");
  const history = [];
  const tokenMap = { openai: "oai", search: "srch", redis: "redis", storage: "sa", postgres: "psql", keyvault: "kv", aks: "aks", fabric: "fabric" };

  resourceSearch.addEventListener("input", () => {
    const query = resourceSearch.value.trim().toLowerCase();
    [...resourceType.options].forEach(option => {
      option.hidden = query.length > 0 && !option.text.toLowerCase().includes(query);
    });
    const firstVisible = [...resourceType.options].find(option => !option.hidden);
    if (firstVisible && resourceType.selectedOptions[0]?.hidden) firstVisible.selected = true;
  });

  function sanitizeService(value) {
    return value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "service";
  }

  function renderHistory() {
    historyList.innerHTML = history.length
      ? history.map(item => `<div class="history-item"><strong>${item.name}</strong><code>${item.privateEndpoint}</code><time>${item.time}</time></div>`).join("")
      : "<p>아직 생성된 항목이 없습니다.</p>";
  }

  document.getElementById("namingForm").addEventListener("submit", event => {
    event.preventDefault();
    const environment = document.getElementById("environment").value;
    const type = resourceType.value;
    const service = sanitizeService(document.getElementById("serviceName").value);
    const token = tokenMap[type];
    const name = type === "storage" ? `kms${environment}sa01` : `kms-${environment}-${token}-${service}`;
    const privateEndpoint = `kms-${environment}-pep-${token}-${service}`;

    resultName.textContent = name;
    resultPep.textContent = privateEndpoint;
    history.unshift({ name, privateEndpoint, time: new Date().toLocaleTimeString("ko-KR") });
    history.splice(5);
    renderHistory();
  });

  document.getElementById("clearHistory").addEventListener("click", () => {
    history.length = 0;
    renderHistory();
    resultName.textContent = "-";
    resultPep.textContent = "-";
  });

  renderHistory();
});
