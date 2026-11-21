# 천류관 Novel Archive v0.8.5

기존 v0.8.1 소스에 v0.8.2~v0.8.4 예정 UI 개편을 묶어 적용했습니다.

- 소설 목록: 편집형 서고, 권별 카드, 회차 행
- 리더: 테마 전환, 키보드 안내, 공통 컬러 개선
- 인물: 도감 배너·카드 그리드, 프로필·관계 화면 배너
- 화첩: 갤러리 배너 및 공통 디자인
- 실제 원고·캐릭터 설정은 NOVEL 공개 소스만 사용
- 검증: npm run check / npm run test:integration

운영 경로: Portfolio/novel/cheonryugwan/ (기존 폴더 덮어쓰기)


## v0.9.0
모바일 메뉴, 접근성 및 반응형 보완을 묶음 반영. 실제 운영 배포와 시각 검수는 별도 확인 필요.


## v0.9.1 공식 시안 기반 소설 서가
`docs/design/novel-library.png`를 기준으로 3영역 서가를 구현했습니다. 원고 내용은 `content.json`에서만 읽습니다. 실제 브라우저/운영 배포 검증은 별도입니다.


### v0.9.2 변경
공식 `docs/design/reader-main.png`와 `reader-controls.png`를 기준으로 고서 리더 장정·한지·책등·배경을 개선하고, 회차 목차 드로어를 추가했습니다. 운영 데이터는 변경하지 않았습니다.


## v0.9.4
공식 세계관 시안 기반 3열 고서형 인터랙티브 지도 레이아웃을 추가했습니다. docs/UPDATE_CHECKLIST.md 참고.

## v0.9.5
독서 설정 패널, 브라우저 환경 설정 저장, 모바일 독서 도구 배치 개선. `docs/UPDATE_CHECKLIST.md` 참고.


## v0.9.6 운영 원고 검사
`NOVEL_EXPECT_ACADEMY_CHAPTERS=14 npm run build` 실행 시 원고가 14화 미만이거나 회차 번호가 빠져 있으면 빌드가 실패합니다. 운영 GitHub Actions의 build step에 환경 변수를 지정하세요. 배포 후 `content.json`의 `revision`, `audit.academyChapters`, `audit.academyMissing`를 확인합니다.


## v0.9.7 미리보기 전달 개선
- [x] 14화 검수용 데이터와 운영 원고 분리 유지
- [x] 경량 독립형 HTML 미리보기 제작
- [x] 미리보기 소스 검사 추가
- [ ] 실제 브라우저 클릭 검수
- [ ] Private NOVEL 14화 운영 배포 검증


## v0.9.8 디자인 고도화
- [x] 공식 시안 기반 서가·고서·세계관 재질/입체감 보강
- [ ] 실제 브라우저와 공식 PNG 시각 비교
- [ ] 실제 14화/운영 배포 검증
- 상세: docs/DESIGN_FIDELITY_v0.9.8.md
