# v0.9.59.2 고서 독서 Chromium 시각·조작 검수

* 방식: Chromium `/usr/bin/chromium` + Playwright `page.set_content` (기존 `file://` 접속의 ERR_BLOCKED_BY_ADMINISTRATOR 우회). 실제 렌더링 코드와 운영 `app.js`는 동일함.
* 데스크톱: 1440×900. 양면 고서, `2 / 4쪽` 표기, 실제 페이지 삽화, 좌우 본문 표시. 책 표지 숨김. 수평 넘침 없음, 콘솔 페이지 오류 0건.
* 모바일: 390×844. 단면 고서, `1 / 4쪽` 표기, 왼쪽 페이지 숨김, 오른쪽 페이지 표시. 가로 넘침 없음, 콘솔 페이지 오류 0건.
* 기능: 다음 쪽으로 페이지 수 변경(PC 2→4, 모바일 1→2), 책갈피 상태 true, 독서 설정 표시, 줄 간격 2.3 변경, 회차 목차 열기, 중복 패널 닫힘, 서가 복귀·재진입 시 `4 / 4쪽` 복원.
* 정적 검사: `npm run check` 통과.
* 통합 검사: `npm run test:integration` 통과(테스트용 14화, 정식 원고가 아님).
* 참고 이미지(이 폴더): `screenshots/desktop-1440-cover.png`, `screenshots/desktop-1440-open.png`, `screenshots/mobile-390-cover.png`, `screenshots/mobile-390-open.png`.
* 한계: 실제 iPhone Safari 실기기 및 실제 NOVEL 원고 전체 분량 검증 미수행. 공식 목표 시안의 완전한 픽셀 동일성 승인 미완료.
