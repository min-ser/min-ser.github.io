---
layout:     BLACKCODE
title:      "[따배쿠] 5-1-2. 쿠버네티스 Pod - Pod 동작 flow [11/36]"
subtitle:   "5-1-2. 쿠버네티스 Pod - Pod 동작 flow"
description: "https://wikidocs.net/book/8953"
date:       2023-07-05 2:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [Kubernetes]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/nvBKnFfiy7M?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 5-1-2. 쿠버네티스 Pod - Pod 동작 flow" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# [05-1-2 쿠버네티스 Pod - Pod 동작 flow wikidocs.net](https://wikidocs.net/186118)

![img](/assets/category/Kubernetes/TTABAE-LEARN/5-1-2/01.png)

1. Pending
   1. API : pod api의 format에 맞는 문법인지 점검 후 node의 정보가 있는 etcd의 정보를 schduler에 전달
   2. schduler : 각 node중 pod 실행환경에 맞는 node를 선택 
2. Running
   1. Succeeded
   2. Failed

- [참조](https://kubernetes.io/ko/docs/concepts/workloads/pods/pod-lifecycle/)

## pod 생성 로그 관찰
- 명령어

```shell
master@MASTER:~$ kubectl create -f pod-nginx.yaml 
pod/nginx-pod created
``` 

- 명령어 실행 결과
```shell
master@MASTER:~$ kubectl get pods -o wide --watch
NAME        READY   STATUS              RESTARTS   AGE   IP             NODE     NOMINATED NODE   READINESS GATES
nginx-pod   0/1     Pending             0          0s    <none>         <none>   <none>           <none>
nginx-pod   0/1     Pending             0          0s    <none>         node02   <none>           <none>
nginx-pod   0/1     ContainerCreating   0          0s    <none>         node02   <none>           <none>
nginx-pod   1/1     Running             0          0s    10.244.2.17    node02   <none>           <none>
```

## 동작중인 pod 종료 로그 관찰
- 명령어

```shell
master@MASTER:~$ kubectl delete pod nginx-pod
pod "nginx-pod" deleted
```

- 명령어 실행 결과

```shell
nginx-pod   1/1     Terminating         0          4m19s   10.244.2.17   node02   <none>           <none>
nginx-pod   0/1     Terminating         0          4m20s   <none>        node02   <none>           <none>
nginx-pod   0/1     Terminating         0          4m20s   10.244.2.17   node02   <none>           <none>
nginx-pod   0/1     Terminating         0          4m20s   10.244.2.17   node02   <none>           <none>
nginx-pod   0/1     Terminating         0          4m20s   10.244.2.17   node02   <none>           <none>
```

---

# Pod관리하기

## 동작중인 파드 정보 보기
- 명령어

```shell
kubectl get pods
kubectl get pods -o wide
kubectl describe pod <pod의 이름>
```

## 동작중인 파드 수정
- 명령어

```shell
kubectl edit pod <pod명>
```

## 동작중인 파드 삭제
- 명령어

```shell
kubectl delete pod <pod명>
kubectl delete pod --all # 동작중인 pod 전부 삭제
```

- 명령어 실행 결과

```shell
master@MASTER:~$ kubectl delete pod --all
pod "multipod" deleted
pod "nginx-pod" deleted
pod "web1" deleted
```

# QUESTION & ANSWER
## 1. 현재 namespace에서 동작중인 Pod는 몇 개인가

- 명령어

```shell
kubectl get pods
```

- 명령어 실행 결과

```shell
master@MASTER:~$ kubectl get pods 

# default namespace 내에 생성된 pod는 없음
No resources found in default namespace.
``` 

## 2. default에서 조회되지 않아 전체 namespace에서 동작중인 Pod 조회

- 명령어

```shell
kubectl get pods --all-namespaces
```

- 명령어 실행 결과

```shell
master@MASTER:~$ kubectl get pods --all-namespaces
NAMESPACE      NAME                             READY   STATUS    RESTARTS      AGE
kube-flannel   kube-flannel-ds-8fzmm            1/1     Running   3 (68m ago)   8d
kube-flannel   kube-flannel-ds-mm9n7            1/1     Running   3 (67m ago)   8d
kube-flannel   kube-flannel-ds-xlt4q            1/1     Running   5 (67m ago)   8d
kube-system    coredns-76f75df574-4nnch         1/1     Running   3 (67m ago)   8d
kube-system    coredns-76f75df574-sgnzw         1/1     Running   3 (67m ago)   8d
kube-system    etcd-master                      1/1     Running   3 (68m ago)   8d
kube-system    kube-apiserver-master            1/1     Running   3 (68m ago)   8d
kube-system    kube-controller-manager-master   1/1     Running   3 (68m ago)   8d
kube-system    kube-proxy-7b7f8                 1/1     Running   3 (68m ago)   8d
kube-system    kube-proxy-dxvgg                 1/1     Running   3 (68m ago)   8d
kube-system    kube-proxy-lck57                 1/1     Running   3 (67m ago)   8d
kube-system    kube-scheduler-master            1/1     Running   3 (68m ago)   8d
```

## 3. 컨테이너 nginx를 실행하는 nginx-pod라는 이름의 Pod를 생성하시오

- 명령어

```shell
kubectl run nginx-pod --nginx-
kubectl run nginx-pod --image=nginx:1.14
```

## 4. 앞에서 생성한 Pod의 image정보를 확인하는 명령은 무엇인가?

- 명령어

```shell
kubectl describe pod nginx-pod
```

## 5. 앞에서 생성한 nginx-pod는 어느 node에 배치되었나?

- 명령어

```shell
kubectl describe pod nginx-pod
```

## 6. 앞에서 생성한 Pod에는 몇 개의 컨테이너가 포함되어 있나?

- 명령어

```shell
kubectl get pods 후 ready의 수
kubectl describe pod nginx-pod
```

## 7. 앞에서 생성한 Pod의 현재 상태는 어떠한가?

- 명령어

```shell
kubectl get pods 후 ready의 수
kubectl describe pod nginx-pod
```

## 8. 새 포드의 컨테이너 상태는 어떻습니까?

- 명령어

```shell
# describe를 통해 확인
kubectl describe pod nginx-pod
```

## 9. `kubectl get pods`명령의 출력에서 READY열은 무엇을 의미하나?

    현제 ready중인 컨테이너 / 전체 pod의 수

## 10. 생성한 pod를 삭제하시오.

- 명령어

```shell
kubectl delete pod <pod명>
```

## 11. 컨테이너 image `redis123`을 실행하는 pod`redis`를 redis.yaml을 이용해 생성하시오
### 1. yaml 파일 생성전 테스트 명령어

- --dry-run : 실행이 되는지 확인하는 옵션 명령어

```shell
kubectl run redis --image=redis123 --dry-run -o yaml
```

- 실행결과
```shell
root@MASTER:~# kubectl run redis --image=redis123 --dry-run -o yaml
W0705 05:54:00.756921   67398 helpers.go:553] --dry-run is deprecated and can be replaced with --dry-run=client.
apiVersion: v1
kind: Pod
metadata:
creationTimestamp: null
labels:
    run: redis
name: redis
spec:
containers:
- image: redis123
    name: redis
    resources: {}
dnsPolicy: ClusterFirst
restartPolicy: Always
status: {}
```

### 2. 옵션을 추가하여 yaml파일 생성

```shell
kubectl run redis --image=redis123 --dry-run -o yaml > redis.yaml
```

### 3. vi 편집기로 생성한 yaml파일 수정

- redis.yaml

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: redis
spec:
containers:
- image: redis123
    name: redis
```

### 4. yaml파일을 통한 pod 생성
```shell
kubectl create -f redis.yaml
```
### 5. 생성된 pod 확인
```shell
root@MASTER:~# kubectl get pods
NAME    READY   STATUS         RESTARTS   AGE
redis   0/1     ErrImagePull   0          10s
```

## 12.  앞서 만든 redis pod의 image를 redis로 수정하여 동작시키시오.

1. 해당 pod의 세부적인 정보 확인
> kubectl describe pod redis    
    
```shell
root@MASTER:~# kubectl create redis.yaml
Error: must specify one of -f and -k

error: unknown command "redis.yaml"
See 'kubectl create -h' for help and examples
root@MASTER:~# kubectl create -f redis.yaml
pod/redis created
root@MASTER:~# kubectl get pods
NAME    READY   STATUS         RESTARTS   AGE
redis   0/1     ErrImagePull   0          10s
root@MASTER:~# ^C
root@MASTER:~# kubectl describe pod redis
Name:         redis
Namespace:    default
Priority:     0
Node:         node2/10.100.1.6
Start Time:   Wed, 05 Jul 2023 05:59:06 +0000
Labels:       <none>
Annotations:  <none>
Status:       Pending
IP:           10.244.2.7
IPs:
IP:  10.244.2.7
Containers:
redis:
    Container ID:
    Image:          redis123
    Image ID:
    Port:           <none>
    Host Port:      <none>
    State:          Waiting
    Reason:       ImagePullBackOff
    Ready:          False
    Restart Count:  0
    Environment:    <none>
    Mounts:
    /var/run/secrets/kubernetes.io/serviceaccount from default-token-qq2tk (ro)
Conditions:
Type              Status
Initialized       True
Ready             False
ContainersReady   False
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
Type     Reason     Age                     From               Message
----     ------     ----                    ----               -------
Normal   Scheduled  9m33s                   default-scheduler  Successfully assigned default/redis to node2
Normal   Pulling    7m58s (x4 over 9m32s)   kubelet            Pulling image "redis123"
Warning  Failed     7m55s (x4 over 9m30s)   kubelet            Failed to pull image "redis123": rpc error: code = Unknown desc = Error response from daemon: pull access denied for redis123, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
Warning  Failed     7m55s (x4 over 9m30s)   kubelet            Error: ErrImagePull
Warning  Failed     7m33s (x7 over 9m30s)   kubelet            Error: ImagePullBackOff
Normal   BackOff    4m27s (x20 over 9m30s)  kubelet            Back-off pulling image "redis123"
```

1. 결과 분석
```
Failed to pull image "redis123"
```
컨테이너 다운받는 도중에 문제가 발생했음을 볼 수 있다.

1. redis Pod를 편집 해 보자
> kubectl edit pod redis

1. 위의 명령어 실행
```
root@MASTER:~# kubectl edit pod redis
serviceAccount: default
serviceAccountName: default
terminationGracePeriodSeconds: 30
tolerations:
- effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
- effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
volumes:
- name: default-token-qq2tk
    secret:
    defaultMode: 420
    secretName: default-token-qq2tk
status:
conditions:
- lastProbeTime: null
    lastTransitionTime: "2023-07-05T05:59:06Z"
    status: "True"
    type: Initialized
- lastProbeTime: null
    lastTransitionTime: "2023-07-05T05:59:06Z"
    message: 'containers with unready status: [redis]'
    reason: ContainersNotReady
    status: "False"
    type: Ready
- lastProbeTime: null
    lastTransitionTime: "2023-07-05T05:59:06Z"
    message: 'containers with unready status: [redis]'
    reason: ContainersNotReady
    status: "False"
    type: ContainersReady
- lastProbeTime: null
    lastTransitionTime: "2023-07-05T05:59:06Z"
    status: "True"
    type: PodScheduled
containerStatuses:
- image: redis123
    imageID: ""
    lastState: {}
    name: redis
    ready: false
    restartCount: 0
    started: false
    state:
    waiting:
        message: Back-off pulling image "redis123"
        reason: ImagePullBackOff
hostIP: 10.100.1.6
phase: Pending
podIP: 10.244.2.7
podIPs:
- ip: 10.244.2.7
qosClass: BestEffort
startTime: "2023-07-05T05:59:06Z"
```

2. spec > containers > image의 이름을 수정한다
   - 수정전
   ```
   spec:
     containers:
     - image: redis123
   ```

   - 수정 후
   ```
   spec:
     containers:
     - image: redis
   ```
3. pod 확인
   ```
   kubectl get pods
   ```

## 정상적으로 수정됨
```
root@MASTER:~# kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
redis   1/1     Running   0          26m
```