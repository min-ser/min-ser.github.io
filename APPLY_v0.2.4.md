# v0.2.4 Update Patch

이 ZIP의 내용을 `min-ser.github.io` 저장소 Root에 덮어쓰면 됩니다.

- 모바일 Header MENU/CLOSE navigation 추가
- 모바일 Hero/Home/공통 section 폭 및 grid 반응형 수정
- 모바일 오른쪽 대형 공백 방지
- Portfolio 페이지 추가
  - Cheonryugwan Archive
  - NeuralScope
  - CS Study
- `/Portfolio/2026/index.html`은 Portfolio 목록에서 제외
- Navigation: 00 Home / 01 Profile / 02 Career / 03 Projects / 04 Portfolio / 05 GitHub / 06 Expertise / 07 Training / 08 Archive
- Sitemap에 `/portfolio` 추가
- Root TypeScript가 `Portfolio/study/*`를 검사하지 않도록 tsconfig 범위 격리
- package version 0.2.4

기존 `Portfolio/` 내부 프로젝트 소스는 수정하지 않습니다.
