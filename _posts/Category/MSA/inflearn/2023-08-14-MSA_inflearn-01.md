---
layout: BLACKCODE
title: "[Section 1.] Service Discovery"
subtitle: ""
description: ""
date: 2023-08-05 01:00:00
author: "김민서"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: []
category: [MSA]
# comments: false
# share: false
---

# Spring Cloud Netflix Eureka

## Service Discovery(Netflix Eureka의 역할)

- 외부의 다른 서비스들이 Microservice를 검색하기 위해 사용됨
- 일종의 전화번호부같은 역할
- 서비스 등록, 서비스 검색작업이 진행됨
- Key/Value 구조
- | key      | value       |
  | -------- | ----------- |
  | 서비스명 | 서비스 위치 |
- Eureka : Netflix가 가진 클라우드의 기술을 Spring재단에 기부해서 사용할 수 있도록 만듬

## API Gateway(Load Balancer)

![img](/assets/category/MSA/inflearn/01-01.png)

1. Client가 API Gateway에 자신이 필요한 `요청정보`를 전달
2. `요청정보`가 어디있는지 Service Discovery에서 찾음
3. `요청정보`가 어디있는지 Lodbalancer에 반환
4. Client가 Load Balancer를 통해 해당 서버(Microservice)를 호출
5. Client가 요청한 정보를 서버가 반환

## [Eureka SpringBoot 프로젝트 생성](https://start.spring.io/)

## mvn 명령어

### maven 명령어로 실행

```
mvn spring-boot:run
```

### maven 명령어로 다른포트 지정

```
mvn spring-boot:run -D"spring-boot.run.arguments"=--server.port=<포트지정>
mvn spring-boot:run -D"spring-boot.run.arguments"=--server.port=8010
```

### maven 컴파일(gradle의 build 역할)

```
mvn clean
mvn compile package
```

### jar파일 실행시 같은 프로젝트를 다른포트 지정해서 여러개 실행

```
java -jar '-Dserver.port=9001' <jar 파일>
java -jar '-Dserver.port=9002' <jar 파일>

java -jar '-Dserver.port=9002' .\user-service-0.0.1-SNAPSHOT.jar
java -jar '-Dserver.port=9003' .\user-service-0.0.1-SNAPSHOT.jar
```
