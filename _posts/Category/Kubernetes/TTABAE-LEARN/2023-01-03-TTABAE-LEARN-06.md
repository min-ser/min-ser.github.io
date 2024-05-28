---
layout:     BLACKCODE
title:      "[06/36] 3-2. kubectl command / pod 생성하기"
subtitle:   "[따배쿠] 3-2. kubectl command / pod 생성하기"
description: "https://www.youtube.com/playlist?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c"
date:       2023-01-03 2:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/QGF7igBYSEI?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 3-2. kubectl command / pod 생성하기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 수업내용
## Part 1. 쿠버네티스 시작하기
1. 쿠버네티스 소개
2. 쿠버네티스 설치하기
3. `쿠버네티스로 컨테이너 실행하기`
## Part 2. 쿠버네티스 기본 개념
4. 쿠버네티스 아키텍처
5. 파드
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
```
안녕하세요, 이성미 강사입니다!
어렵게만 느껴지는 쿠버네티스,
따라하면서 배우면 어느새 지식이 되어 있을 겁니다!

오늘은 3-1강에 이어 kubectl command를 알아보고, 직접 pod 생성까지 !
영상의 길이가 조금 길지만 그래도 화이팅 해주시기 바랍니다 !!

이 영상을 보기 전 이전 영상을 꼭 시청해 주세요:)
```
---

- 00:00 오늘 배울 내용 소개
- 00:55 kubectl command 살펴보기
- 09:28 여러 방법으로 nginx pod 생성하기 / 동작 확인하기

---

# 쿠버네티스 명령어 실습

1. kubernetes 약어 정보 보기

```bash
kubectl api-resources
```

2. kubectl 명령어 보기

```
kubectl logs --help
kubectl describe nodes master 
```

3. 컨테이너를 실행하면서 kubectl 명령어 사용하기

- run : container pod를 만드는 명령어
```bash
kubectl run webserver --image=nginx:1.14 --port 80
``` 

- pod 확인
```bash
# 명령어
kubectl get pods -o wide

# 결과화면
NAME        READY   STATUS    RESTARTS   AGE   IP           NODE     NOMINATED NODE   READINESS GATES
webserver   1/1     Running   0          2m    10.244.2.2   node02   <none>           <none>

```

- pod 자세히 확인
```bash
kubectl describe pods
```

4. 명령어 형식으로 쓸 수 있는 웹 브라우저
```bash
curl 10.244.2.2
```

5. 브라우저 확인하는 프로그램 설치
```bash
# 설치
sudo su -
sudo apt-get update
elinks
apt install elinks

# elinks 명령어 실행
elinks 10.244.2.2
```

6. create 명령어
- run : 컨테이너를 한개 실행시 사용
- create : 여러개 배포하는경우 사용
- httpd : 아파치 웹서버
- httpd:latest : latest생략시 latest버전으로 실행됨
- replicas : 같은서버 3개 실행
```bash
kubectl create deployment mainui --image=httpd --replicas=3
```

- 실행
```bash
root@MASTER:~# kubectl get pods -o wide
NAME                      READY   STATUS    RESTARTS   AGE     IP           NODE     NOMINATED NODE   READINESS GATES
mainui-5886756f68-5mqdq   1/1     Running   0          2m26s   10.244.1.6   node01   <none>           <none>
mainui-5886756f68-6gx6z   1/1     Running   0          2m26s   10.244.2.3   node02   <none>           <none>
mainui-5886756f68-hrqkr   1/1     Running   0          2m26s   10.244.2.4   node02   <none>           <none>
webserver                 1/1     Running   0          13m     10.244.2.2   node02   <none>           <none>
root@MASTER:~# kubectl get pod mainui-5886756f68-5mqdq -o wide
NAME                      READY   STATUS    RESTARTS   AGE     IP           NODE     NOMINATED NODE   READINESS GATES
mainui-5886756f68-5mqdq   1/1     Running   0          2m37s   10.244.1.6   node01   <none>           <none>
root@MASTER:~# curl 10.244.1.6
<html><body><h1>It works!</h1></body></html>
```

