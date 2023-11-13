---
layout:     BLACKCODE
title:      "[따배쿠] 6-2. ReplicaSet(ReplicationController와의 차이점은?) 쿠버네티스 pod 개수 보장"
subtitle:   ""
description: "https://www.youtube.com/watch?v=78QmQdjovCc&list=PLApuRlvrZKohaBHvXAOhUD-RxD0uQ3z0c&index=18"
date:       2023-07-20 1:10:00
author:     "MADness"
header-img: "assets/owner/hero/home-bg.jpg"
header-video: "assets/video/metrix.mp4"
thumbnail: /assets/owner/blog/thumbs/thumb01.png
tags: [따배쿠]
category: [Kubernetes]
# comments: false
# share: false
# 이미지 : ![img](/assets/category/Kubernetes/2023/07/17-03.PNG)
---
# 학습내용
- Replication Controller
- ReplicaSet
- Deployment
- DaemonSet
- StatefulSet
- Job
- CronJob

# ReplicaSet
- ReplicationController 와 같은 역할을 하는 컨트롤러
- ReplicationController 보다 풍부한 selector
```
selector:
  matchLables:
    component: redis
  matchExpressions:
    - {key: tier, operator: In, values: [cache]}
    - {key: environment, operator: Notln, values: [dev]}
```

- matchExperssions 연산자
    - ln : key와 values를 지정하여 key, value가 일치하는 Pod만 연결
    - Notln : key는 일치하고 value는 일치하지 않는 Pod에 연결
    - Exists : key에 맞는 label의 pod를 연결
    - DoesNotExist : key와 다른 label의 pod를 연결

## ReplicaSet
```
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webui
    matchExpressions:
    - {key: version, operator: Exists}
    temp..
```

## ReplicationController
```
spec:
  replicas: 3
  selector:
    app: webui
    version: "2.1"
    temp..
```
