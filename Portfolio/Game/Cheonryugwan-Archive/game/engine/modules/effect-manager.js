import { $ } from "./core.js";

const EFFECT_CLASSES = [
  "shake", "flash", "memory", "zoom-in",
  "blackout", "whiteout", "slow-motion"
];

export class EffectManager {
  constructor(stageSelector = "#stage") {
    this.stageSelector = stageSelector;
  }

  play(name, duration = 700) {
    const stage = $(this.stageSelector);
    if (!stage || !name) return;

    EFFECT_CLASSES.forEach((item) => stage.classList.remove(item));
    void stage.offsetWidth;
    stage.classList.add(name);

    window.setTimeout(() => stage.classList.remove(name), duration);
  }

  clear() {
    const stage = $(this.stageSelector);
    EFFECT_CLASSES.forEach((item) => stage?.classList.remove(item));
  }
}
