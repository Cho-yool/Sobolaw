from app.models.model import Situation, Precedent, BaseEntity, RecommendPrecedents
from . import mongoDB
from . import TFIDF
from . import http

def getKeywords(precedentsId: int):
    data = None
    try:
        mongoDB.connect()
        mongoDB.collections("precedent_keyword")
        data = mongoDB.find({"_id":precedentsId})
    finally:
        mongoDB.disconnect()

    if(data):
        data = data['keyword']
    return data

async def recommend_precedent(situation: Situation):
    list = TFIDF.analysis(situation.situation)
    precedents = None
    try:
        mongoDB.connect()
        mongoDB.collections("precedent_keyword")
        list = mongoDB.find_keywords(list)
        precedents = []
        for item in list:
            id = item['_id']
            data = await http.get_precedent(id)
            data['similarity'] = item['total']*70
            precedents.append(data)
    finally:
        mongoDB.disconnect()

    return {
            "precedents":precedents
        }

