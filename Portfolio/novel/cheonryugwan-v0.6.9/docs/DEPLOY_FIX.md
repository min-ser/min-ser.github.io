# v0.6.5 콘텐츠 오류 원인 및 배포 수정

## 확인된 문제
- v0.6.4 `static/content.json`이 `SYNC_FAILED`, `count: 0` 상태로 패키징됨.
- 기존 `build.mjs`는 원고 데이터의 정상 여부를 검사하지 않고 dist에 복사할 수 있었음.
- 배포 URL `/Portfolio/novel/cheonryugwan/`에는 해당 폴더의 `index.html`, `app.js`, `content.json`, `assets/`가 **함께** 배치되어야 함.
- 공개 사이트의 정확한 실패 원인은 GitHub Actions 로그 및 실제 배포된 `content.json` HTTP 응답 확인 전에는 단정할 수 없음.

## 수정 사항
- 원고 동기화 실패 시 명시적인 실패 상태를 남기고 명령을 비정상 종료.
- `npm run build`는 원고 회차가 없거나 동기화 실패 시 배포 산출물 생성을 거부.
- `NOVEL_SOURCE_DIR` 환경변수로 GitHub Actions에서 이미 체크아웃한 NOVEL 저장소를 재사용할 수 있음.
- 실제 원고가 없는 프로젝트 ZIP에는 `NOT_SYNCED` 표식만 포함하며 예시 원고를 포함하지 않음.

## 기존 GitHub Actions에 최초 한 번 추가
기존 블로그의 `npm run build` 전에 다음 단계를 추가합니다. 별도 원고 저장소가 비공개라면 읽기 권한이 있는 토큰을 `NOVEL_READ_TOKEN` secret으로 등록해야 합니다.

```yaml
- name: Checkout NOVEL
  uses: actions/checkout@v4
  with:
    repository: min-ser/NOVEL
    ref: master
    path: .novel-source
    # private repo일 경우: token: ${{ secrets.NOVEL_READ_TOKEN }}
- name: Build blog
  run: npm run build
- name: Build Cheonryugwan
  working-directory: Portfolio/novel/cheonryugwan
  env:
    NOVEL_SOURCE_DIR: ${{ github.workspace }}/.novel-source/CHEONRYUGWAN
  run: |
    npm ci
    npm run build
- name: Include novel in Next.js export
  run: |
    mkdir -p out/Portfolio/novel/cheonryugwan
    cp -a Portfolio/novel/cheonryugwan/dist/. out/Portfolio/novel/cheonryugwan/
```

**주의:** 위 코드는 기존 워크플로에 삽입할 예시이며, 실제 블로그의 빌드/배포 경로에 맞게 배치해야 합니다. 특히 기존 Next.js `out/Portfolio/novel/cheonryugwan` 경로에 이미 같은 페이지가 생성되는지 확인하십시오. GitHub Pages artifact 업로드는 위 복사 이후 실행되어야 합니다.

## 확인할 공개 URL
- `/Portfolio/novel/cheonryugwan/content.json` : HTTP 200, `count > 0`, `revision != SYNC_FAILED`
- `/Portfolio/novel/cheonryugwan/app.js` : HTTP 200
- `/Portfolio/novel/cheonryugwan/assets/academy.webp` : HTTP 200
- 브라우저 새로고침: `Ctrl + Shift + R`
