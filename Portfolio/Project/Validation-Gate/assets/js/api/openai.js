window.OpenAIDemoApi = (() => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function checkConnection(mode, payload) {
    await sleep(420);
    return {
      success: true,
      authentication: mode === "key" ? "ACCESS_KEY" : "WORKLOAD_IDENTITY",
      endpoint: payload.endpoint,
      deployment: payload.deployment,
      apiVersion: payload.apiVersion,
      token: mode === "workload" ? "DEMO_SIGNATURE_NOT_VALID" : undefined,
      demoMode: true
    };
  }
  async function chat(payload) {
    await sleep(720);
    const text = payload.message.trim();
    return {
      id: "chatcmpl-kms-demo-001",
      object: "chat.completion",
      created: Math.floor(Date.now()/1000),
      model: payload.deployment,
      choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: `정적 데모 응답입니다. 입력 메시지 “${text}”를 정상적으로 처리했습니다.` } }],
      usage: { prompt_tokens: Math.max(12, text.length), completion_tokens: 24, total_tokens: Math.max(36, text.length + 24) },
      demoMode: true
    };
  }
  async function embedding(payload) {
    await sleep(680);
    const text = payload.input.trim();
    const dimensions = Number(payload.dimensions || 32);
    let seed = 2166136261;
    for (const ch of text) { seed ^= ch.charCodeAt(0); seed = Math.imul(seed, 16777619) >>> 0; }
    const values = Array.from({length: dimensions}, (_, index) => {
      seed = (Math.imul(seed ^ (index + 1), 1664525) + 1013904223) >>> 0;
      return Number((((seed / 4294967295) * 2) - 1).toFixed(6));
    });
    return {
      object: "list",
      data: [{ object: "embedding", index: 0, embedding: values }],
      model: payload.deployment,
      usage: { prompt_tokens: Math.max(8, Math.ceil(text.length / 3)), total_tokens: Math.max(8, Math.ceil(text.length / 3)) },
      dimensions,
      encoding_format: payload.encodingFormat,
      demoMode: true
    };
  }
  return { checkConnection, chat, embedding };
})();
