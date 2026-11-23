# 천류관 Novel Archive v0.9.31 — CSS 구조 정리 3단계

## 실제 변경
- `design-components.css` 공통 인터랙션 규칙을 정리하고 모바일 탭 하이라이트 및 키보드 포커스 범위를 통일.
- `scripts/audit-css.mjs` 추가: 레거시 스타일 파일별 `!important` 및 반복 선택자 수를 정량 보고.
- `npm run audit:css`를 `npm run check`에 연결해 후속 변경 시 추적 가능하게 함.
- 기존 `foundation-legacy.css`, `components-legacy.css`, `layout-canonical.css`, `home-v0928.css`의 CSS 선언과 적용 순서는 보존.

## 의도적으로 보류
- 서로 다른 미디어 쿼리/우선순위에 있는 반복 선택자는 동일 텍스트라도 무조건 제거하면 화면이 깨질 수 있어 삭제하지 않음.
- 시안 시각적 일치, 실제 브라우저 렌더링, NOVEL 저장소 운영 빌드는 이 단계에서 완료로 판단하지 않음.

## 다음 단계
- 브라우저 스크린샷을 기준으로 레거시 선택자를 화면별로 이관하고 충돌 규칙 제거.
- 홈·서가·독서·세계관의 실제 시안 차이를 확인한 뒤 공통 레이아웃 컴포넌트 정리.
