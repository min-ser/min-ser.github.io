
document.addEventListener("DOMContentLoaded", () => {
  ValidationTheme.initialize();
  ValidationCommon.initialize();

  const output = document.getElementById("dashboardConsole");
  const renderer = new ValidationLogRenderer(output);
  const engine = new ValidationLogEngine({
    defaultDelay: 150,
    onLog: log => renderer.append(log)
  });

  const sequence = [
    { level: "INFO", stage: "REQUEST", message: "Validation Gate dashboard initialization requested" },
    { level: "DEBUG", stage: "CONFIG", message: "demoMode=true, liveApiCalls=false, staticHosting=GitHub Pages" },
    { level: "TRACE", stage: "ROUTER", message: `page=${ValidationRouter.page}, depth=${ValidationRouter.depth}, rootPrefix=${ValidationRouter.rootPrefix()}` },
    { level: "DEBUG", stage: "IDENTITY", message: `tenantId=${ValidationDemoData.tenantId}` },
    { level: "DEBUG", stage: "IDENTITY", message: `clientId=${ValidationDemoData.clientId}` },
    { level: "WARN", stage: "SECURITY", message: "All identifiers and tokens are non-functional demo values" },
    { level: "INFO", stage: "MODULES", message: "Registering Common, Azure, Microsoft Fabric and Integration modules" },
    { level: "PASS", stage: "HEADER", message: "Shared header renderer initialized" },
    { level: "PASS", stage: "SIDEBAR", message: "Shared sidebar renderer initialized with active route detection" },
    { level: "PASS", stage: "CONSOLE", message: "Developer console engine and renderer initialized" },
    { level: "DEBUG", stage: "STORAGE", message: "Sidebar state and theme preference connected to localStorage" },
    { level: "INFO", stage: "STATUS", message: "Network Test is the next implementation target" },
    { level: "PASS", stage: "READY", message: "Validation Gate dashboard is ready" }
  ];

  engine.play(sequence);

  document.querySelectorAll("[data-log-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-log-filter]").forEach(x => x.classList.remove("active"));
      button.classList.add("active");
      renderer.setFilter(button.dataset.logFilter);
    });
  });

  document.getElementById("clearLogs").addEventListener("click", () => {
    engine.clear();
    renderer.clear();
  });

  document.getElementById("replayLogs").addEventListener("click", () => {
    renderer.clear();
    engine.play(sequence);
  });

  document.getElementById("copyLogs").addEventListener("click", async () => {
    await ValidationUtils.copyText(engine.toText());
    const button = document.getElementById("copyLogs");
    const before = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => button.textContent = before, 1100);
  });
});
