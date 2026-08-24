# Cheonryugwan Archive

> **천류관 : 흐름의 기록**  
> 원본 소설을 기준으로 세계관, 캐릭터, 기록, 복선, 이미지, 분석 결과와 모바일 인터랙티브 노벨을 함께 관리하는 장기 IP 프로젝트입니다.

현재 버전: **v0.10.7 — HD Background Canonical Mapping**

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


## v0.9.5 플레이 방법

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


## v0.9.5 캐릭터 비주얼 레퍼런스

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


## v0.9.5 게임 엔진 기능

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


## v0.9.5 실행 확인

게임 첫 장면부터 전서율 캐릭터가 표시됩니다. 상단의 `소리 테스트` 버튼을
누르면 천둥 효과음과 빗소리를 즉시 확인할 수 있습니다.

이전 버전을 같은 주소에서 실행했다면 브라우저가 오래된 Service Worker를
사용할 수 있습니다. v0.9.5은 localhost 실행 시 기존 천류관 캐시와 Service
Worker를 자동 해제합니다.

확인 순서:

1. 새로 시작
2. 전서율 캐릭터 표시 확인
3. 상단 `소리 테스트` 클릭
4. 천둥 및 지속 빗소리 확인
5. 3번째 문장까지 진행하여 캐릭터 레이어 유지 확인


## v0.9.5 한글 에셋 관리 구조

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


## v0.9.5 서하린 표정 스프라이트

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


## v0.9.5 캐릭터 갤러리

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


## v0.9.5 사이트 동기화

기존 정적 페이지가 과거 버전에서 멈춰 있던 문제를 수정했습니다.

- `pages/roadmap/`: 실제 v0.1.0~v0.9.5 구현 이력
- `pages/story/`: 1~4부 기획과 1부 1화 게임 알파 상태
- 공통 메뉴: 한글 명칭 통일
- 모든 주요 페이지: 버전 v0.9.5 동기화


## v0.9.5 캐릭터 레퍼런스·환경음

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


## v0.9.5 서하린 투명 에셋 수정

원본과 기존 자동 처리본을 보존하고, 표정 8종의 가위·점선 흔적 제거본과 전투 9종의 투명 배경 최종본을 추가했습니다. 웹에서는 `/pages/characters/seo-harin/`의 `최종 표정`, `최종 전투` 필터로 확인합니다.


## v0.9.5 상호작용 안정화

장식용 배경·비·비네트 레이어가 버튼을 가로채지 않도록 수정했습니다.
Live Server에서는 이전 Service Worker와 캐시를 자동 정리합니다.

검수 문서:

```text
문서/체크리스트/v0.9.5_버튼_상호작용_검수_보고서.md
```


## v0.9.5 Engine Consolidation

엔진 모듈 분리, 챕터 선택, 서하린 테스트 챕터, 저장 키 마이그레이션, 진단창과 자동 검수 스크립트를 추가했습니다.

체크리스트: `문서/체크리스트/앞으로_진행할_작업_체크리스트.md`


## v0.9.5 Engine Stabilization

- SceneManager·BackgroundManager·EffectManager·SaveManager 추가
- Quick Save / Quick Load
- F1 엔진 진단창
- Markdown → Scene JSON 변환기
- Markdown 변환 테스트 챕터
- 배경 페이드와 추가 화면 효과 기반

시나리오 변환 예시:

```powershell
python tools/story_compiler.py `
  "story/게임_시나리오_원본/1부/서하린_엔진_테스트.md" `
  "game/data/compiled/seo-harin-test.json" `
  --id seo-harin-test `
  --title "서하린 테스트"
```


## v0.9.5 Scene Command System

장면 데이터에 조건·변수·플래그·점프·대기 명령을 추가했습니다.

```text
game/schema/chapter.schema.json
game/engine/modules/condition-manager.js
game/engine/modules/command-executor.js
```

다중 캐릭터 표시와 화자 강조, BGM·환경음 교차 전환도 지원합니다.

장면 검증:

```powershell
python tools/validate_scene_schema.py
```


## v0.9.5 Save & Playback Convenience

- 자동 저장 이력
- 읽은 대사 기록과 Skip
- 백로그 장면 이동
- 캐릭터 입장·퇴장 애니메이션
- 캐릭터 연출 테스트 챕터

테스트 챕터:

```text
game/data/compiled/character-animation-test.json
```


## v0.9.5 Quality Gate & Asset Browser

