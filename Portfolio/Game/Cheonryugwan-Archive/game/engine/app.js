import {
  $, $$, loadJson, bindClick, setRuntimeStatus
} from "./modules/core.js";
import {
  STORAGE_KEYS, migrateLegacyStorage, loadValue, saveValue,
  exportAllSaveData, importAllSaveData
} from "./modules/storage-manager.js";
import { AudioManager } from "./modules/audio-manager.js";
import { CharacterManager } from "./modules/character-manager.js";
import { ChapterManager } from "./modules/chapter-manager.js";
import { DebugManager } from "./modules/debug-manager.js";
import { SceneManager } from "./modules/scene-manager.js";
import { BackgroundManager } from "./modules/background-manager.js";
import { EffectManager } from "./modules/effect-manager.js";
import { SaveManager } from "./modules/save-manager.js";
import { ConditionManager } from "./modules/condition-manager.js";
import { CommandExecutor } from "./modules/command-executor.js";
import { ReadingManager } from "./modules/reading-manager.js";
import { SceneCGManager } from "./modules/scene-cg-manager.js";

const PATHS = {
  chapters: "./data/chapters.json",
  characters: "./data/system/characters.json",
  backgrounds: "./data/system/backgrounds.json",
  audio: "./data/system/audio.json",
  sceneCg: "./data/system/scene-cg.json"
};

const runtime = {
  chapterManager: null,
  sceneManager: null,
  characterManager: null,
  backgroundManager: null,
  effectManager: null,
  audioManager: null,
  saveManager: null,
  conditionManager: null,
  commandExecutor: null,
  sceneCgManager: null,
  readingManager: null,
  debug: new DebugManager(),
  log: [],
  typing: false,
  fullText: "",
  typeTimer: null,
  autoTimer: null,
  skipTimer: null,
  settings: {
    textSpeed: 24,
    volume: 55,
    rain: true,
    muted: false
  }
};

const titleScreen = $("#title-screen");
const novelScreen = $("#novel-screen");
const dialogue = $("#dialogue");
const speaker = $("#speaker");
const choicePanel = $("#choice-panel");

function showScreen(name) {
  titleScreen?.classList.toggle("active", name === "title");
  novelScreen?.classList.toggle("active", name === "novel");
}

function currentScene() {
  return runtime.sceneManager?.current() || null;
}

function stopTyping(showFullText = true) {
  clearInterval(runtime.typeTimer);
  runtime.typeTimer = null;
  if (showFullText) dialogue.textContent = runtime.fullText;
  runtime.typing = false;
}

function typeText(text) {
  clearInterval(runtime.typeTimer);
  runtime.typing = true;
  runtime.fullText = text;
  dialogue.textContent = "";

  let index = 0;
  runtime.typeTimer = setInterval(() => {
    dialogue.textContent += text[index++] || "";
    if (index >= text.length) stopTyping(false);
  }, runtime.settings.textSpeed);
}

function saveExtra() {
  const scene = currentScene();
  return {
    chapterTitle: runtime.sceneManager.chapter?.title || "",
    sceneId: scene?.id || null,
    speaker: speaker?.textContent || "",
    text: dialogue?.textContent || ""
  };
}

function saveAuto() {
  runtime.saveManager?.autoSave(saveExtra());
}

function appendLog(scene) {
  const entry = {
    chapterId: runtime.sceneManager.chapterId,
    chapterTitle: runtime.sceneManager.chapter?.title || "",
    sceneId: scene.id,
    index: runtime.sceneManager.index,
    speaker: scene.speaker || "",
    text: scene.text || "",
    createdAt: new Date().toISOString()
  };
  runtime.log.push(entry);
  runtime.readingManager.pushBacklog(entry);
}

async function renderChoice(scene) {
  stopSkip();
  runtime.typing = false;
  speaker.style.display = "none";
  dialogue.textContent = "";
  choicePanel.innerHTML = `<h3>${scene.prompt || "선택"}</h3>`;

  for (const choice of scene.choices || []) {
    const button = document.createElement("button");
    button.textContent = choice.label;
    button.addEventListener("click", async () => {
      runtime.sceneManager.applySet(choice.set || {});
      choicePanel.classList.add("hidden");
      if (choice.next) runtime.sceneManager.jump(choice.next);
      await render();
    });
    choicePanel.appendChild(button);
  }
  choicePanel.classList.remove("hidden");
}

