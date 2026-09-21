# Changelog

## v0.10.8 - Deployment Path Fix

- Release ZIP internal root normalized to `Cheonryugwan-Archive/`.
- Fixes GitHub Pages 404 at `/Portfolio/Game/Cheonryugwan-Archive/index.html`.
- Removed stale internal directory name `Cheonryugwan-Archive-v0.10.5-Game-Runtime-Fix`.
- Added `.nojekyll` for static GitHub Pages deployment.
- Added `docs/DEPLOYMENT_PATH.md`.
- v0.10.7 background canonical mapping retained unchanged.

## v0.10.8 - HD Background Canonical Mapping

- 사용자 확정 배경 목록을 canonical 기준으로 재정의
- 1부 29 / 2부 32 / 3부 40 / 4부 33장면 / 공통 11 매핑
- 4부 실제 고유 원격 이미지 29장 + 명시적 재사용 4장면
- 4부 29→09, 31→30, 32→03 재사용
- 4부 33은 기존 자연/산악 고화질 배경 재사용
- 모든 로컬 저화질 배경/썸네일 삭제 및 fallback 제거
- GitHub Cheonryugwan-Image 원격 PNG를 배경 단일 소스로 사용

# Changelog

## v0.10.6 - Background Repository Audit & Cleanup

- GitHub Cheonryugwan-Image 기준 1~4부 및 공통 배경 재검수
- 1~3부와 공통 배경을 원격 고화질 PNG 기준으로 통일
- 4부 저장소 실제 파일 01~28, 30을 제목/의미 기준으로 원격 연결하고 원본 목록의 19번 결번에 따른 번호 밀림 수정
- 4부 원본 목록의 19번 결번을 데이터에 명시
- 원격 미등록 4부 31~47은 로컬 분리본을 보존하고 고화질로 오표기하지 않음
- 배경 갤러리를 manifest 기반 동적 렌더링으로 변경하여 데이터/화면 매핑 이중관리 제거
- 공통 저해상도 분리본, 목록 원본 이미지, 중복 썸네일 제거

## v0.10.5 - Game Runtime Start Fix

- 공통 Header 정리 과정에서 삭제된 게임 내부 HUD 복구
- Shared Header가 게임 내부 `header.topbar`를 삭제하지 않도록 범위 수정
- 게임 시작 필수 DOM 컨트롤 회귀 검증 추가

## v0.10.5 - Scenario Editor Functional Upgrade

- Scenario Editor를 단순 CRUD 화면에서 실제 제작 툴 구조로 확장
- 게임 연출 필드, Drag & Drop, Undo/Redo, 검색, Validation 구현
- Background / Character / CG / Audio Registry Picker 추가
- Live Preview의 이전/다음/자동 진행 및 Runtime 실행 추가
- 하단 Validation / Scene JSON / Console 패널 추가
- 선택지 JSON 검사 및 중복 Scene ID 검사
- Export 전 오류 확인
- 키보드 단축키 Ctrl+S / Ctrl+Z / Ctrl+Y 지원

## v0.10.3 - Shared UI Architecture

- Header 공통화에 이어 UI 기반 구조 전면 공통화
- Design Token / Base / Layout / Component CSS 분리
- Storage / Utils / Asset Registry 공통 Core 모듈 추가
- Footer / Sidebar / Page Header / Modal / Toast 공통 컴포넌트 추가
- 모든 HTML에 공통 App Bootstrap 적용
- Scenario Editor의 로컬 저장, 다운로드, 배경 로딩, 알림을 공통 모듈 기반으로 전환
- 배경 데이터는 Asset Registry를 통해 단일 로딩 경로 사용
- 향후 Character / CG / Audio Registry를 동일 구조로 확장 가능

## v0.10.2 - Shared Global Header

- 페이지마다 별도로 존재하던 Header 구현 제거
- `assets/js/shared-header.js`를 공통 Header의 Single Source of Truth로 지정
- 모든 HTML 페이지에서 동일 Header를 동적으로 삽입
- Dashboard / Scenario / Story / Assets / Characters / Lore / Roadmap / Play 메뉴 통합
- 현재 경로 기반 Active 메뉴 자동 표시
- 모바일 햄버거 메뉴 추가
- 기존 `site-header.js` 삽입 제거로 중복 Header 방지
- Header 버전 표기도 공통 컴포넌트 한 곳에서 관리

