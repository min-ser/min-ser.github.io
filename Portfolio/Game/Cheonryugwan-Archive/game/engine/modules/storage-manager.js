const PREFIX = "cheonryugwan-v094";
const MIGRATION_VERSION = 4;

export const STORAGE_KEYS = {
  auto: `${PREFIX}-auto`,
  settings: `${PREFIX}-settings`,
  quick: `${PREFIX}-quick`,
  slot: (index) => `${PREFIX}-slot-${index}`,
  migration: `${PREFIX}-migration`,
  readScenes: `${PREFIX}-read-scenes`,
  autoHistory: `${PREFIX}-auto-history`,
  backlog: `${PREFIX}-backlog`
};

export const KEYS = STORAGE_KEYS;

function safeParse(value, fallback = null) {
  try { return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}

export function loadValue(key, fallback = null) {
  return safeParse(localStorage.getItem(key), fallback);
}

export function saveValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const load = loadValue;
export const save = saveValue;

export function migrateLegacyStorage() {
  const complete = loadValue(STORAGE_KEYS.migration, null);
  if (complete?.version === MIGRATION_VERSION) return complete;

  const sourcePrefixes = [
    "cheonryugwan-v060",
    "cheonryugwan-v090"
  ];
  const migrated = [];

  for (const oldPrefix of sourcePrefixes) {
    const mappings = [
      [`${oldPrefix}-auto`, STORAGE_KEYS.auto],
      [`${oldPrefix}-settings`, STORAGE_KEYS.settings],
      [`${oldPrefix}-quick`, STORAGE_KEYS.quick],
    ];
    for (let index = 1; index <= 3; index += 1) {
      mappings.push([`${oldPrefix}-slot-${index}`, STORAGE_KEYS.slot(index)]);
    }

    for (const [oldKey, nextKey] of mappings) {
      if (!localStorage.getItem(nextKey) && localStorage.getItem(oldKey)) {
        localStorage.setItem(nextKey, localStorage.getItem(oldKey));
        migrated.push(oldKey);
      }
    }
  }

  const result = {
    version: MIGRATION_VERSION,
    migrated,
    migratedAt: new Date().toISOString()
  };
  saveValue(STORAGE_KEYS.migration, result);
  return result;
}

export const migrateLegacy = migrateLegacyStorage;

export function exportAllSaveData() {
  const result = {
    format: "cheonryugwan-save-export",
    version: MIGRATION_VERSION,
    exportedAt: new Date().toISOString(),
    data: {}
  };

  Object.keys(localStorage)
    .filter((key) => key.startsWith("cheonryugwan-"))
    .sort()
    .forEach((key) => {
      result.data[key] = localStorage.getItem(key);
    });

  return result;
}

export function importAllSaveData(payload) {
  if (payload?.format !== "cheonryugwan-save-export" || !payload.data) {
    throw new Error("지원하지 않는 저장 데이터 형식입니다.");
  }

  let count = 0;
  for (const [key, value] of Object.entries(payload.data)) {
    if (!key.startsWith("cheonryugwan-") || typeof value !== "string") continue;
    localStorage.setItem(key, value);
    count += 1;
  }
  return count;
}
