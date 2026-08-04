
window.ValidationCommon = (() => {
  const menu = [
    { title: "MAIN", items: [
      ["dashboard", "▦", "Dashboard", "pages/index.html"],
      ["network-test", "⌁", "Network Test", "pages/network/network-test.html"],
      ["naming-rule", "Aa", "Azure Naming Rule", "pages/azure/azure-naming-rule.html"]
    ]},
    { title: "AZURE", items: [
      ["storage", "▱", "Storage Account", "pages/storage/storage-account.html"],
      ["redis", "◆", "Cache for Redis", "pages/redis/redis-cache.html"],
      ["openai-chat", "✦", "OpenAI Chat", "pages/openai/chat-completion.html"],
      ["openai-embedding", "⌘", "OpenAI Embedding", "pages/openai/embeddings.html"],
      ["ai-search", "⌕", "AI Search", "pages/search/ai-search.html"],
      ["key-vault", "▣", "Key Vault", "pages/keyvault/key-vault.html"]
    ]},
    { title: "MICROSOFT FABRIC", items: [
      ["fabric-autoscale", "↕", "Capacity Autoscale", "pages/fabric/autoscale.html"],
      ["fabric-warehouse", "▤", "Warehouse", "pages/fabric/warehouse.html"],
      ["fabric-data-agent", "◎", "Data Agent", "pages/fabric/data-agent.html"]
    ]},
    { title: "INTEGRATION", items: [
      ["teams", "◈", "Teams Alert", "pages/teams/teams-webhook.html"]
    ]}
  ];

  function buildHeader() {
    return `
      <header class="app-header">
        <div class="header-left">
          <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기 또는 접기">☰</button>
          <a class="brand" href="${ValidationRouter.href("pages/index.html")}">
            <span class="brand-mark">MK</span>
            <span>
              <span class="brand-title">MINSEO.KIM</span>
              <span class="brand-subtitle">CLOUD AI ENGINEER</span>
            </span>
          </a>
        </div>
        <div class="header-right">
          <a class="header-action" href="${ValidationRouter.href("pages/about/architecture.html")}">Architecture</a>
          <a class="header-action" href="${ValidationRouter.href("README.md")}">README</a>
        </div>
      </header>`;
  }

  function buildSidebar() {
    const sections = menu.map(section => `
      <section class="nav-section">
        <div class="nav-title">${section.title}</div>
        ${section.items.map(([key, icon, label, path]) => `
          <a class="nav-link ${section.title !== "MAIN" ? "nav-sub" : ""} ${ValidationRouter.page === key ? "active" : ""}"
             href="${ValidationRouter.href(path)}">
            <span class="nav-icon">${icon}</span>
            <span class="nav-label">${label}</span>
          </a>`).join("")}
      </section>`).join("");

    return `
      <aside class="app-sidebar">
        <section class="profile">
          <div class="avatar">김</div>
          <div class="profile-copy">
            <div class="profile-name">김민서</div>
            <div class="profile-role">Cloud Platform Engineer</div>
            <div class="profile-stack">Azure · AI · Data · DevOps</div>
          </div>
        </section>
        <nav class="sidebar-nav">${sections}</nav>
      </aside>
      <div class="mobile-backdrop" id="mobileBackdrop"></div>`;
  }

  function buildFooter() {
    return `
      <footer class="app-footer">
        <span>© 2026 MINSEO.KIM · Validation Gate</span>
        <span>Cloud Platform Engineer · Azure · AI · Data · DevOps</span>
      </footer>`;
  }

  function initialize() {
    document.getElementById("appHeader").innerHTML = buildHeader();
    document.getElementById("appSidebar").innerHTML = buildSidebar();
    document.getElementById("appFooter").innerHTML = buildFooter();

    const app = document.getElementById("app");
    const toggle = document.getElementById("menuToggle");
    const backdrop = document.getElementById("mobileBackdrop");
    const mobile = () => matchMedia("(max-width: 820px)").matches;

    toggle.addEventListener("click", () => {
      if (mobile()) {
        app.classList.toggle("mobile-open");
      } else {
        app.classList.toggle("sidebar-collapsed");
        localStorage.setItem("validation-gate-sidebar", app.classList.contains("sidebar-collapsed") ? "1" : "0");
      }
    });

    backdrop.addEventListener("click", () => app.classList.remove("mobile-open"));
    addEventListener("resize", () => { if (!mobile()) app.classList.remove("mobile-open"); });

    if (!mobile() && localStorage.getItem("validation-gate-sidebar") === "1") {
      app.classList.add("sidebar-collapsed");
    }
  }

  return { initialize };
})();
