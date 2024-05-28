---
layout:     BLACKCODE
title:      "[16/36] 5-7 쿠버네티스 Pod - Pod 환경변수 설정과 실행 패턴"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-01-05 7:10:00
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
src="https://www.youtube.com/embed/Uc-VnK19T7w?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c"
title="[따배쿠] 5-7 쿠버네티스 Pod - Pod 환경변수 설정과 실행 패턴"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 수업내용
## Part 1. 쿠버네티스 시작하기
1. 쿠버네티스 소개
2. 쿠버네티스 설치하기
3. 쿠버네티스로 컨테이너 실행하기
## Part 2. 쿠버네티스 기본 개념
4. 쿠버네티스 아키텍처
5. `파드`
6. 컨트롤러
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

# Pod의 환경변수 설정하기

## 환경변수
- Pod내의 컨테이너가 실행될 때 필요로 하는 변수
- 컨테이너 제작 시 미리 정의
    - NGINX Dockerfile의 예
        - ENV NGINX_VERSION 1.19.2
		- ENV NJS_VERSION 0.4.3
- POD 실행 시 미리 정의된 컨테이너 환경변수를 변경할 수 있다.

## 환경변수 사용 예
- pod-nginx-env.yaml
```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod-env
spec:
  containers:
  - name: nginx-container
	image: nginx:1.14
	ports:
	- containerPort: 80
	  protocol: TCP
	env:
	- name: MYVAR
	  value: "testvalue"
```

```shell
kubectl get pods
kubectl exec nginx-pod-env --env
```

---

# 환경변수 실습
- pod 전체 삭제
```shell
kubectl delete pods --all
```

## - pod yaml 작성
```yaml
# 기존 pod yaml 활용
cat > pod-nginx-resources.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod-env
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    ports:
    - containerPort: 80
      protocol: TCP
    env:
    - name: MYVAR
      value: "testvalue"
    resources:
      requests:
        memory: 500Mi
        cpu: 200m
```

## - pod 생성
```shell
kubectl create -f pod-nginx-resources.yaml
```

## - nginx-pod-env에 bashshell로 접속
```shell
kubectl exec nginx-pod-env -it -- /bin/bash
```

## - [nginx-pod-env 컨테이너] 환경변수 조회후 생성한 환경변수 조회 
- 명령어 실행 결과
```shell
master@master:~$ kubectl exec nginx-pod-env -it -- /bin/bash
root@nginx-pod-env:/# env
HOSTNAME=nginx-pod-env
NJS_VERSION=1.14.2.0.2.6-1~stretch
NGINX_VERSION=1.14.2-1~stretch
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
MYVAR=testvalue
KUBERNETES_PORT=tcp://10.96.0.1:443
PWD=/
HOME=/root
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_PORT_443_TCP_PORT=443
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
TERM=xterm
SHLVL=1
KUBERNETES_SERVICE_PORT=443
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
KUBERNETES_SERVICE_HOST=10.96.0.1
_=/usr/bin/env
```

# Pod 구성패턴의 종류 3가지
## POD 실행패턴
- Pod를 구성하고 실행하는 패턴
- multi-container Pod

### 1. 사이드카 패턴 (Sidecar Pattern)
설명: 사이드카 패턴은 주 애플리케이션 컨테이너와 함께 보조 기능을 제공하는 컨테이너를 동일한 파드 내에 배치하는 패턴입니다. 보조 컨테이너는 주 컨테이너의 기능을 확장하거나 지원하는 역할을 합니다.

	사용 예: 로그 수집, 데이터 동기화, 프록시 설정, 모니터링 에이전트

	구현 예시: 주 애플리케이션 컨테이너와 로그 수집 컨테이너를 함께 배포하는 경우

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sidecar-example
spec:
  containers:
  - name: main-app
    image: main-app-image:latest
  - name: log-collector
    image: log-collector-image:latest
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/app
  volumes:
  - name: shared-logs
    emptyDir: {}