## v0.10.1 - Unified Editor UI

- 기존 홈 외 페이지에 남아 있던 구형 금색/갈색 테마 전면 제거
- 모든 HTML 페이지에 Editor Console 공통 다크 스타일 적용
- 기존 페이지 상단에 Dashboard / Scenario / Assets / Play 제작 툴 네비게이션 추가
- 카드, 패널, 폼, 표, 코드, Footer까지 다크 IDE 스타일 통일
- 기존 콘텐츠와 기능은 유지하고 표현 계층을 Editor Console 기준으로 재구성
- 모바일에서도 공통 Editor navigation 사용


## v0.10.0 - Editor Console Editor Tool Update

- v0.10.0 메인 버전 승격
- 웹을 다크 터미널/게임 제작도구 스타일로 전환
- Visual Scenario Editor, JSON Import/Export, Scene CRUD, Inspector, Background Browser, Live Preview, Local Draft 구현

## v0.9.10.10 - Part 2 Remote Image Integration

- GitHub `Backgrounds/part2`를 다시 확인하여 한글 번호 PNG 32개 존재 확인
- 2부 01~32 전체를 Cheonryugwan-Image 원격 PNG로 전환
- 2부 manifest 이름/파일명을 GitHub 실제 파일명 기준으로 재정렬
- 이전 임시 재매핑 이름 제거 및 공식 2부 번호 체계 복원
- 프로젝트 내부 2부 중복 WebP/썸네일 64개 제거
- 웹 배경 갤러리 2부 32장 모두 GitHub 원격 이미지 사용
- `asset-config.json`의 part2 정책을 `remote`로 변경
- 로컬 fallback은 현재 4부 미업로드 항목에만 유지

## v0.9.10.9 - Remote Image Repository Integration

- Cheonryugwan-Image 저장소를 배경 이미지 원격 원본으로 연동
- 1부 29개 원격 PNG 전환
- 3부 40개 원격 PNG 전환
- 4부 현재 저장소에서 확인 가능한 29개만 원격 PNG 전환
- 2부는 영문 자동 생성 파일명 문제를 확인하여 원격 매핑 중단, 기존 로컬 이미지 유지
- 검증된 원격 이미지의 프로젝트 내부 중복 WebP/썸네일 205개 삭제
- 게임 1부 배경 런타임 경로를 원격 PNG로 전환
- 웹 배경 갤러리 원격/로컬 혼합 로딩 적용
- `data/asset-config.json` 추가
- 원격 미확인 이미지는 삭제하지 않는 안전 정책 적용

## v0.9.10.8 - Filename & Background Full Audit

- 깨진 ZIP 한글 파일/폴더명 12건 복구
- `1권-1부.md` ~ `1권-4부.md` 정상 한글 파일명 복원
- 게임 시나리오 원본/확장 JSON 파일명 정상화
- `story/게임_시나리오_원본/1부/` 깨진 폴더 및 테스트 MD 파일명 정상화
- 1~4부 147개 배경 파일/Manifest/웹 카드 전수검수
- 2부 `file` 메타데이터를 실제 HD WebP 파일 기준으로 정리
- 2부 bg-18은 삭제하지 않고 `참고 이미지`로 명확하게 분류
- 3부 31 `연구 분석 대청`의 잘못된 무기 보관소 이미지 교체
- 4부 명백한 타 장소/타 세력 오매핑 12건 교정
- 4부 원본 목록의 19번 누락을 `originalNumber`로 보존
- 웹 갤러리에서 4부 원본 번호 1~18, 20~47 표시
- 파일명 및 배경 전수검수 보고서 추가

## v0.9.10.7 - Background Gallery Restore

