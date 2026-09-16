(() => {
  "use strict";

  const currentScript = document.currentScript;
  if (!currentScript) return;

  const scriptUrl = new URL(currentScript.src, window.location.href);
  const siteRoot = new URL("../../", scriptUrl);

  const items = [
    ["home", "홈", "index.html"],
    ["game", "게임", "game/"],
    ["archive", "아카이브", "pages/archive/"],
    ["story", "스토리", "pages/story/"],
    ["manuscript", "원본 스토리", "pages/manuscript/"],
    ["characters", "캐릭터", "pages/characters/"],
    ["world", "세계관", "pages/world/"],
    ["backgrounds", "배경", "pages/backgrounds/"],
    ["sounds", "음향", "pages/sounds/"],
    ["roadmap", "로드맵", "pages/roadmap/"],
    ["about", "소개", "pages/about/"]
  ];

  const href = (path) => new URL(path, siteRoot).href;

  function closeMenu(header) {
    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
  }

  function render(header) {
    const active = header.dataset.active || document.body.dataset.page || "";
    const subtitle = header.dataset.subtitle || "천류관 : 흐름의 기록";

    header.className = "site-header";
    header.innerHTML = `
      <a class="brand" href="${href("index.html")}" aria-label="천류관 홈">
        <span class="brand-en">CHEONRYUGWAN ARCHIVE</span>
        <span class="brand-ko">${subtitle}</span>
      </a>
      <button class="nav-toggle" type="button"
              aria-label="메뉴 열기"
              aria-expanded="false"
              aria-controls="primary-navigation">☰</button>
      <nav id="primary-navigation" class="site-nav" aria-label="주요 메뉴">
        ${items.map(([id, label, path]) => `
          <a href="${href(path)}"
             data-nav-id="${id}"
             ${id === active ? 'class="active" aria-current="page"' : ""}>
            ${label}
          </a>
        `).join("")}
      </nav>
    `;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");

    toggle.addEventListener("click", () => {
      const next = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(next));
      nav.classList.toggle("open", next);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(header);
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeMenu(header);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1040) closeMenu(header);
    });
  }

  document.querySelectorAll("[data-site-header]").forEach(render);
})();

