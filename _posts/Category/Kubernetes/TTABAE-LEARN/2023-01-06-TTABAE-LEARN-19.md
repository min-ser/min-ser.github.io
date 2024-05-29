---
layout:     BLACKCODE
title:      "[19/36] 6-3. 쿠버네티스 RollingUpdate를 위한 Deployment"
subtitle:   ""
description: "https://www.youtube.com/watch?v=5X3t6VJH2vQ&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=17"
date:       2023-01-06 2:00:00
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

# ReplicaSet
- Replication Controller와 성격은 동일
    - pod의 갯수 보장
- ReplicationController 와 같은 역할을 하는 컨트롤러
- ReplicationController 보다 풍부한 selector 지원

```yaml
selector:
  matchLables:
    component: redis
  matchExpressions:
    - {key: tier, operator: In, values: [cache]}
    - {key: environment, operator: Notln, values: [dev]}
```

- matchExperssions 연산자
    - ln : key와 values를 지정하여 key, value가 일치하는 Pod만 연결
    - Notln : key는 일치하고 value는 일치하지 않는 Pod에 연결
    - Exists : key에 맞는 label의 pod를 연결
    - DoesNotExist : key와 다른 label의 pod를 연결

## ReplicationController
```yaml
spec:
  replicas: 3
  selector:
    app: webui
    version: "2.1"
    temp..
```

## ReplicaSet
```yaml
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webui
      version: "2.1"  # 여기까지는 ReplicationController와 같다.
    matchExpressions: # 차이점 : 풍부한 label selector를 보장한다.
    - {key: version, operator: Exists}                      # 버전이 존재하면 됨
    - {key: version, operator: In, value:["2.1","2.2"]}     # 버전이 2.1 or 2.2 둘중에 아무거나
    - {key: version, operator: NotIn, value:["2.1","2.2"]}  # 버전이 2.1 or 2.2이 아닌것
    temp..
```

# ReplicationController definition
## ReplicationController definition
```yaml
apiVersion:v1
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

## ReplicaSet Definition
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

# ReplicaSet의 selector
## matchLabels
- key: value
## matchExpressions 연산자
- In : key와 values를 지정하여 key, value가 일치하는 Pod만 연결
- NotIn : key는 일치하고 value는 일치하지 않는 Pod에 연결
- Exists : key에 맞는 label의 pod를 연결
- DoesNotExist : key와 다른 label의 pod를 연결

### In
```yaml
spec:
  replicas: 3
  selector:
    matchExpressions:
    - {key: ver, operator: In, value:["1.14"]}
template:
```

### Exists
```yaml
spec:
  replicas: 3
  selector:
    matchExpressions:
    - {key: ver, operator: Exists}
template:
```

# ReplicaSet example
```shell
cat > rs-nginx.yaml
apiVersion: apps/v1
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

kubectl create -f rs-nginx.yaml
watch kubectl get pods -o wide
# 현재 동작중인 Pod 수는?

kubectl get replicasets
kubectl get rs

kubectl describe rs rs-nginx

# 파드 삭제 시 ReplicationController가 하는 일은?
kubectl get pods
kubectl delete pod rs-nginx-xxxx

kubectl delete rs rs-nginx --cascade=false
kubectl get rs
kubectl get pods
kubectl delete pod --all
```

실습
=============

```shell
# pod를 삭제하면 되살아난다. Controller까지 삭제해야함
master@master:~$ kubectl delete rc rc-nginx
replicationcontroller "rc-nginx" deleted

master@master:~$ cat > rs-nginx.yaml 
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-nginx
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

master@master:~$ kubectl create -f rs-nginx.yaml 
replicaset.apps/rs-nginx created

master@master:~$ kubectl get pod --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
rs-nginx-cfdlz   1/1     Running   0          14s   app=webui  
rs-nginx-jl696   1/1     Running   0          14s   app=webui
rs-nginx-wfrnw   1/1     Running   0          14s   app=webui  

master@master:~$ kubectl get replicaset
NAME       DESIRED   CURRENT   READY   AGE
rs-nginx   3         3         3       23s

master@master:~$ kubectl get rs
NAME       DESIRED   CURRENT   READY   AGE
rs-nginx   3         3         3       27s

# Controller의 pod 의 수 유지 기능
master@master:~$ kubectl delete pod rs-nginx-wfrnw
pod "rs-nginx-wfrnw" deleted
master@master:~$ kubectl get pod --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
rs-nginx-cfdlz   1/1     Running   0          75s   app=webui       
rs-nginx-jl696   1/1     Running   0          75s   app=webui       
rs-nginx-pwjll   1/1     Running   0          17s   app=webui # 새로운 pod 생성

# Controller의 Scale, replica 수 2개로 줄이기
master@master:~$ kubectl scale rs rs-nginx --replicas=2
replicaset.apps/rs-nginx scaled

master@master:~$ kubectl get pod --show-labels
NAME             READY   STATUS    RESTARTS   AGE     LABELS
rs-nginx-cfdlz   1/1     Running   0          2m41s   app=webui     
rs-nginx-jl696   1/1     Running   0          2m41s   app=webui

```

Replicaset과 ReplicaController와 차이는 거의 없으나 replicaset보다 풍부한 selector를 지원한다.

```shell
# Controller만 삭제 :  --cascade=false
master@master:~$ kubectl delete rs rs-nginx --cascade=false
warning: --cascade=false is deprecated (boolean value) and can be replaced with --cascade=orphan.
replicaset.apps "rs-nginx" deleted

master@master:~$ kubectl get pod --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
rs-nginx-cfdlz   1/1     Running   0          10m   app=webui       
rs-nginx-jl696   1/1     Running   0          10m   app=webui 

master@master:~$ kubectl get rs
No resources found in default namespace.

# 이 상태에서 다시 배포하게되면 어떤일이 벌어질까?
master@master:~$ cat rs-nginx.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-nginx
spec:
  replicas: 3 # replicas의 수를 3개로 유지하려고 하기 때문에 기존 2개인 상태에서 한개가 더 생성될 것!
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

master@master:~$ kubectl get pod --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
rs-nginx-cfdlz   1/1     Running   0          13m   app=webui
rs-nginx-jl696   1/1     Running   0          13m   app=webui
rs-nginx-qmjsn   1/1     Running   0          23s   app=webui # 새로 생성됨
```

---

# QUESTION & ANSWER
1. 다음의 조건으로 ReplicaSet을 사용하는 rc-lab.yaml파일을 생성하고 동작시킵니다.
- labels(name: apache, app:main, rel:stable)를 가지는 httpd:2.2 버전의 Pod를 2개 운영합니다.
    - rs name : rs-mainui
    - container : httpd:2.2
- 현재 디렉토리에 rs-lab.yaml파일이 생성되어야 하고, Application 동작은 파일을 이용홰 실행합니다.

2. 동작되는 http:2.2 버전의 컨테이너를 1개로 축소하는 명령을 적고 실행하세요