# pip install pymysql
import pymysql

database = None

def connect():
    global database
    database = pymysql.connect(
    host='stg-yswa-kr-practice-db-master.mariadb.database.azure.com',
    port=3306,
    user='S10P22A604@stg-yswa-kr-practice-db-master',
    password='qlpoh4yX1A',
    db='S10P22A604',
    charset='utf8'
    )
    
def select(sql):
    global database
    results = None
    try:
        with database.cursor() as cursor:

            cursor.execute(sql)

            results = cursor.fetchall()

    finally:
        database.close()
    return results
