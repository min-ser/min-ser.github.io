---
id: amore-azure-ai-data-platform
type: project
title: "AMOREPACIFIC Azure AI / Data Platform 구축 및 운영 고도화"
startDate: "2025-07-01"
endDate: null
status: ongoing
featured: true
careerId: megazone
roles:
  - Azure AI Platform Engineer
  - Azure Part PL
  - Azure SME
skills:
  - Microsoft Fabric
  - AKS
  - Azure OpenAI
  - Microsoft Foundry
  - GitLab CI/CD
  - ArgoCD
  - Private Link
  - Workload Identity
---

## 01 OVERVIEW

Microsoft Fabric 기술지원을 시작으로 Data Highway 프로젝트의 Azure Part PL 역할까지 담당 범위를 확대하여 Azure AI, Data Platform, AKS, Private Network, Security Governance, CI/CD 및 운영 자동화를 지원한 장기 프로젝트입니다.

## 02 RESPONSIBILITIES

- Azure AI / AKS / Microsoft Fabric 영역 Architecture 및 운영방안 검토
- 고객 개발팀 기술지원 및 장애 대응
- Network / Identity / RBAC / Private Connectivity 구성 검토
- 고객사 인프라·네트워크·보안 담당자 및 Microsoft와 기술 협업

## 03 MICROSOFT FABRIC

- Capacity / Workspace 및 DEV·QA·PRD 환경 구축·운영
- GitLab CI/CD + Fabric REST API + Service Principal 기반 CI/CD 구축
- Private Link / MPEP / Private DNS 기반 Azure Resource Private Connectivity 구성
- Event Hub + AKS CronJob 기반 Capacity Dynamic Autoscale 구현
- Admin Activity Events API + Notebook + Pipeline 기반 Audit Log 자동수집
- Datadog 로그 연계 및 운영 로그 송수신
- Snowflake / AWS S3 / Azure Storage / OPDG 데이터 연계
- Data Agent 권한 / Query Log / 접근통제 등 보안 요구사항 검토

## 04 AKS / DEVOPS

- Data Highway / NEO Application, Batch, CronJob 서비스 구축·운영
- GitLab CI/CD + Docker + Helm + ArgoCD 기반 GitOps 구성
- Workload Identity + Azure RBAC 기반 Azure Resource 연계
- Grafana / Log Analytics 기반 Container Log 모니터링
- Scheduling, Taint/Toleration, Image Pull, Resource, Network 및 인증 장애 분석

## 05 RESULT

Fabric CI/CD와 Private Connectivity, Capacity 자동화, Audit Logging, Multi-Cloud Data Integration을 운영 환경에 적용했으며, Azure Part PL로서 Azure 서비스 도입과 운영 과정의 기술 의사결정을 지원하고 있습니다.

## 06 PLATFORM ENGINEERING VIEW

이 프로젝트는 단일 Azure 서비스 운영이 아니라 **Cloud / AI / Data / Kubernetes / Network / Security / DevOps를 하나의 Enterprise Platform 관점에서 연결하여 다룬 경험**입니다. Microsoft Fabric 기술지원으로 시작했지만 실제 구축·자동화·운영·보안 검토와 Azure 영역 기술 의사결정 지원까지 담당 범위가 확대되었습니다.

### Azure AI Platform

- Azure OpenAI / Azure AI Search / Microsoft Foundry 기술지원
- APIM 기반 다수 Subscription의 Foundry 연결 지원
- Private Endpoint / Private DNS 기반 Private 통신 구성
- Workload Identity / Managed Identity 기반 인증 패턴 검토 및 샘플 제공
- Quota, API 호출, Network / Identity 관련 서비스 이슈 대응

### Security / Network / Identity

- Private Endpoint / Private Link / MPEP / Private DNS 기반 연결 구성
- Firewall 및 Private Network 통신 검토
- Service Principal / Managed Identity / Workload Identity / Azure RBAC 기반 권한 구성
- 보안성 검토 요구사항을 실제 플랫폼 통제와 로그 수집 구조로 전환

