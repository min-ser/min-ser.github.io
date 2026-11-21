# 기존 Git 블로그 GitHub Actions 연동

기존 `min-ser.github.io`는 Next.js 정적 출력 `out/`을 배포한다는 전제의 연동 예시입니다. **기존 deploy 워크플로의 순서를 확인하여** 삽입하세요. 기존 워크플로를 통째로 덮어쓰지 않습니다.

## 기존 `npm run build` 전에

```yaml
- name: Checkout novel source
  uses: actions/checkout@v4
  with:
    repository: min-ser/NOVEL
    ref: master
    path: .novel-source

- name: Build novel static site
  run: |
    cd Portfolio/novel
    npm ci
    node scripts/build-novel.mjs ../../.novel-source/CHEONRYUGWAN static
    npm run build
```

## 기존 Next.js `npm run build` **후**, `out`을 Pages artifact로 업로드하기 **전**

```yaml
- name: Merge novel into Next.js static export
  run: |
    mkdir -p out/Portfolio/novel
    cp -R Portfolio/novel/dist/. out/Portfolio/novel/
```

기존 workflow가 `actions/upload-pages-artifact`에 `path: ./out`을 전달해야 합니다. 이 설정은 실제 기존 워크플로를 열어 확인해야 합니다.

### 경로
- 로컬 `http://localhost:5173/`
- 배포 `https://min-ser.github.io/Portfolio/novel/` (배포 성공 시)

### 변경 감지
- Git 블로그에 push하면 기존 workflow가 실행되어야 합니다.
- NOVEL 저장소의 변경만으로 즉시 배포하려면 별도 repository_dispatch 또는 schedule 트리거를 추가해야 합니다.
