---
id: legacy-java-04
type: expertise
title: '[SERVER] 리눅스 서버 배포'
enabled: true
sample: false
group: software-engineering
category: Java / Linux
createdDate: '2023-02-02'
updatedDate: '2023-02-02'
featured: false
summary: 1. 리눅스 환경 구성 Azure VM 생성 인바운드 보안 규칙 추가 img /assets/category/Java/2023/02/02
  01.PNG 아파치에서 설정한 내부 포트 지정 8080 2. 자바 설치 3. 서버설치 아파치 톰켓파일 리눅스용 FTP로 전송 압축풀기
tags:
- Java
- Legacy Note
---

> **Legacy Engineering Note** · 기존 기술 블로그에서 선별 이관한 기록입니다. 작성 당시 환경과 버전을 기준으로 합니다.

# 1. 리눅스 환경 구성
    - Azure VM 생성
    - 인바운드 보안 규칙 추가
    ![img](/assets/category/Java/2023/02/02-01.PNG)
        - 아파치에서 설정한 내부 포트 지정(8080)

---

# 2. 자바 설치
```shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install openjdk-8-jre
```

---

# 3. 서버설치
    - 아파치 톰켓파일 리눅스용 FTP로 전송
    - 압축풀기 :` tar -xvf [파일명]`

---

# 4. bin 파일에 서버 start.sh 경로로 이동 후 서버 실행
```shell
~/apache-tomcat-8.5.82/bin$ sh start.sh
```

---

# 5. VM Public IP를 통해 서버 접근
![img](/assets/category/Java/2023/02/02-02.PNG)

---

# 6. 이중화 구성
- 아래 디렉토리로 접근 후 index.jsp를 수정하여 서버 구분
- /apache-tomcat-8.5.82/webapps/ROOT/index.jsp

---



