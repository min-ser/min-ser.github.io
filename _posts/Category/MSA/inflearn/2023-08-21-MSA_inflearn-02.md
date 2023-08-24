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

## API Gateway Service
### Client에서 Microservices를 호출하는 모습
![img](/assets/category/MSA/inflearn/02-01.png)
client측에서 Microservice의 주소를 통해 정보를 요청하는 모습   
Client side에서 Microservice의 EndPoint를 직접 호출했을 경우 client side의 application도 수정이 필요함   
단일 진입점 형태로서 개발하는게 필요

- proxy 역할
