---
layout:     BLACKCODE
title:      "[13/36] 5-5 쿠버네티스 Pod - static Pod(feat. kubelet daemon)"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-01-05 5:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
---

<iframe width="560" height="315" 
src="https://www.youtube.com/embed/qEu_znIYCz0?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" 
title="[따배쿠] 5-5 쿠버네티스 Pod - static Pod(feat. kubelet daemon)" 
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

# 5-5 쿠버네티스 Pod - static Pod(feat. kubelet daemon)

## static Pod 만들기
- static container
    - API 서버 없이 특정 노드에 있는 kubelet 데몬에 의해 직접 관리
    - /etc/kubernetes/manifests/ 디렉토리에 k8s yaml파일을 저장 시 적용
    - static pod 디렉토리 구성
        ```shell
        vi/var/lib/kubelet/config.yaml
        ..
        staticPodPath: /etc/kubernetes/manifests

        디렉토리 수정시 kubelet 데몬 재실행
        ``` 

```shell
master@master:~$ cat /var/lib/kubelet/config.yaml 
apiVersion: kubelet.config.k8s.io/v1beta1   
authentication:
  anonymous:
    enabled: false
  webhook:
    cacheTTL: 0s
    enabled: true
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 0s
    cacheUnauthorizedTTL: 0s
cgroupDriver: systemd
clusterDNS:
- 10.96.0.10
clusterDomain: cluster.local
containerRuntimeEndpoint: ""
cpuManagerReconcilePeriod: 0s
evictionPressureTransitionPeriod: 0s        
fileCheckFrequency: 0s
healthzBindAddress: 127.0.0.1
healthzPort: 10248
httpCheckFrequency: 0s
imageMaximumGCAge: 0s
imageMinimumGCAge: 0s
kind: KubeletConfiguration
logging:
  flushFrequency: 0
  options:
    json:
      infoBufferSize: "0"
  verbosity: 0
memorySwap: {}
nodeStatusReportFrequency: 0s
nodeStatusUpdateFrequency: 0s
resolvConf: /run/systemd/resolve/resolv.conf
rotateCertificates: true
runtimeRequestTimeout: 0s
shutdownGracePeriod: 0s
shutdownGracePeriodCriticalPods: 0s
staticPodPath: /etc/kubernetes/manifests # 해당 디렉토리에 pod yaml저징시 노드에서 동작되는 kubelet데몬이 pod를 실행시킴
streamingConnectionIdleTimeout: 0s
syncFrequency: 0s
volumeStatsAggPeriod: 0s
```

### node2에 접속 후 staticPod 디렉토리 내에 nginx.yaml 생성

- nginx.yaml 파일

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
      - containerPort: 443
        protocol: TCP
``` 

- node2에 작업

```shell
root@node2:~# cd /etc/kubernetes/manifests/
root@node2:/etc/kubernetes/manifests# ls
root@node2:/etc/kubernetes/manifests# cat > nginx.yaml
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
      - containerPort: 443
        protocol: TCP
