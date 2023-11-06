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
- watch kubectl get pods -o wide
    > 실시간으로 kubectl get pods -o wide 명령어 확인

- cat rc-nginx.yaml에 대한 설명
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-nginx
spec:
  replicas: 3   # replica 갯수 3개, app: webui를 3개 보장
  selector:
    app: webui
  template:     # app: webui가 3개가 아닐경우 template를 통해 생성
    metadata:
      name: nginx-pod
      labels:
        app: webui
    spec:
      containers:
      - name: nginx-container
        image: nginx:1.14
```

- rc-nginx.yaml 동작
```
kubectl create -f rc-nginx.yaml
```

- replicationController 정보보기
```
명령어 : kubectl get replicationcontrollers
명령어 : kubectl get rc
```

- 실습
```
DESIRED : replica 수 3개 요구
CURRENT : 현재 3개 실행중
READY   : 준비된 상태 3개

master@master:kubectl get replicationcontrollers
NAME       DESIRED   CURRENT   READY   AGE
rc-nginx   3         3         3       99s
```

- --dry-run 명령어 실행으로 (문법)이상유무 확인 가능
```
kubectl run redis --image=redis --dry-run
```

- redis.yaml 생성 명령어
```
kubectl run redis --image=redis --labels=app=webui --dry-run -o yaml > redis.yaml
```

- vi redis.yaml
```
dd : 라인 삭제

apiVersion: v1
kind: Pod
metadata:
  labels:
    app: webui
  name: redis
spec:
  containers:
  - image: redis
    name: redis
```

- label 정보 확인
```
kubectl get pod --show-labels
```

- edit명령어를 이용한 ReplicaController 수정하기
```
아래 명령어 실행 후 spec 아래에 있는 replicas의 수 수정
kubectl edit rc rc-nginx

spec:
  replicas: 4
```

- 명령어로 간단하게 replicas의 숫자 수정하기
```
자유롭게 scale up, down이 가능
kubectl scale rc rc-nginx --replicas=2
```

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

## ReplicationController example(2)
- kubectl `edit` rc rc-nginx
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-nginx
spec:
  replicas: 3 >> 4
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
- kubectl `scale` rc rc-nginx `--replicas=3`
### 현재 동작중인 Pod 수는?

- kubectl describe rc rc-nginx

## ReplicationController example(3)
- kubectl `edit` rc rc-nginx
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-nginx
spec:
  replicas: 4
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
        image: nginx:1.14 >> 1.15
```

- kubectl describe pod rc-nginx-xxxxx
> 동작중인 컨테이너 이미지는?

- kubectl delete pod rc-nginx-xxxx
- kubectl describe pod rc-nginx-yyyy
> pod 삭제 시 새로운 pod가 생성된다.
> 생성된 pod image는?

- kubectl delete rc rc-nginx

# QUESTION & ANSWER
1. 다음의 조건으로 ReplicationController를 사용하는 rc-lab.yaml파일을 생성하고 동작시킵니다.
- labels(name: apache, app:main, rel:stable)를 가지는 httpd:2.2 버전의 Pod를 2개 운영합니다.
    - rc name: rc-mainui
    - container: httpd:2.2
- 현재 디렉토리에 rc-lab.yaml파일이 생성되어야 하고, 애플리케이션 동작은 파일을 이용해 실행합니다.

## 1. 실행중인 pod 삭제
- kubectl delete all --all
- kubectl get rc
- kubectl delete rc {복사한이름}

## 2. yaml 파일 생성
kubectl run redis --image=redis --labels=app=webui --dry-run -o yaml > rc-lab.yaml
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-mainui
spec:
  replicas: 2  
  selector:
    app: main
  template:     
    metadata:
      labels:
        name: apache
        app: main
        rel: stable
    spec:
      containers:
      - name: httpd-container
        image: httpd:2.2
```
kubectl create -f rc-nginx.yaml


2. 동작되는 http:2.2 버전의 컨테이너를 3개로 확장하는 명령을 적고 실행하세요.
CLI#
```
kubectl scale rc rc-lab --replicas=3
```