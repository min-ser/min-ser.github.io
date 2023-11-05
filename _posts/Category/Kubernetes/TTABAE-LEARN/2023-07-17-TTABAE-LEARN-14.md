---
layout:     BLACKCODE
title:      "5-6 쿠버네티스 Pod - Pod에 Resource 할당하기 (CPU/memory requests, limits)"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-07-17 1:10:00
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

# Pod Resource 요청 및 제한
- Resource Requests
    - 파드를 실행하기 위한 최소 리소스 양을 요청
- Resource Limits
    - 파드가 사용할 수 있는 최대 리소스 양을 제한
    - Memory limit를 초과해서 사용되는 파드는 종료(OOM KILL)되며 다시 스케쥴링 된다.
- https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/

## Container Resource 설정 예
- cat pod-nginx-resources.yaml
```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod-resource
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    ports:
    - containerPort: 80
      protocol: TCP
    resources:
      requests:
        cpu: 200m
        memory: 250Mi
      limits:
        cpu: 1
        memory: 500Mi
```

- 실행
    ```
    kubectl get pods
    kubectl describe pod nginx-pod-resources
    ```

## 리소스에 대한 참고
- Memory
    - 1MB != 1024KB ?
    - 1MB = 1000MB
    - 1MiB(미리바이트) = 1024Kib

- CPU
    - cpu는 코어의 갯수를 count함
    - cpu의 메모리는 m `밀리코어`단위로 표현
    - 1Core를 mc(밀리코어)단위로 표현시
        - 1000 m(밀리코어)
    - 1core가 1000m인 경우 
        - cpu:200m >> 실제 1개 코어의 1/5만큼 요청

## 실습
- [MASTER] yaml파일 작성
    ```
    cat > pod-nginx-resources.yaml

    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx-pod-resource
    spec:
      containers:
      - name: nginx-container
        image: nginx:1.14
        ports:
        - containerPort: 80
          protocol: TCP
        resources:
          requests:
            cpu: 1
            memory: 500Mi
    ```
- [MASTER] POD 생성
    ```
    root@MASTER:~# kubectl create -f pod-nginx-resources.yaml
    pod/nginx-pod-resource created
    ```
- [MASTER] POD 조회
    ```
    kubectl get pod -o wide
    ```
    ![img](/assets/category/Kubernetes/2023/07/17-03.PNG)

    #### 자세히 조회
    ```
    kubectl describe pod nginx-pod-resources
    ```

- [MASTER] yaml 수정 후 다시 배포(vi 명령어 사용)
    ```
    requests:
      cpu: 1 >>>> 2로 수정
    ```

- [MASTER] POD 재배포
    ```
    root@MASTER:~# kubectl create -f pod-nginx-resources.yaml
    pod/nginx-pod-resource created
    ```