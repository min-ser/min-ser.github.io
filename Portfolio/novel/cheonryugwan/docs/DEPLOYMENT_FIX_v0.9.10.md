# v0.9.10 GitHub Actions deployment repair

## 확인된 원인

실패 커밋 `5d9ae0ec390c694dd12eeeadbb73ce236a78a53e`의 `package.json`은 `scripts/build-reference-preview.mjs`를 참조하지만 실제 체크아웃에는 해당 파일이 없었습니다. v0.9.9 제공 ZIP에는 파일이 포함되어 있으므로 **GitHub 업로드/반영 과정에서 일부 파일이 누락된 상태**로 판단됩니다. 저장소에서 누락된 정확한 원인은 Git 이력 확인이 필요합니다.

## 반영 방법

1. ZIP의 `Portfolio/novel/cheonryugwan/` **전체를** 블로그 저장소의 동일 경로에 덮어쓰기합니다. `scripts/` 하위 파일을 빠뜨리지 마세요. 별도 버전 디렉터리를 만들지 마세요.
2. `git add -A Portfolio/novel/cheonryugwan` 후 `git status`로 `scripts/build-reference-preview.mjs`, `scripts/preflight.mjs`가 추적되는지 확인하고 커밋/푸시합니다.
3. GitHub Actions에서 새 커밋으로 실행합니다. `npm run check`가 선행 파일 검사를 수행합니다.
4. NOVEL 체크아웃에 긴 파일명 오류가 발생한다면, 기존 워크플로의 `Checkout NOVEL content` 단계에 아래를 추가합니다.

```yaml
          sparse-checkout: |
            CHEONRYUGWAN/01_NOVEL/PART_01_ACADEMY
            CHEONRYUGWAN/02_CANON/CHARACTERS
            CHEONRYUGWAN/03_ASSETS
          sparse-checkout-cone-mode: true
```

`02_CANON`의 다른 하위 설정까지 웹에 게시해야 한다면 체크아웃 범위를 추가해야 합니다. 이 예시는 1부 원고, 캐릭터 설정, 이미지에 한정합니다. 원고는 기존 빌드에서 자동 스캔합니다.

## 로컬/CI 검사

```bash
cd Portfolio/novel/cheonryugwan
npm ci
npm run check
npm run test:integration
```

실제 NOVEL 원고 빌드는 NOVEL_SOURCE_DIR이 제공되어야 하며, 로컬 테스트 픽스처 통과는 운영 NOVEL 저장소 체크아웃 성공을 보장하지 않습니다.
