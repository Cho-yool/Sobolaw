import mariaDB
import TFIDF
import mongoDB

# mariaDB.connect()

# precedents = mariaDB.select("select precedent_id,case_content, judicial_notice, verdict_summary from precedent limit 100")

# data = []
# id=[]

# for i in precedents:
#     data.append(i[1]+" "+i[2]+" "+i[3])
#     id.append(i[0])

# keywords = TFIDF.estimate(data, [])

# mongoDB.connect()

# mongoDB.collection("precedent_keyword")

# for i, keyword in enumerate(keywords):
#     tmp = []
#     for word, tfidf in keyword:
#         tmp.append({"word":word, "value":tfidf})
#     mongoDB.delete({"_id":id[i]})
#     mongoDB.insert({"_id":id[i], "keyword":tmp})

# print(mongoDB.find({"_id":64444}))

# mongoDB.disconnect()

sentence = "중고거래 마켓에서 냉장고 거래를 했는데 판매자가 유사지폐를 줬어요;; 정말 슬펐는데 차단당해서 할 수 있는게 없었어요"

list = TFIDF.analysis(sentence)
print(list)

mongoDB.connect()
mongoDB.collection("precedent_keyword")
arr = mongoDB.find_keywords(list)
print(*arr)