async function render() {
  const scene = currentScene();
  if (!scene) return;

  const commandResult = await runtime.commandExecutor.execute(scene);
  if (commandResult.jumped) return render();
  if (commandResult.skipped) {
    const nextScene = runtime.sceneManager.next();
    if (nextScene) return render();
    return finishChapter();
  }

  if (scene.speakerId) runtime.characterManager.emphasize(scene.speakerId);

  if (scene.type === "choice") {
    await renderChoice(scene);
    saveAuto();
    return;
  }

  speaker.textContent = scene.speaker || "";
  speaker.style.display = scene.speaker ? "block" : "none";
  typeText(scene.text || "");

  appendLog(scene);
  runtime.readingManager.markRead(runtime.sceneManager.chapterId, scene.id);
  saveAuto();
  runtime.debug.log(`장면 표시: ${scene.id}`);
}

async function next() {
  if (!choicePanel.classList.contains("hidden")) return;
  if (runtime.typing) return stopTyping(true);

  const scene = runtime.sceneManager.next();
  if (scene) return render();
  finishChapter();
}

function finishChapter() {
  stopAuto();
  stopSkip();
  showScreen("title");
  setRuntimeStatus("챕터 종료", "ok");
}

async function loadChapter(chapterId, startIndex = 0, restore = null) {
  await runtime.sceneManager.loadChapter(chapterId, startIndex);
  if (restore?.variables) runtime.sceneManager.variables = restore.variables;
  if (restore?.flags) runtime.sceneManager.flags = restore.flags;

  runtime.log = [];
  $("#chapter-title").textContent = runtime.sceneManager.chapter.title;
  choicePanel.classList.add("hidden");
  runtime.characterManager.hideAll();
  showScreen("novel");
  runtime.debug.log(`챕터 로드: ${chapterId}`);
  await render();
}

async function startNewGame() {
  await runtime.audioManager.ensureContext();
  const first = runtime.chapterManager.getFirstPlayable();
  if (!first) throw new Error("플레이 가능한 챕터가 없습니다.");
  await loadChapter(first.id);
}

async function continueGame() {
  await runtime.audioManager.ensureContext();
  const saved = runtime.saveManager.getAutoSave();
  if (!saved?.chapterId) return startNewGame();
  await loadChapter(saved.chapterId, saved.index || 0, saved);
}

