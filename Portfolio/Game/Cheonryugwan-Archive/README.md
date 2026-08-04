# Cheonryugwan Archive

> **천류관 : 흐름의 기록**  
> 원본 소설을 기준으로 세계관, 캐릭터, 기록, 복선, 이미지, 분석 결과와 모바일 인터랙티브 노벨을 함께 관리하는 장기 IP 프로젝트입니다.

현재 버전: **v0.8.4.2 — Interactive Novel Alpha**

## 목표

- 원본 소설과 창작 설정을 안전하게 관리
- 모바일 우선 반응형 웹/PWA 게임 제작
- 인기가 없어도 엔드투엔드 포트폴리오로 활용
- 반응이 있으면 상용 배포로 확장

## 정본 원칙

**작성자가 보유한 원본 소설이 최상위 Canon입니다.**

```text
원본 소설 → 승인된 Archive → 게임 데이터 → 웹/PWA 게임
```

대화 중 추측, 샘플 스토리, 테스트 데이터는 승인 전까지 공식 설정이 아닙니다.

## 아이디어 작성 위치

아이디어가 떠오르면 **`ideas/inbox/`에 먼저 작성**합니다. 정본 소설이나 설정집을 즉시 수정하지 않습니다.

- 채택: `ideas/accepted/`
- 보류: `ideas/parking/`
- 폐기: `ideas/rejected/`
- 주제별: `ideas/story/`, `ideas/characters/`, `ideas/world/`, `ideas/game/` 등
- 템플릿: `templates/IDEA_TEMPLATE.md`

## 원본 소설 위치

```text
story/_INBOX/
```

분석 결과는 다음에 분리합니다.

- `story/_ANALYZED/`
- `story/_REPORTS/`
- `story/_CONFLICTS/`

원본은 삭제하거나 덮어쓰지 않습니다.

## ZIP 보관 위치

```text
archives/source-zips/       원본 ZIP
archives/generated/         릴리즈·보고서·분석 결과
archives/backups/           로컬·대규모 변경 전 백업
```

세부 경로:

- 소설 ZIP: `archives/source-zips/story/`
- 이미지 ZIP: `archives/source-zips/images/`
- 참고 ZIP: `archives/source-zips/references/`
- 릴리즈 ZIP: `archives/generated/releases/`

대용량 ZIP은 Git에서 제외하고 로컬 백업, 개인 클라우드 또는 GitHub Release를 권장합니다.

## 캐릭터 설정과 이미지

- 원본 설정: `archive/characters/<character-id>/`
- 배포 이미지: `game/assets/images/characters/<character-id>/`

## VS Code 실행

1. 프로젝트 폴더 열기
2. 추천 확장 `Live Server` 설치
3. `game/index.html` 우클릭 → **Open with Live Server**

예상 주소: `http://127.0.0.1:5500/game/index.html`

## Git 계정 확인

```bash
git config user.name
git config user.email
git log --format="%h %an <%ae>"
```

회사 계정, 회사 장비, 회사 AI 계정, 고객 자료를 개인 프로젝트에 사용하지 않습니다.

## 라이선스와 저작권

- 소프트웨어 코드: MIT License (`LICENSE`)
- 소설·캐릭터·세계관·대사·이미지·로고 등: All Rights Reserved
- 상세 정책: `COPYRIGHT.md`
- 요약 고지: `NOTICE`

## 주요 문서

- `docs/PROJECT_STANDARD.md`
- `docs/CANON.md`
- `docs/NAMING_RULE.md`
- `docs/STORY_STANDARD.md`
- `docs/IMAGE_STANDARD.md`
- `docs/VERSION_POLICY.md`
- `docs/GIT_WORKFLOW.md`
- `docs/IDEA_WORKFLOW.md`
- `docs/ARCHIVE_STORAGE_GUIDE.md`

## v0.2.0 완료

- [x] LICENSE / COPYRIGHT / NOTICE 분리
- [x] Canon 및 프로젝트 표준
- [x] 아이디어 Inbox와 상태 관리
- [x] 원고 분석·보고서·충돌 폴더
- [x] ZIP 원본·릴리즈·백업 구조
- [x] VS Code Live Server 설정
- [x] `.gitignore` 보강
- [x] README 전면 개편
- [ ] 실제 소설 원본 분석
- [ ] 실제 캐릭터 이미지 연결
- [ ] 본편 게임 데이터 변환

## 다음 버전

**v0.3.0 — Story Intake**: 실제 원고의 파일 목록, 메타데이터, 구조, 인물, 세력, 시간 순서, 충돌 후보를 정리합니다.


## GitHub Pages 웹사이트

v0.3.0부터 저장소 루트의 `index.html`이 프로젝트 랜딩 페이지로 동작합니다.

```text
/
├── index.html                 프로젝트 메인
├── game/                      실제 인터랙티브 노벨
├── pages/archive/             Archive 안내
├── pages/story/               Story Intake 안내
├── pages/characters/          Character Archive
├── pages/world/               World Bible
├── pages/roadmap/             개발 진행 상황
└── pages/about/               프로젝트 소개
```