- v0.9.10.6에서 누락된 웹 배경 갤러리 섹션 재구성
- 1부 29 / 2부 32 / 3부 40 / 4부 46개, 총 147개 표시
- 2부 bg-18 이미지 및 목록 항목 복원
- 웹 등록 이미지는 게임 사용 여부와 무관하게 유지하는 정책 적용
- 1~4부 동일 카드 배열: 데스크톱 4열 / 태블릿 2열 / 모바일 1열
- 파일 중복 최적화와 웹 카드 노출 정책 분리

## v0.9.10.6 - Background Gallery & Asset Mapping Cleanup

- 깨진 인코딩의 구버전 폴더 `∞ùÉ∞àï/`, `δ¼╕∞ä£/` 제거
- 약 142.2 MB의 불필요 구버전 자료 제거
- `archive/`와 `archives/`는 서로 다른 용도로 사용 중이므로 유지
- 2·3·4부 배경 갤러리를 1부와 동일한 4열 카드 배열로 통일
- 갤러리 최대 폭 1440px, 태블릿 2열, 모바일 1열 적용
- 모든 갤러리 카드 이미지 영역을 16:9로 통일
- 2부 HD 배경을 실제 이미지 기준으로 이름 및 분류 재검수
- 기존 배경 ID/파일 경로 유지로 시나리오 호환성 보존
- 2부 `bg-18.webp`가 독립 배경이 아닌 목록 시트 조각임을 확인하여 제거
- `docs/backgrounds/2부_배경_매핑_검수.md` 추가
- `docs/backgrounds/v0.9.10.6_구조_정리.md` 추가

## v0.9.10.5 - HD Background Asset Replacement

- 업로드된 고화질 배경 에셋으로 기존 웹/게임 배경을 교체.
- 1부: 29종 교체.
- 2부: 31종 교체(업로드 ZIP 내 31종).
- 3부: 40종 교체.
- 4부: 29종 교체(업로드 ZIP에 포함된 번호만 적용).
- `assets/`와 `game/assets/`를 동기화하여 사이트 갤러리와 인게임이 같은 고화질 에셋을 사용.
- 원본 PNG가 번호 매핑 가능한 경우 `에셋/배경/<부>/개별`에도 반영.
- 데이터 카탈로그의 해상도/status/version 메타데이터 갱신.

## v0.9.10.3 - Part 4 Background Split

- 4부 배경 목록 원본 1536×1024 별도 보존
- 4부 본편 배경 46종 개별 PNG 분리
- 4부 웹용 WebP 46종 및 썸네일 46종 생성
- 시트 하단 공통 날씨·시간 11종 추가 분리
- 공통 날씨·시간 PNG/WebP/썸네일 각각 11종 생성
- `data/part-4-backgrounds.json` 추가
- `data/common-weather-backgrounds.json` 추가
- 배경 아카이브에서 4부와 공통 날씨 자산 확인/확대 지원
- 이미지 에셋 체크리스트 완료 상태 갱신

## v0.9.10.2 - Part 3 Background Split

- 3부 배경 목록 원본 1536×1024 별도 보존
- 원본 시트의 실제 배경 40종 개별 PNG 분리
- 웹용 WebP 40종 및 썸네일 40종 생성
- `data/part-3-backgrounds.json` 추가
- 배경 아카이브에서 3부 40종 확인 및 확대 지원
- 기존 체크리스트에서 빠져 있던 28번 `심연 같은 협곡` 추가
- 3부 배경 체크리스트 완료 처리

## v0.9.10.1 - Part 2 Background Split

- 2부 배경 목록 원본 1536×1024 보존
- 원본 시트에서 32개 배경을 개별 PNG로 분리
- 웹용 WebP 및 썸네일 32종 생성
- `data/part-2-backgrounds.json` 매니페스트 추가
- 배경 아카이브에서 2부 32종을 직접 확인/확대 가능
- 이미지 에셋 체크리스트의 2부 배경 32종 완료 처리

## v0.9.10.0 - World Bible & UI Cleanup