function openChapterDialog() {
  const list = $("#chapter-list");
  list.innerHTML = "";

  for (const item of runtime.chapterManager.index.chapters) {
    const article = document.createElement("article");
    article.className = "chapter-item";
    article.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.part} · ${item.description}</p>
      <button ${item.status !== "playable" ? "disabled" : ""}>시작</button>
    `;
    article.querySelector("button").addEventListener("click", async () => {
      $("#chapter-dialog").close();
      await runtime.audioManager.ensureContext();
      await loadChapter(item.id);
    });
    list.appendChild(article);
  }
  $("#chapter-dialog").showModal();
}

function openSlots(mode) {
  const dialog = $("#save-dialog");
  $("#save-dialog-title").textContent = mode === "save" ? "저장" : "불러오기";
  const container = $("#save-slots");
  container.innerHTML = "";

  for (let index = 1; index <= 3; index += 1) {
    const data = runtime.saveManager.loadSlot(index);
    const row = document.createElement("article");
    row.className = "save-slot";
    row.innerHTML = `
      <div>
        <strong>슬롯 ${index}</strong>
        <p>${data?.chapterTitle || data?.chapterId || "빈 슬롯"}</p>
        <small>${data?.speaker ? `${data.speaker}: ` : ""}${data?.text || ""}</small>
      </div>
    `;

    const button = document.createElement("button");
    button.textContent = mode === "save" ? "저장" : "불러오기";
    button.disabled = mode === "load" && !data;
    button.addEventListener("click", async () => {
      if (mode === "save") {
        runtime.saveManager.saveSlot(index, saveExtra());
        openSlots("save");
      } else {
        dialog.close();
        await loadChapter(data.chapterId, data.index || 0, data);
      }
    });
    row.appendChild(button);
    container.appendChild(row);
  }
  dialog.showModal();
}

async function quickSave() {
  if (!runtime.sceneManager.chapter) return;
  runtime.saveManager.quickSave(saveExtra());
  setRuntimeStatus("퀵 저장 완료", "ok");
}

async function quickLoad() {
  const data = runtime.saveManager.quickLoad();
  if (!data?.chapterId) return setRuntimeStatus("퀵 저장 데이터 없음", "warn");
  await loadChapter(data.chapterId, data.index || 0, data);
  setRuntimeStatus("퀵 불러오기 완료", "ok");
}

function stopAuto() {
  clearInterval(runtime.autoTimer);
  runtime.autoTimer = null;
  const button = $("#auto-btn");
  if (button) button.textContent = "자동";
}

function toggleAuto() {
  if (runtime.autoTimer) return stopAuto();
  $("#auto-btn").textContent = "자동 중지";
  runtime.autoTimer = setInterval(() => {
    if (!runtime.typing) next();
  }, 2800);
}

function stopSkip() {
  clearInterval(runtime.skipTimer);
  runtime.skipTimer = null;
  const button = $("#skip-btn");
  if (button) button.textContent = "읽은 대사 건너뛰기";
}

function toggleSkip() {
  if (runtime.skipTimer) return stopSkip();
  $("#skip-btn").textContent = "건너뛰기 중지";

  runtime.skipTimer = setInterval(() => {
    const scene = currentScene();
    if (!scene || scene.type === "choice") return stopSkip();
    if (!runtime.readingManager.isRead(runtime.sceneManager.chapterId, scene.id)) {
      return stopSkip();
    }
    if (runtime.typing) stopTyping(true);
    next();
  }, 140);
}

function openBacklog() {
  const list = $("#log-list");
  list.innerHTML = "";

  const entries = runtime.readingManager.getBacklog().slice(-100).reverse();
  for (const entry of entries) {
    const row = document.createElement("article");
    row.className = "log-item";
    row.innerHTML = `
      <strong>${entry.speaker || ""}</strong>
      <span>${entry.text || ""}</span>
      <button>이 장면으로</button>
    `;
    row.querySelector("button").addEventListener("click", async () => {
      $("#log-dialog").close();
      await loadChapter(entry.chapterId, entry.index || 0);
    });
    list.appendChild(row);
  }
  $("#log-dialog").showModal();
}

function openAutoHistory() {
  const list = $("#auto-history-list");
  list.innerHTML = "";

  const history = runtime.readingManager.getAutoHistory();
  if (!history.length) {
    list.innerHTML = "<p>자동 저장 이력이 없습니다.</p>";
  }

  for (const item of history) {
    const row = document.createElement("article");
    row.className = "history-item";
    row.innerHTML = `
      <div>
        <strong>${item.chapterTitle || item.chapterId}</strong>
        <p>${item.speaker ? `${item.speaker}: ` : ""}${item.text || ""}</p>
        <small>${item.savedAt || ""}</small>
      </div>
      <button>불러오기</button>
    `;
    row.querySelector("button").addEventListener("click", async () => {
      $("#auto-history-dialog").close();
      await loadChapter(item.chapterId, item.index || 0, item);
    });
    list.appendChild(row);
  }
  $("#auto-history-dialog").showModal();
}

function exportSaveFile() {
  const payload = exportAllSaveData();
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `cheonryugwan-save-${new Date().toISOString().slice(0,10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  setRuntimeStatus("저장 데이터 내보내기 완료", "ok");
}

function importSaveFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const count = importAllSaveData(JSON.parse(reader.result));
      setRuntimeStatus(`저장 데이터 ${count}개 가져오기 완료`, "ok");
    } catch (error) {
      console.error(error);
      setRuntimeStatus("저장 데이터 가져오기 실패", "warn");
    }
  };
  reader.readAsText(file, "utf-8");
}

function loadSettings() {
  runtime.settings = {
    ...runtime.settings,
    ...loadValue(STORAGE_KEYS.settings, {})
  };
  $("#text-speed").value = runtime.settings.textSpeed;
  $("#master-volume").value = runtime.settings.volume;
  $("#rain-toggle").checked = runtime.settings.rain;
  runtime.audioManager.setVolume(runtime.settings.volume);
  runtime.audioManager.setMuted(runtime.settings.muted);
}

function saveSettings() {
  runtime.settings.textSpeed = Number($("#text-speed").value);
  runtime.settings.volume = Number($("#master-volume").value);
  runtime.settings.rain = $("#rain-toggle").checked;
  saveValue(STORAGE_KEYS.settings, runtime.settings);
  runtime.audioManager.setVolume(runtime.settings.volume);
  runtime.audioManager.setMuted(runtime.settings.muted);
  if (!runtime.settings.rain) runtime.audioManager.stopAmbient();
}


async function autoStartFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter");
  if (!chapterId) return false;

  const playable = runtime.chapterManager.index.chapters.some(
    (item) => item.id === chapterId && item.status === "playable"
  );
  if (!playable) {
    setRuntimeStatus("요청한 챕터를 찾을 수 없습니다.", "warn");
    return false;
  }

  await runtime.audioManager.ensureContext();
  await loadChapter(chapterId);
  return true;
}

