---
layout:     BLACKCODE
title:      "[따배쿠] 5-1-1. 쿠버네티스 Pod - Container 정리와 Single / Multi Container Pod 생성"
subtitle:   "5-1-1. 쿠버네티스 Pod - Container 정리와 Single / Multi Container Pod 생성"
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-01-05 1:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [Kubernetes]
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
# 학습내용
- Pod 개념 및 사용하기
- livenessProbe를 사용한 self-healing Pod
- init container
- infra container(pause) 이해하기
- static pod 만들기
- Pod에 resource 할당하기
- 환경변수를 이용해 컨테이너에 데이터 전달하기
- pod 구성 패턴의 종류
---

# Container와 Pod의 개념
## 1. Pod 개념 및 사용하기
### Container 정리

```shell
# app.js 생성
cat > app.js
const http = require('http');
const os = require('os');
console.log("Test server starting...");
var handler = function(req, res) {
  res.writeHead(200);
  res.end("Container Hostname: " + os.hostname() + "\n");
};
var www = http.createServer(handler);
www.listen(8080);

# Dockerfile Build
cat > Dockerfile
FROM node:12
COPY app.js/app/js
ENTRYPOINT ["node", "app.js"]
<Ctrl><d>

- docker build -t smlinux/appjs .
- docker push smlinux/appjs
```
> 하나의 컨테이너 = 하나의 애플리케이션과 같다.

### Pod란?
- 컨테이너를 표현하는 k8s api의 최소 단위   
- api에서 pod동작은 불가능   
- pod에는 하나 또는 여러 개의 컨테이너가 포함될 수 있음   

### Pod 생성하기
#### 1. kubectl run명령(CLI)으로 생성

```
kubectl run web1 --image=nginx:1.14 --port=80
```

#### 2. pod yaml을 이용해 생성
- nginx-pod.yaml파일 작성

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    ports:
      - containerPort: 80
        protocol: TCP
```

- 명령어 

```shell
# Pod 실행
kubectl create -f pod-nginx.yaml

# 현재 동작중인 pod 확인
kubectl get pods
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods -o json
kubectl get pods webserver -o json | grep -i podip
```

- yaml 파일형태로 pod 보기

```shell
kubectl get pods -o yaml
```

- 위 명령어 기반으로 yaml 작성

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web1
spec:
  containers:
  - image: nginx:1.14
    imagePullPolicy: IfNotPresent
    name: web1
    ports:
    - containerPort: 80
      protocol: TCP
```

- 매 2초마다 pod 동작상태 보기

```shell
# 명령어
watch kubectl get pods -o wide

# 실행결과
Every 2.0s: kubectl get pods -o wide                                             MASTER: Tue May  7 06:18:16 2024

NAME        READY   STATUS    RESTARTS   AGE   IP            NODE     NOMINATED NODE   READINESS GATES
nginx-pod   1/1     Running   0          37m   10.244.2.12   node02   <none>           <none>
web1        1/1     Running   0          44m   10.244.2.11   node02   <none>           <none>
```

# Pod에 접속해서 결과보기