### Added
- 1권 1부~4부 원본 소설 기반 World Bible 데이터
- 세력: 정파 / 사파 / 마교 / 천류관
- 무공·경지: 흐름 / 천류 / 화경
- 장소: 비 내리는 산길 / 정파 무관 / 사파 도시 / 투기장 / 절·폐사찰
- 핵심 개념: 무림 공적 / 마도 규정 / 기록 은폐 / 중립
- 1~4부 사건 연표
- 세계관 검색 / 카테고리 필터 / 상세 패널
- 각 설정에서 해당 원본 Markdown Viewer로 직접 이동
- UI Control Audit 도구 (`tools/audit-ui-controls.py`)

### Changed
- 세계관 페이지의 비기능성 정적 카드 3개를 실제 탐색 UI로 전면 교체
- 아카이브 세계관 설명을 실제 원본 기반 기능에 맞게 수정
- 홈 World Bible 설명과 Current Release 표기 갱신

### Quality
- 존재하지 않는 내부 링크 0건
- disabled 버튼 0건
- handler 없는 ID 버튼 0건

## v0.9.9.5 - Integrated Scenario Workspace

### Added
- Original Story / Markdown Editor / JSON Converter / Scene Editor / Game Preview / Validation 통합 작업실
- Manifest 기반 원본 목록 및 상태 필터
- Workspace 내 Markdown 간이 편집/미리보기
- 신규 Markdown 작업 및 로컬 Import
- 파일명 권/부 자동 추출
- 첫 H1 제목 자동 추출
- 기본 Markdown → Scene JSON 변환
- Scene Editor / Game Preview 상태 전달
- Workspace 작업 상태 LocalStorage 저장
- Scene / 대사 / 나레이션 / Asset / 예상 플레이 시간 통계
- Speaker별 대사 통계
- Background / Character / CG 사용 통계
- Character 노출 규칙 / CG 충돌 기본 Validation
- Markdown / Manifest Entry / JSON / Validation / Summary / Used Assets Export
- 통합 Workspace 결과 JSON Export

## v0.9.9.5 - Game Preview

### Added
- Scene Editor JSON 브라우저 메모리 즉시 실행
- 로컬 JSON Preview Import
- Scene Jump / Prev / Next
- Auto Play 및 재생 속도 선택
- Desktop / Tablet / Mobile Portrait / Mobile Landscape 프리뷰
- 실제 Background 에셋 렌더링
- 실제 Character / Expression 에셋 렌더링
- Scene ID 기반 CG 자동 렌더링
- CG 표시 중 Character 자동 숨김
- BGM / Ambient / SFX Preview
- Flash / Shake / Memory / Dark Vignette Effect Preview
- Slow Zoom / Portrait Close-up Camera Preview
- 현재 Scene ID 및 챕터 제목 표시
- Scene Timeline
- Asset Inspector
- Missing Asset / 규칙 위반 Error 표시
- Preview Console
- Scene Editor ↔ Game Preview 왕복

### Changed
- Scene Editor의 Game Preview 버튼 활성화
- 원본 스토리 작업 페이지에 Game Preview 진입 버튼 추가

## v0.9.9.5 - Scene Editor

### Added
- Converter JSON 직접 불러오기
- 로컬 JSON Import
- 신규 Scene JSON 생성
- Scene 카드 편집 UI
- Drag 순서 변경
- Scene 추가 / 복제 / 삭제
- Scene ID 자동 재정렬
- Speaker / Text 직접 편집
- Character / Expression / Position 선택
- Background / BGM / Ambient / SFX 선택
- Effect / Camera 선택
- CG 선택
- JSON 원문 편집 모드
- Scene 검색 및 유형 필터
- JSON/Character/Expression/Background/Audio/CG 규칙 검증
- 비화자 Character 노출 검사
- CG + Character 동시 노출 검사
- 수정 JSON 다운로드
- Validation Report 다운로드

### Changed
- Markdown → JSON Converter에서 Scene Editor로 직접 전달 지원
- 원본 스토리 페이지에 Scene Editor 진입 버튼 추가

## v0.9.9.5 - Markdown → JSON Converter

