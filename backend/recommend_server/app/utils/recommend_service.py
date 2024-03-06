from app.models.model import Situation, Precedent, BaseEntity, RecommendPrecedents
from . import mariaDB
from . import mongoDB
from . import TFIDF

def getKeywords(precedentsId: int):
    data = None
    try:
        mongoDB.connect()
        mongoDB.collection("precedent_keyword")
        data = mongoDB.find({"_id":precedentsId})
    finally:
        mongoDB.disconnect()

    if(data):
        data = data['keyword']
    return data

def recommend_precedent(situation: Situation):
    list = TFIDF.analysis(situation.situation)
    try:
        mongoDB.connect()
        mongoDB.collection("precedent_keyword")
        list = mongoDB.find_keywords(list)
    finally:
        mongoDB.disconnect()
        
    return list

