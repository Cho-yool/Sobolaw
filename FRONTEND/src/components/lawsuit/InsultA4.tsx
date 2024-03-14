import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import type { DatePickerProps } from "antd";
import { Button, Input, InputNumber, DatePicker, Cascader } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import { postInsult } from "../../api/lawsuit";
import { InsultForm } from "../../types/DataTypes";
import { options, initialInsultContent } from "../../types/LawsuitTypes";
import style from "../../styles/papers/A4.module.css";

export default function InsultA4() {
  const [insultContent, setInsultContent] =
    useState<InsultForm>(initialInsultContent);

  // 데이터 입력용
  // 소장 임시저장명
  const [title, setTitle] = useState("");
  // 피해자
  const [plaintiffName, setPlaintiffName] = useState("");
  const [plaintiffRRNumber, setPlaintiffRRNumber] = useState("");
  const [plaintiffAddress, setPlaintiffAddress] = useState("");
  const [plaintiffPhoneNumber, setPlaintiffPhoneNumber] = useState("");
  const [plaintiffNickname, setPlaintiffNickname] = useState("");
  // 가해자
  const [defendantName, setDefendantName] = useState("");
  const [defendantNickname, setDefendantNickname] = useState("");
  const [defendantAddress, setDefendantAddress] = useState("");
  const [defendantPhoneNumber, setDefendantPhoneNumber] = useState("");
  // 사건정보
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    nano: 0,
  });
  const [onlineServiceType, setOnlineServiceType] = useState("");
  const [webServiceDetails, setWebServiceDetails] = useState("");
  const [problemSpeech, setProblemSpeech] = useState("");
  const [reasonsForInsult, setReasonsForInsult] = useState("");
  const [relatedPeopleCount, setRelatedPeopleCount] = useState("");
  // 사건경위
  const [witness1, setWitness1] = useState("");
  const [witness2, setWitness2] = useState("");
  const [witness3, setWitness3] = useState("");
  const [insultDuration, setInsultDuration] = useState("");
  const [insultFrequency, setInsultFrequency] = useState("");
  // 나를 특정할만한 상황
  const [circumstance, setCircumstance] = useState("");
  // 제출서류
  const [evidence, setEvidence] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [policeStationTeam, setPoliceStationTeam] = useState("");
  // 여기까지

  // 서류에 들어갈 문장
  const [paperIDate, setPaperIDate] = useState("");
  const [paperITime, setPaperITime] = useState("");

  // input 효과들
  const [showWebDetailInput, setShowWebDetailInput] = useState(false);

  const defaultValue = dayjs("2024-01-01");

  // handle 함수들
  const onChangeDate: DatePickerProps["onChange"] = (_, dateStr) => {
    // dateStr이 string 타입인지 확인합니다.
    if (typeof dateStr === "string") {
      // dateStr을 공백을 기준으로 분리하여 날짜 부분과 시간 부분을 구합니다.
      const [datePart, timePart] = dateStr.split(" ");

      // incidentDate 상태 변수에 날짜 부분을 할당합니다.
      setIncidentDate(datePart);

      // 시간 부분을 콜론을 기준으로 분리하여 각 시간 요소를 구합니다.
      const [hourStr, minuteStr, secondStr] = timePart.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const second = parseInt(secondStr, 10);

      // incidentTime 상태 변수에 시간 요소를 할당합니다.
      setIncidentTime({ hour, minute, second, nano: 0 });

      // 고소장에 파싱될 용도의 날짜/시간도 할당합니다
      // 용도에 맞게 날짜 형식을 변경합니다.
      const modifiedDatePart = datePart.replace(/-/g, ".");

      // 용도에 맞게 시간 형식을 변경합니다.
      const modifiedTimePart = `${hourStr}시 ${minuteStr}분 경`;

      // 변경된 날짜와 시간을 상태 변수에 할당합니다.
      setPaperIDate(modifiedDatePart);
      setPaperITime(modifiedTimePart);
    }
  };

  const onChangeOnline = (value: (string | number)[]) => {
    const majorCate = value[0] as string;
    const middleCate = value[1] as string;
    if (middleCate === undefined) {
      setOnlineServiceType(majorCate);
      setShowWebDetailInput(true);
    } else {
      setOnlineServiceType(majorCate + " " + middleCate);
    }
  };

  // 저장 제출 함수
  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    // TODO: 소장작성 비동기 통신
    // 모든 조건이 True일 때 제출 가능 (필수입력 공백확인)
    if (title === "") {
      alert("소장 저장명을 확인해주세요!");
    } else {
      setInsultContent({
        title: title,
        plaintiffName: plaintiffName,
        plaintiffResidentRegistrationNumber: plaintiffRRNumber,
        plaintiffAddress: plaintiffAddress,
        plaintiffPhoneNumber: plaintiffPhoneNumber,
        plaintiffNickname: plaintiffNickname,
        defendantName: defendantName,
        defendantNickname: defendantNickname,
        defendantAddress: defendantAddress,
        defendantPhoneNumber: defendantPhoneNumber,
        incidentDate: incidentDate,
        incidentTime: incidentTime,
        onlineServiceType: onlineServiceType,
        webServiceDetails: webServiceDetails,
        problemSpeech: problemSpeech,
        reasonsForInsult: reasonsForInsult,
        relatedPeopleCount: relatedPeopleCount,
        witness1: witness1,
        witness2: witness2,
        witness3: witness3,
        insultDuration: insultDuration,
        insultFrequency: insultFrequency,
        circumstancesForIdentification: circumstance,
        evidence: evidence,
        submissionDate: submissionDate,
        policeStationTeam: policeStationTeam,
      });
      // const response = await postInsult(1, insultContent);
      await postInsult(1, insultContent);
      // if (response === 1) {
      alert("소장 저장이 완료되었습니다");
      //     navigate('')
      // } else if (response === 33) {
      //     alert("소장 저장 실패")
      // }
    }
  }

  return (
    <div className={style["container"]}>
      <div className={style["button-box"]}>
        <Button
          className={style["button"]}
          type="primary"
          onClick={() => onSubmit}
        >
          저장하기
        </Button>
      </div>

      <div
        style={{
          width: "20rem",
          padding: "1rem",
          backgroundColor: "lightgreen",
        }}
      >
        <p>소장 저장명</p>
        <Input placeholder="title" value={title} />
        <p>사건경위</p>
        <p>발생일자</p>
        <DatePicker
          defaultValue={defaultValue}
          showTime
          locale={locale}
          onChange={onChangeDate}
        />
        <p>웹서비스 주소</p>
        <Cascader
          options={options}
          onChange={onChangeOnline}
          placeholder="사건이 발생한 웹서비스 유형"
        />
        {showWebDetailInput == true && (
          <>
            <p>상세 URL 혹은 채팅방 이름</p>
            <Input
              placeholder="웹서비스의 이름이나 주소 등"
              value={webServiceDetails}
              onChange={(e) => setWebServiceDetails(e.target.value)}
            />
          </>
        )}
        <p>공연성</p>
        <Input
          placeholder="이용자 수"
          value={relatedPeopleCount}
          onChange={(e) => setRelatedPeopleCount(e.target.value)}
        />{" "}
        몇명인지 모르면 다수처리
        <InputNumber
          addonBefore={
            <Cascader placeholder="cascader" style={{ width: 150 }} />
          }
          defaultValue={100}
        />
        <p>목격자여부</p>
      </div>

      {/* 아래는 A4 용지 */}
      <div className={style["pages"]}>
        <div className={style["title"]}>모욕죄 고소장</div>
        <div>
          <p>원고(고소인) 성명 : {plaintiffName}</p>
          <p>주민등록번호 : {plaintiffRRNumber}</p>
          <p>ID(닉네임) : {plaintiffNickname}</p>
          <p>주소 : {plaintiffAddress}</p>
          <p>전화번호 : {plaintiffPhoneNumber}</p>
        </div>
        <div>
          {defendantName !== "" && <p>피고(피고소인) 이름 : {defendantName}</p>}
          {defendantNickname !== "" && <p>ID(닉네임) : {defendantNickname}</p>}
          {defendantAddress !== "" && <p>주소 : {defendantAddress}</p>}
          {defendantPhoneNumber !== "" && (
            <p>전화번호 : {defendantPhoneNumber}</p>
          )}
        </div>
        <div className={style["title"]}>고소취지</div>
        <div>
          위 사건에 관하여 본 고소인은 아래와 같은 이유로 피고소인을 형법
          제311조의 모욕죄로 고소하오니, 수사하여 엄히 처벌하여 주시기 바랍니다.
        </div>{" "}
        <div className={style["title"]}>범죄 사실</div>
        <div>
          <p>
            1. 고소인과 피고소인은 사건이 발생한 {paperIDate} {paperITime}
            {onlineServiceType} {webServiceDetails}의 이용자들 입니다.
          </p>
          <p>
            2. 당시 피고소인은 (관련 인원수 or 다수)명의 이용자들이 접속하고
            있던 위 (온라인서비스 유형) 에서 고소인에게 (모욕한 이유)는 이유로
            “(문제 발언)” 라고 하며 고소인을 공연히 모욕하였습니다.
          </p>
          <p>
            3. 3. 이에 고소인은 피고소인의 위와 같은 모욕 행위가 형법 제311조에
            정한 모욕죄의 구성요건(공연성, 모욕성, 특정성)을 모두 갖추고 있고
            이로 인해 고소인은 막대한 피해를 입었는바, 그 구체적인 이유는 아래와
            같습니다.
          </p>
        </div>
      </div>
      <div className={style["pages"]}>
        <div className={style["title"]}>고소이유</div>
        <p>1. 공연성에 관하여</p>
        <div>
          가. 모욕죄의 구성요건인 공연성에 대한 대법원 판례 역시 "공연성은
          불특정 다수 또는 다수인이 인식할 수 있는 상태를 의미하므로 비록
          개별적으로 한 사람에게 사실을 유포하였다 하더라도 그로부터 불특정 또는
          다수인에게 전파될 가능성이 있다면 공연성의 요건을 충족한다."는 입장을
          취하고 있습니다(대법원 1985. 4. 23. 선고 85도431판결, 대법원 1990. 7.
          24. 선고 90도1167판결 등 참조). 나. 본 사건이 발생한 (시간) 당시 해당
          고소인과 피고소인을 제외하고도 다수의 이용자가 있었으며, 피고소인은의
          이용자 (목격자1) (목격자2) 및 (목격자3) 가 지켜보는 가운데 "(문제
          발언)"라는 언행으로써 공연히 고소인에 대한 모욕을 일삼았고, 당시 위
          이용자들은 고소인과 같은 서비스를 이용하는 자에 불과할 뿐 고소인에
          대한 소문을 비밀로 지켜줄만한 특별한 신분관계는 없었던 만큼,
          피고소인의 모욕행위는 명백히 불특정 다수에게 전파될 가능성을 내포하고
          있다할 것이므로 공연성 요건 역시 충족하고 있습니다.
        </div>
        <p>2. 모욕성에 관하여</p>
        <div>
          가. 대법원은 "형법 제311조의 모욕죄는 사람의 가치에 대한 사회적 평가를
          의미하는 외부적 명예를 보호법익으로 하는 범죄로서 모욕죄에서 말하는
          모욕이란, 사실을 적시하지 아니하고 사람의 사회적 평가를 저하시킬
          추상적인 판단이나 경멸적 감정을 표현하는 것을 의미한다."고 판시하고
          있습니다(대법원 2003. 11. 28 선고 2003도397 판결 참조). 나. 본
          사건에서 피고소인의 "(문제 발언)"라는 언행은 표현이 다소 무례한
          방법으로 표시된 것을 넘어 고소인의 사회적 평가를 저하시킬 만한
          경멸적인 감정을 표현하였으며, 감정이 격해져 우발적 · 일회적으로 행한
          행동이 아니라 고의로 고소인을 비방하기 위하여 (모욕 지속 시간)에 걸쳐
          (모욕 횟수)회 이상 지속적으로 고소인에게 모욕적인 발언을 일삼은 바
          이는 모욕죄의 구성요건인 모욕성을 충족하고 있습니다.
        </div>
        <p>3. 특정성에 대하여</p>
        <div>
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
        <div>
          나. 이에 비추어 피고소인의 행위가 모욕죄의 구성요건인 특정성을
          충족하는지 여부를 판단하여보면, 사건 당시 고소인의 인적사항이
          신상정보를 포함한 닉네임, 증명사진이 있는 온라인 프로필, 얼굴이 공개된
          방송 및 고소인의 정보가 포함된 내용(나를 특정할 만한 상황)을 통해
          공개되어 당시 사건을 목격한 다른 이용자들이 고소인의 닉네임(ID)을
          통하여 고소인을 현실에서 특정하여 인식할 수 있는 충분한 가능성이
          있었던 상태였음이 인정된다할 것이므로, 피고소인의 모욕행위는 특정성
          또한 충족하고 있습니다..
        </div>

        <p>4. 고소인의 피해내용</p>
        <div>
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
          <p>1. 위 사건 대화내용이 기록된 스크린샷</p>
          <p>2. 위 사건 대화내용이 기록된 녹음파일</p>
          <p>3. 위 사건을 캡쳐하여 저장한 pdf파일</p>
          <p>4. 목격자의 진술서</p>
          <p>5. 자필 사과문, 카카오톡 대화내역 등</p>
        </div>
        <div className={style["title"]}>증거 자료</div>
        <div>
          <p>위 첨부서류 - 각 1부</p>
        </div>
        <div className={style["date"]}>2024년 03월 04일</div>
        <div className={style["signature"]}>위 고소인</div>
        <div className={style["signature"]}>(원고 이름)(서명 또는 인)</div>
        <div className={style["title"]}>@@경찰서 @@팀 귀중</div>
      </div>
    </div>
  );
}
