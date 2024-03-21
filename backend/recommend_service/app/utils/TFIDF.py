# pip install konlpy
# pip install scikit-learn

from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from konlpy.tag import Kkma
from konlpy.tag import Komoran

def estimate(sentences, stopword):
    okt = Okt()
    def tokenizer(raw, pos=["Noun"], stopword=stopword):
        return [
            word for word, tag in okt.pos(
                raw,
                norm=True,   # normalize 그랰ㅋㅋ -> 그래ㅋㅋ
                stem=True    # stemming 바뀌나->바뀌다
            )
            if len(word) > 1 and tag in pos and word not in stopword
        ]
    vectorizer = TfidfVectorizer(tokenizer=tokenizer, token_pattern=None, max_df=0.4)
    X = vectorizer.fit_transform(sentences)
    features = vectorizer.get_feature_names_out()

    top_keywords = []
    for i in range(len(sentences)):
        tfidf_sorting = np.argsort(X[i].toarray()).flatten()[::-1]
        top_n = 10  # 상위 10개 키워드만 선택
        top_keywords.append([(features[j], X[i,j]) for j in tfidf_sorting[:top_n]])
    return top_keywords

def analysis(sentence):
    okt = Okt()
    morphs = okt.morphs(sentence)
    return morphs