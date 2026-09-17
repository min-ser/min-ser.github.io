---
id: fabric-cicd
type: project
title: Microsoft Fabric CI/CD
careerId: megazone
startDate: "2025-10-01"
endDate: null
status: operating
featured: true
roles:
  - Microsoft Fabric Engineer
  - Azure Platform Engineer
skills:
  - Microsoft Fabric
  - GitLab CI/CD
  - Fabric REST API
  - Service Principal
  - Python
  - DEV / QA / PRD
---

# Microsoft Fabric CI/CD

## 01. Overview
Microsoft Fabric의 Notebook 등 개발 산출물을 수작업으로 환경별 반영하는 방식에서 벗어나기 위해 **GitLab CI/CD + Fabric REST API + Service Principal** 기반 배포 자동화 흐름을 구성했습니다. 단순 Pipeline 작성이 아니라 고객사의 DEV / QA / PRD 환경 분리 원칙과 Fabric Workspace 운영방식을 함께 고려하여 배포 절차를 표준화했습니다.

## 02. Background / Problem
- Fabric 개발 산출물의 환경별 배포 절차를 반복 수행해야 하는 운영 부담
- 사람의 수작업에 의존할 경우 Workspace/Item 선택 오류 및 배포 누락 가능
- DEV / QA / PRD 분리 환경에서 인증정보와 대상 Workspace를 일관되게 관리할 필요
- Fabric REST API 호출을 위한 Service Principal 권한 및 API 접근 조건 검증 필요

## 03. Responsibilities
- Fabric REST API를 이용한 배포 가능 범위 및 인증방식 검토
- App Registration / Service Principal 기반 API 인증 구성
- GitLab Pipeline에서 환경별 변수와 Workspace 정보를 전달하는 구조 설계
- Notebook 등 Fabric Item 배포 흐름 구현 및 테스트
- API 응답/권한 오류 분석 및 배포 실패 원인 확인
- 개발팀이 재사용할 수 있도록 배포 절차와 운영 가이드 정리

## 04. Implementation
1. GitLab Repository를 Fabric 개발 산출물의 Source of Truth로 사용했습니다.
2. Pipeline 실행 시 대상 환경(DEV/QA/PRD)과 Workspace 정보를 환경변수로 분리했습니다.
3. Service Principal로 Access Token을 발급하고 Fabric REST API를 호출하도록 구성했습니다.
4. Item 생성/갱신 및 Publish 과정의 응답을 확인하여 실패 시 원인을 추적할 수 있도록 했습니다.
5. 환경별 배포 후 대상 Workspace에서 실제 반영 상태를 검증하는 절차를 포함했습니다.

## 05. Troubleshooting / Validation
- Service Principal 권한과 Fabric API 접근 조건을 확인하며 인증 오류를 분석했습니다.
- Publish 과정의 404 오류에서 대상 정보/입력값을 재검토하여 오타를 수정한 뒤 정상 배포를 확인했습니다.
- 환경 분리와 권한 모델을 고객 운영 방식에 맞춰 검토했습니다.

## 06. Result
- Fabric 산출물의 반복 배포를 GitLab Pipeline으로 자동화할 수 있는 기반을 구축했습니다.
- DEV / QA / PRD 환경별 배포 흐름을 표준화했습니다.
- Fabric REST API와 Service Principal을 활용한 CI/CD 패턴을 실제 고객 환경에서 검증했습니다.

## 07. Technology
Microsoft Fabric / Fabric REST API / GitLab CI/CD / Service Principal / Python / DEV·QA·PRD Workspace
