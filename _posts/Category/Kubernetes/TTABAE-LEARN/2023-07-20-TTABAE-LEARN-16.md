---
layout:     BLACKCODE
title:      "[따배쿠] 6-1 Controller - ReplicationController란?"
subtitle:   ""
description: "https://www.youtube.com/watch?v=5X3t6VJH2vQ&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=17"
date:       2023-07-19 1:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [Kubernetes]
# comments: false
# share: false
# 이미지 : ![img](/assets/category/Kubernetes/2023/07/17-03.PNG)
---
# 학습내용
- Replication Controller
- ReplicaSet
- Deployment
- DaemonSet
- StatefulSet
- Job
- CronJob

# Controller란?
![img](/assets/category/Kubernetes/TTABAE-LEARN/16-01.ppm)
- Pod의 개수를 보장
- 특정 application 실행하는 pod가  application을 몇개 운영할것인지 결정하고 보장해주는 역할
- 명령어 실행 절차
    1. nginx 웹서버 3개 생성 요청 명령어를 api로 보냄
    ```
    kubectl create deployment webui --image=nginx --replicas=3
    ```
    2. `API`는 `etcd`에서 정보를 얻어 `schduler`에 요청 전송
    3. `schduler`는 node1, node2중 어디에 3개의 nginx를 배치하게될지 확인
    4. 그 결과를 api에게 응답
    5. `API`는 node1, node2중 ngninx를 배치하게 됨 
        - 배치 전 `Controller`에게 nginx 보장 요청
    6. node1, node2에 nginx pod 3개 배치
    7. 하나의 pod에 문제 발생시 `Controller`가 `api`에 요청
        - pod가 모자르므로 한개 더 `api`에 생성 요청
        > `Controller`의 역할3개를 보장해야함
    8. api는 다시 `schduler`를 통해 node1,2중 어디에 배치할지 결정
    9. 3개를 보장

# Controller의 종류
![img](/assets/category/Kubernetes/TTABAE-LEARN/16-02.png)

# ReplicationController
- 요구하는 Pod의 개수를 보장하며 파드 집합의 실행을 항상 안정적으로 유지 하는 것을 목표
    - 요구하는 Pod의 개수가 부족하면 template를 이용해 Pod를 추가
    - 요구하는 Pod 수 보다 많으면 최근에 생성된 Pod를 삭제
- 기본 구성
    - selector
    - replicas
    - template
- yml 파일 형식
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: <RC_이름>
spec:
  replicas: <배포 갯수>
  selector:
    key: value
template:
  <컨테이너 템플릿>
```

# ReplicationController 동작원리
![img](/assets/category/Kubernetes/TTABAE-LEARN/16-01.ppm)
1. API에게 key: value를 app=webui로 가지고 있는 lable을 선택해서 nginx 웹 서버 3개 실행 요청
```
kubectl create rc-exam --imager=nginx --replicas=3 --selector=app=webui
```
2. etcd와 sccheduler의 도움을 받아 현재 시스템에 `app: webui`라벨을 가지는 컨테이너를 3개의 node에 3개 실행

# ReplicationController definition(정의)
## Pod-definition
```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  lables:
    app: webui
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
```
## ReplicationController-definition
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-nginx
spec:
  replicas: 3
  selector:
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

# ReplicationController 실습

## ReplicationController example(1)
- cat rc-nginx.yaml
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-nginx
spec:
  replicas: 3
  selector:
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
- kubectl create -f rc-nginx.yaml
- watch kubectl get pods -o -wide
- kubectl get replicationcontrollers
- kubectl get rc
- kubectl describe rc rc-nginx

### 파드 삭제 시 ReplicationController가 하는 일은?
- kubectl get pods
- kubectl delete pod rc-nginx-XXXX