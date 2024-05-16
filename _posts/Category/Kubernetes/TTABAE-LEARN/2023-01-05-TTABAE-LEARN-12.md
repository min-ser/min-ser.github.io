---
layout:     BLACKCODE
title:      "[13/36] 5-3, 4. 쿠버네티스 Pod - init container & infra container"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-01-05 3:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/ChArV14J6Ek?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 5-3, 4. 쿠버네티스 Pod - init container &amp; infra container" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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

# init container를 적용한 Pod

[Kubernetes.io 초기화 컨테이너](https://kubernetes.io/ko/docs/concepts/workloads/pods/init-containers/)

## init container
- 앱 컨테이너(Main Container) 실행 전에 미리 동작시킬 컨테이너
- 본 Container가 실행되기 전에 사전 작업이 필요할 경우 사용
- 초기화 컨테이너가 모두 실행된 후에 앱 컨테이너를 실행
- https://kubernetes.io/ko/docs/concepts/workloads/pods/init-containers/

### init-container-exam.yaml 구조 설명
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app.kubernetes.io/name: MyApp
spec:
  containers: # Main Container
  - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
 
  # init Container(초기화 Container) 정의
  initContainers: 
  # 첫 번째 init container
  - name: init-myservice  
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup myservice.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for myservice; sleep 2; done"]
    # until : myservice가 성공할때까지 계속 시도, 실행되면 종료
  # 두 번째 init container의 이름
  - name: init-mydb       
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup mydb.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for mydb; sleep 2; done"]
    # until : mydb가 성공할때까지 계속 시도, mydb가 실행되면 종료 
    # 두개의 initContainer가 실행되면 main Container 실행
```

## init-container-exam 배포

- init-container-exam.yaml
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app.kubernetes.io/name: MyApp
spec:
  containers:
  - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  initContainers:
  - name: init-myservice
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup myservice.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for myservice; sleep 2; done"]
  - name: init-mydb
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup mydb.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for mydb; sleep 2; done"]
```

- 명령어

```shell
# watch 명령어를 통해 실시간 pod 모니터링
watch kubectl get pod -o wide
kubectl create -f init-container-exam.yaml
```

## myservice 배포

- init-container-exam-svc.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myservice
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
```

- 명령어
```shell
kubectl create -f init-container-exam-svc.yaml
```

### 위 명령어 실행 전
```shell
NAME        READY   STATUS     RESTARTS   AGE   IP            NODE     NOMINATED NODE   READINESS GATES
myapp-pod   0/1     Init:0/2   0          35m   10.244.2.22   node02   <none>           <none>
```

### 명령어 실행 후
```shell
NAME        READY   STATUS     RESTARTS   AGE   IP            NODE     NOMINATED NODE   READINESS GATES
myapp-pod   0/1     Init:1/2   0          35m   10.244.2.22   node02   <none>           <none>
```

## mydb서비스 배포

- init-container-exam-svc-mydb.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mydb
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9377
```

- 명령어 실행 후 watch
```shell
NAME        READY   STATUS    RESTARTS   AGE   IP            NODE     NOMINATED NODE   READINESS GATES
myapp-pod   1/1     Running   0          38m   10.244.2.22   node02   <none>           <none>
```

두개의 initContainer가 배포 완료되면서 MainContainer가 실행되는것을 볼 수 있다.

---

# infra container(pause) 이해하기

- container와 pod의 차이
 
컨테이너(Container)와 파드(Pod)는 쿠버네티스(Kubernetes) 클러스터에서 애플리케이션을 실행하는 데 사용되는 중요한 개념입니다. 이들 간에는 몇 가지 중요한 차이점이 있습니다.

- 컨테이너(Container):

컨테이너는 가볍고 독립적으로 실행되는 소프트웨어 패키지입니다. 이는 응용 프로그램을 실행하기 위해 필요한 모든 코드, 런타임, 시스템 도구, 시스템 라이브러리 및 설정을 포함합니다.
컨테이너는 격리된 환경에서 실행되므로 호스트 시스템과 다른 컨테이너들과 상호작용할 수 있습니다.
대표적으로 Docker, containerd, rkt 등의 컨테이너 런타임을 사용하여 생성하고 실행합니다.

- 파드(Pod):

파드는 쿠버네티스에서 가장 작은 배포 단위입니다. 파드는 하나 이상의 컨테이너 그룹을 포함하며, 이러한 컨테이너들은 동일한 호스트에서 실행됩니다.
파드 안의 컨테이너들은 네트워크와 파일 시스템을 공유하며, 동일한 컨테이너 그룹 내에서 통신할 수 있습니다.
파드는 단일 IP 주소와 동일한 호스트 이름을 공유하며, 파드의 생명주기는 파드 내의 모든 컨테이너들의 생명주기에 의존합니다.

- 주요 차이점:
    - 단위: 컨테이너는 애플리케이션을 실행하기 위한 단일 단위입니다. 반면에 파드는 하나 이상의 컨테이너 그룹을 포함하는 배포 단위입니다.
    - 본질: 컨테이너는 실행되는 애플리케이션의 구성 요소입니다. 파드는 컨테이너의 그룹을 쿠버네티스에서 관리하기 위한 추상화입니다.
    - 생명주기: 컨테이너는 독립적으로 실행될 수 있지만 파드 내의 컨테이너들은 함께 실행되며, 파드의 생명주기에 의존합니다.

일반적으로 파드는 하나의 컨테이너만 포함할 수도 있지만, 복잡한 애플리케이션을 실행하는 경우 파드 내에 여러 개의 컨테이너를 배치하여 관련된 작업을 함께 실행할 수 있습니다.

## infra container
- Pod의 환경을 만들어주는 컨테이너

## 실습 전 모든파드 삭제 후 nginx 실행
```shell
kubectl delete pod --all
kubectl run webserver --image=nginx:1.14 --port=80
```

## 해당 컨테이너가 배포된 node에 접속하기
- node02에 접속

```shell 
ssh node02
```

- docker container 정보보기

```
docker ps
```

---
---

# 이전 작성 내용

- pod-init.yaml

```yaml
apiVersion: v1
kind: Pod
metadata:
name: kubernetes-simple-pod
labels:
    app: kubernetes-simple-pod
spec:
initContainers:
- name: init-myservice
    image: arisu1000/simple-container-app:latest
    command: ['sh', '-c', 'sleep 2; echo helloworld01;']
- name: init-mydb
    image: arisu1000/simple-container-app:latest
    command: ['sh', '-c', 'sleep 2; echo helloworld02;']
containers:
- name: kubernetes-simple-pod 
    image: arisu1000/simple-container-app:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
```

## yaml 파일로 배포 명령어
```shell
kubectl delete pod --all
kubectl create -f myapp.yaml
```

## [myservice POD 배포] init-container-exam-svc.yaml 파일 생성

- init-container-exam-svc.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myservice
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
```

- 파일생성 명령어

```shell
cat > init-container-exam-svc.yaml
```

## [myservice POD 배포]
```
kubectl create -f init-container-exam-svc.yaml
```

##  [mydb POD 배포] init-container-exam-svc.yaml 파일 생성(덮어쓰기)
```
apiVersion: v1
kind: Service
metadata:
  name: mydb
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9377
```

## [mydb POD 배포]
```
kubectl create -f init-container-exam-svc.yaml
```

## kubectl get pods -o wide 변화 확인
```
NAME        READY   STATUS    RESTARTS   AGE     IP            NODE    NOMINATED NODE   READINESS GATES
myapp-pod   1/1     Running   0          8m30s   10.244.2.14   node2   <none>           <none>
```
- myservice POD 배포시 STATUS : Init:1/2
- mydb POD까지 배포 완료 : Running


# infra container(pause) 이해하기
- Pod 생성시 같이 생성 및 삭제됨
- Pod에 대한 infra를 관리하고 생성해주는 역할
    - ip
    - host

## infra container
- 정의 :  Pod의 환경을 만들어주는 컨테이너
- Pod생성 후 pause container가 생성되는지 확인
    ```
    master@MASTER:~$ kubectl run webserver --image=nginx:1.14 --port=80
    ```
- kubectl get pods -o wide 명령어를 통해 어떤 노드에서 생성되는지 체크
    ```
    NAME        READY   STATUS    RESTARTS   AGE   IP            NODE    NOMINATED NODE   READINESS GATES
    myapp-pod   1/1     Running   0          55m   10.244.2.14   node2   <none>           <none>
    webserver   1/1     Running   0          36s   10.244.1.16   node1   <none>           <none>
    ```
- 해당 노드(node1)에서 docker 컨테이너 조회
    ```
    root@NODE1:~# docker ps
    CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS          PORTS     NAMES
    d4249834e9bb   295c7be07902           "nginx -g 'daemon of…"   55 seconds ago   Up 55 seconds             k8s_webserver_webserver_default_a8c0c2c4-a210-46f2-9d90-2550a0563949_0
    868c30473fff   k8s.gcr.io/pause:3.2   "/pause"                 56 seconds ago   Up 55 seconds             k8s_POD_webserver_default_a8c0c2c4-a210-46f2-9d90-2550a0563949_0
    9d3c102d9ff6   bfe3a36ebd25           "/coredns -conf /etc…"   3 hours ago      Up 3 hours                k8s_coredns_coredns-f9fd979d6-v7txr_kube-system_6b643e4a-766e-4f02-b170-b1127a33d2e5_5
    fe29cff15b1e   k8s.gcr.io/pause:3.2   "/pause"                 3 hours ago      Up 3 hours                k8s_POD_coredns-f9fd979d6-v7txr_kube-system_6b643e4a-766e-4f02-b170-b1127a33d2e5_24
    22ffc860664d   38c11b8f4aa1           "/opt/bin/flanneld -…"   3 hours ago      Up 3 hours                k8s_kube-flannel_kube-flannel-ds-hm2dz_kube-flannel_43771259-90b7-4d71-9a83-70fed0c2f49b_5
    d17f108c0eb9   8bbb057ceb16           "/usr/local/bin/kube…"   3 hours ago      Up 3 hours                k8s_kube-proxy_kube-proxy-66bbt_kube-system_887caa7b-98a7-4f5e-93ed-87118e34e9c5_5
    68fc32e78b8e   k8s.gcr.io/pause:3.2   "/pause"                 3 hours ago      Up 3 hours                k8s_POD_kube-flannel-ds-hm2dz_kube-flannel_43771259-90b7-4d71-9a83-70fed0c2f49b_5
    fba1a370e7c0   k8s.gcr.io/pause:3.2   "/pause"                 3 hours ago      Up 3 hours                k8s_POD_kube-proxy-66bbt_kube-system_887caa7b-98a7-4f5e-93ed-87118e34e9c5_5
    ```
    대략 50초 전에 생성한 nginx 컨테이너와 pause컨테이너가 함께 생성되었음을 확인
- 해당 pod(webserver)를 삭제
    ```
    master@MASTER:~$ kubectl delete pod webserver
    pod "webserver" deleted
    ```
- 다시 node1에서 도커 조회
    ```
    root@NODE1:~# docker ps
    CONTAINER ID   IMAGE                  COMMAND                  CREATED       STATUS       PORTS     NAMES
    9d3c102d9ff6   bfe3a36ebd25           "/coredns -conf /etc…"   3 hours ago   Up 3 hours             k8s_coredns_coredns-f9fd979d6-v7txr_kube-system_6b643e4a-766e-4f02-b170-b1127a33d2e5_5
    fe29cff15b1e   k8s.gcr.io/pause:3.2   "/pause"                 3 hours ago   Up 3 hours             k8s_POD_coredns-f9fd979d6-v7txr_kube-system_6b643e4a-766e-4f02-b170-b1127a33d2e5_24
    22ffc860664d   38c11b8f4aa1           "/opt/bin/flanneld -…"   3 hours ago   Up 3 hours             k8s_kube-flannel_kube-flannel-ds-hm2dz_kube-flannel_43771259-90b7-4d71-9a83-70fed0c2f49b_5
    d17f108c0eb9   8bbb057ceb16           "/usr/local/bin/kube…"   3 hours ago   Up 3 hours             k8s_kube-proxy_kube-proxy-66bbt_kube-system_887caa7b-98a7-4f5e-93ed-87118e34e9c5_5
    68fc32e78b8e   k8s.gcr.io/pause:3.2   "/pause"                 3 hours ago   Up 3 hours             k8s_POD_kube-flannel-ds-hm2dz_kube-flannel_43771259-90b7-4d71-9a83-70fed0c2f49b_5
    fba1a370e7c0   k8s.gcr.io/pause:3.2   "/pause"                 3 hours ago   Up 3 hours             k8s_POD_kube-proxy-66bbt_kube-system_887caa7b-98a7-4f5e-93ed-87118e34e9c5_5
    ```
    pod가 생성될때 `함께 생성`되고 pod가 삭제되면 `함께 삭제`된다.