- 모듈 엔진 API 계약 통일
- 저장 데이터 내보내기·가져오기
- 배경·음향 갤러리
- 링크와 매니페스트 리소스 검사
- Playwright E2E Smoke Test
- GitHub Actions Quality Gate

검수:

```powershell
python tools/validate_project.py
python tools/validate_resources.py
npm install
npx playwright install chromium
npm run test:e2e
```


## v0.9.5 Character Asset Replacement

- 기존 캐릭터 웹·게임 이미지 삭제
- 사용자 제공 원본으로 5명 전면 교체
- 전서율 신규 스탠딩 인게임 적용
- 서하린 표정 8종·전투 이미지 연결
- 캐릭터 갤러리와 매니페스트 재생성


## v0.9.8.9.1 Header & Version Synchronization

이 버전은 `Cheonryugwan-Archive-v0.9.5.1-Faction-Expression-Split`을 원본으로 다시 생성했습니다.

- 홈 `CURRENT RELEASE`를 `v0.9.8.9.1`으로 수정
- 캐릭터 목록과 캐릭터 개별 페이지에 공통 헤더 적용
- 홈·아카이브·스토리·세계관·배경·음향·로드맵·소개 헤더 통일
- 현재 페이지 메뉴 자동 강조
- 모바일 메뉴 적용
- v0.9.5.1 캐릭터 원본·웹·인게임 이미지의 SHA-256 해시 유지

캐릭터 이미지는 재변환·재압축·재생성하지 않았습니다.


## v0.9.8.9.1 Archive, Background Catalog & Seo Harin Expressions

- 서하린 반신 표정 시트를 4×2 기준 8장으로 재분리
- 자르기 선과 제목 영역 제외
- 가장자리에 연결된 밝은 배경만 투명 처리
- 기존 인게임 `expression-01~08` 교체
- 1~4부 배경 목록 원본을 배경 갤러리에 등록
- 아카이브 카드 전체를 실제 링크로 활성화
- 캐릭터·배경·음향 바로가기 추가


## v0.9.8.9.1 Image Split Showcase

- 서하린 캐릭터 페이지 상단에 표정 8종 전용 섹션 추가
- 표정 8개를 개별 카드로 강제 표시
- 각 표정 카드에서 원본 개별 이미지 열기 지원
- 1부 배경 목록 시트에서 29개 배경 분리
- 분리된 PNG 원본·WebP 웹 이미지·썸네일 생성
- 배경 페이지에 1부 개별 배경 29종 전용 섹션 추가
- 기존 캐릭터 이미지 파일은 변경하지 않음


## v0.9.8.9 Seo Harin Face Expression Split

- 프로젝트에 보관된 `서하린 표정 8종.png` 원본 사용
- 얼굴 클로즈업 표정 8개 개별 PNG 분리
- 웹용·썸네일·인게임 WebP 생성
- 인게임 `face-expression-01~08` 등록
- 서하린 페이지에 얼굴 클로즈업 전용 섹션 추가
- 기존 반신 표정 8종과 1부 배경 29종 유지

## v0.9.8.9 서하린 반신 표정 교체
- 기존 반신 표정 expression-01~08 삭제
- 사용자 제공 개별 PNG 8장으로 교체
- 웹·썸네일·인게임 리소스 갱신
- 얼굴 클로즈업 face-expression-01~08 유지


## v0.9.8.9 Part 1 Episode 1 Playable

- 1부 1화 `비 내리는 산길` 플레이 가능
- 선택지 제거 및 선형 진행
- 원본 기반 28개 장면
- 실제 1부 배경 01·03 연결
- Story 페이지에서 바로 시작
- URL 챕터 자동 시작 지원
- 기존 캐릭터 이미지 변경 없음


## v0.9.8.9
- 원본 시나리오 4개를 `1권-N부.md`로 저장
- 캐릭터는 본인 대사에서만 표시
- 나레이션과 타인 대사에서 숨김


## v0.9.8.9 — 1부 1화 확장 시나리오 및 장면 CG

- 사용자 작성 확장 JSON을 실행 데이터로 적용
- 총 277개 장면
- 장면 ID 연결 CG 5종
- CG 전용 인게임 레이어와 장면 ID 배지
- 전서율 직접 대사 4개 추가
- 전서율은 본인 대사 장면에서만 스탠딩 표시
- 기억 장면·정파 보고실·암전 배경 등록
- 장면 ID·CG 확인 웹 페이지 추가


## v0.9.8.9 — Scene ID CG Fix

