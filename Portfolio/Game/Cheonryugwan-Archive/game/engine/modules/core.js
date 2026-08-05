export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return response.json();
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function bindClick(selector, handler) {
  const element = $(selector);
  if (!element) {
    console.warn("[천류관] 요소 없음:", selector);
    return false;
  }
  element.addEventListener("click", handler);
  return true;
}

export function setRuntimeStatus(text, type = "") {
  const element = $("#runtime-status");
  if (!element) return;
  element.textContent = text;
  element.className = `runtime-status ${type}`.trim();
}

export const status = setRuntimeStatus;
