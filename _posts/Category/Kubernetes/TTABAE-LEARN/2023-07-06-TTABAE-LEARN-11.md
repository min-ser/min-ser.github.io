---
layout:     BLACKCODE
title:      "5-2. 쿠버네티스 Pod - livenessProbe를 이용해서 Self-healing Pod 만들기"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-07-06 1:10:00
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

# Self-healing
Restarts containers that fail, replaces and reschedules containers when nodes die, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.

장애가 발생한 컨테이너를 다시 시작하고, 노드가 중단될 때 컨테이너를 교체 및 일정 변경하고, 사용자 정의 상태 검사에 응답하지 않는 컨테이너를 종료하고, 서비스를 제공할 준비가 될 때까지 클라이언트에 알림을 표시하지 않습니다.

# LivenessProbe(1)
- Pod가 계속 실행할 수 있음을 보장
- Pod의 spec에 정의

- Pod-definition
    ```
    apiVersion: v1
    kind: Pod
    metadata:
    name: nginx-pod
    spec:
    containers:
    - name: nginx-container
        image: nginx:1.14
    ```
- livenessProbe definition
    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx-pod
    spec:
      containers:
      - name: nginx-container
        image: nginx:1.14
        livenessProbe:
          httpGet:
            path: /
            port: 80
    ```

# LivenessProbe(2)

- livenessProbe 매커니즘
    - httpGet probe
        > 지정한 ip주소, port, path에 HTTP GET 요청을 보내, 해당 컨테이너가 응답하는지를 확인한다.
        `반환코드가 200`이 아닌 값이 나오면 오류, `컨테이너를 다시 시작`한다.
        
        ```
        livenessProbe:
          httpGet
            path: /
            port: 80
        ```

    - tcpSocket probe
        > 지정된 포트에 TCP연결을 시도. 연결되지 않으면 컨테이너를 다시 시작한다.
        ```
        livenessProbe:
          tcpSocker:
            port:22
        ```

    - exec porbe
        >exec 명령을 전달하고 명령의 종료코드가 0이 아니면 컨테이너를 다시 시작한다.
        ```
        livenessProbe:
          exec:
            command:
            - ls
            - /data/file
        ```

# LivenessProbe(3)
- liveness Probe 매개변수
    - periodSeconds: health check 반복 실행 시간(초)
    - initialDelaySeconds: Pod 실행 후 delay할 시간(초)
    - timeoutSeconds: health check후 응답을 기다리는 시간(초)

## Pod-definition
```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
```
## livenessProbe definition
```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    livenessProbe:
      httpGet:
        path: /
        port: 80

      initialDelaySeconds: 15
      periodSeconds: 20
      timeoutSeconds: 1
      successThreshold: 1
      failureThreshold: 3
```

# LivenessProbe example
liveness Probe는  Pod의 spec에 정의한다.
아래 example에서 사용한 smlinux/unhealthy컨테이너는
HTTP connection 있을 때 마다 내부 서버오류로 HTTP 500 ERROR를 발생

## pod-liveness.yaml
```
cat > pod-liveness.yaml
apiVersion: v1
kind: Pod
metadata:
  name: liveness-pod
spec:
  containers:
  - image: smlinux/unhealthy
    name: unhealthy-container
    ports:
    - containerPort: 8080
      protocol: TCP
    livenessProbe:
      httpGet:
        path: /
        port: 8080
```

## yaml 파일 실행
```
kubectl create -f pod-liveness.yaml
```

## 명령어 실행 예시
```
master@MASTER:~$ kubectl create -f pod-liveness.yaml
pod/liveness-pod created
```

# EXAMPLE
아래의 liveness-exam.yaml 파일에 self-healing 기능을 추가하시오
- 동작되는 Pod내의 컨테이너에 /tmp/healthy 파일이 있는지 5초마다 확인한다.
- Pod 실행 후 10초 후 부터 검사한다.
- 성공횟수는 1번, 실패횟수는 연속 2회로 구성한다.

## 샘플파일 : liveness-exam.yaml
```
apiVersion: v1
kind: Pod
metadata:
  name: liveness-exam
spec:
  containers:
  - name: busybox-container
    image: busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
```

## 정답 [문제풀이]
```
apiVersion: v1
kind: Pod
metadata:
  name: liveness-exam
spec:
  containers:
  - name: busybox-container
    image: busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - ls
        - /tmp/healthy
      initialDelaySeconds: 10
      failureThreshold: 2
      periodSeconds: 5
      successThreshold: 1
      timeoutSeconds: 1
```