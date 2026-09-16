# v0.2.5 Update

Base: v0.2.4

반영 사항:
- 모바일 메뉴를 full viewport overlay 방식으로 변경하고 body scroll lock 적용
- 모바일 Identity 카드의 긴 COMPANY/CLIENT/ROLE/POSITION 문자열 겹침 및 overflow 개선
- 모바일/PC typography를 clamp 기반으로 보정
- 공통 Markdown/Modal viewport 대응 및 CLOSE 상시 노출
- Expertise 목록의 게시글 클릭을 modal 대신 `/expertise/[slug]` 독립 Reader로 변경
- Expertise Reader 최대 폭 확대 및 일반 텍스트/이미지/표/코드 영역 분리
- Markdown 이미지 자동 fit + 클릭 Lightbox 확대
- Markdown iframe(YouTube 등) 반응형 16:9 embed 처리
- code/table/mermaid overflow 안전 처리
- package version 0.2.5

적용: ZIP 내용을 현재 v0.2.4 Repository Root에 덮어쓴 후 commit/push.
