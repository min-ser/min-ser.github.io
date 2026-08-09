import { $ } from "./core.js";

export class SceneCGManager {
  constructor(manifest) {
    this.manifest = manifest?.items || {};
    this.currentId = null;
    this.loadToken = 0;
  }

  has(sceneId) {
    return Boolean(sceneId && this.manifest?.[sceneId]?.game);
  }

  resolve(scene) {
    if (!scene) return null;

    // Explicit cg remains supported, but scene.id auto mapping is the default.
    const explicitId = typeof scene.cg === "string" ? scene.cg : scene.cg?.id;
    const id = explicitId || scene.id;

    if (!this.has(id)) return null;

    return {
      ...(typeof scene.cg === "object" ? scene.cg : {}),
      id,
      transition: scene.cg?.transition || "fade"
    };
  }

  async show(command) {
    const id = typeof command === "string" ? command : command?.id;
    const item = this.manifest?.[id];
    const stage = $("#stage");
    const layer = $("#scene-cg-layer");
    const image = $("#scene-cg-image");
    const badge = $("#scene-id-badge");

    if (!layer || !image || !item?.game) {
      this.hide();
      return false;
    }

    const token = ++this.loadToken;
    layer.classList.remove("visible", "cg-fade", "cg-flash", "cg-error");
    stage?.classList.remove("scene-cg-active");

    const loaded = await new Promise((resolve) => {
      const onLoad = () => resolve(true);
      const onError = () => resolve(false);

      image.onload = onLoad;
      image.onerror = onError;
      image.src = item.game;

      if (image.complete && image.naturalWidth > 0) resolve(true);
    });

    if (token !== this.loadToken) return false;

    if (!loaded) {
      console.warn("[천류관] 장면 CG 로딩 실패:", id, item.game);
      layer.classList.add("cg-error");
      this.hide();
      return false;
    }

    image.alt = item.title || id;
    image.dataset.sceneId = id;
    layer.dataset.sceneId = id;

    if (badge) {
      badge.textContent = `${id} · ${item.title || "장면 이미지"}`;
      badge.classList.add("visible");
    }

    // CG mode hides every standing character until the next scene.
    stage?.classList.add("scene-cg-active");
    layer.classList.add(
      "visible",
      command?.transition === "flash" ? "cg-flash" : "cg-fade"
    );

    this.currentId = id;
    return true;
  }

  hide() {
    ++this.loadToken;

    const stage = $("#stage");
    const layer = $("#scene-cg-layer");
    const image = $("#scene-cg-image");
    const badge = $("#scene-id-badge");

    stage?.classList.remove("scene-cg-active");
    layer?.classList.remove("visible", "cg-fade", "cg-flash", "cg-error");

    if (image) {
      image.onload = null;
      image.onerror = null;
      image.removeAttribute("src");
      image.dataset.sceneId = "";
      image.alt = "";
    }

    if (badge) {
      badge.textContent = "";
      badge.classList.remove("visible");
    }

    if (layer) {
      layer.dataset.sceneId = "";
    }

    this.currentId = null;
    return true;
  }

  async updateScene(scene) {
    const command = this.resolve(scene);
    if (!command) {
      this.hide();
      return false;
    }
    return this.show(command);
  }
}