### Added
- Markdown 구조 Parser
- 장/화 문맥 분석
- `인물명: 대사` 화자 분석
- 인용문 대사 후보 분석 및 화자 미확정 경고
- 긴 문단 자동 Scene 분할
- Scene ID 자동 생성
- Speaker 자동 생성
- Character manifest 기반 캐릭터 매핑
- 화자 본인 대사에서만 캐릭터 스탠딩 생성
- Background manifest 기반 기본 배경 선택
- 키워드 기반 배경 추천
- BGM/환경음 기본값 선택
- 키워드 기반 Effect/SFX 추천
- 마지막 Scene 자동 `end: true`
- JSON 다운로드 및 클립보드 복사
- 예상 Scene 수 / 플레이 시간 / 대사·나레이션 통계
- 변환 경고·추천 목록
- Scene 카드 미리보기
- 변환 분석 Markdown 보고서

### Changed
- Markdown Editor에서 현재 편집 내용을 JSON 변환기로 직접 전달 가능
- 원본 스토리 페이지에 JSON 변환기 진입 버튼 추가

## v0.9.9.5 - Markdown Scenario Editor

### Added
- manifest 기반 원본 문서 선택 및 불러오기
- 신규 Markdown 문서 생성
- 로컬 Markdown 파일 가져오기
- 파일명 기반 권·부 자동 인식
- 첫 번째 H1 기반 제목 자동 추출
- 브라우저 Markdown 편집기
- 실시간 Markdown 미리보기
- 데스크톱 좌우 분할 및 모바일 탭 전환
- 찾기·바꾸기·모두 바꾸기
- 실행 취소·다시 실행
- 브라우저 자동 임시 저장 및 복원
- 전체 화면 편집 모드
- 줄 단위 원본 Diff 및 변경 통계
- Markdown 다운로드
- 수정된 manifest 다운로드
- Markdown·manifest·내보내기 메모 ZIP 다운로드

### Changed
- 공통 Header에 원본 스토리 메뉴 실제 등록
- 원본 스토리 목록에 에디터 진입 버튼 추가

## v0.9.8.9 - Chapter 2 Expanded & Mobile Bottom Sheet

- 1권 1부 2장 JSON을 440장면으로 확장
- 에피소드 4~6 전체 플레이 가능
- 정파 조사와 기록 왜곡 서사 추가
- 폐사찰 대화 및 유강 등장 추가
- 전서율 대사·심리·과거 복선 확장
- 1부 기존 배경 에셋 기반 11개 장면 ID 매핑
- 챕터 목록과 Story 페이지에 2장 등록
- 모바일 메뉴를 46vh 하단 시트로 축소
- 게임 메뉴 제목 강제 한 줄 처리
- 메뉴 카테고리 아코디언 적용
- 기존 이미지 파일 변경 없음


## v0.9.8.9 - Mobile Character Position Correction

- 모바일 캐릭터 위치를 위쪽으로 보정
- 캐릭터 매니페스트에 `mobileLayout` 추가
- 기본·표정·얼굴 클로즈업·전투 유형 자동 판별
- 캐릭터별 모바일 위치 및 스케일 분리
- 세로 화면에서 대사창 뒤 캐릭터 가림 감소
- 가로 화면 전용 위치 보정
- 데스크톱 위치 유지
- 기존 이미지 변경 없음


## v0.9.8.9 - Mobile Control Panel

- 모바일에서 상단 관리 메뉴 기본 숨김
- 접이식 우측 제어 패널 추가
- 메뉴 토글·닫기·배경 터치·ESC 닫기 구현
- 메뉴 기능을 진행·저장·설정·고급 관리로 재분류
- 모바일 터치 버튼 최소 높이 48px 적용
- 모바일 안전 영역과 화면 회전 대응
- 대사창 크기 및 모바일 글자 크기 재조정
- 데스크톱 레이아웃 유지
- 기존 이미지 및 시나리오 데이터 변경 없음


## v0.9.8.9 - Scene ID CG Fix

- `scene.id` 기반 CG 자동 조회 구현
- CG 매니페스트를 단일 매핑 기준으로 변경
- CG 장면에서 캐릭터 레이어 강제 숨김
- CG 장면에서 전투 스탠딩 표시 차단
- CG가 없는 다음 장면에서 즉시 원래 배경으로 복귀
- 비동기 이미지 로딩 및 로드 충돌 방지 토큰 추가
- CG 로딩 실패 로그 및 안전 해제 처리 추가
- 명시적 `cg` 속성 5개 제거
- 등록 CG 5종 ID 및 파일 경로 검증


