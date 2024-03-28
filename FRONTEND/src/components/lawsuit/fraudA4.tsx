import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import { RootState } from "../../redux/store/store";
import { FraudDetails } from "../../types/DataTypes";
import style from "../../styles/papers/A4.module.css";

const FraudA4 = ({ fraudDetails }: { fraudDetails: FraudDetails }) => {
  const [directEvidence, setDirectEvidence] = useState<string>(
    fraudDetails.evidence
  );
  const [title, setTitle] = useState("");
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    console.log("A4", fraudDetails);
  }, [fraudDetails]);

  // 저장 제출 함수
  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    // TODO: 소장작성 비동기 통신
    // 모든 조건이 True일 때 제출 가능 (필수입력 공백확인)
    if (accessToken === "") {
      alert("로그인 시 이용 가능합니다! ");
    }
  }

  return (
    <div className={style["container"]}>
      {fraudDetails ? (
        <>
          <div className={style["contents-center"]}>
            {/* 상단 저장 버튼 */}
            <div className={style["button-box"]}>
              <Input
                className={style["button"]}
                placeholder="고소장 저장 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%" }}
              />
              <Button
                className={style["button"]}
                type="primary"
                onClick={onSubmit}
              >
                저장하기
              </Button>
            </div>
          </div>
          <div className={style["pages"]}>
            <div className={style["title"]}>사기죄 고소장</div>
            <div>
              <div>
                {fraudDetails.plaintiffName ? (
                  <p>원고(고소인) 성명 : {fraudDetails.plaintiffName} </p>
                ) : null}
                {fraudDetails.plaintiffResidentRegistrationNumber ? (
                  <p>
                    주민등록번호:{" "}
                    {fraudDetails.plaintiffResidentRegistrationNumber}{" "}
                  </p>
                ) : null}
                {fraudDetails.plaintiffMainAddress ||
                fraudDetails.plaintiffSubAddress ? (
                  <p>
                    주소 :{" "}
                    {fraudDetails.plaintiffMainAddress +
                      fraudDetails.plaintiffSubAddress}
                  </p>
                ) : null}
                {fraudDetails.plaintiffPhoneNumber ? (
                  <p>전화번호 : {fraudDetails.plaintiffPhoneNumber}</p>
                ) : null}
              </div>
            </div>
            <br />
            <div>
              <div>
                {fraudDetails.defendantName ? (
                  <p>피고(피고소인) 이름 : {fraudDetails.defendantName}</p>
                ) : null}

                {fraudDetails.defendantMainAddress ||
                fraudDetails.defendantSubAddress ? (
                  <p>
                    주소 :{" "}
                    {fraudDetails.defendantMainAddress +
                      fraudDetails.defendantSubAddress}
                  </p>
                ) : null}
                {fraudDetails.defendantPhoneNumber ? (
                  <p>전화번호 : {fraudDetails.defendantPhoneNumber}</p>
                ) : null}
              </div>
            </div>
            {fraudDetails.plaintiffName ? (
              <>
                <div className={style["title"]}>고소취지</div>
                <div>
                  <p>
                    위 사건에 관하여 본 고소인은 아래와 같은 이유로 피고소인을
                    형법 제347조 제1항의 사기죄로 고소하오니, 수사하여 엄히
                    처벌하여 주시기 바랍니다.
                  </p>
                </div>
              </>
            ) : null}
            {fraudDetails.tradedItem ||
            fraudDetails.paperIDate ||
            fraudDetails.paperITime ? (
              <>
                <div className={style["title"]}>범죄사실</div>
                <div>
                  <p>
                    1. 고소인과 피고소인은 {fraudDetails.paperIDate}{" "}
                    {fraudDetails.paperITime} 중고거래 사이트인{" "}
                    {fraudDetails.tradeSite !== "직접입력" ? (
                      <span>{fraudDetails.tradeSite}</span>
                    ) : (
                      <span>{fraudDetails.directSite}</span>
                    )}
                    에서, {fraudDetails.tradedItem} (이하 '본 중고거래
                    대상물')를 판매한다는 글을 보고{" "}
                    {fraudDetails.contact ? (
                      <span>({fraudDetails.contact.join(" , ")})을 통해 </span>
                    ) : null}
                    연락해온 고소인에게 정상적인 본 중고거래 대상물을
                    판매하겠다고 아래와 같이 거짓말을 하였습니다.
                  </p>
                  <p>
                    2. 사실 피고소인은 정상적으로 작동되는 물건이 없거나 아예
                    물건이 없어서 돈을 받더라도 정상적인 본 중고거래 대상물을
                    교부할 의사나 능력이 없었습니다.
                  </p>
                  {fraudDetails.damageMoney ? (
                    <p>
                      3. 그럼에도 불구하고 피고소인은 위와 같이 고소인을
                      기망하여 {fraudDetails.moneyDate} {fraudDetails.moneyTime}{" "}
                      고소인
                      {fraudDetails.disposalMethod === 2 ? (
                        <span>
                          의 계좌 ( {fraudDetails.bankName} /
                          {fraudDetails.accountNumber} ) 로부터
                        </span>
                      ) : (
                        <>으로부터</>
                      )}{" "}
                      {fraudDetails.damageMoney} 원을{" "}
                      {fraudDetails.disposalMethod === 2 ? (
                        <span>이체</span>
                      ) : null}
                      받았습니다.
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
          <div className={style["pages"]}>
            <div className={style["title"]}>고소이유</div>
            <div>
              <p>
                상기 내용에 따라 고소인은 피고소인을 다음과 같은 이유로
                고소합니다:
              </p>
              <p>
                1. 상기 내용에 따라 고소인과 피고소인은 중고거래 사이트에서
                거래하였으며, 피고소인은 거래 내용을 위조하여 고소인을 기망하고
                돈을 받았습니다.
              </p>
              {/* 나머지 고소이유 내용 */}
            </div>
            <div className={style["title"]}>결론</div>
            <div>
              <p>
                위와 같은 피고소인의 행위는 형법 제347조 제1항에 정한 사기죄에
                해당하고, 이로 인한 고소인의 재산적/정신적 피해가 극심하므로,
                피고소인을 수사하여 엄벌에 처해주시기 바랍니다.
              </p>
            </div>
            {fraudDetails.evidenceList.length > 0 ? (
              <>
                <div className={style["title"]}>[별첨] - 증거자료</div>
                <ul style={{ listStyle: "decimal" }}>
                  {fraudDetails.evidenceList.map((list) => {
                    if (
                      list !==
                      "기타(피고소인을 특정할 수 있는 증거나 사항) 및 직접입력"
                    ) {
                      return <li>{list}</li>;
                    } else {
                      return <li>{directEvidence}</li>;
                    }
                  })}
                </ul>
              </>
            ) : null}
            {fraudDetails.policeStation ? (
              <div className={style["footer"]}>
                {fraudDetails.policeStation} 귀중
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FraudA4;
