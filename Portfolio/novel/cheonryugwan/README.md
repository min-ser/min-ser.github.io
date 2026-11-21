# 천류관 Novel Archive v0.6.4

## 실행
```powershell
npm install
npm run dev
```

`npm run dev`는 실제 `min-ser/NOVEL` 저장소의 `master` 원고를 동기화한 뒤 개발 서버를 시작합니다. Git/네트워크/접근 권한이 필요하며 실패 시 샘플 원고로 대체하지 않습니다.

## 업데이트
- 목표 디자인 6종: `docs/design/*.png`
- 실제 웹의 **디자인 시안** 메뉴: 이미지 갤러리와 확대 보기
- 실제 소설/설정 화면은 `static/content.json`의 실제 동기화 자료만 표시
- 고서형 리더 금박·한지 장식 일부 개선 (시안 완전 구현은 후속)

## 빌드
```powershell
npm run build
```

기존 Git 블로그에 자동 배포하려면 별도의 최초 GitHub Actions 연동이 필요합니다. 시안 PNG는 목표 이미지이며 실제 HTML 화면이 아닙니다.