## v0.9.8.9 - Episode 1 Expanded Scenario & Scene CG

- 사용자 제공 확장 시나리오 반영
- 1부 1화 277개 장면
- 장면 ID 기반 CG 5종 연결
- CG 레이어·전환·ID 배지 추가
- 전서율 직접 대사 4개 추가
- 화자 전용 캐릭터 표시 규칙 유지
- 누락 배경 ID 등록
- Story 페이지에 CG 확인 링크 추가


## v0.9.8.9 - Original Markdown & Speaker-only Visibility

- 1권-1부.md ~ 1권-4부.md 추가
- 기존 비표준 원본 수신 파일 제거
- 화자 일치 시에만 캐릭터 표시
- 나레이션·타인 대사에서 캐릭터 숨김
- 기존 이미지 변경 없음


## v0.9.8.9 - Part 1 Episode 1 Playable

- 1부 1화 선형 플레이 적용
- 선택지 장면 제거
- 원본 시나리오 순서 유지
- 28개 장면 플레이 가능
- 실제 비 오는 산길·피로 물든 산길 배경 연결
- URL 챕터 자동 시작 기능 추가
- Story 페이지 플레이 버튼 활성화
- 기존 캐릭터 에셋 보존


## v0.9.8.9 - Seo Harin Half-body Expression Replacement

- 기존 서하린 반신 표정 8개 삭제
- 사용자 제공 개별 투명 PNG 8개로 교체
- expression-01~08 웹·썸네일·인게임 파일 갱신
- 얼굴 클로즈업 표정 8종 유지
- 다른 캐릭터 및 배경 이미지 변경 없음


## v0.9.8.9 - Seo Harin Face Expression Split

- 서하린 큰 얼굴 표정 시트 8개 개별 이미지 분리
- 원본 투명 배경 유지
- 개별 PNG·웹 WebP·썸네일·인게임 리소스 생성
- 게임 매니페스트에 face-expression-01~08 등록
- 서하린 캐릭터 페이지에 얼굴 클로즈업 표정 섹션 추가
- 기존 반신 표정과 1부 배경 분리본 유지


## v0.9.8.9.1 - Image Split Showcase

- 서하린 표정 8종 전용 갤러리 섹션 추가
- 서하린 표정 카드 8개를 캐릭터 페이지에 직접 렌더링
- 1부 배경 목록에서 29개 이미지 분리
- 1부 배경 PNG 원본 및 WebP 파생 이미지 생성
- 배경 페이지에 29개 개별 카드 추가
- 배경 번호·이름·분류·해상도 표시
- 분리된 원본 클릭 확대 기능 추가
- 기존 캐릭터 이미지 바이트 불변 검수


## v0.9.8.9.1 - Archive, Background Catalog & Seo Harin Expressions

- 서하린 반신 표정 시트 8개 개별 이미지 재분리
- 가위·점선·제목 영역 제거
- 서하린 표정 이미지 투명 배경 처리 및 인게임 교체
- 1부·2부·3부·4부 배경 목록 원본 등록
- 배경 페이지에 부별 목록 원본 섹션 추가
- 아카이브 World 카드 활성화
- 아카이브 Records 카드 활성화
- 아카이브 Foreshadow 카드 활성화
- 캐릭터·배경·음향 아카이브 바로가기 추가
- 사이트 버전 v0.9.8.9.1 동기화


## v0.9.8.9.1 - Header & Version Synchronization

- v0.9.5.1 원본 프로젝트에서 재작업
- 홈 CURRENT RELEASE의 v0.8.4.2 잔존 표기 수정
- 캐릭터 목록 페이지 헤더를 공통 헤더로 교체
- 캐릭터 개별 페이지 5개의 헤더를 공통 헤더로 교체
- 전체 콘텐츠 페이지의 메뉴·브랜드·현재 페이지 강조 통일
- 모바일 공통 메뉴 적용
- 캐릭터 이미지 에셋 해시 불변 검수 추가
- 캐릭터 원본·웹·인게임 이미지 변경 없음


