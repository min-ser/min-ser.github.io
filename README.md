# Gitblog v0.2.38

## Career collapsed flag
- Career Markdown Front Matter의 `collapsed: true`를 지원합니다.
- 접힌 Career는 Career Timeline에서 기본 비노출됩니다.
- Career 페이지에서 `SHOW HIDDEN RECORD(S)` 버튼으로 원래 연대순 위치에 펼칠 수 있습니다.
- Home의 Career/Profile/Career Description에는 접힌 Career를 기본 노출하지 않습니다.
- sitemap에서도 접힌 Career 상세 URL을 제외합니다.
- Education의 기존 `collapsed` 방식과 동일한 Content-driven 표시 정책입니다.

> `collapsed`는 UI 노출 제어입니다. 공개 Git 저장소에 Markdown을 커밋하면 원본 내용은 저장소에서 확인할 수 있습니다. 정말 회사에 공개되면 안 되는 정보는 public repository의 content에 넣지 않아야 합니다.


## v0.2.38 — Current Employer / Customer Identifier Neutralization

- Current employer display is replaced with `Azure AI Platform Engineer`.
- Current career content id/file is role-based (`azure-ai-platform-engineer`).
- Customer-specific `amore` filenames and ids are removed and renamed with the role prefix.
- Related project titles begin with `Azure AI Platform Engineer -`.
- Current customer remains neutralized as `Enterprise Customer`.
- Legacy employer-domain traces in archived technical notes are sanitized.
- Existing `collapsed` flags for Career/Education remain supported.
