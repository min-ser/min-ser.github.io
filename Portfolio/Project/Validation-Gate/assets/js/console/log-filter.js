
window.ValidationLogFilter = class ValidationLogFilter {
  constructor() {
    this.level = "ALL";
  }
  setLevel(level) { this.level = String(level || "ALL").toUpperCase(); }
  accepts(log) { return this.level === "ALL" || log.level === this.level; }
};
