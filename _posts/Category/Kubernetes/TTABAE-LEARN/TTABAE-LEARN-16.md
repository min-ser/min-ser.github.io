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

# *** K8S 명령어 실습전 AKS 환경 준비 ***

## VSCODE에서 Azure Potal 접속
1. VSCode에서 명령어 실행
```
Connect-AzAccount
```

2. 계정 선택 및 로그인 진행
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/Connect-AzAccount.PNG?raw=true)

* 아래와 같이 연동작업 

```
PS D:\GIT> Connect-AzAccount
경고: Unable to acquire token for tenant '4aed9820-113d-4f48-9f53-4d91f37ad279' with error 'SharedTokenCacheCredential authentication unavailable. Token acquisition 
failed for user minseo_kim89@megazone.com. Ensure that you have authenticated with a developer tool that supports Azure single sign on.'

Account                   SubscriptionName TenantId                             Environment
-------                   ---------------- --------                             -----------
minseo_kim89@megazone.com kms-limited      xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx AzureCloud
```
3. [AzurePotal] Azure Potal에 접속
    
    1). 상단에 있는 Cloud Shell을 클릭하여 `스토리지 생성`
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/AzureCloudShell.png?raw=true)<br>
    2). 스토리지 만들기 클릭
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/createStorage.PNG?raw=true)<br>
    3). Cloud Shell 진입
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/AccessAzureCloudShell.png?raw=true)

4. VSCODE에서 Azure Cloud Shell 클릭
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/2023-01-25-Kubernetes-05_1.png?raw=true)

5. 상단에 구독 선택
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/2023-01-25-Kubernetes-05_2.png?raw=true)

6. VSCode에서 접속 성공한 모습
![img](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Category/Kubernetes/img/2023-01-25-Kubernetes-05_3.png?raw=true)

## VSCode 연동작업 완료

---

# Pod의 환경변수 설정하기

## 환경변수
- Pod내의 컨테이너가 실행될 때 필요로 하는 변수
- 컨테이너 제작 시 미리 정의
    - NGINX Dockerfile의 예
        - ENV NGINX_VERSION 1.19.2
		- ENV NJS_VERSION 0.4.3
- POD 실행 시 미리 정의된 컨테이너 환경변수를 변경할 수 있다.

# 환경변수 예시
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
```
kubectl get pods
kubectl exec nginx-pod-env --env
```

# 환경변수 실습
- pod 전체 삭제
	```
	kubectl delete pods --all
	```

- pod yaml 작성
```
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

- pod 생성
	```
	kubectl create -f pod-nginx-resources.yaml
	```

- nginx-pod-env에 bashshell로 접속
	```
	kubectl exec nginx-pod-env -it -- /bin/bash
	```
- [nginx-pod-env 컨테이너] 환경변수 조회후 생성한 환경변수 조회 
	- env
	```
	  - name: MYVAR
	  value: "testvalue"
	```
	- 명령어 실행 결과
	```
	root@nginx-pod-env:/# env
	MYDB_SERVICE_PORT=80
	MYSERVICE_PORT_80_TCP_PROTO=tcp
	MYSERVICE_SERVICE_HOST=10.96.136.12
	HOSTNAME=nginx-pod-env
	MYSERVICE_SERVICE_PORT=80
	NJS_VERSION=1.14.2.0.2.6-1~stretch
	MYDB_PORT=tcp://10.102.106.242:80
	NGINX_VERSION=1.14.2-1~stretch
	KUBERNETES_PORT_443_TCP_PROTO=tcp
	KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
	MYDB_SERVICE_HOST=10.102.106.242
	MYSERVICE_PORT_80_TCP=tcp://10.96.136.12:80
	MYVAR=testvalue
	KUBERNETES_PORT=tcp://10.96.0.1:443
	PWD=/
	HOME=/root
	KUBERNETES_SERVICE_PORT_HTTPS=443
	MYDB_PORT_80_TCP_PORT=80
	KUBERNETES_PORT_443_TCP_PORT=443
	MYSERVICE_PORT_80_TCP_PORT=80
	MYSERVICE_PORT=tcp://10.96.136.12:80
	KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
	TERM=xterm
	MYSERVICE_PORT_80_TCP_ADDR=10.96.136.12
	SHLVL=1
	KUBERNETES_SERVICE_PORT=443
	MYDB_PORT_80_TCP_PROTO=tcp
	PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
	KUBERNETES_SERVICE_HOST=10.96.0.1
	MYDB_PORT_80_TCP=tcp://10.102.106.242:80
	MYDB_PORT_80_TCP_ADDR=10.102.106.242
	_=/usr/bin/env
	```
		- MYVAR=testvalue

# Pod 구성패턴의 종류 3가지
## 1. POD 실행패턴
- Pod를 구성하고 실행하는 패턴
- multi-container Pod
	- Sidecar
		- 두개의 컨테이너가 함께 동작해서 구현
	- Adapter
		- 
	- Ambassador
## 2.
## 3.

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
- Create a static pod on node01 called mydb with image redis.
- Create this pod on node01 and make sure that it is recreated/restarted automatically in case of a failure.
	- Use/etc/kubernetes/manifests as the Static Podpath for example.
	- kubelet Configured for Static Pod
	- Pod mydb-node01 is Up and running

- 다음과 같은 조건에 맞는 Pod를 생성하시오
	- Pod name: myweb, image:nginx:1.14
	- CPU200m, Memory 500Mi를 요구하고, CPU 1core, 1Gi제한받는다.
	- Application 동작에 필요한 환경변수 DB=mydb 를 포함한다.
	- namespace product에서 동작되어야 한다.
