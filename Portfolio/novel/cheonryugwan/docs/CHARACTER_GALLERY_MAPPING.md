# 공식 캐릭터 일러스트 연결 가이드

`static/character-images.json`의 `portraits`와 `galleries`에 **공개 승인된 실제 이미지**만 추가합니다.

```json
{
  "schemaVersion": 1,
  "portraits": {
    "02_CANON/CHARACTERS/EXAMPLE.md": "assets/archive/CHARACTERS/example-stand.webp"
  },
  "galleries": {
    "02_CANON/CHARACTERS/EXAMPLE.md": [
      {"url": "assets/archive/CHARACTERS/example-battle.webp", "label": "전투", "type": "battle"},
      {"url": "assets/archive/CHARACTERS/example-outfit.webp", "label": "수련복", "type": "outfit"}
    ]
  }
}
```

위 EXAMPLE 항목은 설명용이며 **운영 파일에 넣지 않습니다**. 키는 실제 `content.json`의 캐릭터 문서 `path`와 일치해야 합니다. URL은 빌드 후 `dist/` 내부의 파일이어야 하며, `03_ASSETS`의 공개 이미지가 `assets/archive/`로 복사됩니다. 지원 유형: `stand`, `battle`, `outfit`, `expression`, `event`. 원본 파일의 승인 여부와 배포 경로를 먼저 확인하세요.
