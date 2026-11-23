# v0.9.41 모바일 퍼블리싱 장애 대응

- 재현 증상: iPhone ChatGPT 파일 미리보기에서 헤더만 보이고 main이 빈 화면이며 JS 메뉴가 작동하지 않음.
- 구조적 원인: 기존 index.html의 main이 비어 있고 app.js가 실행되어야 본문이 나타나는 방식. iOS 환경에서 JS 실행이 차단/실패한 정확한 원인은 아직 확인되지 않음.
- 대응: `preview/mobile-fallback.html`에 외부 JavaScript 없이 동작하는 모바일 우선 독립 검수본 추가.
- 메뉴는 native details, 페이지 이동은 CSS :target과 앵커로 구현. 이미지 내장, 더미 데이터 명시, 홈·소설·인물·세계관·설정집·독서 화면 포함.
- 주의: 이 파일은 정식 운영 app.js의 전체 기능을 대체하지 않음. 기존 운영 코드 유지. iPhone 실기기 검증은 사용자 확인 필요.
- 다음 과제: 운영 사이트를 HTTPS로 제공하고 iOS Web Inspector에서 app.js 오류/CSP 확인 후 근본 수정.