GitHub Pages를 저장소의 `main` 브랜치 `/root`로 설정하면 다음 형태로 접속합니다.

```text
https://<github-id>.github.io/Cheonryugwan-Archive/
```

게임 직접 주소:

```text
https://<github-id>.github.io/Cheonryugwan-Archive/game/
```

### GitBlog/Portfolio 저장소에 복사하는 경우

다음 폴더 전체를 원하는 경로에 복사하면 됩니다.

```text
Portfolio/Project/Cheonryugwan-Archive/
```

예상 주소:

```text
https://<github-id>.github.io/Portfolio/Project/Cheonryugwan-Archive/
```

모든 내부 링크는 상대 경로를 사용하므로 동일한 폴더 구조를 유지해야 합니다.

## v0.3.0 완료 체크리스트

- [x] GitHub Pages용 루트 랜딩 페이지
- [x] 모바일 반응형 공통 Header/Footer
- [x] Home, Game, Archive, Story, Characters, World, Roadmap, About 내비게이션
- [x] Story Intake 상태 페이지
- [x] Archive 안내 페이지
- [x] Character Archive 플레이스홀더
- [x] World Bible 플레이스홀더
- [x] 개발 로드맵 페이지
- [x] License/Copyright 안내 페이지
- [x] 루트 PWA Manifest 및 Service Worker
- [x] GitBlog/Portfolio 복사 배포 가이드
- [ ] 실제 원본 소설 분석
- [ ] 실제 캐릭터 이미지 연결
- [ ] 실제 Archive 데이터 공개


## 2026-08-04 원본 자료 반영

작성자가 전달한 1권 1~4부 시나리오와 주요 인물 설정 원본을 프로젝트에 보존했습니다.

```text
story/_INBOX/2026-08-04/volume-01/
archive/characters/_SOURCE/2026-08-04/
story/_REPORTS/SOURCE_INTAKE_2026-08-04.md
```

이번 버전은 **원문 수집 및 보존 스냅샷**입니다. 내용 병합, 설정 충돌 해결, 공식 Canon 승인, 게임 JSON 변환은 아직 수행하지 않았습니다.


## v0.4.0 — Character Bible & Authoring Foundation

### 전달된 문서의 위치

- 원본 보존: `story/_INBOX/2026-08-04/volume-01/`
- 편집 가능한 스토리 아웃라인: `story/outline/volume-01/`
- 캐릭터 원본 설정집: `archive/characters/_SOURCE/2026-08-04/`
- 정리된 Character Bible: `archive/characters/<분류>/<character-id>/`

### 실제 소설 작성 위치

```text
story/manuscript/volume-01/part-01/chapter-01.md
```

현재 전달된 1~4부 문서는 소설 원고가 아니라 상세 스토리 아웃라인/트리트먼트로 분류했습니다. 원본은 이동하거나 수정하지 않고, `story/outline/`에 작업본을 별도로 복사했습니다.

### Character Bible

전서율, 태허진인, 진하연, 연서 설정집을 캐릭터별 문서로 분리했습니다. 서하린, 연무설, 적월아, 설유진은 폴더와 기본 프로필만 만들었으며 공식 정보는 원본 설정집 수령 후 확정합니다.


## v0.8.4.2 플레이 방법

루트 프로젝트를 Live Server로 실행한 뒤 다음 주소로 접속합니다.

```text
http://127.0.0.1:5500/game/
```

현재 플레이 가능한 구간:

```text
1권 → 1부 → 1화 「비 내리는 산길」
```

실제 소설 초안:

```text
story/manuscript/volume-01/part-01/chapter-01-rainy-mountain-road.md
```

게임 데이터:

```text
game/data/volume-01/part-01/chapter-01.json
```

현재 원고 상태는 `draft / canon pending`입니다. 작성자 승인 전까지 공식
Canon으로 확정하지 않습니다.


## v0.8.4.2 캐릭터 비주얼 레퍼런스

작성자가 제공한 캐릭터 이미지를 원본 보존 정책에 따라 다음 위치에 저장했습니다.

```text
archive/characters/_SOURCE/2026-08-04/visual-references/
```

포함 자료:

- 전서율
- 서하린
- 설유진
- 연무설
- 적월아
- 혈천무후 진하연과 천마교주 연서의 2인 레퍼런스

원본 파일은 수정하거나 덮어쓰지 않습니다. 캐릭터별 Character Bible의
`images/references/`에는 확인 편의를 위한 복사본만 배치했습니다.

웹 확인 주소:

```text
/pages/characters/references/
```

현재 이미지는 **공식 게임 스탠딩 에셋이 아니라 제작 기준 레퍼런스**입니다.
다음 단계에서 투명 배경 스탠딩, 표정별 이미지, 초상화와 WebP 최적화본을
별도 생성하여 게임 JSON과 연결합니다.


## v0.8.4.2 게임 엔진 기능

