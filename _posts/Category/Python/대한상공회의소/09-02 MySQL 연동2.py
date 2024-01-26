import pymysql

## 전역 변수 선언부
conn, cur = None, None # 교량과 트럭

## 메인 코드부
#1. 서버와 교량을 연결하고, 빈트럭 준비
conn = pymysql.connect(host='192.168.56.105', user='winUser', password='4321',
            db='hanbitDB', charset='utf8')
cur = conn.cursor() # 빈 트럭 준비

#2. 물건(SQL) 준비 + 트럭에 실어서 부어 넣기
sql = "SELECT * FROM user_table"
cur.execute(sql)

#3. 돌아온 트럭(cur)에서 하나씩 꺼내기
while True :
    row = cur.fetchone() # 한칸 꺼내
    if row == None :
        break
    uid = row[0]
    uname = row[1]
    uemail = row[2]
    byear = row[3]
    print(uid, uname, uemail, byear)

# 끝. 정리하기
cur.close()
conn.close()
print('Ok')