
window.ValidationUtils = (() => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function formatTime(date = new Date()) {
    const hms = date.toLocaleTimeString("ko-KR", { hour12: false });
    return `${hms}.${String(date.getMilliseconds()).padStart(3, "0")}`;
  }

  function formatJSON(value) {
    try { return JSON.stringify(value, null, 2); }
    catch { return String(value); }
  }

  function maskSecret(value, visible = 4) {
    const text = String(value ?? "");
    if (text.length <= visible * 2) return "*".repeat(text.length);
    return text.slice(0, visible) + "*".repeat(Math.max(8, text.length - visible * 2)) + text.slice(-visible);
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  }

  function downloadText(filename, text, mime = "text/plain") {
    const blob = new Blob([text], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function demoGuid(seed = 0) {
    const values = [
      "8f91a2c8-4b3e-4d60-9a17-12e9087f4d21",
      "65d6b941-1f80-41bc-a8bb-30a4c91e27df",
      "f098ce52-e2f0-4d30-9fa8-5a807c00de01"
    ];
    return values[seed % values.length];
  }

  return { sleep, formatTime, formatJSON, maskSecret, copyText, downloadText, demoGuid };
})();
