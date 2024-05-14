---
layout:     BLACKCODE
title:      "[따배쿠] 3-1. kubectl 실습 / 실습환경 구성하기 [5/36]"
subtitle:   "[따배쿠] 3-1. kubectl 실습 / 실습환경 구성하기"
description: "https://www.youtube.com/playlist?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c"
date:       2023-01-03 01:00:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/3ChtEuiQ2Yg?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 3-1. kubectl 실습 / 실습환경 구성하기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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

    00:00 인트로
    00:11 오늘 배울 내용 소개
    00:56 Review 실습 환경 설정
    04:14 xShell을 이용한 실습 환경 구성
    05:35 kubectl 명령어 설치
    07:24 kubectl이란?
    08:45 kubectl 명령어 구조

---

# 쿠버네티스로 컨테이너 실행하기
## kubectl 명령어

    쿠버네티스에게 원하는걸 요청하는 명령어

## kubectl 명령어 기본구조

* kubectl [command] [type] [name] [flags]
    * command : 자원을 실행할 명령어
        * create
        * get
        * delete
        * edit
    
    * type : 자원의 타입
        * node
        * pod
        * service

    * name : 자원의 이름(node, pod, service ...)
    * flags : 부가적으로 설정할 옵션
        * --help
        * -o option

## 명령어 예시    
```bash
kubectl get pod webserver -o wide
```
## kubectl 명령어 자동완성

```bash
source <(kubectl completion bash)
source <(kubeadm completion bash)

echo "source<(kubectl completion bash)">>~/.bashrc
echo "source<(kubeadm completion bash)">>~/.bashrc
```

## kubectl commands

```
    kubectl --help
    kubectl command --help

    kubectl run <자원이름> <옵션>
    kubectl create -f obj.yaml
    kubectl apply -f obj.yaml

    kubectl get <자원이름><객체이름>
    kubectl edit <자원이름><객체이름>
    kubectl describe <자원이름><객체이름>

    kubectl delete pod main
```