```

- master node에서 관찰

```shell
NAME              READY   STATUS    RESTARTS   AGE    IP           NODE    NOMINATED NODE   READINESS GATES
nginx-pod-node2   1/1     Running   0          2m8s   10.244.1.4   node2   <none>           <none>
``` 

### staticPod 디렉토리에 생성한 yaml파일 삭제시 실행중인 pod도 작세됨

```shell
root@node2:/etc/kubernetes/manifests# rm nginx.yaml
```

- master node에서 pod 조회시

```shell
master@master:~$ kubectl get pod -o wide
No resources found in default namespace.
```

### master노드의 manifests 경로에 nginx.yaml생성

```shell
master@master:~$ cd /etc/kubernetes/manifests/
master@master:/etc/kubernetes/manifests$ ls
etcd.yaml  kube-apiserver.yaml  kube-controller-manager.yaml  kube-scheduler.yaml
```

해당 경로에 nginx.yaml파일을 생성하게 되면 master가 아닌 node들중 하나에 배치

# 정리
- API 도움 없이 kubelet Deamon으로 Pod 실행
- 해당 디렉토리는 static Pod Path로 정의
- 정의가 되어있는 해당 디렉토리에 pod yaml을 넣어주면 자동으로 pod를 동작시킨다.

---
---

## 기존 Pod의 운영방식
![img](/assets/category/Kubernetes/2023/07/13-01.png)
```
kubectl run webserver --image=nginx:1.14 --port=80
```
- 위와 같은 Pod 생성 명령어를 master노드의 `API`에 전달
- `API`는 etcd를 `Scheduler`에게 보냄
- `Scheduler`는 가장 적절한 worker node를 선택해 `API`에 응답
- `API`가 응답받은 node에 Pod를 실행

### Kubernetes의 구조
- `API` : 클러스터의 각 요소들을 모니터링하며 작업을 수행하도록 해주는 중앙 접근 포인트의 역할을 한다. 사용자가 kubectl 명령을 통해 Kubernetes 를 조작하는 것이 API 를 통해 조작한다고 생각하면 된다.
- `etcd` : 모든 클러스터 데이터(Node들의 상태 값, 하드웨어 리소스 값 등)를 담는 쿠버네티스 뒷단의 저장소로 사용되는 일관성·고가용성 key-value 저장소이다. 마치 DataBase 라 비유할 수 있다. 이때 etcd를 뒷단의 저장소로 사용한다면, 이 데이터를 백업하는 계획은 필수이다. (참고 : kubernetes etcd 클러스터 백업 )
- `scheduler` : 노드가 배정되지 않은 새로 생성된 Pod(하나 이상의 컨터이너를 묶어 실행하는 단위) 를 감지하고, 실행할 노드를 선택하는 컴포넌트이다.
- `controller` : 논리적으로, 각 컨트롤러는 분리된 프로세스이지만, 복잡성을 낮추기 위해 모두 단일 바이너리로 컴파일되고 단일 프로세스 내에서 실행된다. ( 참고 : kubernetes 컨트롤러 ) 이들 컨트롤러는 다음을 포함한다. ( 추가적으로 클라우드 플랫폼을 이용한다면, 클라우드 플랫폼과 상호 작용하는 컴포넌트와 클러스터와만 상호 작용하는 컴포넌트를 구분지을 수도 있다. cloud-controller-mananer )

## static Pod
- API에게 요청을 보내지 않음
    - 해당 노드에 있는 kubelet이 관리하는 static pod 디렉토리에 yaml 파일 저장시 컨테이너 실행
    - yaml 파일 삭제시 컨테이너도 함께 삭제
- kubelet Daemon에 의해 동작되는 Pod를 static Pod라고 함

## static container
- API 서버 없이 특정 노드에 있는 kubelet 데몬에 의해 직접 관리
- /etc/kubernetes/manifests/ 디렉토리에 k8s yaml파일을 저장 시 적용
- static pod 디렉토리 구성
    - vi /var/lib/kubelet/config.yaml
        ```
        ...
        staticPodPath: /etc/kubernetes/manifests
        ```
    - 다른 디렉토리에 배포를 하려면 staticPodPath를 수정하면 된다.
        ```
        # 기존
        staticPodPath: /etc/kubernetes/manifests
        ```
        - 다른 디렉토리로 수정시 수정된 해당 디렉토리에 yaml 파일을 생성 후 저장
    - staticPodPath 디렉토리 수정시 kubelet 데몬 재실행
        - kubelet Deamon은 restart를 반드시
        ```
        systemctl restart kubelet
        ```

## 실습
- [MASTER] 실시간 pod 상태 확인
    ```
    watch kubectl get pods -o wide
    ```

- [node2]에서 실행
    ```
    cat /var/lib/kubelet/config.yaml
    ```

- staticPodPath: /etc/kubernetes/manifests 확인
    - 해당 디렉토리에서 `pod.yaml파일` 저장시 `node2`에서 동작되는 `kubelet데몬`이 실행시켜준다.

## 확인
- [MASTER] pod 삭제작업 진행
    ```
    kubectl delete pod --all
    ```

- [NODE2] staticPodPath 확인
    ```
    cat /var/lib/kubelet/config.yaml
        ...
        staticPodPath: /etc/kubernetes/manifests
        ...
    ```

- [NODE2]staticPodPath로 이동
    ```
    cd /etc/kubernetes/manifests
    ```

- [NODE2] yaml파일 작성
    ```
    cat > nginx.yaml

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

- [MASTER] pod 상태 확인
    ![img](/assets/category/kubernetes/2023/07/17-01.png)

- [NODE2] static pod 삭제를 원하면 해당 yaml파일을 삭제
    ```
    rm nginx.yaml
    ```
    ![img](/assets/category/kubernetes/2023/07/17-02.png)
    yaml파일 삭제시 해당하는 pod도 삭제됨

## MASTER에서 실행되는 STATIC POD의 종류
- [MASTER]
    ```
    root@MASTER:~# cd /etc/kubernetes/manifests/
    root@MASTER:/etc/kubernetes/manifests# ll
    total 24
    drwxr-xr-x 2 root root 4096 Jun 28 04:40 ./
    drwxr-xr-x 4 root root 4096 Jun 28 04:40 ../
    -rw------- 1 root root 2079 Jun 28 04:40 etcd.yaml
    -rw------- 1 root root 3809 Jun 28 04:40 kube-apiserver.yaml
    -rw------- 1 root root 3496 Jun 28 04:40 kube-controller-manager.yaml
    -rw------- 1 root root 1385 Jun 28 04:40 kube-scheduler.yaml
    ```
    MASTER에서 STATIC POD로 동작되는 POD들
    ETCD, KUBEAPI, SCHEDULER, CONTROLLER 

# 정리
- API 도움 없이 kubelet Deamon으로 Pod 실행
- 해당 디렉토리는 static Pod Path로 정의
- 정의가 되어있는 해당 디렉토리에 pod yaml을 넣어주면 자동으로 pod를 동작시킨다.