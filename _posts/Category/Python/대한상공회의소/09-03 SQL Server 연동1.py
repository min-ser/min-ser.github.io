import pymssql

## 전역 변수 선언부
conn, cur = None, None # 교량과 트럭

## 메인 코드부
#1. 서버와 교량을 연결하고, 빈트럭 준비
conn = pymssql.connect(server='192.168.56.105', user='sa', password='p@ssw0rd',
            database='hanbitDB')
cur = conn.cursor() # 빈 트럭 준비

#2. 트럭에 실을 물건(SQL)을 준비
sql = "CREATE TABLE user_table(uid CHAR(8), uname CHAR(5),"
sql += "uemail CHAR(20), byear INT)"
#3. 트럭에 물건을 실어서 가서 부어 넣기
cur.execute(sql)

#2. 트럭에 실을 문건(SQL)을 준비
while True:
    uid, uname, uemail, byear = None, None, None, None
    uid = input('아이디-->')
    if uid == "" or uid == None :
        break
    uname = input('이름-->')
    uemail = input('메일-->')
    byear = int(input('생년-->'))
    sql = "INSERT INTO user_table VALUES('" + uid + "', '"
    sql += uname + "', '" + uemail + "', " + str(byear) + ")"
    #3. 부어 넣기
    cur.execute(sql)

conn.commit()


# 끝. 정리하기

cur.close()
conn.close()
print('Ok')