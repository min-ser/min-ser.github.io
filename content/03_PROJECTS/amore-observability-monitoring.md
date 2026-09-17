---
id: amore-observability-monitoring
type: project
title: AMOREPACIFIC Azure / AKS / Fabric Observability 운영
careerId: megazone
startDate: "2026-01-01"
endDate: null
status: operating
roles: ["Azure Part PL", "Platform Engineer"]
skills: ["Grafana", "Datadog", "Log Analytics", "ContainerLogV2", "Azure Monitor", "Microsoft Fabric"]
---
# AMOREPACIFIC Azure / AKS / Fabric Observability 운영

## 01. Overview
AKS Application/Batch와 Fabric 운영 상태를 확인하기 위해 **Grafana, Log Analytics, ContainerLogV2, Datadog, Azure Monitor**를 활용한 모니터링 및 로그 연계 업무를 수행했습니다.

## 02. AKS / Grafana
- STG/PRD AKS Container Log 조회 Dashboard 점검
- Resource Group / Cluster / Log Analytics Workspace / Label 기반 변수 구성 검토
- `ContainerLogV2` 기반 Pod/Label Query 수정
- PRD Dashboard의 `400 Bad Request / SyntaxError` 원인 분석
- `isnotempty(LabelValue)`, `distinct LabelValue` 등 Kusto Query 조건 보완

## 03. Fabric / Datadog
- Fabric 운영/Audit Log의 외부 모니터링 연계 검토
- Datadog으로 로그를 송수신하는 흐름 구성 지원
- Capacity 및 운영 이벤트를 관찰하여 Autoscale/장애 분석에 활용

## 04. Result
Azure/Fabric/AKS의 운영 데이터를 한 곳에서 확인할 수 있도록 로그 조회와 Dashboard Query를 정비하고, 장애 분석 시 Application·Kubernetes·Platform 로그를 함께 확인하는 운영 방식을 지원했습니다.
