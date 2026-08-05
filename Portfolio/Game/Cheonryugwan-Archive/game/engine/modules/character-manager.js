import { $ } from "./core.js";

export class CharacterManager {
  constructor(manifest) {
    this.manifest = manifest;
    this.positions = ["left", "center", "right"];
    this.active = {};
  }

  getImage(position) {
    return $(`#character-${position}`);
  }

  hide(position) {
    const image = this.getImage(position);
    if (!image) return;
    image.classList.remove("visible", "speaker-active", "speaker-dim", "battle-pose");
    delete this.active[position];
  }

  hideAnimated(position, animation = "fade", duration = 280) {
    const image = this.getImage(position);
    if (!image) return Promise.resolve();

    image.classList.remove("exit-left", "exit-right", "fade-out");
    if (animation === "slide-left") image.classList.add("exit-left");
    else if (animation === "slide-right") image.classList.add("exit-right");
    else image.classList.add("fade-out");

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.hide(position);
        image.classList.remove("exit-left", "exit-right", "fade-out");
        resolve();
      }, duration);
    });
  }

  hideAll() {
    this.positions.forEach((position) => this.hide(position));
  }

  hideMany(positions = []) {
    positions.forEach((position) => this.hide(position));
  }

  show(command) {
    if (!command) return false;
    if (command.visible === false) {
      if (command.position) this.hide(command.position);
      else this.hideAll();
      return true;
    }

    const character = this.manifest?.[command.id];
    if (!character) {
      console.warn("[천류관] 등록되지 않은 캐릭터:", command.id);
      return false;
    }

    const position = command.position || character.defaultPosition || "center";
    const image = this.getImage(position);
    if (!image) return false;

    const expression = command.expression || character.defaultExpression;
    const source = character.assets?.[expression];
    if (!source) {
      console.warn("[천류관] 표정 리소스 없음:", command.id, expression);
      return false;
    }

    image.onload = () => image.classList.add("visible");
    image.onerror = () => console.warn("[천류관] 캐릭터 로딩 실패:", source);
    image.src = source;
    image.alt = character.name;
    image.dataset.characterId = command.id;
    image.dataset.expression = expression;
    image.dataset.src = source;
    image.classList.remove("enter-left", "enter-right", "fade-in");
    image.classList.add("visible");
    if (command.animation === "slide-left") image.classList.add("enter-left");
    if (command.animation === "slide-right") image.classList.add("enter-right");
    if (command.animation === "fade") image.classList.add("fade-in");
    image.classList.toggle("speaker-active", Boolean(command.speaking));
    image.classList.toggle("speaker-dim", command.speaking === false);
    this.active[position] = command.id;
    return true;
  }

  showMany(commands = []) {
    const used = new Set();
    commands.forEach((command) => {
      used.add(command.position || "center");
      this.show(command);
    });
    this.positions
      .filter((position) => !used.has(position))
      .forEach((position) => this.hide(position));
  }

  emphasize(characterId) {
    this.positions.forEach((position) => {
      const image = this.getImage(position);
      if (!image?.classList.contains("visible")) return;
      const isSpeaker = image.dataset.characterId === characterId;
      image.classList.toggle("speaker-active", isSpeaker);
      image.classList.toggle("speaker-dim", !isSpeaker);
    });
  }

  move(from, to) {
    const sourceImage = this.getImage(from);
    const targetImage = this.getImage(to);
    if (!sourceImage || !targetImage || !sourceImage.src) return false;

    targetImage.src = sourceImage.src;
    targetImage.alt = sourceImage.alt;
    targetImage.dataset.characterId = sourceImage.dataset.characterId;
    targetImage.dataset.expression = sourceImage.dataset.expression;
    targetImage.className = sourceImage.className;
    targetImage.classList.add("visible");
    this.active[to] = this.active[from];
    this.hide(from);
    return true;
  }

  showBattle(characterId, action, position = "center") {
    const character = this.manifest?.[characterId];
    const source = character?.battleAssets?.[action];
    if (!source) {
      console.warn("[천류관] 전투 리소스 없음:", characterId, action);
      return false;
    }

    const image = this.getImage(position);
    if (!image) return false;

    image.src = source;
    image.alt = character.name;
    image.dataset.characterId = characterId;
    image.dataset.expression = action;
    image.classList.add("visible", "battle-pose", "speaker-active");
    this.active[position] = characterId;
    return true;
  }
}