### Technical Leadership

- Azure Part PL로 신규 Azure 서비스 도입방안 및 운영방안 검토
- 개발팀 Azure 기술지원 및 장애 분석
- 고객 인프라 / 네트워크 / 보안 조직과 구성 협의
- Microsoft와 제품 이슈, 권한, 라이선스 및 기능 제약 협의
- 반복 이슈를 가이드 / 샘플 / 자동화 방식으로 전환

## 10. Detailed Workstream Index

이 프로젝트는 단일 Azure Resource 구축이 아니라 여러 Platform Workstream을 동시에 담당한 장기 운영/고도화 프로젝트입니다. 상세 구현은 동일 `careerId: megazone`의 Project Record로 분리하여 Home → Career → Projects에서 자동 연결합니다.

### Microsoft Fabric Platform
- Capacity / Workspace 및 DEV·QA·PRD 환경 운영
- Fabric REST API + GitLab 기반 CI/CD
- Private Link / MPEP / Private DNS 기반 Azure Resource 연결
- Admin Activity API 기반 Audit Log 수집 자동화
- Query/Execution History 기반 보안 감사 데이터 수집
- Event Hub + AKS CronJob 기반 Capacity Dynamic Autoscale
- 429/Throttling 및 Capacity 운영 이슈 분석

### Data Integration
- AWS S3 Shortcut / Pipeline Copy
- Snowflake 연계
- Azure Storage Private 연결
- OPDG 기반 Hybrid Connectivity
- 인증 방식과 Network/Firewall/MPEP 상태 검증

### Azure AI Platform
- Microsoft Foundry / Azure OpenAI / AI Search 기술지원
- APIM 기반 다수 Subscription의 AI Backend 연결
- Private Endpoint / Private DNS 기반 Private 통신
- Workload Identity / Managed Identity / RBAC 기반 인증 패턴
- 반복적인 연결/권한 문의를 줄이기 위한 Self-Service 검증 방식 지원

### AKS / NEO
- Application / Batch / CronJob 포함 신규 서비스 구성
- GitLab CI/CD → Docker/ACR → Helm → ArgoCD 배포체계
- Workload Identity + Azure RBAC
- ServiceAccount / HPA / Taint·Toleration / Resource Scheduling 검토
- Grafana / Log Analytics 기반 Container Log 운영

### Security / Governance
- 계정/권한, 접근통제, DEV·QA·PRD 분리 요구 검토
- Audit Log 장기보존 요구 대응
- Data Agent 권한 및 Prompt/Query 감사 방식 검토
- Microsoft와 Purview DSPM for AI 및 제품 제약 협의
- 최종 Query Log 수집 방식으로 운영방향 구체화

## 11. Role Expansion
초기 투입 목적은 Microsoft Fabric 기술지원이었지만, 실제 프로젝트 진행 과정에서 Azure AI, AKS, Network, Identity, CI/CD, Security 요구가 연결되면서 담당 범위가 확대되었습니다. 이후 Data Highway의 **Azure Part PL** 역할로 Azure 영역의 기술 검토, 개발팀 지원, 고객 인프라/네트워크/보안 조직 협의 및 Microsoft 기술 협업까지 수행했습니다.

## 12. Engineering Deliverables
- Fabric CI/CD 및 운영 가이드
- Workload Identity / Azure AI Search 연결 샘플
- Fabric AWS S3 / Storage / OPDG 연계 가이드
- Audit Log 수집 Notebook/Pipeline
- Fabric Capacity Dynamic Autoscale Python/CronJob
- AKS 신규 서비스 Helm Values / Kubernetes Resource 구성
- Grafana/Log Analytics Query 점검
- 장애 분석 및 운영 Runbook/기술 문서
