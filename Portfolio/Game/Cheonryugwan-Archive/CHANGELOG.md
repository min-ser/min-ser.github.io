# Changelog

## v0.8.4.2 - Unicode Filename Fix

- ZIP 내부에서 CP437로 잘못 해석된 한글 파일명 복구
- `에셋`, `문서`, `캐릭터`, 캐릭터 이름과 이미지 파일명 정상화
- JSON·Markdown·HTML에 남은 깨진 한글 경로 문자열 복구
- UTF-8 파일명 플래그를 사용해 ZIP 재생성
- 한글 파일명 자동 검수 보고서 추가
- v0.8.4.1 버튼·JavaScript 수정사항 유지


## v0.8.4.2 - Interaction & JavaScript Fix

- `novel-engine.js`에 남아 있던 중복 `catch` 구문 제거
- 빗소리 정지 함수 `stopRain()` 문법과 예외 처리 수정
- JavaScript 파싱 실패로 등록되지 않던 게임 버튼 이벤트 복구
- 새로 시작, 이어하기, 불러오기, 설정 버튼 이벤트 초기화 복구
- 홈·게임 장식 레이어 클릭 차단 방지 유지
- 로컬 Service Worker 및 캐시 자동 정리 유지
- Node.js `--check` 기반 JavaScript 구문 검수 추가
- HTML 정적 리소스 경로 검수 추가


## v0.8.4 - Interaction Stability Fix

- 홈 장식 레이어의 클릭 가로채기 방지
- 모든 홈 버튼·카드·메뉴의 상호작용 우선순위 명시
- 게임 장식 레이어의 `pointer-events` 비활성화
- 게임 제목 메뉴의 클릭 우선순위 보강
- 누락된 DOM 요소가 있어도 나머지 버튼 이벤트가 등록되도록 방어 처리
- Live Server에서 이전 Service Worker·천류관 캐시 자동 제거
- CSS·JS 캐시 무효화 버전 쿼리 추가
- 모바일 메뉴 열기·닫기 안정화
- 버튼 상호작용 자동 진단 로그 추가
- 상호작용 검수 보고서 추가


## v0.8.3 - 서하린 투명 에셋 수정

- 표정 8종 원본과 기존 자동 처리본 보존
- 가위 모양·점선·재단선 흔적 제거
- 표정 8종 최종 투명 PNG/WebP 생성
- 전투 개별 9종 배경 투명화
- 전투 이미지 공통 캔버스 정렬
- 게임 캐릭터 매니페스트를 최종 에셋으로 갱신
- 서하린 상세 페이지에 `최종 표정`, `최종 전투` 필터 추가
- 수정 보고서 및 체크리스트 추가


## v0.8.2 - 캐릭터 레퍼런스·비 환경음

- 연무설 기본 스탠딩 교체본 추가
- 설유진 기본 스탠딩 4K 및 상세 페이지 추가
- 적월아 기본 스탠딩 4K 추가
- 기존 서하린·전서율·설유진·연무설·적월아 원본 레퍼런스 갤러리 복원
- 캐릭터 상세 페이지에 레퍼런스 필터 추가
- 합성 빗소리를 사용자 제공 MP3 환경음으로 교체
- 비 음원 반복·음량·음소거 연동
- Service Worker 캐시에 비 음원 추가
- 캐릭터 갤러리 메타데이터 v0.8.2 갱신
- v0.8.2 작업 체크리스트 추가


## v0.8.1 - 사이트 동기화 수정

- Roadmap을 v0.1.0부터 v0.8.1까지 실제 구현 이력으로 갱신
- Story 페이지의 원본 미수령 상태 제거
- 1부 1화 게임 알파와 1~4부 기획 보유 상태 반영
- 홈 현재 릴리스 설명을 v0.8.1 기준으로 수정
- 상위 페이지 공통 메뉴를 한글로 통일
- 모든 주요 페이지의 푸터 버전을 v0.8.1로 동기화
- 다음 목표를 v0.9.0 게임 본편 에셋 연결로 지정