## v0.9.5 - Character Asset Replacement

- 기존 캐릭터 이미지 전면 삭제 및 사용자 원본 교체
- 전서율 신규 스탠딩 적용
- 서하린 표정·전투 인게임 연결
- 설유진·연무설·적월아 기본·훈련복 연결
- 캐릭터 갤러리와 매니페스트 갱신


## v0.9.4 - Quality Gate & Asset Browser

- 엔진 모듈 API Export/Import 계약 통일
- 실행 `app.js`를 모듈 엔진 구조로 재작성
- v0.9.4 저장 키와 과거 저장 데이터 마이그레이션
- 저장 데이터 JSON 내보내기·가져오기
- 백로그 최대 300개 영구 보존
- 배경 갤러리 추가
- 음향 갤러리 추가
- HTML 링크 및 매니페스트 리소스 검사기 추가
- Playwright 브라우저 Smoke Test 추가
- GitHub Actions Quality Gate 추가
- 프로젝트 자동검수 통합
- 향후 작업 체크리스트 갱신


## v0.9.3 - Save & Playback Convenience

- ReadingManager 추가
- 읽은 대사 영구 기록
- 읽은 대사 건너뛰기
- 자동 저장 이력 30개 보관
- 자동 저장 이력 불러오기
- Quick Save 스키마 v3
- 백로그 장면 이동
- 캐릭터 슬라이드·페이드 등장
- 캐릭터 슬라이드·페이드 퇴장
- 캐릭터 애니메이션 테스트 챕터
- Chapter Schema 애니메이션 명령 확장
- 자동 검수 항목 추가
- 향후 작업 체크리스트 갱신


## v0.9.2 - Scene Command System

- ConditionManager 추가
- CommandExecutor 추가
- 조건문·변수 비교·플래그·장면 점프·대기 명령 구현
- 다중 캐릭터 동시 표시
- 화자 강조와 비화자 디밍
- 캐릭터 개별 숨김과 위치 이동 API
- BGM·환경음 교차 전환
- 오디오 페이드 정지
- Markdown Story Compiler 명령 확장
- 챕터 JSON Schema 추가
- 장면 데이터 검증기 추가
- 조건 분기·다중 캐릭터 테스트 챕터 추가
- 자동 검수 스크립트 강화
- 향후 작업 체크리스트 갱신


## v0.9.1 - Engine Stabilization & Story Pipeline

- SceneManager 모듈 추가
- BackgroundManager 모듈 추가
- EffectManager 모듈 추가
- SaveManager 모듈 추가
- Quick Save·Quick Load 구현
- F1 엔진 진단창과 상태 정보 강화
- Ctrl+F5·F9 단축키 추가
- Markdown → Scene JSON 변환기 추가
- 변환용 Markdown 샘플 및 컴파일 결과 추가
- 컴파일된 테스트 챕터 등록
- 배경 페이드와 추가 화면 효과 기반 구현
- 프로젝트 검수 스크립트 확장
- 향후 작업 체크리스트 갱신


## v0.9.0 - Engine Consolidation

- 엔진 모듈 분리
- 챕터 선택 화면
- 서하린 표정·전투 테스트 챕터
- 저장 키 v0.9 마이그레이션
- BGM Manager 구조
- 진단창과 자동 검수 스크립트
- 초기 프로토타입 legacy 분리
- 향후 작업 체크리스트


## v0.9.8.9.1 - Unicode Filename Fix

- ZIP 내부에서 CP437로 잘못 해석된 한글 파일명 복구
- `에셋`, `문서`, `캐릭터`, 캐릭터 이름과 이미지 파일명 정상화
- JSON·Markdown·HTML에 남은 깨진 한글 경로 문자열 복구
- UTF-8 파일명 플래그를 사용해 ZIP 재생성
- 한글 파일명 자동 검수 보고서 추가
- v0.8.4.1 버튼·JavaScript 수정사항 유지


## v0.9.8.9.1 - Interaction & JavaScript Fix

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
