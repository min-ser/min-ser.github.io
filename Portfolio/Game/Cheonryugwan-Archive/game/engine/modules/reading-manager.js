import { STORAGE_KEYS, loadValue, saveValue } from "./storage-manager.js";

export class ReadingManager {
  constructor(limit = 30) {
    this.limit = limit;
    this.readScenes = new Set(loadValue(STORAGE_KEYS.readScenes, []));
    this.autoHistory = loadValue(STORAGE_KEYS.autoHistory, []);
    this.backlog = loadValue(STORAGE_KEYS.backlog, []);
  }

  markRead(chapterId, sceneId) {
    if (!chapterId || !sceneId) return;
    this.readScenes.add(`${chapterId}:${sceneId}`);
    saveValue(STORAGE_KEYS.readScenes, [...this.readScenes]);
  }

  isRead(chapterId, sceneId) {
    return this.readScenes.has(`${chapterId}:${sceneId}`);
  }

  pushAutoSave(payload) {
    if (!payload) return;
    this.autoHistory.unshift(payload);
    this.autoHistory = this.autoHistory.slice(0, this.limit);
    saveValue(STORAGE_KEYS.autoHistory, this.autoHistory);
  }

  getAutoHistory() {
    return [...this.autoHistory];
  }

  pushBacklog(entry) {
    this.backlog.push(entry);
    this.backlog = this.backlog.slice(-300);
    saveValue(STORAGE_KEYS.backlog, this.backlog);
  }

  getBacklog() {
    return [...this.backlog];
  }
}
