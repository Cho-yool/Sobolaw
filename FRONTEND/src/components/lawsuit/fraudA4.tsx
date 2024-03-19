import { Button } from "antd";
import style from "../../styles/papers/A4.module.css";
import { FraudDetails } from "../../types/DataTypes";
import { useEffect } from "react";

const FraudA4 = ({ fraudDetails }: { fraudDetails: FraudDetails }) => {
  useEffect(() => {
    console.log("A4", fraudDetails);
  }, [fraudDetails]);
  return (
    <div className={style["container"]}>
      {fraudDetails ? (
        <>
          <div className={style["button-box"]}>
            <Button type="primary">저장하기</Button>
          </div>
          <div className={style["pages"]}>
            <div className={style["title"]}>사기죄 고소장</div>
            <div>
              <div>
                {fraudDetails.plaintiffName ? (
                  <p>원고(고소인) 성명: {fraudDetails.plaintiffName} </p>
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
                    주소:{" "}
                    {fraudDetails.plaintiffMainAddress +
                      fraudDetails.plaintiffSubAddress}
                  </p>
                ) : null}
                {fraudDetails.plaintiffPhoneNumber ? (
                  <p>전화번호: {fraudDetails.plaintiffPhoneNumber}</p>
                ) : null}
              </div>
            </div>
            <div>
              <div>
                <p>피고(피고소인) 이름:</p>
                <p>주소:</p>
                <p>전화번호:</p>
              </div>
            </div>
            <div className={style["title"]}>고소취지</div>
            <div>
              <p>
                위 사건에 관하여 본 고소인은 아래와 같은 이유로 피고소인을 형법
                제347조 제1항의 사기죄로 고소하오니, 수사하여 엄히 처벌하여
                주시기 바랍니다.
              </p>
            </div>
            <div className={style["title"]}>범죄사실</div>
            <div>
              <p>
                1. 고소인과 피고소인은 (연락날짜) (연락시간) 중고거래 사이트인
                (중고거래 사이트명)에서, (거래 물건) (이하 '본 중고거래
                대상물')를 판매한다는 글을 보고 연락해온 고소인에게 정상적인 본
                중고거래 대상물을 판매하겠다고 아래와 같이 거짓말을 하였습니다.
              </p>
              <p>
                2. 사실 피고소인은 정상적으로 작동되는 물건이 없거나 아예 물건이
                없어서 돈을 받더라도 정상적인 본 중고거래 대상물을 교부할 의사나
                능력이 없었습니다.
              </p>
              <p>
                3. 그럼에도 불구하고 피고소인은 위와 같이 고소인을 기망하여
                (입금날짜) (입금 시간)에 고소인으로부터 (입금 금액(원))을
                피고소인의 계좌로 이체받았습니다.
              </p>
            </div>
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
            <div className={style["title"]}>[별첨] - 증거자료</div>
            <div>
              <p>1. 위 사건 판매 게시글 캡쳐본 등</p>
              <p>2. 위 사건 대화내용이 기록된 스크린샷 등</p>
              <p>3. 위 사건 계좌로 입금된 이체확인증</p>
              <p>4. 피고소인과 통화 녹음</p>
              <p>5. (증거자료)</p>
            </div>
            <div className={style["footer"]}>@@경찰서 @@팀 귀중</div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FraudA4;
