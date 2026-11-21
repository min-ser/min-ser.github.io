# v0.9.7 미리보기 제공 원칙

- 실제 운영 소스는 `index.html`, `app.js`, `static/`이며 검수용 원고를 포함하지 않습니다.
- 별도 HTML 미리보기는 실제 CSS/JS와 검수용 14화 fixture, 축소된 이미지 자산을 포함합니다.
- 이미지 축소는 미리보기 파일에만 적용하며 프로젝트 공식 이미지 원본은 유지합니다.
- ChatGPT 내 인터랙티브 화면은 경량 검수 UI이며 운영 프로젝트 전체 실행을 대체하지 않습니다.
- 실제 원고 14화는 GitHub Actions 배포에서 `NOVEL_EXPECT_ACADEMY_CHAPTERS=14`로 확인해야 합니다.
