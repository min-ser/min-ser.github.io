---
layout:     BLACKCODE
title:      "Docker 설치부터 SpringBoot 배포까지"
subtitle:   ""
description: "https://leveloper.tistory.com/9"
date:       2023-10-26 1:10:01
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [SpringBoot]
category: [SpringBoot]

# img url : ![img](/assets/category/Azure/2023/02/08/01.PNG)
---

## Spring Boot Dockerfile 설정
- FROM - JDK를 설정합니다.
- ENV - 환경변수 설정를 설정합니다.
- WORKDIR - 환경변수를 경로로 지정합니다.
- COPY - 빌드된 jar 파일을 application.jar의 파일명으로 복사합니다.
- EXPOSE - 실행될 포트를 설정합니다.
- CMD - 명령어 옵션을 입력합니다.

## jar로 배포하는 경우
```
FROM openjdk:11-jdk
# ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build/libs/*.jar application.jar
EXPOSE 8080
CMD ["java", "-jar", "application.jar"]
```

## war로 배포하는 경우
```
FROM openjdk:11-jdk
# ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build/libs/*.war application.war
EXPOSE 8080
CMD ["java", "-jar", "application.war"]
```

## 해당 컨테이너 로그 확인
```
sudo docker logs --tail 20 -f <컨테이너 ID>
```
## 컨테이너 삭제
```
sudo docker rm <컨테이너 ID>
```
## 컨테이너 모두 삭제
```
sudo docker rm `docker ps -a -q`
```

## 이미지 삭제
```
sudo docker rmi <이미지ID>
```

## 이미지 모두 삭제
```
docker rmi `docker images -a -q`
```

## 컨테이너 접속
```
sudo docker attach <컨테이너 이름 or 아이디>
```

## 도커 빌드(docker image 생성)
```
# build 명령어
sudo docker build -t <docker hub id>/<application name> .

# build 후 생성된 image 확인
sudo docker images
```

## 컨테이너 실행(image 사전 생성 필요)
```
sudo docker run -d -p 8080:8080 <docker hub id>/<application name>:<tag>

sudo docker run -d -p 8081:8080 iiblackcode/springboot-mysql-replica:kbhc 

sudo docker run -i -t --name replica --net host iiblackcode/springboot-mysql-replica:kbhc

# -p : 8080포트로 실행해서 8081로 포트포워딩(외부에서 8081로 접근)
# --name : container name 설정 : x-forwarded-for
# :kbhc : tag값이 kbhc
sudo docker run -d -p 8081:8080 --name x-forwarded-for iiblackcode/xforwardedfor:kbhc
```

## 컨테이너 ip 확인
```
# container or image 의 low level 정보 확인
sudo docker inspect <container name or id>

# ip정보만 확인하려면
sudo docker inspect -f "{{ .NetworkSettings.IPAddress }}" <container name or id>
sudo docker inspect -f "{{ .NetworkSettings.IPAddress }}" x-forwarded-for
```

---

## Docker hub로 image 업로드
1. image생성을 위한 docker build
```
sudo docker build -t <docker hub id>/<application name>:<tag> .
```

2. docker login을 실행하여 docker hub에 가입했던 아이디와 비밀번호 입력
```
docker login
```

3. docker hub로 이미지 push
```
sudo docker push <docker hub id>/<application name>
```

- [tip] image 정보 변경이 필요한 경우
```
docker image tag <image id를 docker hub id로 변경><new application name>
```

az aks get-credentials --resource-group kn3-kbh-dev-ocareplus-hic-fr-rg --name kn3-kbh-dev-ocareplus-hic-fr-cl --admin

az acr login --name kbhchicdevacr33

VA60QOVFl+ag0NZzrw2D3nrACVdYWjgEXrOtwiZZPM+ACRD5GIsg
cYQEIsg4bIk73b9fupjDNHqmQXMOMVIrFTtO6Wm4Dc+ACRCEzloT

docker tag iiblackcode/xforwardedfor:kbhc kbhchicdevacr33.azurecr.io/iiblackcode/xforwardedfor:kbhc
docker push kbhchicdevacr33.azurecr.io/iiblackcode/xforwardedfor:kbhc