## v0.8.0 - 캐릭터 갤러리

- Characters 메인 페이지 추가
- 서하린·전서율·적월아·연무설 상세 페이지 추가
- 캐릭터별 기본·표정·전투 필터 추가
- 이미지 클릭 확대 보기 추가
- 웹용 WebP 및 썸네일 자동 생성
- 캐릭터 갤러리 JSON 메타데이터 추가
- 전서율 스탠딩 2종 정리
- 적월아 스탠딩 2종 정리
- 연무설 스탠딩 1종 정리
- 메인 index에서 Characters 접근 경로 추가
- 캐릭터 갤러리 작업 체크리스트 추가


## v0.7.1 - 서하린 표정 스프라이트

- 서하린 표정 8종 시트를 8개 이미지로 자동 분리
- 체크무늬·밝은 배경 연결 영역 자동 투명 처리
- 투명 PNG와 게임용 WebP 생성
- 900×1400 공통 캔버스 및 하단 기준선 정렬
- 서하린 표정 8종을 캐릭터 매니페스트에 등록
- 웹 기반 표정 검수 갤러리 추가
- 자동 처리 결과와 수동 검수 항목 문서화
- 표정명 미확정 상태를 번호 기반 ID로 관리


## v0.7.0 - 한글 에셋 관리 구조

- 코드와 JSON을 제외한 에셋·문서 관리 구조 한글화
- 서하린 기본 스탠딩, 표정 시트, 전투 시트, 전투 개별 이미지 정리
- 1부~4부 배경 목록 이미지 보관
- 이미지 에셋 통합 체크리스트 추가
- 생성 완료·편집 필요·미생성 상태 구분
- 캐릭터·배경·이벤트CG·UI·효과 항목 통합 관리
- 한글 에셋 관리 가이드 추가
- 신규 에셋 SHA-256 매니페스트 생성


## v0.6.1 - Asset Runtime Fix

- 전서율 원본 이미지를 게임용 WebP로 최적화
- 첫 장면부터 캐릭터를 명시적으로 표시
- 캐릭터 이미지 사전 로딩 및 로딩 상태 표시
- AudioContext를 사용자 입력 후 강제 resume 처리
- 상단 `소리 테스트` 버튼 추가
- 천둥 효과음과 지속 빗소리 즉시 검증 기능 추가
- JSON·오디오 fetch에 no-store 적용
- CSS/JS 버전 쿼리로 브라우저 캐시 무효화
- localhost에서 과거 Service Worker와 천류관 캐시 자동 제거
- 운영 Service Worker에 skipWaiting과 clients.claim 적용
- 캐릭터 표시 크기와 모바일 배치 보정


## v0.6.0 - Engine Foundation

- 실제 배경 이미지 전환 엔진 추가
- 전서율 캐릭터 레이어와 좌·중앙·우측 배치 구조 추가
- 캐릭터 등장·퇴장 전환 애니메이션 추가
- Web Audio API 기반 무한 빗소리 구현
- 천둥, 검 뽑기, 검격, 기억 잔향 WAV 효과음 생성 및 연동
- 마스터 음량, 음소거, 빗소리, 텍스트 속도 설정 추가
- 수동 저장/불러오기 슬롯 3개 추가
- 자동 저장 및 이어하기 유지
- 선택지와 변수 저장 엔진 추가
- 첫 화 장면 JSON에 배경·캐릭터·음향 명령 추가
- 배경/캐릭터/오디오 매니페스트 추가
- Visual Novel Engine 기술 문서 추가
- Service Worker 캐시 v0.6.0 갱신


## v0.5.2 - Visual Reference Archive

- 작성자 제공 캐릭터 이미지 6개를 원본 보존 폴더에 추가
- 전서율, 서하린, 설유진, 연무설, 적월아 비주얼 기준 등록
- 혈천무후 진하연·천마교주 연서 2인 CG 레퍼런스 등록
- 원본 이미지 SHA-256 매니페스트 생성
- Character Bible별 `images/references/` 참조 복사본 추가
- 게임용 파생 이미지 제작 정책과 디렉터리 가이드 추가
- 웹 Character Visual References 페이지 추가
- README에 원본·참조·게임 에셋 구분 규칙 추가
- 원본 이미지는 게임 화면에 직접 연결하지 않고 보존 상태로 유지