async function initialize() {
  try {
    setRuntimeStatus("엔진 초기화 중");
    const migration = migrateLegacyStorage();
    runtime.debug.log("저장 데이터 마이그레이션", migration);

    const [characters, backgrounds, audioManifest, sceneCgManifest] = await Promise.all([
      loadJson(PATHS.characters),
      loadJson(PATHS.backgrounds),
      loadJson(PATHS.audio),
      loadJson(PATHS.sceneCg)
    ]);

    runtime.chapterManager = new ChapterManager(PATHS.chapters);
    await runtime.chapterManager.loadIndex();

    runtime.sceneManager = new SceneManager(runtime.chapterManager);
    runtime.characterManager = new CharacterManager(characters);
    runtime.backgroundManager = new BackgroundManager(backgrounds);
    runtime.sceneCgManager = new SceneCGManager(sceneCgManifest);
    runtime.effectManager = new EffectManager("#stage");
    runtime.audioManager = new AudioManager(audioManifest);
    runtime.readingManager = new ReadingManager(30);
    runtime.saveManager = new SaveManager(runtime.sceneManager, runtime.readingManager);
    runtime.conditionManager = new ConditionManager(runtime.sceneManager);
    runtime.commandExecutor = new CommandExecutor({
      sceneManager: runtime.sceneManager,
      conditionManager: runtime.conditionManager,
      characterManager: runtime.characterManager,
      backgroundManager: runtime.backgroundManager,
      effectManager: runtime.effectManager,
      audioManager: runtime.audioManager,
      sceneCgManager: runtime.sceneCgManager,
      debugManager: runtime.debug
    });

    runtime.debug.setStateProvider(() => ({
      chapterId: runtime.sceneManager.chapterId,
      sceneId: currentScene()?.id || null,
      index: runtime.sceneManager.index,
      variables: runtime.sceneManager.variables,
      flags: runtime.sceneManager.flags,
      backgroundId: runtime.backgroundManager.currentId,
      characterId: Object.values(runtime.characterManager.active).join(", ")
    }));

    loadSettings();

    bindClick("#new-game", startNewGame);
    bindClick("#continue-game", continueGame);
    bindClick("#chapter-select-btn", openChapterDialog);
    bindClick("#title-load", () => openSlots("load"));
    bindClick("#title-settings", () => $("#settings-dialog").showModal());
    bindClick("#back-title", () => finishChapter());
    bindClick("#save-btn", () => openSlots("save"));
    bindClick("#load-btn", () => openSlots("load"));
    bindClick("#settings-btn", () => $("#settings-dialog").showModal());
    bindClick("#quick-save-btn", quickSave);
    bindClick("#quick-load-btn", quickLoad);
    bindClick("#auto-history-btn", openAutoHistory);
    bindClick("#skip-btn", toggleSkip);
    bindClick("#auto-btn", toggleAuto);
    bindClick("#log-btn", openBacklog);
    bindClick("#debug-btn", () => {
      runtime.debug.render();
      $("#debug-dialog").showModal();
    });
    bindClick("#mute-btn", () => {
      runtime.settings.muted = !runtime.settings.muted;
      runtime.audioManager.setMuted(runtime.settings.muted);
      $("#mute-btn").textContent = runtime.settings.muted ? "🔇" : "🔊";
      saveValue(STORAGE_KEYS.settings, runtime.settings);
    });
    bindClick("#sound-test-btn", async () => {
      await runtime.audioManager.ensureContext();
      await runtime.audioManager.playSfx("thunder");
      if (runtime.settings.rain) {
        await runtime.audioManager.crossfadeAmbient("rain");
      }
    });
    bindClick("#export-save-btn", exportSaveFile);
    bindClick("#import-save-btn", () => $("#import-save-file").click());

    $("#import-save-file")?.addEventListener("change", (event) => {
      importSaveFile(event.target.files?.[0]);
      event.target.value = "";
    });

    $("#dialogue-box")?.addEventListener("click", next);
    $("#dialogue-box")?.addEventListener("keydown", (event) => {
      if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        next();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "F1") {
        event.preventDefault();
        runtime.debug.render();
        $("#debug-dialog").showModal();
      } else if (event.key === "F9") {
        event.preventDefault();
        quickLoad();
      } else if (event.ctrlKey && event.key === "F5") {
        event.preventDefault();
        quickSave();
      } else if (novelScreen?.classList.contains("active") &&
                 ["Enter", "ArrowRight"].includes(event.key)) {
        next();
      }
    });

    $$("[data-close]").forEach((button) => {
      button.addEventListener("click", () => $(`#${button.dataset.close}`)?.close());
    });

    $("#text-speed")?.addEventListener("input", saveSettings);
    $("#master-volume")?.addEventListener("input", saveSettings);
    $("#rain-toggle")?.addEventListener("change", saveSettings);

    document.documentElement.dataset.gameReady = "v0.9.8.5";
    setRuntimeStatus("엔진 준비 완료", "ok");
    runtime.debug.log("엔진 초기화 완료");
    await autoStartFromUrl();
  } catch (error) {
    console.error(error);
    setRuntimeStatus("엔진 초기화 실패", "warn");
    runtime.debug.log("엔진 초기화 실패", String(error), "error");
  }
}

document.addEventListener("DOMContentLoaded", initialize);
