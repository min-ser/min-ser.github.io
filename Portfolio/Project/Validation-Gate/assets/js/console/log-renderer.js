
window.ValidationLogRenderer = class ValidationLogRenderer {
  constructor(container, options = {}) {
    if (!container) throw new Error("Console container is required.");
    this.container = container;
    this.autoScroll = options.autoScroll !== false;
    this.filter = new ValidationLogFilter();
    this.allLogs = [];
  }

  levelClass(level) {
    return `log-${String(level).toLowerCase()}`;
  }

  append(log) {
    this.allLogs.push(log);
    if (!this.filter.accepts(log)) return;
    this.container.appendChild(this.createLine(log));
    if (this.autoScroll) this.container.scrollTop = this.container.scrollHeight;
  }

  createLine(log) {
    const line = document.createElement("div");
    line.className = `log-line ${this.levelClass(log.level)}`;
    line.textContent =
      `${ValidationUtils.formatTime(log.timestamp)} [${log.level.padEnd(5)}] [${log.stage.padEnd(10)}] ${log.message}`;
    return line;
  }

  clear() {
    this.allLogs = [];
    this.container.innerHTML = "";
  }

  render() {
    this.container.innerHTML = "";
    this.allLogs.filter(log => this.filter.accepts(log)).forEach(log => {
      this.container.appendChild(this.createLine(log));
    });
    if (this.autoScroll) this.container.scrollTop = this.container.scrollHeight;
  }

  setFilter(level) {
    this.filter.setLevel(level);
    this.render();
  }

  setAutoScroll(enabled) {
    this.autoScroll = Boolean(enabled);
  }
};
