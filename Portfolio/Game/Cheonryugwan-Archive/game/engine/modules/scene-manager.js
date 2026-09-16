import { loadJson } from "./core.js";

export class SceneManager {
  constructor(chapterManager) {
    this.chapterManager = chapterManager;
    this.chapter = null;
    this.chapterId = null;
    this.index = 0;
    this.variables = {};
    this.flags = {};
  }

  async loadChapter(chapterId, startIndex = 0) {
    this.chapterId = chapterId;
    this.chapter = await this.chapterManager.loadChapter(chapterId);
    this.index = Math.max(0, Math.min(startIndex, this.chapter.scenes.length - 1));
    this.variables = {};
    this.flags = {};
    return this.current();
  }

  current() {
    return this.chapter?.scenes?.[this.index] || null;
  }

  next() {
    if (!this.chapter || this.index >= this.chapter.scenes.length - 1) return null;
    this.index += 1;
    return this.current();
  }

  jump(sceneId) {
    const target = this.chapter?.scenes?.findIndex((scene) => scene.id === sceneId) ?? -1;
    if (target < 0) throw new Error(`Scene not found: ${sceneId}`);
    this.index = target;
    return this.current();
  }

  applySet(values = {}) {
    this.variables = { ...this.variables, ...values };
  }

  applyFlag(name, value = true) {
    this.flags[name] = value;
  }

  snapshot() {
    return {
      chapterId: this.chapterId,
      index: this.index,
      variables: this.variables,
      flags: this.flags,
      sceneId: this.current()?.id || null
    };
  }
}
