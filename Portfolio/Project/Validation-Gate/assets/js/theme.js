
window.ValidationTheme = (() => {
  const STORAGE_KEY = "validation-gate-theme";

  function initialize() {
    const saved = localStorage.getItem(STORAGE_KEY) || "light";
    document.documentElement.dataset.theme = saved;
    return saved;
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }

  return { initialize, setTheme };
})();
