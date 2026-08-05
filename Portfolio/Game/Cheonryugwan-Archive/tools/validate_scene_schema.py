from __future__ import annotations

import json
import sys
from pathlib import Path


def validate_chapter(data: dict, path: Path) -> list[str]:
    errors: list[str] = []

    for key in ("id", "title", "scenes"):
        if key not in data:
            errors.append(f"{path}: missing root field '{key}'")

    scenes = data.get("scenes")
    if not isinstance(scenes, list) or not scenes:
        errors.append(f"{path}: scenes must be a non-empty list")
        return errors

    ids: set[str] = set()
    for index, scene in enumerate(scenes):
        prefix = f"{path}: scenes[{index}]"
        scene_id = scene.get("id")
        if not scene_id:
            errors.append(f"{prefix}: missing id")
        elif scene_id in ids:
            errors.append(f"{prefix}: duplicate id '{scene_id}'")
        else:
            ids.add(scene_id)

        if "characters" in scene and not isinstance(scene["characters"], list):
            errors.append(f"{prefix}: characters must be an array")

        hide_commands = scene.get("hideCharacters", [])
        if not isinstance(hide_commands, list):
            errors.append(f"{prefix}: hideCharacters must be an array")
        else:
            for item in hide_commands:
                if isinstance(item, dict) and "position" not in item:
                    errors.append(f"{prefix}: hideCharacters object requires position")

        if "wait" in scene and (
            not isinstance(scene["wait"], int) or scene["wait"] < 0
        ):
            errors.append(f"{prefix}: wait must be a non-negative integer")

        condition = scene.get("if")
        if condition and "key" not in condition:
            errors.append(f"{prefix}: if.key is required")

    for index, scene in enumerate(scenes):
        for key in ("jump", "elseJump"):
            target = scene.get(key)
            if target and target not in ids:
                errors.append(
                    f"{path}: scenes[{index}].{key} target '{target}' does not exist"
                )

    return errors


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    paths = list((root / "game/data").rglob("*.json"))
    chapter_paths = []

    for path in paths:
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data, dict) and isinstance(data.get("scenes"), list):
            chapter_paths.append(path)

    errors: list[str] = []
    for path in chapter_paths:
        data = json.loads(path.read_text(encoding="utf-8"))
        errors.extend(validate_chapter(data, path))

    if errors:
        print("\n".join(errors))
        return 1

    print(f"PASS: {len(chapter_paths)} chapter files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
