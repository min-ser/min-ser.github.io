---
layout:     BLACKCODE
title:      "[Azure] 1. 모듈 로드 Error"
subtitle:   ""
description: "https://learn.microsoft.com/ko-kr/azure/aks/hybrid/create-pods"
date:       2023-01-25 01:00:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [Azure]
category: [AzureError]
# comments: false
# share: false
---

# 사건 개요
VSCode 에서 Azure Potal 연동시도중 발생

![error](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Azure/img/error_1-1.PNG?raw=true)


## Windows PowerShell ISE를 실행

로컬에 설치된 모듈확인을 위해 `Windows PowerShell ISE`를 실행
```
윈도우 검색 > powershell 검색 후 관리자로 ISE실행 클릭
```

## 1. 유효한 정책 실행을 위해 다음 명령어 실행

다음 명령어를 실행하여 정책수정을 위한 준비를 한다.

```
    Get-ExecutionPolicy
```

## 2. 현재 세션에 영향을 주는 모든 실행정책 리스트 표시

현재 세션과 관련된 정책 리스트를 줄력하였더니    
전부 Undefined로 된 것을 볼 수 있다.   
다음과 같은 조치가 필요했다.

`Azure Account연동에 필요한 권한 수정`

```
    Get-ExecutionPolicy -List
```
```
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine       Undefined
```

## 3. LocalMachine 정책 권한 부여
로컬 컴퓨터의 모든 사용자에 대한 실행 정책을 필요로 하기에   
관련 정책에 권한을 부여해야 한다.

```
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

## 4. 정책이 수정되었는지 확인
```
    Get-ExecutionPolicy -List
```
```
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine    RemoteSigned
```

## 5. 다시 Azure 접근 시도

정상적으로 Azure 계정 정보를 받아 연동이 됨을 확인

![error](https://github.com/IIBlackCode/IIBlackCode.github.io/blob/master/_posts/Azure/img/error_1-2.PNG?raw=true)

[출처 MS-Docs](https://learn.microsoft.com/ko-kr/azure/aks/hybrid/create-pods)