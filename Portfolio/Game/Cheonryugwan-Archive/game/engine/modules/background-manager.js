import { $ } from "./core.js";

export class BackgroundManager {
  constructor(manifest) {
    this.manifest = manifest;
    this.currentId = null;
  }

  change(id, transition = "fade") {
    const path = this.manifest?.[id];
    if (!path) {
      console.warn("[천류관] 배경 없음:", id);
      return false;
    }

    const layer = $("#background-layer");
    if (!layer) return false;

    layer.classList.remove("bg-fade", "bg-flash");
    void layer.offsetWidth;
    if (transition === "fade") layer.classList.add("bg-fade");

    layer.style.backgroundImage =
      `linear-gradient(rgba(5,7,10,.18),rgba(5,7,10,.35)),url("${path}")`;
    layer.dataset.backgroundId = id;
    this.currentId = id;
    return true;
  }

  clear() {
    const layer = $("#background-layer");
    if (!layer) return;
    layer.style.backgroundImage = "";
    layer.dataset.backgroundId = "";
    this.currentId = null;
  }
}
