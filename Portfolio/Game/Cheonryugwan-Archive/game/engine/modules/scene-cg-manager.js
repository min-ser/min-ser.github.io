import { $ } from "./core.js";

export class SceneCGManager {
  constructor(manifest) {
    this.manifest = manifest?.items || {};
    this.currentId = null;
  }

  show(command) {
    const id = typeof command === "string" ? command : command?.id;
    const item = this.manifest?.[id];
    const layer = $("#scene-cg-layer");
    const image = $("#scene-cg-image");
    const badge = $("#scene-id-badge");
    if (!layer || !image || !item?.game) return this.hide();

    layer.classList.remove("visible", "cg-fade", "cg-flash");
    void layer.offsetWidth;
    image.src = item.game;
    image.alt = item.title || id;
    image.dataset.sceneId = id;
    layer.dataset.sceneId = id;
    badge.textContent = `${id} · ${item.title || "장면 이미지"}`;
    badge.classList.add("visible");
    layer.classList.add("visible", command?.transition === "flash" ? "cg-flash" : "cg-fade");
    this.currentId = id;
    return true;
  }

  hide() {
    const layer = $("#scene-cg-layer");
    const image = $("#scene-cg-image");
    const badge = $("#scene-id-badge");
    layer?.classList.remove("visible", "cg-fade", "cg-flash");
    if (image) {
      image.removeAttribute("src");
      image.dataset.sceneId = "";
    }
    if (badge) {
      badge.textContent = "";
      badge.classList.remove("visible");
    }
    this.currentId = null;
    return true;
  }

  update(command) {
    return command ? this.show(command) : this.hide();
  }
}
