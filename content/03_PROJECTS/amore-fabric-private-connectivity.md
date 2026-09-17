---
id: amore-fabric-private-connectivity
type: project
title: AMOREPACIFIC Fabric Private Connectivity / MPEP 구축
careerId: megazone
startDate: "2026-01-01"
endDate: null
status: operating
featured: true
roles: ["Azure Part PL", "Microsoft Fabric Engineer"]
skills: ["Microsoft Fabric", "Private Link", "Managed Private Endpoint", "Private Endpoint", "Private DNS", "Azure Storage", "Firewall"]
---
# AMOREPACIFIC Fabric Private Connectivity / MPEP 구축

## 01. Overview
Microsoft Fabric에서 Azure Storage 등 고객 Azure Resource로 접근할 때 Public Network를 우회하고 **Private Link / Managed Private Endpoint(MPEP) / Private DNS**를 이용하도록 연결 구조를 검토·구성했습니다.

## 02. Responsibilities
- Fabric ↔ Azure Resource 간 Private Connectivity 요구사항 분석
- Workspace/Resource별 MPEP 생성 및 대상 Resource 승인 흐름 확인
- Azure Storage Firewall / Private Endpoint / DNS 구성 점검
- 고객 네트워크·보안 담당자와 통신 허용 범위 협의
- 연결 실패 시 DNS, Firewall, Endpoint 승인, 인증정보를 계층별로 분석

## 03. Validation / Troubleshooting
- Private Link/Firewall Deny 상황에서 접근 경로와 승인 상태를 확인했습니다.
- Storage Endpoint DNS Resolve 실패 시 Notebook/AKS 등 실행 위치에서 DNS Resolution을 분리 테스트했습니다.
- OPDG 및 Fabric 연결 구성에서는 인증방식별 동작 차이를 검증했고, Azure Blob 연결에서 Service Principal 방식의 credential 오류를 확인한 뒤 Organization 인증 방식으로 전환하여 정상 연결을 확인했습니다.

## 04. Result
Fabric Data Platform이 고객의 Private Network 정책 안에서 Azure Storage 등 데이터 소스와 통신할 수 있도록 연결 패턴을 검증하고 운영 이슈 대응 절차를 확보했습니다.
