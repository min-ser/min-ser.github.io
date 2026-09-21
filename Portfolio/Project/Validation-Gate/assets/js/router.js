
window.ValidationRouter = (() => {
  const page = document.body.dataset.page || "dashboard";
  const depth = Number(document.body.dataset.depth || "1");

  function rootPrefix() {
    return depth <= 0 ? "./" : "../".repeat(depth);
  }

  function href(path) {
    return rootPrefix() + path.replace(/^\/+/, "");
  }

  return { page, depth, rootPrefix, href };
})();
