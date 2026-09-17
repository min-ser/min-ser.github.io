---
id: amore-multicloud-data-integration
type: project
title: AMOREPACIFIC Fabric Multi-Cloud / Hybrid Data Integration
careerId: megazone
startDate: "2025-07-01"
endDate: null
status: operating
roles: ["Microsoft Fabric Engineer", "Azure Part PL"]
skills: ["Microsoft Fabric", "Snowflake", "AWS S3", "Azure Storage", "OPDG", "Pipeline", "Copy Activity", "Shortcut"]
---
# AMOREPACIFIC Fabric Multi-Cloud / Hybrid Data Integration

## 01. Overview
Microsoft Fabric을 중심으로 Azure 내부 데이터뿐 아니라 **Snowflake, AWS S3, Azure Storage, On-premises Data Gateway(OPDG)**를 연결하여 Multi-Cloud/Hybrid 데이터 연계 방식을 검토하고 실제 연결을 지원했습니다.

## 02. AWS / Storage
- Fabric Lakehouse와 AWS S3 연계방식 검토
- S3 Shortcut 연결 및 Pipeline Copy 가이드 작성
- Azure Storage 연결 시 Network/Identity/Firewall 조건 검토
- Fabric MPEP와 Storage Private 접근 경로 검증

## 03. OPDG / Hybrid Connectivity
- OPDG 기반 Azure Storage/외부 Data Source 연결 구성
- Gateway 인증방식과 Connection Credential 검증
- Service Principal 방식에서 발생한 `Invalid connection credentials(400)` 분석
- Organization 인증 방식으로 전환 후 정상 연결 확인
- IP/Firewall 허용 및 MPEP 승인 상태 점검

## 04. Snowflake
- Fabric ↔ Snowflake 연결 구성 및 데이터 이동 방식 검토
- Pipeline / Copy Activity 기반 연계 지원
- Login 과정의 EOF 등 연결 오류 확인 및 인증/Network 관점 점검

## 05. Result
Fabric을 데이터 허브로 사용하면서 Azure, AWS, Snowflake 및 On-premises 영역을 연결할 수 있는 실무 연계 패턴과 Troubleshooting 경험을 확보했습니다.
