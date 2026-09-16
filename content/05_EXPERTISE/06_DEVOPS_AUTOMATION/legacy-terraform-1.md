---
id: legacy-terraform-1
type: expertise
title: '[Terraform] 1. 환경 구성'
enabled: true
sample: false
group: devops-automation
category: Terraform
createdDate: '2023-02-21'
updatedDate: '2023-02-21'
featured: false
summary: '테라폼 환경 구성 1. 테라폼 설치 다운로드 URL 접속 https://developer.hashicorp.com/terraform/downloads
  img /assets/category/Terraform/2023/02/21/01.PNG 윈도우 버전에 따라 설치 진행 '
tags:
- Terraform
---

> **Legacy Engineering Note** · 기존 기술 블로그에서 선별 이관한 기록입니다. 작성 당시 환경과 버전을 기준으로 합니다.

# 테라폼 환경 구성

1. 테라폼 설치
- [다운로드 URL 접속](https://developer.hashicorp.com/terraform/downloads)

    ![img](/assets/category/Terraform/2023/02/21/01.PNG)

        윈도우 버전에 따라 설치 진행

2. 다운로드 후 환경변수 설정
    - 2-1 다운받은 파일 압축 해제
        ![img](/assets/category/Terraform/2023/02/21/02.PNG)
    
    - 2-2 해당 프로그램 경로에서 환경변수 설정 진행
        - 시스템 속성 > 고급탭 > 환경 변수(N)
        ![img](/assets/category/Terraform/2023/02/21/03.PNG)

    - 2-3 path 편집
        ![img](/assets/category/Terraform/2023/02/21/04.PNG)

    - 2-4 새로 만들기(N) 클릭해서 terraform.exe이 위치한 디렉토리 등록
        ![img](/assets/category/Terraform/2023/02/21/05.PNG)

3. terraform 명령어 테스트 실행
    ![img](/assets/category/Terraform/2023/02/21/06.PNG)
