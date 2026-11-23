# 천류관 v0.9.33 — CSS 정리

## 기준
- v0.9.32 통합 프로젝트 ZIP을 원본으로 사용
- 기존 7개 스타일시트 로드 순서와 10개 라우트 유지
- 홈 히어로 캐릭터 제거 설정 유지

## 실제 수정
- `foundation-legacy.css`: 동일 선택자에서 뒤에 동일 속성·값·중요도로 다시 선언된 30개 선언 제거
- `components-legacy.css`: 위 조건의 선언 10개 제거
- `button,input,select { touch-action: manipulation }` 중복 선언 제거
- CSS 회귀 점검용 `scripts/test-css-duplicates.mjs` 추가 및 npm check 연결
- 버전 0.9.33으로 갱신

## 보존한 사항
- 미디어 쿼리 내부 스타일 및 서로 다른 선택자에 대한 선언
- 의도된 상태별/우선순위별 재정의
- 기존 원고 수집, JavaScript 라우팅, 정적 이미지 자산

## 검증
- `npm run check`: 통과
- `npm run test:integration`: 통과 (검수용 14화 fixture)
- 실제 Chromium 화면 비교: 미완료
- NOVEL 원본 저장소 기반 production build: 미검증

## 남은 작업
- 브라우저 기반 PC/모바일 전후 스크린샷 비교
- 반복 선택자 중 상충하는 선언을 화면별로 정리
- 홈 시안과 내부 페이지 간 실제 시각 통일
- 원본 NOVEL 데이터 기반 빌드 및 배포 검증