```

### 2. 어댑터 패턴 (Adapter Pattern)
설명: 어댑터 패턴은 기존 시스템과 새로운 시스템 간의 인터페이스를 맞추기 위해 중간에 배치되는 컨테이너를 사용하는 패턴입니다. 어댑터 컨테이너는 데이터 형식 변환, 프로토콜 변환 등을 수행합니다.

	사용 예: 레거시 시스템과의 통합, 데이터 형식 변환, 프로토콜 브리징

	구현 예시: 레거시 시스템과 RESTful API 간의 데이터를 변환하는 어댑터를 배포하는 경우

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: adapter-example
spec:
  containers:
  - name: legacy-system
    image: legacy-system-image:latest
  - name: adapter
    image: adapter-image:latest
    ports:
    - containerPort: 8080
```

### 3. 앰배서더 패턴 (Ambassador Pattern)
설명: 앰배서더 패턴은 주 애플리케이션 컨테이너와 외부 서비스 간의 통신을 처리하는 프록시 역할을 하는 컨테이너를 사용하는 패턴입니다. 앰배서더 컨테이너는 외부 서비스와의 통신을 관리하고, 보안, 로깅, 모니터링 등의 추가 기능을 제공합니다.

	사용 예: 외부 서비스와의 통신 관리, 트래픽 라우팅, 보안, 로깅, 모니터링

	구현 예시: 외부 데이터베이스 서비스와의 통신을 관리하는 앰배서더 컨테이너를 배포하는 경우

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ambassador-example
spec:
  containers:
  - name: main-app
    image: main-app-image:latest
  - name: ambassador
    image: ambassador-image:latest
    env:
    - name: DATABASE_URL
      value: "jdbc:mysql://external-database:3306/mydb"
    ports:
    - containerPort: 3306
```

# Pod 강의 총정리(5장)
## 학습내용
	- Pod 개념 및 사용하기
	- livenessProbe를 사용한 self-healing Pod
	- init container
	- infra container(pause) 이해하기
	- static pod 만들기
	- Pod에 resource 할당하기
	- 환경변수를 이용해 컨테이너에 데이터 전달하기
	- pod 구성 패턴의 종류
	
# Pod 운영 실습
## Quize1
- Create a static pod on node01 called mydb with image redis.
- Create this pod on node01 and make sure that it is recreated/restarted automatically in case of a failure.
	- Use/etc/kubernetes/manifests as the Static Podpath for example.
	- kubelet Configured for Static Pod
	- Pod mydb-node01 is Up and running

## Quize2
- 다음과 같은 조건에 맞는 Pod를 생성하시오
	- Pod name: myweb, image:nginx:1.14
	- CPU200m, Memory 500Mi를 요구하고, CPU 1core, 1Gi제한받는다.
	- Application 동작에 필요한 환경변수 DB=mydb 를 포함한다.
	- namespace product에서 동작되어야 한다.

---

## Quize1 풀이과정
1. node1 접속
2. node1의 /etc/kubernetes/manifests경로 이동
3. 해당 경로에 mydb.yaml 파일 작성
	```yaml
	apiVersion: v1
	kind: Pod
	metadata:
	name: mydb-node01
	spec:
	containers:
	- image: redis
		name: mydb
	```

## Quize2 풀이과정
1. product namespace생성
	```shell
	kubectl create namespace product
	``` 

2. myweb.yaml파일 작성
	```
	apiVersion: v1
	kind: Pod
	metadata:
	  name: myweb
	  namespace: product
	spec:
	  containers:
	  - name: nginx
	    image: nginx:1.14
	    env:
	    - name: DB
	      value: "mydb"
	    resources:
	      requests:
	        memory: "500Mi"
	        cpu: "200m"
	      limits:
	        memory: "1Gi"
	        cpu: "1"
	```

3. pod 생성 확인
	```shell
	master@master:~$ kubectl create -f myweb.yaml
	pod/myweb created
	master@master:~$ kubectl get pods -n product
	NAME    READY   STATUS    RESTARTS   AGE
	myweb   1/1     Running   0          2m56s
	``` 