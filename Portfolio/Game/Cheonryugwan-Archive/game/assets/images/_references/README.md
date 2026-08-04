# Game Image Reference Policy

이 폴더는 게임 화면에서 사용할 파생 리소스의 작업 가이드입니다.
사용자 제공 원본은 `archive/characters/_SOURCE/`에 보관하며 여기로 직접
복사하지 않습니다.

## 향후 파생 에셋

```text
game/assets/images/characters/<character-id>/
├── standing-default.webp
├── standing-angry.webp
├── standing-injured.webp
├── portrait-default.webp
└── silhouette.webp
```

## 제작 순서

1. 원본 레퍼런스 확인
2. 얼굴·복장·색감 기준 승인
3. 투명 배경 스탠딩 생성
4. 표정별 파생 이미지 생성
5. WebP 최적화
6. 게임 JSON 등록
7. 모바일·데스크톱 렌더링 테스트