7. yaml 형태로 보기

```bash
kubectl get pod webserver -o yaml
```

8. json형태로 보기

```bash
kubectl get pod webserver -o json

```

9. 웹페이지 수정하기위해 컨테이너 접속
- exec : pod에서만 실행 가능한 명령어
```bash
kubectl exec webserver -it -- /bin/bash
```

- 실행
```bash
root@MASTER:~# kubectl exec webserver -it -- /bin/bash
root@webserver:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@webserver:/# cd /usr/share/nginx/html/
root@webserver:/usr/share/nginx/html# ls
50x.html  index.html
root@webserver:/usr/share/nginx/html# cat index.html
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
root@webserver:/usr/share/nginx/html# echo "<h1>BLACKCODE web</h1>" > index.html
root@webserver:/usr/share/nginx/html# ls
50x.html  index.html
root@webserver:/usr/share/nginx/html# cat index.html
<h1>BLACKCODE web</h1>
root@webserver:/usr/share/nginx/html# exit
exit
root@MASTER:~# curl 10.244.2.2
<h1>BLACKCODE web</h1>
```

10.  컨테이너에서 동작한 로그보기

```bash
kubectl logs webserver
10.244.0.0 - - [30/Apr/2024:01:42:12 +0000] "GET / HTTP/1.1" 200 612 "-" "curl/7.68.0" "-"
10.244.0.0 - - [30/Apr/2024:01:45:53 +0000] "GET / HTTP/1.1" 200 612 "-" "ELinks/0.13.1 (textmode; Linux 5.15.0-1061-azure x86_64; 197x59-2)" "-"
10.244.0.0 - - [30/Apr/2024:02:00:12 +0000] "GET / HTTP/1.1" 200 23 "-" "curl/7.68.0" "-"
```

11. 포트포워딩

```bash
kubectl port-forward webserver 8080:80

Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

12. 배포된 pod 갯수 조절
- edit : 동작중인 object 수정

```bash

kubectl get deployments.apps
NAME     READY   UP-TO-DATE   AVAILABLE   AGE
mainui   3/3     3            3           22m

# deployment 수정
kubectl edit deployments.app mainui

# 접속 후 replica 3 > 5로 수정(vi편집기)
root@MASTER:~# kubectl edit deployments.apps mainui
deployment.apps/mainui edited
root@MASTER:~# kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
mainui-5886756f68-5mqdq   1/1     Running   0          23m
mainui-5886756f68-6gx6z   1/1     Running   0          23m
mainui-5886756f68-gmwhh   1/1     Running   0          4s
mainui-5886756f68-hrqkr   1/1     Running   0          23m
mainui-5886756f68-zztkg   1/1     Running   0          4s
webserver                 1/1     Running   0          34m

```

13. yaml파일 생성 명령어
- dry-run : 실행가능여부 체크만
```bash
kubectl run webserver --image=nginx:1.14 --port 80 --dry-run -o yaml > webserver-pod.yaml
```

14. 기존 webserver pod삭제 후 yaml을 통해 pod 생성

```bash
# 명령어
kubectl delete pod webserver

root@MASTER:~# kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
mainui-5886756f68-5mqdq   1/1     Running   0          123m
mainui-5886756f68-6gx6z   1/1     Running   0          123m
mainui-5886756f68-gmwhh   1/1     Running   0          100m
mainui-5886756f68-hrqkr   1/1     Running   0          123m
mainui-5886756f68-zztkg   1/1     Running   0          100m
webserver                 1/1     Running   0          134m
root@MASTER:~# kubectl delete pod webserver
pod "webserver" deleted
root@MASTER:~# ^C
root@MASTER:~# ^C
root@MASTER:~# kubectl get pod
NAME                      READY   STATUS    RESTARTS   AGE
mainui-5886756f68-5mqdq   1/1     Running   0          127m
mainui-5886756f68-6gx6z   1/1     Running   0          127m
mainui-5886756f68-gmwhh   1/1     Running   0          103m
mainui-5886756f68-hrqkr   1/1     Running   0          127m
mainui-5886756f68-zztkg   1/1     Running   0          103m
```

15. deployment까지 삭제

```bash
# 명령어
kubectl delete deployments.apps mainui

