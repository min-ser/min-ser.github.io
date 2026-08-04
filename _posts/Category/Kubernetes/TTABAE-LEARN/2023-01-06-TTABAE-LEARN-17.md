---
layout:     BLACKCODE
title:      "[17/36] 6-1 Controller - ReplicationController란?"
subtitle:   ""
description: "https://www.youtube.com/watch?v=5X3t6VJH2vQ&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=17"
date:       2023-01-06 1:00:00
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
src="https://www.youtube.com/embed/5X3t6VJH2vQ?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" 
title="[따배쿠] 6-1 Controller - ReplicationController란?"
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

# Controller란?
- Pod의 개수를 보장
- 특정 application 실행하는 pod가  application을 몇개 운영할것인지 결정하고 보장해주는 역할

![img](/assets/category/Kubernetes/TTABAE-LEARN/6-1/01.png)
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

## Controller의 종류
![img](/assets/category/Kubernetes/TTABAE-LEARN/6-1/02.png)

## ReplicationController
- 요구하는 Pod의 개수를 보장하며 파드 집합의 실행을 항상 안정적으로 유지 하는 것을 목표
    - 요구하는 Pod의 개수가 부족하면 template를 이용해 Pod를 추가
    - 요구하는 Pod 수 보다 많으면 최근에 생성된 Pod를 삭제
- 기본 구성
    - selector
    - replicas
    - template
- yml 파일 형식
```yaml
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

## ReplicationController 동작원리
1. `API`에게 key: value를 app=webui로 가지고 있는 lable을 선택해서 nginx 웹 서버 3개 실행 요청
```shell
kubectl create rc-exam --imager=nginx --replicas=3 --selector=app=webui
```
2. etcd와 sccheduler의 도움을 받아 현재 시스템에 `app: webui`라벨을 가지는 컨테이너를 3개의 node에 3개 실행

## ReplicationController definition(정의)
### Pod-definition
```yaml
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
### ReplicationController-definition
```yaml
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
## ReplicationController example(1)
### rc-nginx.yaml
```yaml
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

### 명령어
```shell
kubectl create -f rc-nginx.yaml

# 화면 분리 후 별도 실행, 현재 동작중인 pod 수는?
watch kubectl get pods-o wide

kubectl get replicationcontrollers
kubectl get rc
kubectl describe rc rc-nginx

# 파드 삭제 시 ReplicationController가 하는 일은?
kubectl get pods
kubectl delete pod rc-nginx-xxxx
```

---

# 실습
## 모니터링
```shell
watch kubectl get pods -o wide
```

## rc-nginx.yaml파일 배포
```yaml
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

## 실습화면
```shell
# replicationController 정보보기
kubectl get replicationcontrollers
kubectl get rc


# DESIRED : replica 수 3개 요구
# CURRENT : 현재 3개 실행중
# READY   : 준비된 상태 3개

master@master:~$ kubectl create -f rc-nginx.yaml 
replicationcontroller/rc-nginx created
master@master:~$ kubectl get replicationcontrollers
NAME       DESIRED   CURRENT   READY   AGE
rc-nginx   3         3         3       16m
master@master:~$ kubectl get rc
NAME       DESIRED   CURRENT   READY   AGE
rc-nginx   3         3         3       16m

# --dry-run 명령어 실행으로 (문법)이상유무 확인 가능
master@master:~$ kubectl run redis --image=redis --dry-run
W0529 04:53:05.923004   75148 helpers.go:704] --dry-run is deprecated and can be replaced with --dry-run=client.
pod/redis created (dry run)

# redis.yaml파일 생성
kubectl run redis --image=redis --labels=app=webui --dry-run -o yaml > redis.yaml

# redis.yaml vi 편집
# 라인삭제 : dd
master@master:~$ vi redis.yaml
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

