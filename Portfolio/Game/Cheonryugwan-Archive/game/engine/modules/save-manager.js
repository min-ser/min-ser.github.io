import { STORAGE_KEYS, loadValue, saveValue } from "./storage-manager.js";

export class SaveManager {
  constructor(sceneManager, readingManager = null) {
    this.sceneManager = sceneManager;
    this.readingManager = readingManager;
  }

  buildPayload(extra = {}) {
    return {
      saveVersion: 4,
      ...this.sceneManager.snapshot(),
      savedAt: new Date().toISOString(),
      ...extra
    };
  }

  autoSave(extra = {}) {
    const payload = this.buildPayload(extra);
    saveValue(STORAGE_KEYS.auto, payload);
    this.readingManager?.pushAutoSave(payload);
    return payload;
  }

  quickSave(extra = {}) {
    const payload = this.buildPayload(extra);
    saveValue(STORAGE_KEYS.quick, payload);
    return payload;
  }

  quickLoad() {
    return loadValue(STORAGE_KEYS.quick, null);
  }

  saveSlot(index, extra = {}) {
    const payload = this.buildPayload(extra);
    saveValue(STORAGE_KEYS.slot(index), payload);
    return payload;
  }

  loadSlot(index) {
    return loadValue(STORAGE_KEYS.slot(index), null);
  }

  getAutoSave() {
    return loadValue(STORAGE_KEYS.auto, null);
  }
}
