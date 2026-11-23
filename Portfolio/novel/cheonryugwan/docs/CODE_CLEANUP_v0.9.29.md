# 천류관 v0.9.29 코드 구조 정리

## 실제 변경
- `index.html`의 두 개 인라인 `<style>` 블록을 각각 `static/assets/foundation-legacy.css`, `static/assets/components-legacy.css`로 분리했습니다.
- **기존 CSS 선언 및 적용 순서를 그대로 유지**했습니다. 순서는 `foundation-legacy` → `components-legacy` → `layout-canonical` → `home-v0928`입니다.
- `npm run test:styles`를 추가하여 CSS 링크 누락, 순서 변경, 인라인 스타일 재유입을 검출합니다.
- `npm run check`에 스타일 구조 검사를 연결했습니다.

## 아직 정리하지 않은 항목
- 두 레거시 CSS 파일 내부의 중복 선택자·`!important` 규칙: 삭제하면 화면이 변할 수 있으므로 **실제 렌더링 비교 이후** 단계적으로 제거해야 합니다.
- `app.js`의 화면별 템플릿 및 상태 관리 분리: 이번 버전에서는 동작 회귀 방지를 위해 보존했습니다.
- 홈 시안 정밀 재현 및 전체 페이지 디자인 통일: 이번 작업은 코드 구조 정리이며 디자인 완료가 아닙니다.
- 실제 NOVEL 인증 원고 연동 및 GitHub Pages 배포: 미검증.

## 다음 단계
1. PC/모바일 브라우저 스크린샷으로 CSS 분리 전후 동일성 확인.
2. 선택자 사용 현황을 측정한 후 중복 규칙을 하나씩 제거하고 회귀 검증.
3. 공통 토큰·버튼·패널·카드 컴포넌트로 정리.
4. 공식 홈 시안을 기준으로 페이지별 리디자인.