## v0.5.1 - Dialogue Layout Fix

- 게임 최상위 컨테이너에 명시적인 viewport 높이 적용
- Novel 화면과 Stage의 0px 높이 문제 수정
- 하단 대사창이 화면 밖으로 밀리는 문제 수정
- 모바일 브라우저용 `100dvh` 및 safe-area 대응 추가
- 낮은 화면 높이용 대사창 반응형 스타일 추가
- Story JSON 로딩 실패 시 화면 오류 메시지 표시
- 이어하기 저장 위치 범위 검증 추가


## v0.5.0 - Interactive Novel Alpha

- 원본 Outline을 바탕으로 1부 1화 「비 내리는 산길」 소설 초안 집필
- Manuscript 상태를 `draft / canon pending`으로 관리
- 27개 장면으로 구성된 게임 JSON 추가
- 모바일 Visual Novel UI 신규 구현
- 새로 시작, 이어하기, 자동 진행, 대화 로그 지원
- LocalStorage 진행 상태 저장
- 비, 화면 흔들림, 플래시, 기억 장면 연출 추가
- 원본에서 숨겨야 할 1부 정보 노출 방지 점검
- Chapter 01 집필 보고서 추가

## v0.4.0 - Character Bible & Authoring Foundation

- Character Bible 표준 구조 추가
- 전서율, 태허진인, 진하연, 연서 설정집을 캐릭터별 문서로 구조화
- 서하린, 연무설, 적월아, 설유진 기본 폴더 및 프로필 추가
- 캐릭터 인덱스, 세력표, 경지표, 관계도 추가
- 공식·컨셉·표정·참고 이미지 폴더 분리
- 기존 1~4부 문서를 Story Outline으로 분류하고 작업본 생성
- 실제 소설 집필용 `story/manuscript/` 구조와 첫 장 템플릿 추가
- Synopsis, Game Script, Timeline, Foreshadow, Glossary 작업 구조 추가
- Character 웹 페이지와 README/체크리스트 갱신
- 원본 `_INBOX` 및 `_SOURCE` 파일 보존

## v0.3.1 - Source Intake Snapshot

- 작성자가 전달한 천류관 1권 1~4부 시나리오 원본 보존
- 전서율, 태허진인, 진하연, 연서 설정 원본 보존
- 태허진인 기존본/리빌딩본을 병합하지 않고 함께 보관
- Source Intake 보고서 및 폴더별 README 추가
- 공식 Canon 통합과 게임 변환은 후속 버전으로 분리

## v0.3.0 - GitHub Pages Foundation

- 저장소 루트 GitHub Pages 랜딩 페이지 추가
- 모바일 반응형 공통 Header/Footer 및 내비게이션 추가
- Archive, Story, Characters, World, Roadmap, About 페이지 추가
- License & Copyright 웹 안내 페이지 추가
- 루트 PWA Manifest 및 Service Worker 추가
- GitBlog/Portfolio 하위 경로 배포 가이드 추가
- 게임과 프로젝트 소개 사이트를 분리
- 공식 설정은 원본 수령 전까지 플레이스홀더로 유지

## v0.2.0 - Development Standard

- Separated MIT code license from protected creative content.
- Added COPYRIGHT, NOTICE, CONTRIBUTING, and SECURITY policies.
- Added Canon, naming, story, image, version, Git, idea, and ZIP standards.
- Added idea inbox/status folders and story analysis/conflict folders.
- Added ZIP source, release, report, analysis, and backup folders.
- Added VS Code Live Server recommendations and improved `.gitignore`.
- Rewrote README as the project operations guide.

## v0.1.0 - Archive Foundation

- Created Archive First structure and sample mobile PWA game.
