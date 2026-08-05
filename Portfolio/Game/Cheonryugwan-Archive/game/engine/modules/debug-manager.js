export class DebugManager {
  constructor() {
    this.entries = [];
    this.stateProvider = null;
  }

  setStateProvider(provider) {
    this.stateProvider = provider;
  }

  log(message, data = null, level = "info") {
    const entry = {
      time: new Date().toISOString(),
      message,
      data,
      level
    };
    this.entries.push(entry);
    console[level === "error" ? "error" : level === "warn" ? "warn" : "info"](
      `[천류관] ${message}`,
      data ?? ""
    );
    this.render();
  }

  render() {
    const list = document.querySelector("#debug-list");
    if (!list) return;

    const state = this.stateProvider?.() || {};
    const summary = `
      <li class="debug-state">
        <strong>Scene</strong> ${state.sceneId || "-"} ·
        <strong>Chapter</strong> ${state.chapterId || "-"} ·
        <strong>Index</strong> ${state.index ?? "-"}<br>
        <strong>Background</strong> ${state.backgroundId || "-"} ·
        <strong>Character</strong> ${state.characterId || "-"}<br>
        <strong>Variables</strong> ${JSON.stringify(state.variables || {})}<br>
        <strong>Flags</strong> ${JSON.stringify(state.flags || {})}
      </li>
    `;

    list.innerHTML = summary + this.entries
      .slice(-40)
      .map((entry) =>
        `<li class="${entry.level}">
          <time>${entry.time.slice(11,19)}</time> ${entry.message}
        </li>`
      )
      .join("");
  }
}
