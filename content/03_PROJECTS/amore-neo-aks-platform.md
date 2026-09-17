---
id: amore-neo-aks-platform
type: project
title: AMOREPACIFIC NEO AKS Service Platform 구축 및 GitOps 운영
careerId: megazone
startDate: "2026-08-01"
endDate: null
status: ongoing
featured: true
skills:
  - AKS
  - Kubernetes
  - GitLab CI/CD
  - Docker
  - Helm
  - ArgoCD
  - Workload Identity
  - Azure RBAC
  - Grafana
---

## Overview

NEO 프로젝트에서 Application / Batch / CronJob을 포함한 **총 7개 신규 서비스를 기존 AKS 플랫폼에 구성**하고, GitLab CI/CD → Container Image → Helm → ArgoCD로 이어지는 GitOps 배포체계와 Azure Resource 인증·권한 연계를 지원했습니다.

## Platform Build

- Deployment / Service / Job / CronJob / ServiceAccount 등 Kubernetes Resource 구성
- DEV / QA / PRD 환경별 Helm Values 관리
- GitLab CI/CD 기반 Build 및 Image Tag 전달 구조 구성
- Docker Image를 Azure Container Registry와 연계
- Helm Chart 기반 Kubernetes Manifest 관리
- ArgoCD Application 기반 GitOps 배포 및 Sync 운영
- Workload Identity + Azure RBAC 기반 Azure Storage 등 Resource 접근 구성
- Grafana / Log Analytics 기반 Container Log 및 서비스 모니터링

## Representative Troubleshooting

### ImagePullBackOff / Image Not Found

- ACR Image Pull 실패 이벤트 분석
- Repository / Tag 불일치 및 실제 Registry Image 존재 여부 확인
- CI Pipeline의 Image Tag 전달과 Helm Values 반영 경로 점검

### ArgoCD / GitLab Authentication & Network

- Helm Repository 접근 시 `context deadline exceeded` 분석
- ArgoCD가 접근하는 GitLab/Helm Repository Domain 차이 확인
- Private Network 및 방화벽 허용 경로 검토
- HTTP Basic Access Denied 발생 시 Token/Repository 권한 및 인증방식 점검

### Immutable Deployment Selector

- Deployment `spec.selector` 변경으로 Kubernetes immutable 오류 발생
- Helm fullname 변경에 따른 기존 Deployment와 신규 Manifest의 selector 불일치 분석
- Resource 재생성 필요성을 판단하여 배포 정상화 방향 제시

### Pod Scheduling

- `untolerated taint`, `Insufficient cpu` 이벤트 분석
- 프로젝트별 Node Taint와 Pod Toleration 관계 확인
- Preemption이 도움이 되지 않는 상황에서 Node Resource/Placement 조건 점검

### ServiceAccount / Workload Identity

- Helm `serviceAccount.create` 조건과 실제 생성 Resource 확인
- 일반 Application과 CronJob/Batch에서 ServiceAccount가 별도로 노출되는 이유 분석
- Workload Identity 사용 서비스의 ServiceAccount Annotation 및 Azure RBAC 연결 검토

### CronJob Runtime

- Spring Boot 배너 출력 후 종료되는 STG Batch 문제 분석
- CronJob/Job/Pod Event와 환경별 Values 비교
- 잘못된 status 값(stg → qa) 수정 후 정상 실행 확인

## Result

신규 서비스의 Kubernetes Resource 작성만 수행한 것이 아니라 **Build → Registry → Helm → ArgoCD → AKS → Azure Resource** 전체 배포경로를 기준으로 문제를 분석하고 운영 안정화를 지원했습니다. 이를 통해 Application, Batch, CronJob 유형이 혼재한 신규 서비스들을 기존 Enterprise AKS 환경에 편입했습니다.
