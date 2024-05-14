---
layout:     BLACKCODE
title:      "5-3, 4. 쿠버네티스 Pod - init container & infra container"
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

# init container를 적용한 Pod

[Kubernetes.io 초기화 컨테이너](https://kubernetes.io/ko/docs/concepts/workloads/pods/init-containers/)

## init container
- 앱 컨테이너 실행 전에 미리 동작시킬 컨테이너
- 본 Container가 실행되기 전에 사전 작업이 필요할 경우 사용
- 초기화 컨테이너가 모두 실행된 후에 앱 컨테이너를 실행
- https://kubernetes.io/ko/docs/concepts/workloads/pods/init-containers/
    - myapp.yaml

        ```
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
        
        # init Container 정의
        initContainers: 
        # 첫 번째 init container
        - name: init-myservice  
            image: busybox:1.28
            command: ['sh', '-c', "until nslookup myservice.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for myservice; sleep 2; done"]
            # until : 명령어가 성공할때까지 계속 시도
        # 두 번째 init container의 이름
        - name: init-mydb       
            image: busybox:1.28
            command: ['sh', '-c', "until nslookup mydb.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for mydb; sleep 2; done"]
            # until : 명령어가 성공할때까지 계속 시도
        ```
    - 실습
    
        ```
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

- pod-init.yaml

    ```
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
```
kubectl delete pod --all
kubectl create -f myapp.yaml
```

## [myservice POD 배포] init-container-exam-svc.yaml 파일 생성
```
cat > init-container-exam-svc.yaml

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