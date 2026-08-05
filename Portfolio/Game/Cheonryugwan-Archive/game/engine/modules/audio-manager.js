import { clamp, setRuntimeStatus } from "./core.js";

function fade(audio, from, to, duration) {
  if (!audio) return Promise.resolve();
  const started = performance.now();

  return new Promise((resolve) => {
    function tick(now) {
      const ratio = Math.min(1, (now - started) / Math.max(1, duration));
      audio.volume = from + (to - from) * ratio;
      if (ratio < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

export class AudioManager {
  constructor(manifest) {
    this.manifest = manifest;
    this.context = null;
    this.masterGain = null;
    this.ambientAudio = null;
    this.bgmAudio = null;
    this.volume = 0.55;
    this.muted = false;
  }

  async ensureContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.applyVolume();
    }
    if (this.context.state === "suspended") await this.context.resume();
  }

  setVolume(percent) {
    this.volume = clamp(percent / 100, 0, 1);
    this.applyVolume();
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    this.applyVolume();
  }

  ambientTarget() {
    return this.muted ? 0 : this.volume * 0.55;
  }

  bgmTarget() {
    return this.muted ? 0 : this.volume * 0.65;
  }

  applyVolume() {
    const gain = this.muted ? 0 : this.volume;
    if (this.masterGain) this.masterGain.gain.value = gain;
    if (this.ambientAudio) this.ambientAudio.volume = this.ambientTarget();
    if (this.bgmAudio) this.bgmAudio.volume = this.bgmTarget();
  }

  async crossfadeAmbient(id, fadeMs = 700) {
    const item = this.manifest?.ambient?.[id];
    if (!item || item.status === "placeholder") return;

    const previous = this.ambientAudio;
    const next = new Audio(item.path);
    next.loop = Boolean(item.loop);
    next.volume = 0;
    this.ambientAudio = next;

    try {
      await next.play();
      await Promise.all([
        fade(next, 0, this.ambientTarget(), fadeMs),
        fade(previous, previous?.volume || 0, 0, fadeMs)
      ]);
      if (previous) {
        previous.pause();
        previous.currentTime = 0;
      }
      setRuntimeStatus(`${id} 환경음 재생 중`, "ok");
    } catch (error) {
      console.warn("[천류관] 환경음 재생 실패:", error);
    }
  }

  async crossfadeBgm(id, fadeMs = 900) {
    const item = this.manifest?.bgm?.[id];
    if (!item || item.status === "placeholder") {
      console.info("[천류관] BGM placeholder:", id);
      return;
    }

    const previous = this.bgmAudio;
    const next = new Audio(item.path);
    next.loop = item.loop !== false;
    next.volume = 0;
    this.bgmAudio = next;

    try {
      await next.play();
      await Promise.all([
        fade(next, 0, this.bgmTarget(), fadeMs),
        fade(previous, previous?.volume || 0, 0, fadeMs)
      ]);
      if (previous) {
        previous.pause();
        previous.currentTime = 0;
      }
    } catch (error) {
      console.warn("[천류관] BGM 재생 실패:", error);
    }
  }

  async stopAmbient(fadeMs = 500) {
    const audio = this.ambientAudio;
    if (!audio) return;
    await fade(audio, audio.volume, 0, fadeMs);
    audio.pause();
    audio.currentTime = 0;
    if (this.ambientAudio === audio) this.ambientAudio = null;
  }

  async stopBgm(fadeMs = 500) {
    const audio = this.bgmAudio;
    if (!audio) return;
    await fade(audio, audio.volume, 0, fadeMs);
    audio.pause();
    audio.currentTime = 0;
    if (this.bgmAudio === audio) this.bgmAudio = null;
  }

  async playSfx(id) {
    if (this.muted) return;
    const path = this.manifest?.sfx?.[id];
    if (!path) return;

    await this.ensureContext();
    const response = await fetch(path, { cache: "no-store" });
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await this.context.decodeAudioData(arrayBuffer);
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.masterGain);
    source.start();
  }
}