# 1. Controller의 역할, redis.yaml 배포하면 어떻게 될까?
Every 2.0s: kubectl get pods -o wide                                                                 master: Wed May 29 05:24:29 20244:24 20242024
NAME             READY   STATUS        RESTARTS   AGE   IP            NODE    NOMINATED NODE   READINESS GATES
rc-nginx-858vg   1/1     Running       0          38m   10.244.1.10   node2   <none>           <none>
rc-nginx-9t5v4   1/1     Running       0          38m   10.244.2.7    node1   <none>           <none>
rc-nginx-zqzt2   1/1     Running       0          38m   10.244.2.6    node1   <none>           <none>
redis            0/1     Terminating   0          2s    <none>        node1   <none>           <none>

# Controller가 3개를 보장하면서 새로 생성된 pod를 죽임
Every 2.0s: kubectl get pods -o wide                                                                 master: Wed May 29 05:24:29 20244:24 20242024

NAME             READY   STATUS    RESTARTS   AGE   IP            NODE    NOMINATED NODE   READINESS GATES
rc-nginx-858vg   1/1     Running   0          62m   10.244.1.10   node2   <none>           <none>
rc-nginx-9t5v4   1/1     Running   0          62m   10.244.2.7    node1   <none>           <none>
rc-nginx-zqzt2   1/1     Running   0          62m   10.244.2.6    node1   <none>           <none>

# 2. Controller의 역할, scale-out

# 아래 명령어를 통해 replica의 수를 3>4로 수정(i) 후 저장(wq)
master@master:~$ kubectl edit rc rc-nginx
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be       
# reopened with the relevant failures.
#
apiVersion: v1
kind: ReplicationController
metadata:
  creationTimestamp: "2024-05-29T04:21:49Z"
  generation: 2
  labels:
    app: webui
  name: rc-nginx
  namespace: default
  resourceVersion: "64873"
  uid: 4fb36c51-103a-40c4-9320-fdbf563b35f4
spec:
  replicas: 4 # 3에서 4로 변경
  selector:
    app: webui

# watch 명령어 모니터링, horizontal scale-out을 통해 확장
Every 2.0s: kubectl get pods -o wide                                                     master: Wed May 29 05:37:21 2024

NAME             READY   STATUS    RESTARTS   AGE     IP            NODE    NOMINATED NODE   READINESS GATES        
rc-nginx-858vg   1/1     Running   0          75m     10.244.1.10   node2   <none>           <none>
rc-nginx-9t5v4   1/1     Running   0          75m     10.244.2.7    node1   <none>           <none>
rc-nginx-f22kt   1/1     Running   0          5m27s   10.244.1.11   node2   <none>           <none>
rc-nginx-zqzt2   1/1     Running   0          75m     10.244.2.6    node1   <none>           <none>

# 3. Scale-down
master@master:~$ kubectl scale rc rc-nginx --replicas=2
replicationcontroller/rc-nginx scaled

# Scale-down 결과
Every 2.0s: kubectl get pods -o wide                                                     master: Wed May 29 05:40:03 2024

NAME             READY   STATUS    RESTARTS   AGE   IP            NODE    NOMINATED NODE   READINESS GATES
rc-nginx-858vg   1/1     Running   0          78m   10.244.1.10   node2   <none>           <none>
rc-nginx-9t5v4   1/1     Running   0          78m   10.244.2.7    node1   <none>           <none>
```

## Controller의 역할
1. Scale-out
2. Scale-down

운영기간중 이벤트를 통해 부하를 예측하여 기존에 있는 시스템을 Scale-out하거나 Scale-down을 통해 시스템의 하드웨어 리소스를 적절하게 사용할 수 있다.
paas플랫폼의 base가 되는 기술

## edit기능을 통해 nginx버전을 1.15로 올리면 적용이 될까?
```shell
master@master:~$ kubectl edit rc rc-nginx
replicationcontroller/rc-nginx edit

