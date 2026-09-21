
(() => {
  const CURRENT = new URL(import.meta.url);
  const scriptPath = CURRENT.pathname.replace(/\/assets\/js\/shared-header\.js$/, "");
  const projectBase = CURRENT.origin + scriptPath + "/";

  const links = [
    { key: "dashboard", label: "DASHBOARD", path: "index.html" },
    { key: "scenario",  label: "SCENARIO",  path: "pages/editor/index.html" },
    { key: "story",     label: "STORY",     path: "pages/story/index.html" },
    { key: "assets",    label: "ASSETS",    path: "pages/backgrounds/index.html" },
    { key: "characters",label: "CHARACTERS",path: "pages/characters/index.html" },
    { key: "world",     label: "LORE",      path: "pages/world/index.html" },
    { key: "roadmap",   label: "ROADMAP",   path: "pages/roadmap/index.html" },
    { key: "play",      label: "PLAY",      path: "game/index.html" }
  ];

  function currentKey() {
    const p = location.pathname.toLowerCase();
    if (p.endsWith("/index.html") || p.endsWith("/cheonryugwan-archive/") || p.endsWith("/")) {
      if (p.includes("/game/")) return "play";
      if (p.includes("/pages/editor/")) return "scenario";
      if (p.includes("/pages/story/")) return "story";
      if (p.includes("/pages/backgrounds/")) return "assets";
      if (p.includes("/pages/characters/")) return "characters";
      if (p.includes("/pages/world/")) return "world";
      if (p.includes("/pages/roadmap/")) return "roadmap";
      return "dashboard";
    }
    if (p.includes("/game/")) return "play";
    if (p.includes("/editor/")) return "scenario";
    if (p.includes("/story/") || p.includes("/manuscript/")) return "story";
    if (p.includes("/background")) return "assets";
    if (p.includes("/character")) return "characters";
    if (p.includes("/world")) return "world";
    if (p.includes("/roadmap")) return "roadmap";
    return "";
  }

  function href(path) {
    return new URL(path, projectBase).href;
  }

  function buildHeader() {
    const header = document.createElement("header");
    header.className = "ce-global-header";
    header.innerHTML = `
      <div class="ce-global-header__inner">
        <a class="ce-global-brand" href="${href("index.html")}">
          <span class="ce-global-brand__mark">&gt;_</span>
          <span>CHEONRYUGWAN</span>
          <small>EDITOR</small>
        </a>
        <button class="ce-nav-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false">☰</button>
        <nav class="ce-global-nav" aria-label="공통 메뉴">
          ${links.map(link => `<a data-key="${link.key}" href="${href(link.path)}">${link.label}</a>`).join("")}
        </nav>
        <div class="ce-global-status"><span></span>v0.10.6</div>
      </div>
    `;

    const active = currentKey();
    const activeLink = header.querySelector(`[data-key="${active}"]`);
    if (activeLink) activeLink.classList.add("active");

    const toggle = header.querySelector(".ce-nav-toggle");
    const nav = header.querySelector(".ce-global-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    return header;
  }

  function init() {
    // Remove every legacy/topbar header instance so exactly one common header remains.
    document.querySelectorAll(
      "body > .ce-global-header, body > .ce-legacy-bar, body > header.topbar, body > .site-header, body > .global-header, body > .main-header"
    ).forEach(el => el.remove());

    const body = document.body;
    if (!body) return;
    body.insertBefore(buildHeader(), body.firstChild);
    body.classList.add("ce-shared-header-enabled");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
