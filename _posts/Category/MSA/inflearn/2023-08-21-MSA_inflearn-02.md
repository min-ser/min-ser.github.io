---
layout: BLACKCODE
title: "[Section 2.] API Gateway Service"
subtitle: ""
description: ""
date: 2023-08-21 01:00:00
author: "김민서"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: []
category: [MSA]
# comments: false
# share: false
---

# API Gateway Service
- API Gateway Service의 역할
  - proxy

## Cloud Architect
![img](/assets/category/MSA/inflearn/02-01.png)
- 클라이언트-마이크로 서비스 간 직접 통신
- client측에서 Microservice의 주소를 통해 정보를 요청하는 모습   
- Client side에서 Microservice의 EndPoint를 직접 호출했을 경우 client side의 application도 수정이 필요함   
- 단일 진입점 형태로서 개발하는게 필요

## API Gateway Service를 사용한 모습
![img](/assets/category/MSA/inflearn/02-02.png)
- API Gateway가 진입로가 됨
- 각각의 Microservice에 요청되는 모든 서비스를 일괄처리

## API Gateway를 사용하면
- 인증 및 권한 부여
- 서비스 검색 통합
- 정책, 횔 차단기 및 QoS 다시 시도
- 속도 제한
- 부하 분산
- 로깅, 추적, 상관 관계
- 헤더, 쿼리 문자열 청구 변환
- IP허용 목록에 추가

# Netflix Ribbon
## Spring Cloud에서의 MSA간 통신
1. RestTemplate
   ```
   RestTemplate restTemplate = new RestTemplate();
   restTemplate.getForObject("http://localhost:8080/",User.class ,200);
   ```
2. Feign Client
    ```
    @FeignClient("stores")
    public interface StoreClient {
        @RequestMapping(method = RequestMethod.GET, value = "/stores")
        List<Store> getStores();
    }
    ```

## Ribbon: `Client side` Load Balancer
![img](/assets/category/MSA/inflearn/02-03.jpg)
- 서비스 이름으로 호출
- Health Check
- `Spring Cloud Ribbon은 Spring Boot 2.4에서 Maintenance 상태`

# Netflix Zuul 구현
- 구성
  - First Service
  - Second Service
  - Netflix Zuul(`Gateway 역할`)