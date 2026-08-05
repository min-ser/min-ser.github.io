import { loadJson } from "./core.js";

export class ChapterManager {
  constructor(indexPath) {
    this.indexPath = indexPath;
    this.index = null;
  }

  async loadIndex() {
    this.index = await loadJson(this.indexPath);
    return this.index;
  }

  async init() {
    return this.loadIndex();
  }

  async loadChapter(chapterId) {
    if (!this.index) await this.loadIndex();
    const chapter = this.index.chapters.find((item) => item.id === chapterId);
    if (!chapter) throw new Error(`Chapter not found: ${chapterId}`);
    return loadJson(chapter.path);
  }

  async load(chapterId) {
    return this.loadChapter(chapterId);
  }

  getFirstPlayable() {
    return this.index?.chapters?.find((item) => item.status === "playable") || null;
  }

  first() {
    return this.getFirstPlayable();
  }
}
