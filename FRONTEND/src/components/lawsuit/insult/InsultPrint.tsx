import { useState, useEffect } from "react";
import { josa } from "josa";
import style from "../../../styles/papers/Print.module.css";
import { InsultForm } from "../../../types/DataTypes";

export default function InsultPrint({
  insultData,
}: {
  insultData: InsultForm;
}) {
  const plaintiffRRNumber = insultData.plaintiffResidentRegistrationNumber;
  const circumstance = insultData.circumstancesForIdentification;
  const paperIDate = insultData.incidentDate.replace(/-/g, ".");
  const paperRPCount = `${insultData.relatedPeopleCount}명`;
  const paperEvidence = insultData.evidence.split(", ");
  const [paperITime, setPaperITime] = useState("");
  const [paperWitness, setPaperWitness] = useState("의 ");

  useEffect(() => {
    const { incidentTime, witness1, witness2, witness3 } = insultData;
    const [hourStr, minuteStr] = incidentTime.split(":");

    if (minuteStr === "00") {
      const modifiedTimePart = `${hourStr}시 경`;
      setPaperITime(modifiedTimePart);
    } else {
      const modifiedTimePart = `${hourStr}시 ${minuteStr}분 경`;
      setPaperITime(modifiedTimePart);
    }

    if (witness1 === "" && witness2 === "" && witness3 === "") {
      setPaperWitness("의 ");
    } else if (witness2 === "" && witness3 === "") {
      const sentence = josa(`은 이용자 ${witness1}#{이} 지켜보는 가운데`);
      setPaperWitness(sentence);
    } else if (witness3 === "") {
      const sentence = josa(
        `은 이용자 ${witness1}, ${witness2}#{이} 지켜보는 가운데`
      );
      setPaperWitness(sentence);
    } else {
      const sentence = josa(
        `은 이용자 ${witness1}, ${witness2} 및 ${witness3}#{이} 지켜보는 가운데`
      );
      setPaperWitness(sentence);
    }
  }, [insultData]);

  return (
    <>
      <div className={style["pages"]}>
        <div className={style["title"]}>모욕죄 고소장</div>
        <div>
          <p>
            원고(고소인) 성명 : <strong>{insultData.plaintiffName}</strong>
          </p>
          <p>
            주민등록번호 : <strong>{plaintiffRRNumber}</strong>
          </p>
          <p>
            ID(닉네임) : <strong>{insultData.plaintiffNickname}</strong>
          </p>
          <p>
            주소 : <strong>{insultData.plaintiffAddress}</strong>
          </p>
          <p>
            전화번호 : <strong>{insultData.plaintiffPhoneNumber}</strong>
          </p>
        </div>
        <br />
        <div>
          {insultData.defendantName !== "" && (
            <p>
              피고(피고소인) 이름 : <strong>{insultData.defendantName}</strong>
            </p>
          )}
          {insultData.defendantNickname !== "" && (
            <p>
              ID(닉네임) : <strong>{insultData.defendantNickname}</strong>
            </p>
          )}
          {insultData.defendantAddress !== "" && (
            <p>
              주소 : <strong>{insultData.defendantAddress}</strong>
            </p>
          )}
          {insultData.defendantPhoneNumber !== "" && (
            <p>
              전화번호 : <strong>{insultData.defendantPhoneNumber}</strong>
            </p>
          )}
        </div>
        <div className={style["title"]}>고소취지</div>
        <div>
          위 사건에 관하여 본 고소인은 아래와 같은 이유로 피고소인을 형법
          제311조의 모욕죄로 고소하오니, 수사하여 엄히 처벌하여 주시기 바랍니다.
        </div>{" "}
        <div className={style["title"]}>범죄 사실</div>
        <div className={style["numbers"]}>
          <ol>
            <li>
              1. 고소인과 피고소인은 사건이 발생한{" "}
              <strong>
                {paperIDate} {paperITime} {insultData.onlineServiceType}{" "}
                {insultData.webServiceDetails}
              </strong>
              의 이용자들 입니다.
            </li>
            <li>
              2. 당시 피고소인은 <strong>{paperRPCount}</strong>의 이용자들이
              접속하고 있던 위 <strong>{insultData.onlineServiceType}</strong>
              에서 고소인에게 <strong>{insultData.reasonsForInsult}</strong>는
              이유로 “<strong>{insultData.problemSpeech}</strong>” 라고 하며
              고소인을 공연히 모욕하였습니다.
            </li>
            <li>
              3. 이에 고소인은 피고소인의 위와 같은 모욕 행위가 형법 제311조에
              정한 모욕죄의 구성요건
              <strong>
                ({insultData.relatedPeopleCount !== "" && "공연성"},{" "}
                {insultData.problemSpeech !== "" || insultData.witness1 !== ""
                  ? "모욕성"
                  : ""}
                ,{circumstance !== "" && "특정성"})
              </strong>
              을 모두 갖추고 있고 이로 인해 고소인은 막대한 피해를 입었는바, 그
              구체적인 이유는 아래와 같습니다.
            </li>
          </ol>
        </div>
      </div>
      <div className={style["pages"]}>
        <div className={style["title"]}>고소이유</div>
        <p className={style["menu-title"]}>1. 공연성에 관하여</p>
        <div className={style["page-content"]}>
          <p>
            가. 모욕죄의 구성요건인 공연성에 대한 대법원 판례 역시 "공연성은
            불특정 다수 또는 다수인이 인식할 수 있는 상태를 의미하므로 비록
            개별적으로 한 사람에게 사실을 유포하였다 하더라도 그로부터 불특정
            또는 다수인에게 전파될 가능성이 있다면 공연성의 요건을 충족한다."는
            입장을 취하고 있습니다(대법원 1985. 4. 23. 선고 85도431판결, 대법원
            1990. 7. 24. 선고 90도1167판결 등 참조).
          </p>
          <p>
            나. 본 사건이 발생한 <strong>{paperITime}</strong> 당시 해당
            고소인과 피고소인을 제외하고도 다수의 이용자가 있었으며, 피고소인
            <strong>
              {paperWitness}"{insultData.problemSpeech}"
            </strong>
            라는 언행으로써 공연히 고소인에 대한 모욕을 일삼았고, 당시 위
            이용자들은 고소인과 같은 서비스를 이용하는 자에 불과할 뿐 고소인에
            대한 소문을 비밀로 지켜줄만한 특별한 신분관계는 없었던 만큼,
            피고소인의 모욕행위는 명백히 불특정 다수에게 전파될 가능성을
            내포하고 있다할 것이므로 공연성 요건 역시 충족하고 있습니다.
          </p>
        </div>
        <p className={style["menu-title"]}>2. 모욕성에 관하여</p>
        <div className={style["page-content"]}>
          <p>
            가. 대법원은 "형법 제311조의 모욕죄는 사람의 가치에 대한 사회적
            평가를 의미하는 외부적 명예를 보호법익으로 하는 범죄로서 모욕죄에서
            말하는 모욕이란, 사실을 적시하지 아니하고 사람의 사회적 평가를
            저하시킬 추상적인 판단이나 경멸적 감정을 표현하는 것을 의미한다."고
            판시하고 있습니다(대법원 2003. 11. 28 선고 2003도397 판결 참조).
          </p>{" "}
          <p>
            나. 본 사건에서 피고소인의{" "}
            <strong>"{insultData.problemSpeech}"</strong>
            라는 언행은 표현이 다소 무례한 방법으로 표시된 것을 넘어 고소인의
            사회적 평가를 저하시킬 만한 경멸적인 감정을 표현하였으며, 감정이
            격해져 우발적 · 일회적으로 행한 행동이 아니라 고의로 고소인을
            비방하기 위하여 <strong>{insultData.insultDuration}</strong>에 걸쳐{" "}
            <strong>{insultData.insultFrequency}회</strong> 이상 지속적으로
            고소인에게 모욕적인 발언을 일삼은 바, 이는 모욕죄의 구성요건인
            모욕성을 충족하고 있습니다.
          </p>
        </div>
        <p className={style["menu-title"]}>3. 특정성에 대하여</p>
        <div className={style["page-content"]}>
          가. "명예훼손죄와 모욕죄의 보호법익은 사람의 가치에 대한 사회적 평가인
          이른바 외부적 명예인 점에서는 차이가 없고, 명예의 주체인 사람은 특정한
          자임을 요하지만 반드시 사람의 성명을 명시하여 허위의 사실을
          적시하여야만 하는 것은 아니므로 사람의 성명을 명시한 바 없는
          허위사실의 적시행위도 그 표현의 내용을 주위사정과 종합 판단하여 그것이
          어느 특정인을 지목하는 것인가를 알아차릴 수 있는 경우에는 그 특정인에
          대한 명예훼손죄를 구성한다."는 것이 대법원의 일관된 입장입니다(대법원
          2002. 5. 10. 선고 2000다50213판결 참조).
        </div>
      </div>
      <div className={style["pages"]}>
        <div className={style["page-content"]}>
          나. 이에 비추어 피고소인의 행위가 모욕죄의 구성요건인 특정성을
          충족하는지 여부를 판단하여보면, <strong>{circumstance}</strong> 통해
          공개되어 당시 사건을 목격한 다른 이용자들이 고소인의 닉네임(ID)을
          통하여 고소인을 현실에서 특정하여 인식할 수 있는 충분한 가능성이
          있었던 상태였음이 인정된다할 것이므로, 피고소인의 모욕행위는 특정성
          또한 충족하고 있습니다..
        </div>

        <p>4. 고소인의 피해내용</p>
        <div className={style["page-content"]}>
          가. 고소인은 피고소인에게 모욕행위를 중단해달라고 수차례 제지하였으나,
          피고소인은 아랑곳하지 않고 모욕적인 언동을 그치지 않았습니다. 이로
          인해 고소인은 심한 모욕감과 수치심을 느꼈고, 당시 상황이 수시로 떠올라
          심각한 정신적 스트레스 및 육체적 고통을 겪고 있는 상황입니다. 이와
          같이 피고소인은 모욕적인 언동으로 형법 제311조를 위반하여 1년 이하의
          징역이나 금고 또는 200만원 이하의 벌금에 처할 수 있는 엄한 죄를
          저질렀으므로 재발방지를 위해 피고소인을 엄히 처벌해 주시길 바랍니다.
        </div>

        <div className={style["title"]}>결론</div>
        <div>
          피고소인의 모욕행위는 형법 제311조에 정한 모욕죄의 구성요건을 모두
          구비하고 있어 형법상 모욕죄를 범하였고, 이로 인해 고소인은 정상적인
          생활이 어려울 정도로 막대한 피해를 입고 있으므로 피고소인을 철저하게
          수사하여 엄벌해 주시기 바랍니다.
        </div>
        <div className={style["title"]}>첨부서류</div>
        <div>
          <strong>
            {paperEvidence.map((item, index) => {
              return (
                <p>
                  {index + 1}. {item}
                </p>
              );
            })}
          </strong>
        </div>
        <div className={style["title"]}>증거 자료</div>
        <div>
          <p>위 첨부서류 - 각 1부</p>
        </div>
        <div className={style["date"]}>
          <strong>{insultData.submissionDate}</strong>
        </div>

        <div className={style["signature"]}>위 고소인</div>
        <div className={style["signature"]}>
          <strong>{insultData.plaintiffName}</strong> (서명 또는 인)
        </div>

        <div className={style["date"]}>{insultData.policeStationTeam} 귀중</div>
      </div>
    </>
  );
}
