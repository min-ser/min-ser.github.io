---
id: amore-foundry-apim-private-platform
type: project
title: AMOREPACIFIC Microsoft Foundry / APIM Private Platform 지원
careerId: megazone
startDate: "2025-07-01"
endDate: null
status: operating
roles: ["Azure Part PL", "Azure AI Platform Engineer"]
skills: ["Microsoft Foundry", "Azure OpenAI", "Azure AI Search", "API Management", "Private Endpoint", "Private DNS", "Workload Identity", "RBAC"]
---
# AMOREPACIFIC Microsoft Foundry / APIM Private Platform 지원

## 01. Overview
Data Highway 및 AI 서비스 개발팀이 Microsoft Foundry/Azure AI 서비스를 Enterprise Private 환경에서 사용할 수 있도록 **APIM, Private Endpoint, Private DNS, Identity/RBAC** 관점의 기술지원을 수행했습니다.

## 02. Platform Support
- Microsoft Foundry Project/Resource 생성 및 접근 구성 지원
- Azure OpenAI / Azure AI Search 등 AI Resource 연결 검토
- APIM을 통한 AI Backend 연결 및 다수 Azure Subscription 연계 지원
- 10개 Azure Subscription의 Foundry 연결 요구사항 기술지원
- Private Endpoint / Private DNS Zone 기반 Foundry Private 통신 구성 검토

## 03. Identity / Developer Support
- Workload Identity 기반 AI Search 연결 샘플 코드 검토/제공
- Access Key 방식과 Identity 방식의 차이를 개발팀이 검증할 수 있도록 지원
- Resource RBAC와 Network 조건을 함께 확인하여 인증 실패 원인을 분리
- Model 배포 Forbidden/접속 불가/API 호출 문제 등 AI Platform 이슈 대응

## 04. Self-Service Validation
반복적으로 발생하는 Network/Identity 설정 문의를 줄이기 위해 Python/FastAPI와 Azure SDK를 활용한 검증 도구를 구성하여 AI Search Index CRUD, Storage/Redis/Foundry 연결성 및 권한 상태를 개발자가 직접 확인할 수 있도록 지원했습니다.

## 05. Result
AI 개발팀이 Private Network와 Identity 기반의 표준 패턴으로 Azure AI 서비스를 사용할 수 있도록 플랫폼 연결 기준과 개발 검증 방식을 제공했습니다.
