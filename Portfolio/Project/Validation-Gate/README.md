# Validation Gate

> Azure AI · Microsoft Fabric · Cloud Platform Validation Toolkit

Validation Gate는 Azure 및 Microsoft Fabric 환경의 연결, 인증, API 요청과 운영 흐름을 개발자 관점에서 검증하는 포트폴리오용 정적 데모 프로젝트입니다.

## Current Version

`v0.12.0`

## Run

`pages/index.html`을 브라우저에서 열거나 정적 웹 서버에서 실행합니다.

```bash
python -m http.server 8000
```

그 후 `http://localhost:8000/pages/`로 접속합니다.

## Implemented Modules

- Dashboard and shared layout
- Network Connection Test
- Azure Resource Naming Rule
- Storage Account Validation
- Cache for Redis Validation
- Azure OpenAI Chat
- Azure OpenAI Embedding
- Azure AI Search
- Azure Key Vault
- Microsoft Fabric Warehouse
- Microsoft Fabric Data Agent
- Microsoft Fabric Capacity Autoscale

## Storage Sample Image

Storage Account 페이지의 샘플 이미지는 다음 위치에 포함됩니다.

```text
assets/images/sample.png
```

## Demo Notice

화면에 표시되는 Tenant ID, Subscription ID, Client ID, Access Key, Token, IP, Resource ID는 모두 동작하지 않는 시연용 예시 데이터입니다. 실제 Azure 또는 외부 API를 호출하지 않습니다.

## Portfolio Data-Sanitization Policy

- 회사명, 고객사명, 내부 프로젝트명, 실제 리소스 Prefix와 식별 가능한 운영 정보를 사용하지 않습니다.
- 모든 조직 Prefix와 리소스 예시는 중립적인 `kms` 값으로 통일합니다.
- Endpoint, Token, Client ID, Secret, Request ID는 동작하지 않는 허구의 데모 값입니다.
- Secret 값은 결과와 로그에서 항상 마스킹합니다.

## UI Fidelity Policy

구현된 페이지는 실제 검증 UI의 입력 구조와 기능 범위를 유지하면서 포트폴리오 공통 CSS를 적용합니다. 미구현 모듈은 Placeholder 상태로 유지합니다.

## License

MIT


## v0.10 - Fabric Warehouse

- Entra token validation demo
- Warehouse endpoint / database connection simulation
- Stored Procedure execution and permission-error scenarios
- Raw result and unified execution console


## v0.13

- Microsoft Teams Webhook / Adaptive Card validation module implemented.
- Webhook URL validation, delivery scenarios, preview, raw response, console, and history included.
- All endpoints and identifiers use sanitized `kms` demo values.
