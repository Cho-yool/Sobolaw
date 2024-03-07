# pip install fastapi
# pip install "uvicorn[standard]"

from app.models.model import Situation, Precedent, BaseEntity, RecommendPrecedents
from contextlib import asynccontextmanager
from py_eureka_client import eureka_client
from fastapi import FastAPI, APIRouter
from app.utils.recommend_service import getKeywords, recommend_precedent

router = APIRouter()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await eureka_client.init_async(eureka_server="http://localhost:8761/eureka",
                        app_name="recommend-server",
                        instance_port=8004)
    yield

app = FastAPI(
    title="Recommend-Server",
    description="판례 추천, 판례의 주요 키워드 관련 서버",
    version="0.0.1",
    # lifespan=lifespan
)

# -------------------------------------------------------------------------------------------------------------------------------------------


@router.post("/precedents", summary="유사 판례 추천", description="사용자 상황을 받아서 추천판례와 승소율을 반환하는 api", 
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "status": 200,
                                "message": "Success",
                                "data": {
                                    "winRate":31,
                                    "precedents":[
                                            {
                                            "precedentId": 64447,
                                            "caseName": "사해행위취소등",
                                            "caseNumber": "2007다47216",
                                            "judgmentDate": "20080925",
                                            "judgment": "선고",
                                            "courtName": "대법원",
                                            "caseType": "민사",
                                            "verdictType": "판결",
                                            "judicialNotice": "채무자의 제3채무자에 대한 채권에 대하여, 채권자 A의 가압류가 있은 후 그 채권이 甲에게 양도되고, 그 후 다시 채권자 B의 가압류가 있자, 제3채무자가 이와 같은 사정을 이유로 공탁을 하고 공탁사유신고를 함으로 인해 열린 배당절차에서 A와 甲에게만 배당이 되고 채권자 B가 배당에서 제외되자, 채권자 B가 채권양수인 甲을 상대로는 위 채권양도가 사해행위에 해당한다고 하여 그 취소 및 그 배당액을 자신에게 배당하는 것으로 배당표의 경정을 구하고, 동시에 채권자 A를 상대로는 위 채권이 여전히 채무자에 귀속됨을 전제로 하는 배당표의 경정을 구한 사안에서 위 채권양도를 사해행위로 인정하여 취소하면서도 사해행위 취소의 효과는 또 다른 채권자인 A에게는 미치지 않는다고 한 사례 <br/>",
                                            "verdictSummary": "",
                                            "referencedStatute": "민법 제406조<br/>",
                                            "referencedCase": "",
                                            "caseContent": "【원고, 상고인】 근로복지공단(소송대리인 법무법인 두라 담당변호사 박근후외 1인)<br/>【피고, 피상고인】 <br/>【원심판결】 서울고법 2007. 6. 12. 선고 2006나79911 판결<br/>【주    문】<br/>  상고를 기각한다.<br/>  상고비용은 원고가 부담한다.<br/><br/>【이    유】  상고이유를 판단한다. <br/>  채권자가 사해행위의 취소와 함께 수익자 또는 전득자로부터 책임재산의 회복을 구하는 사해행위취소의 소를 제기한 경우 그 취소의 효과는 채권자와 수익자 또는 전득자 사이의 관계에서만 생기는 것이므로, 수익자 또는 전득자가 사해행위의 취소로 인한 원상회복 또는 이에 갈음하는 가액배상을 하여야 할 의무를 부담한다고 하더라도 이는 채권자에 대한 관계에서 생기는 법률효과에 불과하고 채무자와 사이에서 그 취소로 인한 법률관계가 형성되는 것은 아니고, 그 취소의 효력이 소급하여 채무자의 책임재산으로 회복되는 것도 아니라 할 것이다(\n        대법원 2006. 8. 24. 선고 2004다23110 판결 등 참조). \n      <br/>  위의 법리에 따라 원심판결 이유를 기록에 비추어 살펴보면, 원심이 제1심판결을 인용하여, 원고의 이 사건 채권에 대한 가압류 등 여러 개의 가압류와 압류 및 추심명령의 경합 등을 원인으로 공탁된 이 사건 채권액에 관하여 열린 배당절차에서 확정일자 있는 증서인 내용증명우편에 의한 채권양도의 통지 이후에 이 사건 채권을 가압류하여 채권양수인인 피고에게 대항하지 못한다는 이유로 배당을 받지 못한 원고가 신한은행을 상대로 채권양도계약이 사해행위라는 사해행위취소소송을 제기하고 그 인용판결이 확정된다 하더라도 그 취소의 효력은 원고와 수익자인 신한은행 사이에서만 발생할 뿐 사해행위 이전에 이미 이 사건 채권을 가압류한 피고에게는 미치지 아니하므로, 원고는 임금채권의 대위변제에 의한 우선변제권만을 내세워 피고에 대한 배당액의 삭제를 구할 수는 없다고 판단한 것은 정당하고, 거기에 상고이유의 주장과 같은 법리오해 등의 위법이 없다. <br/>  그러므로 상고를 기각하고, 상고비용은 패소자가 부담하도록 하여 관여 대법관의 일치된 의견으로 주문과 같이 판결한다.<br/><br/>대법관 김영란(재판장) 이홍훈 안대희(주심) 양창수 "
                                            }
                                        ]}}}},}})
