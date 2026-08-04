---
layout:     BLACKCODE
title:      "[19/36] 6-3. 쿠버네티스 RollingUpdate를 위한 Deployment"
subtitle:   ""
description: "https://www.youtube.com/watch?v=5X3t6VJH2vQ&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=17"
date:       2023-01-06 3:00:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
# 이미지 : ![img](/assets/category/Kubernetes/2023/07/17-03.PNG)
---

<iframe width="560" height="315" 
src="https://www.youtube.com/embed/L5LDBWrP6QU?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" 
title="[따배쿠] 6-3. 쿠버네티스 RollingUpdate를 위한 Deployment"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 수업내용
## Part 1. 쿠버네티스 시작하기
1. 쿠버네티스 소개
2. 쿠버네티스 설치하기
3. 쿠버네티스로 컨테이너 실행하기

## Part 2. 쿠버네티스 기본 개념
4. 쿠버네티스 아키텍처
5. 파드
6. `컨트롤러`
7. 서비스
8. 인그레스
9. 레이블과 애너테이션
10. 컨피그맵
11. 시크릿 

## Part 3. 쿠버네티스 한 걸음 더 들어가기
12. 파드 스케쥴링
13. 인증과 권한관리
14. 데이터 저장
15. 클러스터 네트워킹 구성
16. 쿠버네티스 DNS
17. 로깅과 모니터링
18. 오토스케일링
19. 사용자 정의 자원
20. 쿠버네티스 기반으로 워드프레스 앱 실행하기
21. 헬름 

---

학습내용
----
- Replication Controller
- ReplicaSet
- Deployment
- DaemonSet
- StatefulSet
- Job
- CronJob

---

# Deployment
- ReplicaSet을 컨트롤해서 Pod수를 조절
- Rolling Update & Rolling Back

# [Rolling Update란?](https://kubernetes.io/ko/docs/tutorials/kubernetes-basics/update/update-intro/)

롤링 업데이트는 파드 인스턴스를 점진적으로 새로운 것으로 업데이트하여 디플로이먼트 업데이트가 서비스 중단 없이 이루어질 수 있도록 해준다. 새로운 파드는 가용한 자원을 보유한 노드로 스케줄될 것이다.

![img](/assets/category/Kubernetes/TTABAE-LEARN/6-3/0module_06_rollingupdates4.svg)

# Deployment definition

ReplicaSet definition과 Deployment definition은 kind(api 이름)만 다름
Deployment로 Rolling Update기능만 사용하지 않으면 ReplicaSet운영하듯 할 수 있다.

## ReplicaSet definition
```yaml
apiVersion:apps/v1
kind: ReplicaSet
metadata:
  name: rc-nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webui
  template:
    metadata:
      name: nginx-pod
      labels:
        app: webui
      spec:
        containers:
        - name: nginx-container
          image: nginx:1.14
```
## Deployment definition
```yaml
apiVersion:apps/v1
kind: Deployment
metadata:
  name: rc-nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webui
  template:
    metadata:
      name: nginx-pod
      labels:
        app: webui
      spec:
        containers:
        - name: nginx-container
          image: nginx:1.14
```

# Deployment Example
```shell

cat > deploy-nginx.yaml
apiVersion:apps/v1
kind: Deployment
metadata:
  name: rc-nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webui
  template:
    metadata:
      name: nginx-pod
      labels:
        app: webui
      spec:
        containers:
        - name: nginx-container
          image: nginx:1.14

kubectl create -f deploy-nginx.yaml
watch kubectl get pods -o wide

kubectl get deployments
kubectl get replicasets
kubectl get pods

kubectl delete deployment deploy-nginx
```