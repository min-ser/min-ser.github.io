(() => {
  "use strict";

  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(location.hostname);

  async function clearLegacyLocalCaches() {
    if (!isLocal) return;
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter((key) => key.toLowerCase().includes("cheonryugwan"))
            .map((key) => caches.delete(key))
        );
      }
    } catch (error) {
      console.warn("[천류관] 로컬 캐시 정리 실패:", error);
    }
  }

  function initializeNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      nav.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");
        if (!link) return;
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });

      document.addEventListener("click", (event) => {
        if (!nav.classList.contains("open")) return;
        if (nav.contains(event.target) || toggle.contains(event.target)) return;
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    }
  }

  function validateInteractiveElements() {
    const elements = [...document.querySelectorAll("a[href], button")];
    const invalid = elements.filter((element) => {
      const style = getComputedStyle(element);
      return style.pointerEvents === "none" || style.visibility === "hidden" || style.display === "none";
    });

    document.documentElement.dataset.interactionReady = invalid.length ? "warning" : "true";
    console.info(
      `[천류관] 상호작용 요소 ${elements.length}개 확인, 비활성 ${invalid.length}개`,
      invalid
    );
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await clearLegacyLocalCaches();
    initializeNavigation();
    validateInteractiveElements();
  });
})();