# Please edit the object below. Lines beginning with a '#' will be ignored, 
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
kind: ReplicationController
metadata:
  creationTimestamp: "2024-05-29T04:21:49Z"
  generation: 4
  labels:
    app: webui
  name: rc-nginx
  namespace: default
  resourceVersion: "66064"
  uid: 4fb36c51-103a-40c4-9320-fdbf563b35f4
spec:
  replicas: 2
  selector:
    app: webui
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: webui
      name: nginx-pod
    spec:
      containers:
      - image: nginx:1.15 # 1.14 > 1.15로 수정
        imagePullPolicy: IfNotPresent
        name: nginx-container
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
status:
  availableReplicas: 2
  fullyLabeledReplicas: 2
  observedGeneration: 4
  readyReplicas: 2
  replicas: 2
```

Controller는 selector만 바라보기때문에 영향을 주지 않음

```shell
master@master:~$ kubectl get pods --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
rc-nginx-858vg   1/1     Running   0          86m   app=webui
rc-nginx-9t5v4   1/1     Running   0          86m   app=webui

# nginx 버전 확인
master@master:~$ kubectl describe pod rc-nginx-858vg
Name:             rc-nginx-858vg
Namespace:        default
Priority:         0
Service Account:  default
Node:             node2/10.0.2.4
Start Time:       Wed, 29 May 2024 04:21:49 +0000
Labels:           app=webui
Annotations:      <none>
Status:           Running
IP:               10.244.1.10
IPs:
  IP:           10.244.1.10
Controlled By:  ReplicationController/rc-nginx
Containers:
  nginx-container:
    Container ID:   containerd://5eb0f5f934821186263fa75df455ccba29642fb9a6443bde8f97332f4d7569d2
    Image:          nginx:1.14 # 1.14로 변화없음
    Image ID:       docker.io/library/nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 29 May 2024 04:21:49 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-8mz5g (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-8mz5g:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:                      <none>
```

확인했던 pod를 삭제 후 다시 버전을 확인해본다.

```shell
# pod 삭제
master@master:~$ kubectl delete pod rc-nginx-858vg
pod "rc-nginx-858vg" deleted

# 생성된 pod 확인
master@master:~$ kubectl get pods --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
rc-nginx-9t5v4   1/1     Running   0          90m   app=webui
rc-nginx-q7dht   1/1     Running   0          15s   app=webui

# 새로 생성된 pod를 describe 명령어로 조회
master@master:~$ kubectl describe pod rc-nginx-q7dht
Name:             rc-nginx-q7dht
Namespace:        default
Priority:         0
Service Account:  default
Node:             node2/10.0.2.4
Start Time:       Wed, 29 May 2024 05:52:10 +0000
Labels:           app=webui
Annotations:      <none>
Status:           Running
IP:               10.244.1.13
IPs:
  IP:           10.244.1.13
Controlled By:  ReplicationController/rc-nginx
Containers:
  nginx-container:
    Container ID:   containerd://e8063f636de9ffb8b4c16235f68b120a4f823a4c966f4cc87c0a3157b58664cd
    Image:          nginx:1.15 # 버전이 바뀌어있다.
    Image ID:       docker.io/library/nginx@sha256:23b4dcdf0d34d4a129755fc6f52e1c6e23bb34ea011b315d87e193033bcd1b68    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 29 May 2024 05:52:12 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-q28xr (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-q28xr:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  24s   default-scheduler  Successfully assigned default/rc-nginx-q7dht to node2
  Normal  Pulled     22s   kubelet            Container image "nginx:1.15" already present on machine
  Normal  Created    22s   kubelet            Created container nginx-container
  Normal  Started    22s   kubelet            Started container nginx-container
```

서비스 동작중의 버전을 업그레이드 하였다. 이런 무중단 서비스 업데이트를 `rolling update`라고 한다.
서비스가 중단되지 않고 비즈니스 연속성을 지원한다.
Controller의 기본 속성중에 이러한 `rolling update`기능이 포함되어있다.

## Controller의 역할
1. Scale-out
2. Scale-down
3. rolling update

---

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