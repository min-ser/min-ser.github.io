---
layout:     BLACKCODE
title:      "근무일지 프로그램"
subtitle:   ""
description: ""
date:       2023-10-22 01:10:00
author:     "김민서"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: []
category: [Security_Project]
# comments: false
# share: false
---

- 메인페이지
    - 전광판
        - 공지사항 Total
        - ToDoList Total
        - Project Total
        - 날짜 총계수/수행건수
    - 공지사항
        - Num
        - Title
        - 날짜
        - 상태[완료/진행중]
        - [체크시 공지사항으로 Top으로 올라감]
    - ToDoList [Table]
        - Num [PK]
        - Title [A태그]
        - 날짜
        - 상태[완료/진행중]
    - ToDoList 상세 [모달]
        - NUM [FK]
        - Title
        - Content
        - 날짜
        - 완료
        - 진행중
    - PROJECT
        - [NUM] : PK
        - 회사명
        - 프로젝트명
        - 기간
        - 내용
        - 회의록
        - 작성일
    - 클릭시 카테고리 생성
