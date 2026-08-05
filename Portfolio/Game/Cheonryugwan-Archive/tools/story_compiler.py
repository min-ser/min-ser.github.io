from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


SPEAKER_PATTERN = re.compile(r"^\[(?P<speaker>[^\]]+)\]\s*(?P<text>.+)$")
def parse_value(value: str):
    lowered = value.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False
    if lowered == "null":
        return None
    try:
        if "." in value:
            return float(value)
        return int(value)
    except ValueError:
        return value.strip('"\'')


DIRECTIVE_PATTERN = re.compile(r"^@(?P<name>[a-zA-Z0-9_-]+)\s*(?P<value>.*)$")


def parse_markdown(text: str, chapter_id: str, title: str) -> dict:
    scenes: list[dict] = []
    pending: dict = {}
    counter = 1

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue

        directive = DIRECTIVE_PATTERN.match(line)
        if directive:
            name = directive.group("name")
            value = directive.group("value").strip()

            if name == "background":
                pending["background"] = value
            elif name == "transition":
                pending["transition"] = value
            elif name == "ambient":
                pending["ambient"] = value
            elif name == "bgm":
                pending["bgm"] = value
            elif name == "stop-bgm":
                pending["stopBgm"] = True
            elif name == "stop-ambient":
                pending["stopAmbient"] = True
            elif name == "sfx":
                pending["sfx"] = value
            elif name == "effect":
                pending["effect"] = value
            elif name == "wait":
                pending["wait"] = int(value)
            elif name == "jump":
                pending["jump"] = value
            elif name == "else-jump":
                pending["elseJump"] = value
            elif name == "set":
                key, raw_value = value.split("=", 1)
                pending.setdefault("set", {})[key.strip()] = parse_value(raw_value.strip())
            elif name == "flag":
                if "=" in value:
                    key, raw_value = value.split("=", 1)
                    pending["flag"] = {"name": key.strip(), "value": parse_value(raw_value.strip())}
                else:
                    pending["flag"] = {"name": value.strip(), "value": True}
            elif name == "if":
                source, key, operator, raw_value = value.split(maxsplit=3)
                pending["if"] = {
                    "source": source,
                    "key": key,
                    "operator": operator,
                    "value": parse_value(raw_value),
                }
            elif name == "character":
                parts = value.split()
                pending["character"] = {
                    "id": parts[0],
                    "expression": parts[1] if len(parts) > 1 else "default",
                    "position": parts[2] if len(parts) > 2 else "center",
                    "visible": True,
                    "speaking": True,
                }
            elif name == "characters":
                commands = []
                for block in value.split("|"):
                    parts = block.strip().split()
                    commands.append({
                        "id": parts[0],
                        "expression": parts[1] if len(parts) > 1 else "default",
                        "position": parts[2] if len(parts) > 2 else "center",
                        "visible": True,
                        "speaking": len(parts) > 3 and parts[3].lower() == "speaking",
                    })
                pending["characters"] = commands
            elif name == "hide-character":
                pending["character"] = {"position": value or "center", "visible": False}
            continue

        speaker_match = SPEAKER_PATTERN.match(line)
        if speaker_match:
            scene = {
                "id": f"{chapter_id}-{counter:03d}",
                "speaker": speaker_match.group("speaker"),
                "text": speaker_match.group("text"),
                **pending,
            }
            scenes.append(scene)
            pending = {}
            counter += 1
            continue

        scene = {
            "id": f"{chapter_id}-{counter:03d}",
            "speaker": "",
            "text": line,
            **pending,
        }
        scenes.append(scene)
        pending = {}
        counter += 1

    return {
        "id": chapter_id,
        "engineVersion": "0.9.2",
        "title": title,
        "scenes": scenes,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="천류관 Markdown → Scene JSON 변환기")
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--id", required=True, dest="chapter_id")
    parser.add_argument("--title", required=True)
    args = parser.parse_args()

    source = args.input.read_text(encoding="utf-8")
    result = parse_markdown(source, args.chapter_id, args.title)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(result, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"생성 완료: {args.output} ({len(result['scenes'])} scenes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
