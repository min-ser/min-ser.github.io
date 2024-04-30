---
layout:     BLACKCODE
title:      "[따배쿠] 4-1. 쿠버네티스 아키텍처 - Kubernetes 동작원리 [7/36]"
subtitle:   "[따배쿠] 4-1. 쿠버네티스 아키텍처 - Kubernetes 동작원리"
description: "https://www.youtube.com/playlist?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c"
date:       2023-01-04 1:00:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [Kubernetes]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Iue9TC13vPQ?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 4-1. 쿠버네티스 아키텍처 - Kubernetes 동작원리" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# 목차
- 쿠버네티스 동작원리
- namespace
- yaml
- api version

---

# 쿠버네티스 동작원리
## 쿠버네티스에서 컨테이너 동작 FLOW
![쿠버네티스에서 컨테이너 동작 FLOW](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/TTABAE-LEARN/img/06/01.png?raw=true)

1. 개발자가 컨테이너 Build
    - mainui
    - login
    - pay

2. 도커 명령어(push)로 저장소에 저장
    - public : Docker Hub
    - private : 사내 hub

3. 개발자 및 운영자가 쿠버네티스에게 컨테이너가 실행될 수 있도록 명령어 실행
    - kubectl create deploy web --image=hub.example.com/nginx

4. Control plane(Master node(s))
    - `api 컨테이너`가 실행 요청 수행
    - 컨테이너를 어떤 노드에 실행할지 `Scheduler`에게 질의
    - `Scheduler`가 노트상태 분석 후 적절한 노드를 `api 컨테이너`에게 보고
    - `api 컨테이너`가 스커쥴러를 통해 전달받은 노드의 `kubelet`에게 컨테이너 실행 요청

5. 요청받은 노드의 `kubelet`
    - api의 요청을 docker 명령어로 바꿔 `Docker데몬`에 실제 컨테이너 실행 요청

6. `Docker데몬`
    - hub를 통해 요청받은 컨테이너(ex: nginx) 확인
    - 이미지를 받아와 `컨테이너(POD)` 실행
    - 쿠버네티스는 컨테이너를 POD단위로 관리

## 쿠버네티스 컴포넌트
- 마스터 컴포넌트(Control-Plane )
    - `etcd`
        - key-value 타입의 저장소
        - wocker node의 정보들을 보관하고 있음
        1. api서버로부터 요청시 갖고있는 worker node의 정보를 api에 전달해줌
        2. api가 전달받은 worker node정보를 다시 `스케쥴러`에게 전달하여 작업이 가능한지 확인
        3. 작업가능여부 확인 후 worker node의 kubelet에게 작업 요청
    - `kube-apiserver`
        - k8s API를 사용하도록 요청을 받고 요청이 유효한지 검사
    - `kube-scheduler`
        - 파드를 실행할 노드 선택
    - `kube-controller-manager`
        - 파드를 관찰하며 개수를 보장
- 워커 노드 컴포넌트
    - kubelet(데몬)
        - 모든 노드에서 실행되는 k8s 에이전트
        - 데몬 형태로 동작
        - CAdvisor 
    - kube-proxy
        - k8s의 network 동작을 관리
        - iptables rule을 구성
    - 컨테이너 런타임
        - 컨테이너를 실행하는 엔진
        - docker, containerd, runc

## 쿠버네티스 아키텍쳐
![쿠버네티스 아키텍쳐](https://raw.githubusercontent.com/IIBlackCode/IIBlackCode.github.io/master/_posts/Category/Kubernetes/TTABAE-LEARN/img/06/02.png)
- Control plane
    - API : kubectl 요청을 받음 `Nginx 실행` 명령
        - 사용자의 명령어를 문법, 권한 체크 후 실행
        - etcd 정보확인
        - schduler에게 요청
        - schduler에게 응답 확인 후 해당 노드의 kubelet에 명령어(`Nginx 실행`) 요청
    - etcd : key, value 타입으로 저장되는 저장소
        - work node에 대한 상태정보
        - docker container의 동작중인 상태
        - 다운로드된 이미지의 상태
        - 위 상태정보를 MasterNode에 전달
    - schduler : api가 준 etcd 정보를 바탕으로 노트 체크 후 api에 응답
- node1
    - kubelet
        - API로부터 요청받은 명령어(`Nginx 실행`)를 Docker 명령어로 `Nginx 실행`명령어 송출
        - CAdvisor를 통해 현재 컨테이너기반의 상태정보 수집
        - H/W 정보 수집
    - Docker
        - kubelet으로 부터 요청받은 명령어에 따라 Docker Hub로부터 버전체크 후 받아와 동작 실행
- node2

---

## 애드온
- 네트워크 애드온
    - CNI - weave, calico, flaneid, kube-route ...
- dns 애드온
    - coreDNS
- 대시보드 애드온
    - [Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
- 컨테이너 자원 모니터링
    - cAdvisor
- 클러스터 로깅
    - 컨테이너로그, k8s 운영 로그들을 수집해서 중앙화
    - ELK(ElasticSearch, Logstash, Kibana), EFK(ElasticSearch, Kibana), DataDog