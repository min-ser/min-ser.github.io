---
layout:     BLACKCODE
title:      "[04/36] 2-2. 도커 쿠버네티스 설치 / PC에 직접 설치하기"
subtitle:   "[따배쿠] 2-2. 도커 쿠버네티스 설치 / PC에 직접 설치하기"
description: "https://www.youtube.com/playlist?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c"
date:       2023-01-02 13:00:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/lheclzO-G7k?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 2-2. 도커 쿠버네티스 설치 / PC에 직접 설치하기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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

```
    00:00 인트로
    00:13 오늘 배울 내용 소개
    00:18 쿠버네티스 설치툴
    00:40 CNI이란?
    04:16 쿠버네티스 구성
    07:55 Docker 설치
    18:30 Kubernetes 설치
    25:32 kube-adm, ctl, let 설치
    28:56 control-plane 구성
    39:17 worker node 구성
    44:30 설치 확인
    46:15 Review
```

---

# CNI(Container Network Interface)
- Container간 통신을 지원하는 `VxLAN`. `Pod Network`라고 부름
- 다양한 종류의 플러그인이 존재

    쿠버네티스 CNI(Container Network Interface)는 컨테이너와 관련된 네트워크 설정을 관리하는 인터페이스입니다. 쿠버네티스는 CNI를 통해 다양한 네트워킹 솔루션을 사용하여 컨테이너 간의 통신을 구성합니다. CNI는 다음과 같은 기능을 제공합니다:

1. 컨테이너 네트워킹 구성: CNI를 사용하여 컨테이너에 IP 주소를 할당하고 네트워크 인터페이스를 설정합니다. 이를 통해 컨테이너 간의 통신이 가능하게 됩니다.
2. 네트워크 정책 설정: CNI를 통해 네트워크 정책을 설정하여 컨테이너 간의 트래픽을 제어할 수 있습니다. 이를 통해 보안 및 네트워크 세그먼테이션을 구현할 수 있습니다.
3. 플러그인 지원: CNI는 다양한 네트워킹 플러그인을 지원합니다. 쿠버네티스 클러스터에서는 플러그인을 선택하여 사용할 수 있으며, 이를 통해 다양한 네트워킹 솔루션을 적용할 수 있습니다.
4. 동적 네트워크 구성: CNI는 컨테이너가 생성되거나 삭제될 때 동적으로 네트워크 설정을 조정할 수 있습니다. 이를 통해 쿠버네티스 클러스터의 네트워크가 유연하게 관리됩니다.

    일반적으로 쿠버네티스 클러스터에서는 CNI 플러그인을 설치하여 네트워크 설정을 관리합니다. 대표적인 CNI 플러그인으로는 Calico, Flannel, Weave 등이 있으며, 각각의 플러그인은 다양한 네트워킹 솔루션을 제공합니다.

# 쿠버네티스 클러스터 구성
- control plane(mater node)
    - 워커 노드들의 상태를 관리하고 제어
    - single master
    - multi master(3,5개의 master node)
- work node
    - 도커 플랫폼을 통해 컨테이너를 동작하며 실제 서비스 제공

# kubeadm을 이용한 쿠버네티스 설치 - 온프레미스
1. Docker install
2. Kubernetes install
    1. 설치 전 환경설정
    2. kubeadm, kubectl, kubelet설치
    3. control-plane구성
    4. worker node구성
    5. 설치확인

# 설치 확인

```powershell
root@MASTER:~# kubectl get nodes -o wide
NAME     STATUS   ROLES           AGE     VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
master   Ready    control-plane   3h11m   v1.29.4   10.0.0.4      <none>        Ubuntu 20.04.6 LTS   5.15.0-1061-azure   containerd://1.6.31
node01   Ready    <none>          3h10m   v1.29.4   10.0.1.4      <none>        Ubuntu 20.04.6 LTS   5.15.0-1061-azure   containerd://1.6.31
node02   Ready    <none>          3h9m    v1.29.4   10.0.2.4      <none>        Ubuntu 20.04.6 LTS   5.15.0-1061-azure   containerd://1.6.31

```