---
layout:     BLACKCODE
title:      "[따배쿠] 5-2. 쿠버네티스 Pod - livenessProbe를 이용해서 Self-healing Pod 만들기 [12/36]"
subtitle:   ""
description: "https://www.youtube.com/watch?v=0rYt3PcggzA&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=10"
date:       2023-01-05 2:00:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [따배쿠]
# comments: false
# share: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/-NeJS7wQu_Q?list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c" title="[따배쿠] 5-2. 쿠버네티스 Pod - livenessProbe를 이용해서 Self-healing Pod 만들기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 수업내용
## Part 1. 쿠버네티스 시작하기
### 1. 쿠버네티스 소개
### 2. 쿠버네티스 설치하기
### 3. 쿠버네티스로 컨테이너 실행하기

## Part 2. 쿠버네티스 기본 개념
### 4. 쿠버네티스 아키텍처
### 5. `파드`
### 6. 컨트롤러
### 7. 서비스
### 8. 인그레스
### 9. 레이블과 애너테이션
### 10. 컨피그맵
### 11. 시크릿 

## Part 3. 쿠버네티스 한 걸음 더 들어가기
### 12. 파드 스케쥴링
### 13. 인증과 권한관리
### 14. 데이터 저장
### 15. 클러스터 네트워킹 구성
### 16. 쿠버네티스 DNS
### 17. 로깅과 모니터링
### 18. 오토스케일링
### 19. 사용자 정의 자원
### 20. 쿠버네티스 기반으로 워드프레스 앱 실행하기
### 21. 헬름 

---

# 5-2. 쿠버네티스 Pod - livenessProbe를 이용해서 Self-healing Pod 만들기

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