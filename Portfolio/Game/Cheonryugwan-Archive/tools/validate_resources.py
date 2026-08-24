from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]


class ResourceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.values: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        for key in ("href", "src"):
            value = data.get(key)
            if value:
                self.values.append(value)


def strip_url(value: str) -> str:
    parsed = urlparse(value)
    return unquote(parsed.path)


def resolve(base_file: Path, value: str) -> Path | None:
    if not value or value.startswith(("#", "mailto:", "javascript:", "data:")):
        return None
    parsed = urlparse(value)
    if parsed.scheme in {"http", "https"} or value.startswith("//"):
        return None
    clean = strip_url(value)
    if clean.startswith("/"):
        return ROOT / clean.lstrip("/")
    return (base_file.parent / clean).resolve()


def check_html() -> list[str]:
    errors: list[str] = []
    for page in ROOT.rglob("*.html"):
        parser = ResourceParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for value in parser.values:
            target = resolve(page, value)
            if target is not None and not target.exists():
                errors.append(f"HTML missing: {page.relative_to(ROOT)} -> {value}")
    return errors


def game_path(value: str) -> Path:
    return ROOT / "game" / value.removeprefix("./")


def check_manifests() -> list[str]:
    errors: list[str] = []

    backgrounds = json.loads(
        (ROOT / "game/data/system/backgrounds.json").read_text(encoding="utf-8")
    )
    for asset_id, value in backgrounds.items():
        if value.startswith(("http://", "https://")):
            continue
        if not game_path(value).exists():
            errors.append(f"Background missing: {asset_id} -> {value}")

    characters = json.loads(
        (ROOT / "game/data/system/characters.json").read_text(encoding="utf-8")
    )
    for character_id, character in characters.items():
        for group in ("assets", "battleAssets"):
            for asset_id, value in character.get(group, {}).items():
                if not game_path(value).exists():
                    errors.append(
                        f"Character missing: {character_id}.{group}.{asset_id} -> {value}"
                    )

    audio = json.loads(
        (ROOT / "game/data/system/audio.json").read_text(encoding="utf-8")
    )
    for category in ("ambient", "sfx", "bgm"):
        for asset_id, value in audio.get(category, {}).items():
            metadata = value if isinstance(value, dict) else {}
            path_value = metadata.get("path") if metadata else value
            if not path_value:
                continue
            if metadata.get("status") == "placeholder":
                continue
            if not game_path(path_value).exists():
                errors.append(f"Audio missing: {category}.{asset_id} -> {path_value}")

    return errors


def main() -> int:
    errors = check_html() + check_manifests()
    report = {
        "result": "PASS" if not errors else "FAIL",
        "errorCount": len(errors),
        "errors": errors,
    }
    report_path = ROOT / "문서/체크리스트/v0.9.4_리소스_검수_결과.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    if errors:
        print("\n".join(errors))
        return 1

    print("PASS: HTML links and manifest resources")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
