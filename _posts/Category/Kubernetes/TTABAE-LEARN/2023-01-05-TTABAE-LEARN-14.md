---
layout:     BLACKCODE
title:      "[15/36] 5-6 쿠버네티스 Pod - Pod에 Resource 할당하기 (CPU/memory requests, limits)"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-01-05 6:10:00
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

# 6. Pod에 Resource 할당하기

# Pod Resource 요청 및 제한
- Resource Requests
    - 파드를 실행하기 위한 `최소 리소스 양`을 요청
- Resource Limits
    - 파드가 사용할 수 있는 `최대 리소스 양`을 제한
    - Memory limit를 초과해서 사용되는 파드는 종료(OOM KILL)되며 다시 스케쥴링 된다.
- https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/

## Container Resource 설정 예
- cat pod-nginx-resources.yaml

```yaml
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
 
```shell
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
 
```shell
cat > pod-nginx-resources.yaml
```

```yaml
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
        memory: 500Mi
        cpu: 1
```

- [MASTER] POD 생성

```shell
root@MASTER:~# kubectl create -f pod-nginx-resources.yaml
pod/nginx-pod-resource created
```

- [MASTER] POD 조회
 
```shell
kubectl get pod -o wide
```
![img](/assets/category/Kubernetes/2023/07/17-03.PNG)

#### 자세히 조회
```shell
kubectl describe pod nginx-pod-resources
```

- [MASTER] yaml 수정 후 다시 배포(vi 명령어 사용)
```shell
requests:
  cpu: 1 >>>> 2로 수정
```

- [MASTER] POD 재배포
```shell
root@MASTER:~# kubectl create -f pod-nginx-resources.yaml
pod/nginx-pod-resource created
```