deployment.apps "mainui" deleted
root@MASTER:~# kubectl get pods
No resources found in default namespace.
```

16.  yaml파일로 배포

```bash
# 명령어
root@MASTER:~# kubectl create -f webserver-pod.yaml

root@MASTER:~# kubectl create -f webserver-pod.yaml
pod/webserver created
root@MASTER:~# kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
webserver   1/1     Running   0          3s
root@MASTER:~# kubectl get pods -o wide
NAME        READY   STATUS    RESTARTS   AGE   IP           NODE     NOMINATED NODE   READINESS GATES
webserver   1/1     Running   0          8s    10.244.2.6   node02   <none>           <none>
```

---
---

# kubectl 명령어 실습

## 1. Nginx컨테이너 생성 명령어
```
kubectl run webserver --image=nginx:1.14 --port 80
```
    - run : 컨테이너 POD를 만듦
    - webserver : pod 이름
    - webserver는 80포트에서 listen
    - -가 하나(-) : system field 계열, 축약어
    - -가 두개(--): 옵션을 풀어서 사용

### [명령어 실행 화면]
```
PS /home/minseo_kim89> kubectl run webserver --image=nginx:1.14 --port 80
pod/webserver created
```

## 2. pod 상태 보기
```
kubectl get pods
```

## 3. 생성한 webserver pod상태 보기
```
kubectl describe pod webserver
```

### [명령어 실행 화면]
```
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  17m   default-scheduler  Successfully assigned default/webserver to aks-agentpool-33010371-vmss000000
  Normal  Pulling    17m   kubelet            Pulling image "nginx:1.14"
  Normal  Pulled     17m   kubelet            Successfully pulled image "nginx:1.14" in 5.857415651s
  Normal  Created    17m   kubelet            Created container webserver
  Normal  Started    17m   kubelet            Started container webserver