- 장면 JSON의 `scene.id`를 기준으로 CG 자동 매핑
- JSON의 개별 `cg` 속성 없이 `scene-cg.json`만으로 동작
- CG 장면 진입 시 모든 스탠딩 캐릭터 즉시 숨김
- CG가 있는 정확한 장면에서만 CG 표시
- 다음 대사 장면으로 진행하면 CG 즉시 해제
- CG 종료 후 일반 배경 및 화자 스탠딩 규칙 복귀
- 등록 CG 5종의 장면 ID와 파일 경로 전수 검증
- 이미지 사전 로드 및 실패 처리 강화


## v0.9.8.9 — 모바일 제어 패널

- 모바일 상단 메뉴 기본 접힘
- `☰ 메뉴` 버튼으로 패널 열기·닫기
- 외부 영역 터치 및 ESC로 메뉴 닫기
- 진행·저장·설정·고급 관리로 기능 분류
- 저장 내보내기·가져오기·진단을 고급 관리로 이동
- 모바일 버튼 크기와 간격 통일
- iPhone 안전 영역 반영
- 세로·가로 모바일 레이아웃 최적화
- 데스크톱에서는 기존 상단 버튼 방식 유지


## v0.9.8.9 — 모바일 캐릭터 위치 보정

- 모바일에서 캐릭터 기준점을 위로 이동
- 전신·반신 표정·얼굴 클로즈업·전투 스탠딩별 보정값 분리
- 캐릭터별 `mobileLayout` 오프셋 및 스케일 지원
- 장면 데이터의 `mobileOffsetY`, `mobileScale` 개별 재정의 지원
- 전서율 기본 스탠딩 약 12vh 상향
- 서하린 반신 표정 약 15vh 상향
- 모바일 세로·가로 방향별 위치 보정
- 데스크톱 캐릭터 위치 유지
- 기존 접이식 모바일 메뉴 유지


## v0.9.8.9 — 1부 2장 완성 및 모바일 Bottom Sheet

### 1부 2장

- 사용자 제공 180장면을 원본 기준으로 보존
- 에피소드 5 「이름 없는 보고」 140장면 추가
- 에피소드 6 「검 끝의 떨림」 120장면 추가
- 전체 440장면
- 정파 조사관·젊은 기록관·감찰관·생존자·유강 대화 확장
- 전서율의 긴 대사와 심리 묘사 추가
- 이름 없는 보고서와 정파 기록 왜곡 복선 추가
- 폐사찰 대치 및 집행패 과거 사건 복선 추가
- 기존 1부 배경 11종에 신규 ID 매핑
- 화자 본인 대사에서만 캐릭터 스탠딩 표시

### 모바일 메뉴

- 우측 전체 패널을 하단 Bottom Sheet로 변경
- 최대 높이 46vh로 제한
- 게임 메뉴 제목 한 줄 고정
- 진행·저장·설정 카테고리 아코디언 적용
- 진행 메뉴만 기본 펼침
- 고급 관리 별도 접기 유지


## v0.9.9.5 — Markdown Scenario Editor

- `pages/manuscript/editor/` 시나리오 편집기 추가
- 원본·신규·로컬 Markdown 편집 지원
- 실시간 미리보기 및 원본 Diff
- 자동 임시 저장 및 작업 복원
- Markdown·manifest·작업 ZIP 내보내기
- 정적 GitHub Pages 환경을 고려해 서버 원본은 직접 덮어쓰지 않음


## v0.9.9.5 — Markdown → JSON Converter

- `pages/manuscript/converter/` 추가
- Markdown을 천류관 게임 Scene JSON으로 자동 변환
- 명시적 화자, 캐릭터, 배경, BGM, Effect 기본 매핑
- 변환 결과·경고·예상 플레이 시간 확인 및 JSON 다운로드
- Markdown Editor에서 현재 작업본을 변환기로 직접 전달


## v0.9.9.5 — Scene Editor

- `pages/manuscript/scene-editor/` 추가
- Scene 카드 기반 JSON 편집
- Drag/추가/복제/삭제/ID 재정렬
- Character·Expression·Background·Audio·Effect·Camera·CG 선택
- 에셋 및 게임 표시 규칙 Validation
- 수정 JSON과 Validation Report 내보내기


## v0.9.9.5 — Game Preview

- `pages/manuscript/game-preview/` 추가
- Scene Editor JSON을 프로젝트 파일 교체 없이 즉시 플레이
- 실제 Background / Character / Expression / CG / Audio 렌더링
- Desktop / Tablet / Mobile 반응형 프리뷰
- Scene 이동 / 자동 진행 / Timeline / Debug / Missing Asset 검사
