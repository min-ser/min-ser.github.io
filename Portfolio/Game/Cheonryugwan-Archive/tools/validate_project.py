from pathlib import Path
import json,subprocess,sys
R=Path(__file__).resolve().parents[1]
for p in (R/"game").rglob("*.json"):json.loads(p.read_text(encoding="utf-8"))
for p in (R/"game/engine").rglob("*.js"):
 r=subprocess.run(["node","--check",str(p)],capture_output=True,text=True)
 assert r.returncode==0,(p,r.stderr)
print("PASS")


# v0.9.1 module and story-pipeline checks
extra_required = [
    R / "game/engine/modules/scene-manager.js",
    R / "game/engine/modules/background-manager.js",
    R / "game/engine/modules/effect-manager.js",
    R / "game/engine/modules/save-manager.js",
    R / "tools/story_compiler.py",
    R / "game/data/compiled/seo-harin-markdown-test.json",
]
for path in extra_required:
    if not path.exists():
        raise SystemExit(f"Missing v0.9.1 file: {path}")

compiled = json.loads(
    (R / "game/data/compiled/seo-harin-markdown-test.json").read_text(encoding="utf-8")
)
if not compiled.get("scenes"):
    raise SystemExit("Compiled story has no scenes")

print("PASS: v0.9.1 modules")
print("PASS: story compiler output")


# v0.9.2 scene command checks
v092_required = [
    R / "game/engine/modules/condition-manager.js",
    R / "game/engine/modules/command-executor.js",
    R / "game/schema/chapter.schema.json",
    R / "tools/validate_scene_schema.py",
    R / "game/data/compiled/condition-multi-character-test.json",
]
for path in v092_required:
    if not path.exists():
        raise SystemExit(f"Missing v0.9.2 file: {path}")

schema_check = subprocess.run(
    [sys.executable, str(R / "tools/validate_scene_schema.py")],
    capture_output=True,
    text=True,
)
if schema_check.returncode:
    print(schema_check.stdout)
    print(schema_check.stderr)
    raise SystemExit("Scene schema validation failed")

print("PASS: v0.9.2 scene commands")
print(schema_check.stdout.strip())


# v0.9.3 save/playback checks
v093_required = [
    R / "game/engine/modules/reading-manager.js",
    R / "game/data/compiled/character-animation-test.json",
]
for path in v093_required:
    if not path.exists():
        raise SystemExit(f"Missing v0.9.3 file: {path}")

print("PASS: v0.9.3 save/playback files")


# v0.9.4 quality-gate checks
v094_required = [
    R / "tools/validate_resources.py",
    R / "tests/e2e/smoke.spec.js",
    R / "playwright.config.js",
    R / ".github/workflows/quality-gate.yml",
    R / "pages/backgrounds/index.html",
    R / "pages/sounds/index.html",
]
for path in v094_required:
    if not path.exists():
        raise SystemExit(f"Missing v0.9.4 file: {path}")

resource_check = subprocess.run(
    [sys.executable, str(R / "tools/validate_resources.py")],
    capture_output=True,
    text=True,
)
if resource_check.returncode:
    print(resource_check.stdout)
    print(resource_check.stderr)
    raise SystemExit("Resource validation failed")

print("PASS: v0.9.4 quality gate")
print(resource_check.stdout.strip())
