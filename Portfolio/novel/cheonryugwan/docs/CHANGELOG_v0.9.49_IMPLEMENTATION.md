# v0.9.49 운영 코드 1차 반영

- `index.html`: `assets/goso-library-v0949.css` 로드 추가.
- `static/assets/goso-library-v0949.css`: 고서형 목재/가죽/한지/금박 토큰, PC 서가 3영역, 모바일 세로형 구성, 실제 `app.js`에서 생성되는 기존 서가 DOM에 적용.
- `package.json`: 버전 0.9.49 표시.
- 기존 NOVEL/CANON 데이터 로딩 및 `app.js` 동작은 변경하지 않음.
- 새 특수효과는 추가하지 않음(v0.10.x 예정).

## 남은 사항
- 모바일 목차 드로어, 공식 목표 시안 정밀 대조, PC/iPhone 실제 브라우저 검수, 빌드 테스트.
- 독립 디자인 미리보기와 운영 코드 반영은 별도 상태로 관리.
