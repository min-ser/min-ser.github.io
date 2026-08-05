export class ConditionManager {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
  }

  resolveValue(source, key) {
    if (source === "flag") return this.sceneManager.flags?.[key];
    return this.sceneManager.variables?.[key];
  }

  evaluate(condition) {
    if (!condition) return true;

    const source = condition.source || "variable";
    const actual = this.resolveValue(source, condition.key);
    const expected = condition.value;

    switch (condition.operator || "eq") {
      case "eq": return actual === expected;
      case "neq": return actual !== expected;
      case "gt": return Number(actual) > Number(expected);
      case "gte": return Number(actual) >= Number(expected);
      case "lt": return Number(actual) < Number(expected);
      case "lte": return Number(actual) <= Number(expected);
      case "truthy": return Boolean(actual);
      case "falsy": return !actual;
      case "includes":
        return Array.isArray(actual)
          ? actual.includes(expected)
          : String(actual ?? "").includes(String(expected));
      default:
        console.warn("[천류관] 알 수 없는 조건 연산자:", condition.operator);
        return false;
    }
  }
}
