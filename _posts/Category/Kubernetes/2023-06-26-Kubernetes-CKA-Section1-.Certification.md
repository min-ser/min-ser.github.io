---
layout:     BLACKCODE
title:      "CKA Certification"
subtitle:   ""
description: ""
date:       2023-06-26 1:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [Azure]
category: [Kubernetes]
# comments: false
# share: false
---
# 쿠버네티스를 사용해야 하는 이유

## Kubernetes Trend
![img](/assets/category/Kubernetes/2023/06/kubernetes_-_Explore_-_Google_Trends.png)
> Kubernetes 엔지니어의 필요성 확대에 따른 고용증가

## Kubernetes의 목적
응용 프로그램을 컨테이너 형식으로 자동화된 방식으로 호스트 하는 것    
요구에 따른 프로그램의 많은 인스턴스를 쉽게 배포할 수 있고    
응용프로그램내 다양한 서비스간의 통신이 쉬움    

# Cluster Architecture
## 컨테이너는 주로 화물선에 비교
- Worker Nodes
    - Host Application asContainers
    - 컨테이너를 로딩할 수 있음
- Master Nodes
    - 선박에 컨테이너를 적재
    - 적재 계획, 선박 식별
    - 선박에 실린 컨테이너 파악
    - 전체적인 적재 과정을 관리
    - 클러스터 관리
- ETCD 
    - 선박에 필요한 모든 정보가 저장된 키값으로 이루어진 스토어
- Kubelet(컨테이너 화물선의 선장)
    - 클러스터의 각 노드에서 실행되는 Agent
    - Kube API 서버의 지시를 듣고 컨테이너를 배포/삭제하는 역할
- KubeAPI
    - 주기적으로 Kubelet으로부터 상태 보고서를 통해 노드와 컨테이너 상태 모니터링

# 12. Docker-vs-ContainerD
