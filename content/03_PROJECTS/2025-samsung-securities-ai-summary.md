---
id: samsung-securities-ai-summary
type: project
title: "삼성증권 해외 투자정보 번역/요약 서비스 구축"
startDate: "2025-03-04"
endDate: "2025-07-04"
status: completed
careerId: megazone
roles: ["Application Architect", "AI & Infra Support"]
skills: ["Azure OpenAI", "Azure API Management", "Private Endpoint", "Managed Identity", "Azure Monitor", "Content Safety"]
---

## 01 OVERVIEW

해외 투자정보 번역·요약 AI 서비스의 Azure OpenAI 및 API Management 기반 AI API 인프라와 보안·운영 구성을 지원했습니다.

## 02 IMPLEMENTATION

- DEV/PRD Azure OpenAI 배포 및 Private Endpoint 구성
- APIM Premium / VNet Internal 구성, Azure OpenAI Backend 등록
- Managed Identity 기반 API 연동 및 Inbound Policy 구성
- 접근 제한, 헤더 검증 등 API Gateway 정책 적용
- Azure Monitor 기반 PTU Alert 구성
- Content Safety / PII / Prompt Shield 관련 Azure AI 서비스 개발 지원
- 고객 개발팀용 Managed Identity 샘플 및 기술가이드 제공

## 03 RESULT

Private Network와 Managed Identity를 기반으로 AI API 접근 구조를 구성하고 개발팀이 직접 연동할 수 있도록 표준 가이드를 제공했습니다.