async def recommend(situation: Situation):
    recommendPrecedents = await recommend_precedent(situation)
    return BaseEntity(status=200, message="Success", data=recommendPrecedents)



@router.post("/precedents/members", summary="맞춤 판례 추천", description="member_keyword테이블에 저장된 키워드들을 받아 유사 판례를 보내주는 기능", 
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "status": 200,
                                "message": "Success",
                                "data": {
                                    "precedents":[
                                            {
                                            "precedentId": 64447,
                                            "caseName": "사해행위취소등",
                                            "caseNumber": "2007다47216",
                                            "judgmentDate": "20080925",
                                            "judgment": "선고",
                                            "courtName": "대법원",
                                            "caseType": "민사",
                                            "verdictType": "판결",
                                            "judicialNotice": "채무자의 제3채무자에 대한 채권에 대하여, 채권자 A의 가압류가 있은 후 그 채권이 甲에게 양도되고, 그 후 다시 채권자 B의 가압류가 있자, 제3채무자가 이와 같은 사정을 이유로 공탁을 하고 공탁사유신고를 함으로 인해 열린 배당절차에서 A와 甲에게만 배당이 되고 채권자 B가 배당에서 제외되자, 채권자 B가 채권양수인 甲을 상대로는 위 채권양도가 사해행위에 해당한다고 하여 그 취소 및 그 배당액을 자신에게 배당하는 것으로 배당표의 경정을 구하고, 동시에 채권자 A를 상대로는 위 채권이 여전히 채무자에 귀속됨을 전제로 하는 배당표의 경정을 구한 사안에서 위 채권양도를 사해행위로 인정하여 취소하면서도 사해행위 취소의 효과는 또 다른 채권자인 A에게는 미치지 않는다고 한 사례 <br/>",
                                            "verdictSummary": "",
                                            "referencedStatute": "민법 제406조<br/>",
                                            "referencedCase": "",
                                            "caseContent": "【원고, 상고인】 근로복지공단(소송대리인 법무법인 두라 담당변호사 박근후외 1인)<br/>【피고, 피상고인】 <br/>【원심판결】 서울고법 2007. 6. 12. 선고 2006나79911 판결<br/>【주    문】<br/>  상고를 기각한다.<br/>  상고비용은 원고가 부담한다.<br/><br/>【이    유】  상고이유를 판단한다. <br/>  채권자가 사해행위의 취소와 함께 수익자 또는 전득자로부터 책임재산의 회복을 구하는 사해행위취소의 소를 제기한 경우 그 취소의 효과는 채권자와 수익자 또는 전득자 사이의 관계에서만 생기는 것이므로, 수익자 또는 전득자가 사해행위의 취소로 인한 원상회복 또는 이에 갈음하는 가액배상을 하여야 할 의무를 부담한다고 하더라도 이는 채권자에 대한 관계에서 생기는 법률효과에 불과하고 채무자와 사이에서 그 취소로 인한 법률관계가 형성되는 것은 아니고, 그 취소의 효력이 소급하여 채무자의 책임재산으로 회복되는 것도 아니라 할 것이다(\n        대법원 2006. 8. 24. 선고 2004다23110 판결 등 참조). \n      <br/>  위의 법리에 따라 원심판결 이유를 기록에 비추어 살펴보면, 원심이 제1심판결을 인용하여, 원고의 이 사건 채권에 대한 가압류 등 여러 개의 가압류와 압류 및 추심명령의 경합 등을 원인으로 공탁된 이 사건 채권액에 관하여 열린 배당절차에서 확정일자 있는 증서인 내용증명우편에 의한 채권양도의 통지 이후에 이 사건 채권을 가압류하여 채권양수인인 피고에게 대항하지 못한다는 이유로 배당을 받지 못한 원고가 신한은행을 상대로 채권양도계약이 사해행위라는 사해행위취소소송을 제기하고 그 인용판결이 확정된다 하더라도 그 취소의 효력은 원고와 수익자인 신한은행 사이에서만 발생할 뿐 사해행위 이전에 이미 이 사건 채권을 가압류한 피고에게는 미치지 아니하므로, 원고는 임금채권의 대위변제에 의한 우선변제권만을 내세워 피고에 대한 배당액의 삭제를 구할 수는 없다고 판단한 것은 정당하고, 거기에 상고이유의 주장과 같은 법리오해 등의 위법이 없다. <br/>  그러므로 상고를 기각하고, 상고비용은 패소자가 부담하도록 하여 관여 대법관의 일치된 의견으로 주문과 같이 판결한다.<br/><br/>대법관 김영란(재판장) 이홍훈 안대희(주심) 양창수 "
                                            }
                                        ]}}}},}})
