
## [0.13.0] - 2026-07-31

### Added
- Microsoft Teams Alert Validation module.
- Webhook validation and Adaptive Card preview.
- Success, invalid URL, 401, 429, and 500 demo scenarios.
- Delivery history, raw request/response, and execution console.

### Changed
- Dashboard Teams Alert status changed to READY.


## v0.12-rebuild - Fabric Automation UI alignment

- Rebuilt Fabric Capacity Autoscale page to match the actual Automation-Ver3 screen structure.
- Added capacity lookup that writes current SKU/state to the console and summary cards.
- Added editable DAX query monitor section.
- Added autonomous engine start/stop with demo one-minute monitoring cycles.
- Added manual SKU change control and SKU cost table.
- Kept all resource examples sanitized with the `kms` prefix.
## [0.11.0] - 2026-07-31

### Added
- Microsoft Fabric Data Agent static validation module
- Workspace / Agent connection validation
- Thread creation, Run polling, Answer and Citation extraction simulation
- 401, 403 and 404 failure scenarios
- Raw request / response and execution log


## v0.10-rebuild
- Fabric Warehouse 페이지를 실제 구현 UI 기준으로 전면 재작성
- FQDN/Database/Schema/Table/조회모드/Top N 입력 구조 적용
- Query Result 테이블 및 System Connection Log 재현
- 기존 포트폴리오형 Warehouse 화면은 `warehouse-modern.html`로 보존

## [0.10.0] - 2026-07-31

### Added
- Microsoft Fabric Warehouse connection validation page
- Entra token, Private Endpoint, SQL connection simulation
- Stored Procedure success and 403 permission scenarios
- Fabric Warehouse request, response, and log examples

### Changed
- Dashboard Fabric Warehouse status changed to READY

## [0.9.1] - Key Vault Inventory UI

- Added certificate inventory table.

## v0.7
- Azure OpenAI Embedding 정적 검증 모듈 구현
- `assets/images/sample.png`에 사용자 제공 샘플 이미지 포함
- Embedding vector preview, statistics, raw response, execution console 추가

# Changelog

## [0.5.0] - 2026-07-31

### Added
- Cache for Redis module based on the supplied implemented-UI reference.
- Access Key authentication validation.
- Workload Identity / Microsoft Entra ID passwordless validation.
- TTL scan and expiration-state analysis.
- Unified execution console and raw result panel.
- Sanitized `kms` sample request, response, and log files.

### Policy
- Preserved the original Redis page feature scope and input structure.
- No company, customer, internal project, or real resource inference keywords are used.
- No live Redis or Azure API request is performed.


## v0.4.1 - UI structure rebuild

- Rebuilt Network Connection Test, Azure Naming Rule, and Storage Account pages from the supplied implemented-UI references.
- Preserved the original functional layout and limited the portfolio transformation to styling, responsive layout, and static demo behavior.
- Restored shared header/sidebar initialization on all three implemented pages.
- Continued the `kms`-only sanitization policy for all sample identifiers.


## v0.4-r1
- 실제 구현 UI 스크린샷의 기능 배치와 입력 구조를 복원
- 기존 포트폴리오 디자인 CSS 체계로 Network, Naming Rule, Storage 페이지 재스타일링
- 미구현 페이지는 Placeholder 상태 유지
- 회사/고객사 식별 문자열 제거 및 kms 예제로 통일

## [0.4.0] - 2026-07-31

### Added
- Storage Account Validation module
- Storage naming and container naming validation
- Private Endpoint / Public Endpoint scenarios
- Microsoft Entra ID / SAS / Access Key simulation
- DNS → TCP → TLS → Authentication → Blob API console flow
- Success, authentication failure, private DNS failure and public network blocked scenarios
- Raw request / response, copy and JSON/TXT export
- Storage request, response and log examples

### Security
- All example identifiers use the neutral `kms` prefix.
- Company, customer, internal project and real resource inference keywords are prohibited.
- Every credential, token, IP and request identifier is a non-functional demo value.

## [0.3.0] - 2026-07-31

### Added
- Azure Naming Rule validation engine
- Resource-specific rule mapping and recommended name generation
- `kms` data sanitization policy

## [0.2.0]

### Added
- Network Test validation module

## [0.1.0]

### Added
- Shared project foundation, dashboard, layout and console engine

### v0.5 layout patch
- Redis 페이지의 최대 너비를 콘텐츠 내부 래퍼에 적용하도록 수정
- 사이드바 확장/축소 시 본문이 겹치거나 왼쪽으로 치우치지 않고 가용 영역 중앙에 정렬되도록 개선

## v0.6 - Azure OpenAI Chat
- Azure OpenAI Chat Completion 정적 검증 페이지 구현
- Access Key / Workload Identity 연결 체크 시뮬레이션
- Test Console, Raw Response Log, Unified Execution Console 구현
- Storage Account 로컬 샘플 이미지 미리보기 지원
- 샘플 이미지 경로를 `assets/images/sample.png`로 고정

## v0.8.0 - 2026-07-31
- Azure AI Search validation page implemented.
- Access Key and Workload Identity connection simulation added.
- Keyword, Vector, and Hybrid search modes added.
- Search result cards, scores, raw response, and execution console added.
- Dashboard AI Search module activated.

## v0.9.0 - 2026-07-31

### Added
- Azure Key Vault validation module.
- Workload Identity authentication flow simulation.
- Secret metadata retrieval with mandatory value masking.
- RBAC permission success and failure scenarios.
- Private Endpoint connectivity failure scenario.
- Validation result, raw result, and unified execution console.
- Sanitized request, response, and log examples using the `kms` prefix.

### Changed
- Dashboard Key Vault module activated as READY.
- README implementation status updated to v0.9.0.

## v0.9 UI Rebuild
- Azure Key Vault page rebuilt to mirror the original operational screen layout.
- Left control column, certificate inventory table, summary counters and execution log reproduced.
- Existing demo behavior and kms sanitization preserved.

- v0.9 Key Vault: certificate inventory now renders certificate name/status/created/expiry, and invalid vault or secret input is recorded in Failures with resource, reason, and timestamp.


## v0.12.0 - 2026-07-31

### Added
- Microsoft Fabric Capacity Autoscale static validation module.
- Environment-specific SKU range, current SKU, average and peak utilization inputs.
- Weekday dynamic control window and threshold-based Scale Up / Scale Down / Hold decisions.
- Decision history, raw decision output and unified execution console.
- Sanitized `kms` examples and no real Azure API calls.

## v0.12-rebuild — Eventstream CU usage alignment

- Fixed page top spacing and button typography.
- Initial SKU, scheduler, provisioning, and CU cards now remain empty until lookup.
- Lookup logs subscription ID, resource group, capacity name, DAX diagnostic query, current SKU, scheduler state, and Eventstream Capacity Summary.
- Replaced CU percentage display with normalized CU usage.
- Autoscale engine now consumes simulated Eventstream messages at one-minute intervals (two seconds in demo mode).
