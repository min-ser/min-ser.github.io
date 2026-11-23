# v0.9.34 공통 CSS 책임 분리

기준: v0.9.33 전체 ZIP.

## 실제 이동
- `archive-unified.css`의 공통 사이트 헤더·푸터 규칙을 `design-components.css`로 이동.
- 공통 패널 테두리·그림자 규칙을 `design-components.css`로 이동.
- 색상·배경·금박 그라데이션 토큰을 `design-tokens.css`로 이동.
- 중복된 공통 포커스 규칙을 `archive-unified.css`에서 제거 (기존 `design-components.css` 규칙 유지).
- 모션 감소 환경의 스크롤 규칙을 `design-components.css`로 이동.
- `archive-unified.css`에는 페이지 배경·제목·내부 히어로의 화면 배치 규칙만 유지.

## 의도적으로 보류
- 레거시 파일의 동명 선택자: 미디어쿼리와 우선순위, 화면별 예외가 있으므로 단순 문자열 일괄 삭제 금지.
- app.js 모듈 분리 및 디자인 전면 교체: 이번 작업 범위 아님.
- 실 브라우저 시각적 동등성은 별도 확인 필요.

## 검사
- `npm run check` 및 `npm run test:integration` 실행.
- `test-css-ownership.mjs`로 공통 CSS 책임 회귀 방지.