async def recommendMember(situation: Situation):
    recommendPrecedents = await recommend_precedent(situation)
    return BaseEntity(status=200, message="Success", data={"precedents":recommendPrecedents['precedents']})





@router.get("/precedents/{precedentsId}/keywords", summary="판례 키워드 반환", description="판례id를 받아서 키워드들을 반환하는 api",
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "status": 200,
                                "message": "Success",
                                "data": [
                                    {
                                    "word": "보관",
                                    "value": 0.4424494505316605
                                    },
                                    {
                                    "word": "동산",
                                    "value": 0.4247690073491075
                                    },
                                    {
                                    "word": "집행",
                                    "value": 0.337304079807786
                                    },
                                    {
                                    "word": "멸실",
                                    "value": 0.2654806295931922
                                    },
                                    {
                                    "word": "채권자",
                                    "value": 0.2251748872191674
                                    },
                                    {
                                    "word": "주의",
                                    "value": 0.18006008986439076
                                    },
                                    {
                                    "word": "상표",
                                    "value": 0.16497908115029683
                                    },
                                    {
                                    "word": "물건",
                                    "value": 0.15832743690328785
                                    },
                                    {
                                    "word": "책임",
                                    "value": 0.14549138054425764
                                    },
                                    {
                                    "word": "손해배상",
                                    "value": 0.13911980620474929
                                    }
                                ]}}},}})
async def getKeyword(precedentsId: int):
    keywords = getKeywords(precedentsId)
    return BaseEntity(status=200, message="Success", data=keywords)

# -------------------------------------------------------------------------------------------------------------------------------------------


app.include_router(router, prefix="/api/recommend-server")

# uvicorn main:app --reload --host localhost --port 8004

