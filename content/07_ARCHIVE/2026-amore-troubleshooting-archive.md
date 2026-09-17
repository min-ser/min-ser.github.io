---
id: 2026-amore-troubleshooting-archive
type: technical-record
title: AMOREPACIFIC Platform Troubleshooting Archive
careerId: megazone
status: living-document
---

# Purpose

아모레퍼시픽 프로젝트에서 발생한 Azure / Fabric / AKS / DevOps 복합 이슈를 `Symptom → Analysis → Cause → Action → Result` 형태로 축적하기 위한 기술 기록입니다.

## Microsoft Fabric

### Admin Activity API 403 / 400

- **Symptom:** Activity Events API 접근 불가 및 BadRequest
- **Analysis:** Service Principal/Fabric 권한과 요청 날짜 형식 분리 점검
- **Action:** API 접근 권한 보완, 날짜 파라미터 형식 수정
- **Result:** Continuation 기반 다중 페이지 Audit Event 수집 성공

### Storage DNS Resolution

- **Symptom:** Fabric Notebook에서 Storage FQDN DNS resolve 실패
- **Analysis:** Private Connectivity/DNS 경로와 Storage endpoint 확인
- **Action:** Notebook에 DNS 진단 코드를 추가하고 네트워크 경로 점검
- **Result:** 문제 범위를 인증과 DNS/Network 영역으로 분리하여 추적 가능하도록 개선

### Event Hub 5671 Block

- **Symptom:** AKS에서 Event Hub AMQP 연결 제한
- **Analysis:** 방화벽/네트워크 정책상 5671 통신 제한 확인
- **Action:** WebSocket 443 방식으로 수신 테스트
- **Result:** Event Hub 이벤트 수신 성공 및 Autoscale POC 연결 검증

### Fabric 429 / Throttling

- Capacity/Workload 부하와 API/서비스 제한을 함께 확인하고 Capacity 운영정책 및 호출 패턴 관점에서 분석

## AKS / GitOps

### ImagePullBackOff / NotFound

- **Symptom:** ACR Image Pull 실패
- **Analysis:** Repository와 Tag, CI 결과, Helm Values 반영 경로 확인
- **Result:** Registry에 존재하지 않는 Image Reference 문제를 배포경로 기준으로 분리 분석

### Deployment Selector Immutable

- **Symptom:** `spec.selector` immutable 오류로 ArgoCD Sync 실패
- **Analysis:** Helm fullname 변경과 기존 Deployment selector 비교
- **Action:** 기존 Resource 재생성이 필요한 Kubernetes immutable 변경으로 판단

### ArgoCD Repository Timeout / Authentication

- **Symptom:** Helm Repository `context deadline exceeded`, 이후 Basic Access Denied
- **Analysis:** ArgoCD GitLab 주소와 Helm Repository Domain 차이, Private Network 허용, Token 권한 점검
- **Result:** Network 문제와 Repository 인증 문제를 단계적으로 분리하여 분석

### Pod Scheduling Failure

- **Symptom:** `untolerated taint`, `Insufficient cpu`, preemption not helpful
- **Analysis:** Node별 Project Taint, Pod Toleration, Resource Request와 가용 CPU 확인
- **Result:** 애플리케이션 오류가 아닌 Cluster Placement/Capacity 문제로 원인 범위 축소

### STG CronJob Early Exit

- **Symptom:** Spring Banner 이후 종료, Job/Pod 실행 이상
- **Analysis:** DEV 정상 환경과 STG Helm Values 비교
- **Cause/Action:** 환경 status 값 불일치 수정(stg → qa)
- **Result:** Batch 정상 실행 확인

## Observability

### Grafana ContainerLogV2 Variable Error

- 상단 Variable 빈값 전달 및 Kusto Query Syntax 오류 분석
- ResourceGroup / Cluster / Log Analytics Workspace 선택과 LabelValue 조건을 직접 검증
- STG 정상화 후 PRD LabelValue 빈값 원인을 추가 추적

## Record Policy

이 문서는 장애 건수를 과장하거나 결과를 임의로 정량화하지 않습니다. 실제 확인된 증상, 분석 과정, 조치와 검증 결과만 지속적으로 추가합니다.
