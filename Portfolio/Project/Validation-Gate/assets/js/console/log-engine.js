
window.ValidationLogEngine = class ValidationLogEngine {
  constructor(options = {}) {
    this.logs = [];
    this.running = false;
    this.defaultDelay = options.defaultDelay ?? 160;
    this.onLog = options.onLog || (() => {});
    this.onState = options.onState || (() => {});
  }

  clear() {
    this.logs = [];
    this.onState({ type: "clear" });
  }

  stop() {
    this.running = false;
    this.onState({ type: "stop" });
  }

  async play(sequence = []) {
    this.stop();
    this.running = true;
    this.onState({ type: "start", total: sequence.length });

    for (const item of sequence) {
      if (!this.running) break;
      await ValidationUtils.sleep(item.delay ?? this.defaultDelay);
      const log = {
        timestamp: new Date(),
        level: String(item.level || "INFO").toUpperCase(),
        stage: String(item.stage || "SYSTEM").toUpperCase(),
        message: String(item.message || "")
      };
      this.logs.push(log);
      this.onLog(log, this.logs.length - 1);
    }

    const completed = this.running;
    this.running = false;
    this.onState({ type: completed ? "complete" : "cancelled", count: this.logs.length });
    return this.logs;
  }

  toText() {
    return this.logs.map(log =>
      `${ValidationUtils.formatTime(log.timestamp)} [${log.level.padEnd(5)}] [${log.stage.padEnd(10)}] ${log.message}`
    ).join("\n");
  }
};