- 실제 SVG 배경 이미지 전환
- 전서율 캐릭터 레이어 표시
- 좌측·중앙·우측 캐릭터 배치 구조
- Web Audio API 기반 지속 빗소리
- 천둥·검 뽑기·검격·기억 잔향 WAV 효과음
- 음소거와 음량 설정
- 텍스트 출력 속도 설정
- 수동 저장 슬롯 3개와 불러오기
- 자동 저장과 이어하기
- 선택지 및 변수 저장
- 대화 로그와 자동 진행

실행:

```text
http://127.0.0.1:5500/game/
```

브라우저 정책상 음향은 `새로 시작` 또는 `이어하기` 버튼을 누른 이후
재생됩니다.


## v0.8.4.2 실행 확인

게임 첫 장면부터 전서율 캐릭터가 표시됩니다. 상단의 `소리 테스트` 버튼을
누르면 천둥 효과음과 빗소리를 즉시 확인할 수 있습니다.

이전 버전을 같은 주소에서 실행했다면 브라우저가 오래된 Service Worker를
사용할 수 있습니다. v0.8.4.2은 localhost 실행 시 기존 천류관 캐시와 Service
Worker를 자동 해제합니다.

확인 순서:

1. 새로 시작
2. 전서율 캐릭터 표시 확인
3. 상단 `소리 테스트` 클릭
4. 천둥 및 지속 빗소리 확인
5. 3번째 문장까지 진행하여 캐릭터 레이어 유지 확인


## v0.8.4.2 한글 에셋 관리 구조

코드와 JSON 내부 ID는 호환성을 위해 영어로 유지하고, 그 외 에셋 관리와
문서 영역은 한글화했습니다.

```text
에셋/
문서/
```

주요 문서:

```text
문서/체크리스트/이미지_에셋_체크리스트.md
문서/에셋_가이드/에셋_관리_가이드.md
```

서하린 기본·표정·전투 이미지와 1~4부 배경 목록 시트를 프로젝트에
정리했습니다. 배경 목록 시트는 제작 계획 자료이며 개별 배경 완성을
의미하지 않습니다.


## v0.8.4.2 서하린 표정 스프라이트

서하린 표정 8종 시트를 게임용 개별 리소스로 자동 분리했습니다.

```text
game/assets/images/characters/seo-harin/expressions/
```

자동 배경 제거 결과는 다음 페이지에서 확인할 수 있습니다.

```text
/pages/characters/seo-harin-expressions/
```

현재 표정 ID는 작성자 확인 전까지 `expression-01`~`expression-08`을
사용합니다. 체크무늬가 이미지에 합성된 원본이므로, 흰색 의상과 머리카락
가장자리는 수동 검수가 필요합니다.


## v0.8.4.2 캐릭터 갤러리

메인 페이지의 `Characters` 메뉴에서 생성한 캐릭터 이미지를 캐릭터별로
확인할 수 있습니다.

```text
/pages/characters/
```

현재 상세 페이지:

```text
/pages/characters/seo-harin/
/pages/characters/jeon-seoyul/
/pages/characters/jeok-wola/
/pages/characters/yeon-museol/
```

각 페이지는 기본·표정·전투 분류 필터와 이미지 확대 보기를 지원합니다.
원본은 `에셋/캐릭터/` 아래에 보존하고, 웹 표시용 WebP와 썸네일은
`assets/images/characters/` 아래에 생성합니다.


## v0.8.4.2 사이트 동기화

기존 정적 페이지가 과거 버전에서 멈춰 있던 문제를 수정했습니다.

- `pages/roadmap/`: 실제 v0.1.0~v0.8.4.2 구현 이력
- `pages/story/`: 1~4부 기획과 1부 1화 게임 알파 상태
- 공통 메뉴: 한글 명칭 통일
- 모든 주요 페이지: 버전 v0.8.4.2 동기화


## v0.8.4.2 캐릭터 레퍼런스·환경음

- 연무설 기본 스탠딩 교체본 추가
- 설유진 캐릭터 갤러리 추가
- 적월아 4K 스탠딩 추가
- 기존 원본 레퍼런스를 캐릭터별 `레퍼런스` 분류로 복원
- Web Audio 합성 빗소리를 `비오는소리.mp3`로 교체

비 음원 위치:

```text
game/assets/audio/ambient/rain.mp3
```

설유진 페이지:

```text
/pages/characters/seol-yujin/
```


## v0.8.4.2 서하린 투명 에셋 수정

원본과 기존 자동 처리본을 보존하고, 표정 8종의 가위·점선 흔적 제거본과 전투 9종의 투명 배경 최종본을 추가했습니다. 웹에서는 `/pages/characters/seo-harin/`의 `최종 표정`, `최종 전투` 필터로 확인합니다.


## v0.8.4.2 상호작용 안정화

장식용 배경·비·비네트 레이어가 버튼을 가로채지 않도록 수정했습니다.
Live Server에서는 이전 Service Worker와 캐시를 자동 정리합니다.

검수 문서:

```text
문서/체크리스트/v0.8.4.2_버튼_상호작용_검수_보고서.md
```
