---
id: fabric-security-governance
type: project
title: Microsoft Fabric Security Governance & Audit Logging
careerId: megazone
startDate: "2026-03-01"
endDate: null
status: operating
featured: true
skills:
  - Microsoft Fabric
  - Security Governance
  - Audit Log
  - Admin Activity Events API
  - Query Log
  - Azure Storage
  - Notebook
  - Pipeline
  - Datadog
---

## Overview

Microsoft Fabric 도입에 대한 고객사 보안성 검토 요구사항을 분석하고, **계정/권한·접근통제·환경분리·Audit/Query Logging·Data Agent 권한**을 운영 가능한 통제 방식으로 구체화한 작업입니다.

## Security Requirements

- 계정 및 권한 관리
- Fabric 접근통제
- 사용자 조회/변경/다운로드 관련 Audit Log 확보
- 장기 로그 보존 요구 대응
- DEV / QA / PRD 환경 분리
- Data Agent 권한 및 처리 이력 확인

## Review & Design

- Fabric 계정 자체의 생성/수명주기는 Microsoft Entra ID 관리 영역과 구분
- Workspace/Item 권한 및 Fabric Admin 권한 범위 검토
- Fabric Private Link / MPEP / Firewall을 통한 Private Connectivity 및 접근통제 검토
- Purview DSPM for AI 기반 Prompt Audit 가능성과 라이선스/권한/비용 검토
- 제품 기능과 운영 요구사항을 비교한 결과 Data Agent Prompt 감사 대신 Query Log 수집 방식으로 운영 방향 조정

## Audit Log Collection

Fabric Admin Activity Events API(`activityevents`)를 기반으로 일일 Audit Log 수집 파이프라인을 구성했습니다.

### Flow

1. Service Principal 인증
2. Admin Activity Events API 호출
3. Continuation 기반 다중 페이지 이벤트 수집
4. Fabric Notebook에서 데이터 처리
5. Pipeline 기반 일일 자동 실행
6. Azure Storage에 CSV 형태로 적재
7. 운영/보안 요구에 따라 보존 및 외부 로그 연계 검토

### Implementation Notes

- KST 기준 D-1을 기본 수집일로 계산
- 초기 API 403 접근권한 문제 분석 및 권한 구성
- 요청 날짜 포맷으로 인한 400 BadRequest 수정
- 수천 건 단위의 다중 페이지 이벤트 수집 검증
- JSON 저장 방식에서 운영 요구에 따라 CSV 적재 방식으로 변경
- Storage Private 연결 및 DNS Resolution 문제에 대한 진단 코드 추가

## Query / Data Agent Governance

- Data Agent 사용 권한 범위 및 처리 로그 요구사항 검토
- Purview Prompt Audit의 권한/라이선스/비용 및 제품 제약 확인
- 고객과 협의하여 Prompt 원문 감사 대신 Query Log 수집 방향으로 전환
- Query Log를 Audit Log와 별도 수집하여 사용자 질의 이력 추적 구조 마련

## Operational Security

- DEV / QA / PRD Workspace 분리
- Service Principal / Fabric Admin 등 최소 필요 권한 검토
- Private Link / MPEP / Firewall 기반 네트워크 경계 검토
- Audit 데이터 장기 보존을 위한 Storage 보존정책 검토
- Datadog 등 외부 Observability 연계 검토 및 구현

## Result

단순 제품 기능 설명에 그치지 않고 보안 요구사항을 **실제 수집 가능한 Audit/Query Log와 운영 권한 모델**로 전환했습니다. 제품상 직접 제공되지 않는 감사 요구사항은 Microsoft와 협의하고 대체 수집 방식을 설계하여 고객 보안 검토를 운영 가능한 형태로 마무리했습니다.
