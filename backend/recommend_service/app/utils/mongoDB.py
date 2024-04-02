# pip install pymongo

from pymongo import MongoClient

client = None
database = None
collections = None

def connect():
    global client
    global database
    client = MongoClient('mongodb+srv://S10P22A604:QtMf1U0bzz@ssafy.ngivl.mongodb.net/S10P22A604?authSource=admin')
    database = client.S10P22A604

def collections(db_name):
    global collection
    global database
    collection = database[db_name]

def drop():
    global collection
    collection.drop()

def insert(data):
    global collection
    collection.insert_one(data)

def find(data):
    global collection
    return collection.find_one(data)


def delete(data):
    global collection
    collection.delete_many(data)

def disconnect():
    global client
    client.close()

def find_keywords(arr):
    global collection

    pipeline = [
        {
            "$match": {
                "keyword": {
                    "$elemMatch": {
                        "word": {"$in": arr}
                    }
                }
            }
        },
        {
            "$unwind": "$keyword"
        },
        {
            "$match": {
                "keyword.word": {"$in": arr}
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "total": {"$sum": "$keyword.value"}
            }
        },
        {
            "$match": {
                "total": {"$gte": 0.5}  # 'total' 필드의 값이 0.5 이상인 문서만 필터링
            }
        },
        {
            "$sort": {
                "total": -1  # 'total' 필드를 기준으로 내림차순 정렬
            }
        }
    ]
    results = collection.aggregate(pipeline)
    return results