```

## 4. pod 상태 자세히 보기
```
kubectl get pods -o wide
```

### [명령어 실행 화면]
```
NAME        READY   STATUS    RESTARTS   AGE   IP            NODE                                NOMINATED NODE   READINESS GATES
webserver   1/1     Running   0          19m   10.244.0.15   aks-agentpool-33010371-vmss000000   <none>           <none>
```

## 5. webserver 접속
```
curl 10.244.0.15
```
- 4번에서 실행한 결과의 IP로 접근 = Nginx에 접근
- [Azure PowerShell로 실행시 접속X]   
    - Azure Potal 환경에서 Shell환경과 네트워크가 달라 표시 안됨
    - 접근한 HTML소스가 콘솔로 표기됨
    

## 6. 배포용 pod 생성
```
kubectl create deployment mainui --image=httpd --replicas=3
``` 
- image=httpd : image를 아파치웹서버로 생성
- latest : 생략하면 latest버전으로 생성됨
- --replicas=3 : httpd라는 웹서버 3개 생성, deploy를 사용하는 이유

### [명령어 실행 화면]
```
PS /home/minseo_kim89> kubectl create deployment mainui --image=httpd --replicas=3 
deployment.apps/mainui created
```

## 7. 생성한 pod 확인
```
kubectl get deployments.apps
```

### [명령어 실행 화면]
```
PS /home/minseo_kim89> kubectl get deployments.apps
NAME     READY   UP-TO-DATE   AVAILABLE   AGE
mainui   3/3     3            3           60s
```

## 8. pod 상세정보 확인
```
kubectl describe deployments.apps mainui
```
### [명령어 실행 화면]
```
PS /home/minseo_kim89> kubectl describe deployments.apps mainui
Name:                   mainui
Namespace:              default
CreationTimestamp:      Wed, 25 Jan 2023 09:25:32 +0000
Labels:                 app=mainui
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=mainui
Replicas:               3 desired | 3 updated | 3 total | 3 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=mainui
  Containers:
   httpd:
    Image:        httpd
    Port:         <none>
    Host Port:    <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   mainui-77fc86948f (3/3 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  3m20s  deployment-controller  Scaled up replica set mainui-77fc86948f to 3
```

## 9. pod 조회
```
kubectl get pods
kubectl get pods -o wide
```

### [명령어 실행 화면]
```
PS /home/minseo_kim89> kubectl get pods
NAME                      READY   STATUS    RESTARTS   AGE
mainui-77fc86948f-2srr9   1/1     Running   0          4m4s
mainui-77fc86948f-b56k7   1/1     Running   0          4m4s
mainui-77fc86948f-swc2c   1/1     Running   0          4m4s
webserver                 1/1     Running   0          43m
```

## 10. pod 하나만 지정해서 보기
* kubectl get pod `<NAME>`
```
kubectl get pod mainui-77fc86948f-2srr9
kubectl get pod mainui-77fc86948f-2srr9 -o wide
```

## 11. 컨테이너 내부 진입
```
kubctl exec pod webserver -it -- /bin/bash
```

## 12. Nginx의 index.html이 있는 디렉토리로 이동
```
cd /usr/share/nginx/html
```
## *AKS에서는 경로가 다를 수 있음
```
```

## 13. index.html 소스 확인
```
cat index.html
```

## 14. 수정
```
echo "KMS web" > index.html
```

## 15. index.html 소스 확인
```
cat index.html
```

## 16. exit
```
exit
```

## 17. WEB 페이지 확인
```
curl <ip>
```

## 18. 컨테이너 로그 확인
```
kubectl logs webserver
```

## 19. 외부에서 접근할 수 있도록 port를 포워딩 해준다.
해당 명령어는 POD에만 실행하므로 타입지정이 필요없다.
```
kubectl port-forward webserver 8080:80
```
* MASTER의 로컬호스트로 8080을 통해 접근시 내부 80 port로 포워딩 


## 20. 포트포워딩 테스트
```
curl localhost:8080
```

### [명령어 실행 화면]
```
```

## 21. 현재 동작중인 pod 조회
```
kubectl get deployments.app
```

## 22. 동작중인 Object 수정 edit 사용
```
kubectl edit deployments.app mainui
```

## 23. 3개의 파드를 5개로 확장
- spec 하위의 replicas의 수 수정
```
replicas:3 >> 5
```

## 24. 조회
```
kubectl get pods
```

## 25. 웹서버를 실행하지 않고 yaml파일 생성
```
kubectl run webserver --image=nginx:1.14 --port 80 --dry-run -o yaml > webserver-pod.yaml
```
- --dry-run : 실행여부만 체크
- -o yaml : 실행할 수 있는 상태를 yaml 포멧으로 보여줌
- > webserver-pod.yaml : `webserver-pod.yaml`파일로 생성

## 26. 파일이 생성되었는지 확인(생성파일 열기)
```
ls
vi webserver-pod.yaml
```
* VI 명령어
    * 삭제 : dd
    * 삭제 반복 : .

## 27. 생성한 yaml 파일의 필요없는 라인 제거 후 저장
* creationTimestamp: null
* resources: {}
* dnsPolicy: ClusterFirst
* restartPolicy: Always
* status: {}

## 28. 실행중인 webserver pod 삭제
같은 이름으로 실행시 중복 발생
```
kubectl delete pod webserver
kubectl delete deployments.apps mainui
```

## 29. 삭제여부 확인
```
kubectl get pods
```

## 30. 생성한 yaml 파일을 실행하여 pod를 생성
```
kubectl create -f webserver-pod.yaml
kubectl get pods
```
* 쿠버네티스 명령어로 POT 생성
    * -f : 파일로
    * webserver-pod.yaml : 파일을

## run, create 차이 정리
* run : 명령어로 바로 실행해서 pod 생성
* create : yaml 파일로 생성 후 pod 생성

---

## .소제목

```
소스
```

### [명령어 실행 화면]
```
```

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