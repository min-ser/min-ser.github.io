---
layout:     BLACKCODE
title:      "[Section 0.] Microservice와 Spring Cloud 소개"
subtitle:   ""
description: ""
date:       2023-08-05 01:00:00
author:     "김민서"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: []
category: [MSA]
# comments: false
# share: false
---

# Microservice란?

# Microservice와 SOA

# Spring Cloud란?

# 필수 SW 설치
1. IntelliJ IDEA Ultimate
    - https://www.jetbrains.com/ko-kr/idea

2. Git 
    - https://git-scm.com

3. Visual Studio Code
    - https://code.visualstudio.com

4. Postman
    - https://www.postman.com

[강의에 사용된 코드 github 주소](https://github.com/joneconsulting/msa_with_spring_cloud.git)

# Microservice와 Spring Cloud의 소개
## Cloud Native Application CD/CD
- 지속적인 통합(결과물 통합, 코드 통합)
    - 통합 서버, 소스관리(SCM), 빌드 도구, 테스트 도구
    - ex) Jenkins, Team CI, Travis CI

- 지속적인 배포(어떻게 배포하는지에 따라 나뉘어짐)
    - Continuous Delivery
        - 패키지화 되어있는 결과물을 실행환경에 수작업으로 배포
    - Continuous Deployment
        - 관리자의 개입 없이 실행 환경까지 자동화된 배포
    - pipe line

- 카나리 배포와 블루그린 배포

## Microservice의 특징
1. Challenges
2. Small Well Chosen Deployable Units
3. Bounded Context
4. RESTful
5. Configuration Management
6. Cloud Enabled
7. Dynamic Scale Up And Scale Down
8. CI/CD
9. Visibility

## ~~Everything should be a microservice~~
- q1) Multiple Rates of Change
- q2) Independent Life Cycles
- q3) Independent Scalability
- q4) Isolated Failure
- q5) Simplify Interactions with External Dependencies
- q6) Polyglot Technology

## SOA(Service-Oriented Architecture)와 MSA와의 차이점
- 서비스 공유 지향점
    - SOA - 재사용을 통한 비용 절감
    - MSA - 서비스간의 결합도를 낮추어 변화에 능동적 대응

- 기술 방식
    - SOA - 공통의 서비스를 ESB에 모아 사업 측면에서 공통 서비스 형식으로 서비스 제공
    - MSA - 각 독립된 서비스가 노출된 REST API를 사용

## "A way to grade your API according to the constraints of REST"

- LV 0 
    - 웹서비스 상태로 제공하기위해 URL만 mapping된 상태
    - Expose soap web services ins rest style
    - http://server/getPosts
    - http://server/deletePosts
    - http://server/doThis

- LV1
    - 웹으로 공개하는 리소스에 대해 의미있는 URL로 표현의 시작
    - Expost resources with proper uri
    - http://server/accounts
    - http://server/accounts/10
    - note: improper use of http methods

- LV2
    - lv1단계에서 http method가 추가된 단계

- LV3
    - 데이터로 다음 작업에서 상태정보를 넘겨주는 단계
    - Lv2 + HATEOAS 
    - DATA + NEXT POSSIBLE ACTIONS

## RESTful Web Service
- Consumer first

- Make best use of HTTP

- Request methods
    - GET
    - POST
    - PUT
    - DELETE

- Response Status
    - 200
    - 404
    - 400
    - 201
    - 401

- No Secure info in URI

- Use plurals
    - prefer /users to /user
    - prefer /users/1 to/user/1

- User nouns for resources

- For exceptions
    - define a consistent approach
    /search
    PUT/gists/{id}/star/
    DELETE/fists/{id}/star

# Microservice Architecture Structures
## Service Mesh Capabilities
![img](/assets/category/MSA/inflearn/00-01.png)
- Service Mesh : 
    - MSA를 적용한 System 내부 통신
    - Service Mesh를 통해 Service간 통신을 추상화 및 안전하고 빠르게만들어주는 Infra structure의 layer
- MSA 인프라 > 미들웨어
    - 프록시 역할, 인증, 권한 부여, 암호화, 서비스 검색, 요청 라우팅, 로드 밸런싱
    - 자가 치유 복구 서비스
- 서비스간의 통신과 관련된 기능을 자동화

## MSA 표준 구성 요소
![img](/assets/category/MSA/inflearn/00-02.png)
- CNCF(Cloud native Computing Foundation)
    - Cloud Native Interactive Landscape
    

## MSA 기반 기술
![img](/assets/category/MSA/inflearn/00-03.png)

# Spring Cloud
## https://spring.io/projects/spring-cloud
- Spring Boot + Spring Cloud
    - Table 1. Release train Spring Boot compatibility

Release Train | Release Train
------------- | -------------
2022.0.x aka Kilburn | 3.0.x, 3.1.x (Starting with 2022.0.3)
2021.0.x aka Jubilee | 2.6.x, 2.7.x (Starting with 2021.0.3)
2020.0.x aka Ilford	 | 2.4.x, 2.5.x (Starting with 2020.0.3)
Hoxton	             | 2.2.x, 2.3.x (Starting with SR5)
Greenwich	         | 2.1.x
Finchley	         | 2.0.x
Edgware	             | 1.5.x
Dalston	             | 1.5.x

## Main Projects
- Spring Cloud Config


## Spring Cloud