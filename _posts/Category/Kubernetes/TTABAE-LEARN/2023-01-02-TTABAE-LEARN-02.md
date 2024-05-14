---
layout:     BLACKCODE
title:      "[따배쿠] 2-1. 쿠버네티스 설치 / 설치없이 웹에서 실습하기 [3/36]"
subtitle:   "[따배쿠] 2-1. 쿠버네티스 설치 / 설치없이 웹에서 실습하기"
description: "https://www.youtube.com/playlist?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c"
date:       2023-01-02 12:00:00
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
src="https://www.youtube.com/embed/yAc6_ml4JCA?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" 
title="[따배쿠] 2-1. 쿠버네티스 설치 / 설치없이 웹에서 실습하기" 
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 수업내용
## Part 1. 쿠버네티스 시작하기
1. 쿠버네티스 소개
2. `쿠버네티스 설치하기`
3. 쿠버네티스로 컨테이너 실행하기
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

# 쿠버네티스 설치하기

---

## 설치없이 쿠버네티스 사용하기
- 카타코다 쿠버네티스 플레이그라운드
    - ~~https://www.katacoda.com/courses/kubernetes/playground~~ [폐쇄됨]
    - Master, node1이 구성되어 있어 바로 사용가능

- Play with Kubernetes
    - docker에서 제공. docker hub 계정으로 로그인
    - https://labs.play-with-k8s.com/
    - 4시간 사용 가능. `Master`, `worker Node`를 직접 구성한 후 사용가능

---

# 실습환경 : Docker Playground
### 복사 : ctrl + ins
### 붙여넣기 : shift + ins

1. Initializes cluster master node:
```
kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr 10.5.0.0/16
```

2. Initialize cluster networking:
```
kubectl apply -f https://raw.githubusercontent.com/cloudnativelabs/kube-router/master/daemonset/kubeadm-kuberouter.yaml
```

3. (Optional) Create an nginx deployment:
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/application/nginx-app.yaml
```

---

1. ADD NEW INSTANCE 후 MASTER NODE(node1)에서 초기화 작업 진행
```
kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr 10.5.0.0/16
```
* RESULT 화면
```
[node1 ~]$ kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr 10.5.0.0/16
Initializing machine ID from random generator.
I0121 13:13:31.032254     625 version.go:251] remote version is much newer: v1.26.1; falling back to: stable-1.20
[init] Using Kubernetes version: v1.20.15
[preflight] Running pre-flight checks
        [WARNING Service-Docker]: docker service is not active, please run 'systemctl start docker.service'
        [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
        [WARNING FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables does not exist
[preflight] The system verification failed. Printing the output from the verification:
KERNEL_VERSION: 4.4.0-210-generic
DOCKER_VERSION: 20.10.1
OS: Linux
CGROUPS_CPU: enabled
CGROUPS_CPUACCT: enabled
CGROUPS_CPUSET: enabled
CGROUPS_DEVICES: enabled
CGROUPS_FREEZER: enabled
CGROUPS_MEMORY: enabled
CGROUPS_PIDS: enabled
CGROUPS_HUGETLB: enabled
```


2. node1 에서 해당 명령어 복사
```
kubeadm join 192.168.0.8:6443 --token p80jz1.f0xe2tf37y9s701v \
    --discovery-token-ca-cert-hash sha256:c76cbac49cd7be3b2fe9fea539e591c940f3cbc1c4326b76a7234fa052c662ce 
```
* RESULT 화면
```
[node2 ~]$ kubeadm join 192.168.0.8:6443 --token p80jz1.f0xe2tf37y9s701v \
>     --discovery-token-ca-cert-hash sha256:c76cbac49cd7be3b2fe9fea539e591c940f3cbc1c4326b76a7234fa052c662ce
Initializing machine ID from random generator.
[preflight] Running pre-flight checks
        [WARNING Service-Docker]: docker service is not active, please run 'systemctl start docker.service'
        [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
        [WARNING FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables does not exist
[preflight] The system verification failed. Printing the output from the verification:
KERNEL_VERSION: 4.4.0-210-generic
DOCKER_VERSION: 20.10.1
OS: Linux
CGROUPS_CPU: enabled
CGROUPS_CPUACCT: enabled
CGROUPS_CPUSET: enabled
CGROUPS_DEVICES: enabled
CGROUPS_FREEZER: enabled
CGROUPS_MEMORY: enabled
CGROUPS_PIDS: enabled
CGROUPS_HUGETLB: enabled
```

3. 노드2 생성 후 노드1에서 복사한 명령어 실행
```
kubeadm join 192.168.0.8:6443 --token p80jz1.f0xe2tf37y9s701v \
    --discovery-token-ca-cert-hash sha256:c76cbac49cd7be3b2fe9fea539e591c940f3cbc1c4326b76a7234fa052c662ce 
```
* RESULT 화면
```
[node2 ~]$ kubeadm join 192.168.0.8:6443 --token p80jz1.f0xe2tf37y9s701v \
>     --discovery-token-ca-cert-hash sha256:c76cbac49cd7be3b2fe9fea539e591c940f3cbc1c4326b76a7234fa052c662ce
Initializing machine ID from random generator.
[preflight] Running pre-flight checks
        [WARNING Service-Docker]: docker service is not active, please run 'systemctl start docker.service'
        [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
        [WARNING FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables does not exist
[preflight] The system verification failed. Printing the output from the verification:
KERNEL_VERSION: 4.4.0-210-generic
DOCKER_VERSION: 20.10.1
OS: Linux
CGROUPS_CPU: enabled
CGROUPS_CPUACCT: enabled
CGROUPS_CPUSET: enabled
CGROUPS_DEVICES: enabled
CGROUPS_FREEZER: enabled
CGROUPS_MEMORY: enabled
CGROUPS_PIDS: enabled
CGROUPS_HUGETLB: enabled
```

4. Node1 정보 보기
```
kubectl get nodes -o wide
```
* RESULT 화면
```
[node1 ~]$ kubectl get nodes -o wide
NAME    STATUS     ROLES                  AGE    VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION      CONTAINER-RUNTIME
node1   NotReady   control-plane,master   4m2s   v1.20.1   192.168.0.8   <none>        CentOS Linux 7 (Core)   4.4.0-210-generic   docker://20.10.1
node2   NotReady   <none>                 87s    v1.20.1   192.168.0.7   <none>        CentOS Linux 7 (Core)   4.4.0-210-generic   docker://20.10.1
```

* 전체 지우기 Ctrl+L

---

* 클라우드 서비스에서 제공하는 쿠버네티스 도구
    * 구글 쿠버네티스 엔진(GKE)
    * 아마존 쿠버네티스 일래스틱 컨테이너 서비스(EKS)
    * 애저 쿠버네티스 서비스(AKS)