# 천류관 Novel Archive v0.6.7

## 로컬 실행

```powershell
npm install
npm run dev
```

실제 `min-ser/NOVEL` 원고만 사용합니다. Git과 원고 저장소 접근 권한이 필요합니다. 샘플 원고는 포함하지 않습니다.

## GitHub Pages 배포 — 최초 1회 설정

1. ZIP의 **프로젝트 내용**을 기존 블로그 저장소의 `Portfolio/novel/cheonryugwan/`에 배치합니다.
2. `integration/deploy-personal-site.yml`을 **블로그 저장소 루트의** `.github/workflows/deploy-personal-site.yml`에 복사합니다. 기존 배포 워크플로를 이 파일로 교체하되, 다른 워크플로가 동시에 Pages를 배포하지 않도록 확인하세요.
3. `min-ser/NOVEL`이 비공개라면 `NOVEL_TOKEN` repository secret을 설정합니다(해당 저장소 Contents: Read 권한). 공개 저장소라면 기본 토큰으로 시도할 수 있습니다.
4. Git Push하면 루트 블로그 및 기존 `Portfolio/study/ai`, `Portfolio/study/cs` 빌드 후 천류관을 별도 빌드하여 `_final_site/Portfolio/novel/cheonryugwan/`에 **빌드 결과만** 배포합니다.
5. `https://min-ser.github.io/Portfolio/novel/cheonryugwan/`에서 확인합니다.

**주의:** 원고 저장소 실접근 및 실제 Pages 배포는 이 환경에서 검증하지 못했습니다. 기존 블로그 루트 워크플로는 사용자가 제공한 원문을 기준으로 보존·확장했습니다. `.github/workflows/` 아래 YAML은 블로그 저장소 **루트**에 있어야 인식됩니다.

## 검증

```powershell
npm run check
npm run build
npm run verify:dist
```

`npm run build`는 원고 동기화에 실패하면 실패합니다. 검증 실패 시 기존 공개 사이트를 새 실패 데이터로 덮어쓰지 않습니다.

- `docs/UPDATE_CHECKLIST.md` — v1.0.0까지 남은 체크리스트
- `docs/UPDATE_ROADMAP.md` — 버전별 목표
- `docs/DEPLOY_FIX.md` — 이전 배포 오류 분석
- `integration/deploy-personal-site.yml` — 기존 블로그용 전체 GitHub Actions 워크플로

## v0.6.7 변경
- Private 저장소 Secret 이름을 실제 등록된 `NOVEL_TOKEN`으로 통일합니다.
- 동기화 시 이전 archive 이미지 삭제 및 비공개 폴더 필터 강화.
- 고서 리더의 긴 한글 문단 분할, 글자 크기 변경 시 읽던 원고 블록 위치 보존.
- `npm run test:integration`: 임시 테스트 데이터는 OS 임시 디렉터리에서 생성·삭제됩니다.


## v0.6.8 업데이트
- 회차별 이어 읽기 위치를 브라우저 로컬 저장소에 저장합니다.
- 책을 다시 펼치면 저장된 두 쪽부터 읽습니다. `↺ 처음`으로 초기화합니다.
- 퍼블리싱 참고용 예시 원고는 별도의 독립 HTML에만 존재합니다. 실제 프로젝트 콘텐츠에 포함되지 않습니다.
- 누적 체크리스트: `docs/UPDATE_CHECKLIST.md`


## v0.6.9
- 고서 리더 페이지 분할 측정을 별도 숨김 프로브로 분리했습니다.
- 페이지 이동 버튼 HTML 오타를 수정했습니다.
- 삽화·표·코드 블록의 잘림 위험을 줄이고, 읽기 효과 설정 변경 시 페이지를 유지합니다.
- 실제 원고는 `min-ser/NOVEL`에서만 동기화하며 예시 원고는 운영 파일에 포함하지 않습니다.
- 잔여 작업은 `docs/UPDATE_CHECKLIST.md`를 참고하세요.
