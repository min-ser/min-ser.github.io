---
id: amore-fabric-query-log
type: project
title: AMOREPACIFIC Fabric Query Log / Execution History 수집
careerId: megazone
startDate: "2026-03-01"
endDate: null
status: operating
roles: ["Microsoft Fabric Engineer", "Security Technical Support"]
skills: ["Microsoft Fabric", "Query Log", "Stored Procedure", "KST", "UTC", "Security Audit"]
---
# AMOREPACIFIC Fabric Query Log / Execution History 수집

## 01. Overview
Data Agent Prompt 감사 가능성을 검토한 뒤 제품/API 제약과 운영 비용을 고려하여 고객과 협의한 최종 방향에 따라 **Query Log 및 Execution History를 별도로 수집**하는 방식을 적용했습니다.

## 02. Security Decision
- Data Agent 처리 이력과 사용자 Query 추적 요구사항 검토
- Microsoft와 Purview DSPM for AI / Audit 및 Prompt Interaction Capture 가능 여부 협의
- Prompt Logging에 필요한 권한/라이선스/비용 및 감사 API 제공 여부 확인
- 고객과 협의하여 Prompt 원문 감사 대신 Query Log 수집 방식으로 운영 방향 확정

## 03. Execution History / Timezone
- 기존 `usp_export_exec_requests_history(@start,@end)` 흐름 검토
- KST 입력을 UTC 조회 범위로 변환하는 `usp_export_exec_requests_history_kst_test` 방식 검증
- 00:00/24:00 경계와 KST↔UTC 변환 로직 확인
- Parameter가 없을 경우 KST 기준 기본 수집 범위를 적용
- 과거 날짜 재수집과 장시간 실행 Query의 duration/정렬/표시를 검증

## 04. Result
제품에서 직접 제공하기 어려운 감사 요구를 Query/Execution History 기반의 현실적인 운영 통제로 전환하고, 한국 운영시간 기준으로 일관되게 조회·수집할 수 있도록 시간대 처리 방식을 정리했습니다.