```shell
# 명령어
curl <ip>

# 실행결과
master@MASTER:~$ curl 10.244.2.12
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and   
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

- pod의 ip만 조회

```shell
master@MASTER:~$ kubectl get pods web1 -o json | grep -i podip
        "podIP": "10.244.2.11",
        "podIPs": [
```

# multi-container Pod생성하기
- yaml 파일

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multipod
spec:
  containers:
    - name: nginx-container
      image: nginx:1.14
      ports:
      - containerPort: 80
    - name: centos-container
      image: centos:7
      command:
      - sleep
      - "10000"
```

- 명령어 참고

```shell
kubectl create -f pod-multi.yaml
kubectl get pods
kubectl get pods -o wide
kubectl exec multipod -it -c centos-container -- /bin/bash # centos-container pod로 접속
kubectl exec multipod -it -c nginx-container -- /bin/bash # nginx-container pod로 접속
/# curl http://localhost:80
/# exit
kubectl logs multipod -c nginx-container
```

- pod 접속 명령어
  - -c : 컨테이너명 지정
  - -it : interactive(상호작용)
  - -- /bin/bash : bash shell 실행

```shell
# 명령어
kubectl exec multipod -it -c nginx-container -- /bin/bash

# nginx-container pod접속 후 index.html 조회하기
master@MASTER:~$ kubectl exec multipod -it -c nginx-container -- /bin/bash
root@multipod:/# cat /usr/share/nginx/html/index.html 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>

# index.html의 내용 수정
root@multipod:/# cd /usr/share/nginx/html/           
root@multipod:/usr/share/nginx/html# echo "TEST web" > index.html
root@multipod:/usr/share/nginx/html# cat index.html 
TEST web
root@multipod:/usr/share/nginx/html# exit
exit
master@MASTER:~$ curl 10.244.2.13
TEST web
```

## centos-contrainer pod 접속하기

```shell
# 명령어
kubectl exec multipod -c centos-container -it -- /bin/bash

# 
master@MASTER:~$ kubectl exec multipod -c centos-container -it -- /bin/bash
[root@multipod /]# ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 06:41 ?        00:00:00 sleep 10000
root           7       0  0 06:58 pts/0    00:00:00 /bin/bash
root          21       7  0 06:59 pts/0    00:00:00 ps -ef
[root@multipod /]# curl localhost:80
TEST web
```
> multi-container pod에서 container들의 pod명과 ip는 동일

## pod내에 container의 로그 출력

```shell
# 명령어
kubectl logs <pod명> -c <container명>

# 멀티 컨테이너인 경우
master@MASTER:~$ kubectl logs multipod -c nginx-container
10.244.0.0 - - [07/May/2024:06:43:57 +0000] "GET / HTTP/1.1" 200 612 "-" "curl/7.68.0" "-"
10.244.0.0 - - [07/May/2024:06:56:38 +0000] "GET / HTTP/1.1" 200 9 "-" "curl/7.68.0" "-"
127.0.0.1 - - [07/May/2024:06:59:11 +0000] "GET / HTTP/1.1" 200 9 "-" "curl/7.29.0" "-"

# 싱글 컨테이너인 경우
master@MASTER:~$ kubectl logs web1
10.244.0.0 - - [07/May/2024:07:32:08 +0000] "GET / HTTP/1.1" 200 612 "-" "curl/7.68.0" "-"
10.244.0.0 - - [07/May/2024:07:32:09 +0000] "GET / HTTP/1.1" 200 612 "-" "curl/7.68.0" "-"
```

---
---


# 실습
## 1.14버전의 nginx이미지를 web1이름의 pod로 실행
```
kubectl run web1 --image=nginx:1.14 

# port번호 지정
kubectl run web1 --image=nginx:1.14 --port=80
```

## 실행중인 pod 확인
```
kubectl get pods
```

## yaml파일로 pod 생성
```
kubectl create -f <파일명>
```

## 현재 실행중인 pod 상태를 yaml포멧으로 보기
```
kubectl get pods <pod명> -o yaml
```

## 현재 실행중인 모든 pod 상태를 yaml포멧으로 보기
```
kubectl get pods -o yaml
```

## 현재 실행중인 모든 pod 상태를 json포멧으로 보기
```
kubectl get pods -o json
```

## json 형식으로 pod 아이피만 보기
```
kubectl get pods -o json | grep -i podip
```

# Milti Container Pod 생성

## multi containter pod의 yaml파일 작성
```
cat > pod-multi.yaml
apiVersion: v1
kind: Pod
metadata:
  name: multipod
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    ports:
    - containerPort: 80
  - name: centos-container
    image: centos:7
    command:
    - sleep
    - "10000"
```

## 실행결과

```shell
master@MASTER:~$ kubectl create -f pod-multi.yaml
pod/multipod created
```
> READY가 2/2인 멀티 컨테이너 표시를 볼 수 있다.

```shell
master@MASTER:~$ kubectl get pods -o wide
NAME        READY   STATUS    RESTARTS   AGE    IP           NODE    NOMINATED NODE   READINESS GATES
multipod    2/2     Running   0          96s    10.244.1.6   node1   <none>           <none>
nginx-pod   1/1     Running   1          5d2h   10.244.1.5   node1   <none>           <none>
web1        1/1     Running   1          5d2h   10.244.2.5   node2   <none>           <none>
```

> Multi container Pod에 Curl을 날리면?
>> nginx가 80포트에 lesten되어있어 nginx의 화면이 나온다.

```shell
master@MASTER:~$ curl 10.244.1.6
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

## nginx에 접근하기
> 실행중인 컨테이너에 접속하려면?

#### 1. pod 자세히 조사

```shell
master@MASTER:~$ kubectl describe pod multipod
Name:         multipod
Namespace:    default
Priority:     0
Node:         node1/10.100.1.5
Start Time:   Mon, 03 Jul 2023 07:41:21 +0000
Labels:       <none>
Annotations:  <none>
Status:       Running
IP:           10.244.1.6
IPs:
  IP:  10.244.1.6
Containers:
  nginx-container:
    Container ID:   docker://830bf722ee1068d1ee27887fad0995ef4c5fc47dfcec34f0be4d693ca4e095ca
    Image:          nginx:1.14
    Image ID:       docker-pullable://nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Mon, 03 Jul 2023 07:41:22 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-qq2tk (ro)
  centos-container:
    Container ID:  docker://cf8d8568405ba890dc19c2e66f153be68de8154894b81c0bff917644947ba7f6
    Image:         centos:7
    Image ID:      docker-pullable://centos@sha256:be65f488b7764ad3638f236b7b515b3678369a5124c47b8d32916d6487418ea4
    Port:          <none>
    Host Port:     <none>
    Command:
      sleep
      10000
    State:          Running
      Started:      Mon, 03 Jul 2023 07:41:37 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-qq2tk (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-qq2tk:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-qq2tk
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  6m33s  default-scheduler  Successfully assigned default/multipod to node1
  Normal  Pulled     6m32s  kubelet            Container image "nginx:1.14" already present on machine
  Normal  Created    6m32s  kubelet            Created container nginx-container
  Normal  Started    6m32s  kubelet            Started container nginx-container
  Normal  Pulling    6m32s  kubelet            Pulling image "centos:7"
  Normal  Pulled     6m22s  kubelet            Successfully pulled image "centos:7" in 9.574480407s
  Normal  Created    6m17s  kubelet            Created container centos-container
  Normal  Started    6m17s  kubelet            Started container centos-container
```

#### 2. pod내에 컨테이너 접속

```shell
# podname : multipod
# -c nginx-container : container 이름이 nginx-container인것을 선택
# -it : i(interactive) t(sudo)
# /bin/bash : 경로
kubectl exec multipod -c nginx-container -it -- /bin/bash
```

#### 3. nginx의 index.html 경로로 이동

```shell
root@multipod:/# cd /usr/share/nginx/html/
root@multipod:/usr/share/nginx/html# ls
50x.html  index.html
root@multipod:/usr/share/nginx/html# ll
bash: ll: command not found
root@multipod:/usr/share/nginx/html# cat index.html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

#### 4. index.html 수정

```shell
root@multipod:/usr/share/nginx/html# echo "Test WEB update by KMS" > index.html
root@multipod:/usr/share/nginx/html# cat index.html
Test WEB update by KMS
```

#### 5. 컨테이너에서 나간 후 pod를 통해 웹 접근 시도

```shell
root@multipod:/usr/share/nginx/html# exit
exit
command terminated with exit code 130
master@MASTER:~$ kubectl get pods -o wide
NAME        READY   STATUS    RESTARTS   AGE    IP           NODE    NOMINATED NODE   READINESS GATES
multipod    2/2     Running   0          19m    10.244.1.6   node1   <none>           <none>
nginx-pod   1/1     Running   1          5d2h   10.244.1.5   node1   <none>           <none>
web1        1/1     Running   1          5d2h   10.244.2.5   node2   <none>           <none>
master@MASTER:~$ curl 10.244.1.6
Test WEB update by KMS
```