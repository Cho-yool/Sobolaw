import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
import { Flex, Input, DatePicker, Tooltip, Radio } from "antd";
import type { DatePickerProps } from "antd";
import style from "../../styles/papers/FraudMenu.module.css";
import CheckBox from "../common/CheckBox";
import { useEffect } from "react";
import { FraudDetails } from "../../types/DataTypes";

const FraudMenu = ({ fraudDetails }: { fraudDetails: FraudDetails }) => {
  const defaultValue = dayjs("2024-01-01");
  const respondentCheck = ["주소를 알고있습니다.", "전화번호를 알고있습니다."];
  const contactMethod = [
    "전화통화",
    "문자메세지",
    "SNS 메신저",
    "사이트 내부 메신저",
  ];
  const addEvidenve = [
    "위 사건 판매 게시글 캡쳐본 등",
    "위 사건 대화내용이 기록된 스크린샷 등",
    "위 사건 계좌로 입금된 이체확인증",
    "기타(피고소인을 특정할 수 있는 증거나 사항) 및 직접입력",
  ];
  // 공통적인 중복 체크
  const isPlaintffCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      fraudDetails.setIsplaintiff(true);
    } else {
      fraudDetails.setIsplaintiff(false);
    }
  };

  // 고소인 성명 변경 부분
  const plaintiffHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    isPlaintffCheck(e);
    fraudDetails.setPlaintiffName(e.target.value);
  };

  const identityNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    isPlaintffCheck(e);
    fraudDetails.setPlaintiffResidentRegistrationNumber(e.target.value);
  };

  const defendantHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "주소를 알고있습니다.") {
      if (e.target.checked) {
        fraudDetails.setIsDefendantAddress(true);
      } else {
        fraudDetails.setIsDefendantAddress(false);
      }
    } else {
      if (e.target.checked) {
        fraudDetails.setIsDefendantPhoneNumber(true);
      } else {
        fraudDetails.setIsDefendantPhoneNumber(false);
      }
    }
  };

  const contactMethodHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      fraudDetails.setContact((preList) => [...preList, e.target.name]);
    } else {
      fraudDetails.setContact((preList) =>
        preList.filter((list) => list !== e.target.name)
      );
    }
  };

  const evidenceEtcHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (
        e.target.name ===
        "기타(피고소인을 특정할 수 있는 증거나 사항) 및 직접입력"
      ) {
        fraudDetails.setEvidenceEtc(true);
      }
      fraudDetails.setEvidenceList((preList) => [...preList, e.target.name]);
    } else {
      if (
        e.target.name ===
        "기타(피고소인을 특정할 수 있는 증거나 사항) 및 직접입력"
      ) {
        fraudDetails.setEvidenceEtc(false);
      }
      fraudDetails.setEvidenceList((preList) =>
        preList.filter((list) => list !== e.target.name)
      );
    }
  };
  const onChangeDate: DatePickerProps["onChange"] = (_, dateStr) => {
    // dateStr이 string 타입인지 확인합니다.
    if (typeof dateStr === "string" && dateStr.trim() !== "") {
      // dateStr을 공백을 기준으로 분리하여 날짜 부분과 시간 부분을 구합니다.
      const [datePart, timePart] = dateStr.split(" ");
      // incidentDate 상태 변수에 날짜 부분을 할당합니다.
      fraudDetails.setIncidentDate(datePart);
      // 시간 부분을 콜론을 기준으로 분리하여 각 시간 요소를 구합니다.
      const [hourStr, minuteStr, secondStr] = timePart.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const second = parseInt(secondStr, 10);
      // incidentTime 상태 변수에 시간 요소를 할당합니다.
      fraudDetails.setIncidentTime({ hour, minute, second, nano: 0 });
      // 고소장에 파싱될 용도의 날짜/시간도 할당합니다
      // 용도에 맞게 날짜 형식을 변경합니다.
      const modifiedDatePart = datePart.replace(/-/g, ".");
      // 용도에 맞게 시간 형식을 변경합니다.
      if (minuteStr == "00") {
        const modifiedTimePart = `${hourStr}시 경`;
        fraudDetails.setPaperITime(modifiedTimePart);
      } else {
        const modifiedTimePart = `${hourStr}시 ${minuteStr}분 경`;
        fraudDetails.setPaperITime(modifiedTimePart);
      }
      // 변경된 날짜와 시간을 상태 변수에 할당합니다.
      fraudDetails.setPaperIDate(modifiedDatePart);
    }
  };

  const onChangeMoneyDate: DatePickerProps["onChange"] = (_, dateStr) => {
    // dateStr이 string 타입인지 확인합니다.
    if (typeof dateStr === "string" && dateStr.trim() !== "") {
      // dateStr을 공백을 기준으로 분리하여 날짜 부분과 시간 부분을 구합니다.
      const [datePart, timePart] = dateStr.split(" ");
      // incidentDate 상태 변수에 날짜 부분을 할당합니다.
      fraudDetails.setIncidentDate(datePart);
      // 시간 부분을 콜론을 기준으로 분리하여 각 시간 요소를 구합니다.
      const [hourStr, minuteStr, secondStr] = timePart.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const second = parseInt(secondStr, 10);
      // incidentTime 상태 변수에 시간 요소를 할당합니다.
      fraudDetails.setIncidentTime({ hour, minute, second, nano: 0 });
      // 고소장에 파싱될 용도의 날짜/시간도 할당합니다
      // 용도에 맞게 날짜 형식을 변경합니다.
      const modifiedDatePart = datePart.replace(/-/g, ".");
      // 용도에 맞게 시간 형식을 변경합니다.
      if (minuteStr == "00") {
        const modifiedTimePart = `${hourStr}시 경`;
        fraudDetails.setMoneyTime(modifiedTimePart);
      } else {
        const modifiedTimePart = `${hourStr}시 ${minuteStr}분 경`;
        fraudDetails.setMoneyTime(modifiedTimePart);
      }
      // 변경된 날짜와 시간을 상태 변수에 할당합니다.
      fraudDetails.setMoneyDate(modifiedDatePart);
    }
  };
  useEffect(() => {
    console.log(fraudDetails);
  }, [fraudDetails]);
  return (
    <Flex vertical align="center">
      {/* 당사자 */}
      <Flex className={style["fraud-menu__first"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>당사자</p>
        <Flex className={style["fraud-menu-box"]} vertical gap={15}>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>고소인(본인)</p>
            <Input
              placeholder="성명"
              size="middle"
              type="text"
              value={fraudDetails.plaintiffName}
              onChange={plaintiffHandler}
            />
          </Flex>
          <Flex className={style["fraud-menu-input"]} gap={20}>
            <Flex vertical>
              <p className={style["fraud-menu-input__title"]}>성명</p>
              <Input
                placeholder="성명"
                size="middle"
                type="text"
                value={fraudDetails.plaintiffName}
                onChange={plaintiffHandler}
              />
            </Flex>
            <Flex vertical>
              <p className={style["fraud-menu-input__title"]}>주민등록번호</p>
              <Input
                placeholder="960617-1"
                size="middle"
                type="text"
                value={fraudDetails.plaintiffResidentRegistrationNumber}
                onChange={identityNumberHandler}
              />
            </Flex>
          </Flex>
          <Flex vertical gap={10}>
            <p className={style["fraud-menu-input__title"]}>주소</p>
            <Input
              placeholder="클릭하여 주소를 검색하세요."
              size="middle"
              type="text"
              value={fraudDetails.plaintiffMainAddress}
              onChange={(e) =>
                fraudDetails.setPlaintiffMainAddress(e.target.value)
              }
            />
            <Input
              placeholder="나머지 주소를 입력하세요."
              size="middle"
              type="text"
              value={fraudDetails.plaintiffSubAddress}
              onChange={(e) =>
                fraudDetails.setPlaintiffSubAddress(e.target.value)
              }
            />
          </Flex>
          <Flex vertical>
            <p className={style["fraud-menu-input__title"]}>전화번호</p>
            <Input
              placeholder="01011112222"
              size="middle"
              type="text"
              value={fraudDetails.plaintiffPhoneNumber}
              onChange={(e) =>
                fraudDetails.setPlaintiffPhoneNumber(e.target.value)
              }
            />
          </Flex>
        </Flex>
      </Flex>
      {/* 가해자 */}
      <Flex className={style["fraud-menu__second"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>가해자</p>
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>피고소인(상대방)</p>
            <Input
              placeholder="성명"
              size="middle"
              type="text"
              onChange={(e) => fraudDetails.setDefendantName(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} vertical gap={15}>
          <CheckBox onChange={defendantHandler} boxList={respondentCheck} />
          {fraudDetails.isDefendantAddress ? (
            <Flex vertical gap={10}>
              <p className={style["fraud-menu-input__title"]}>주소</p>
              <Input
                placeholder="클릭하여 주소를 검색하세요."
                size="middle"
                type="text"
                value={fraudDetails.defendantMainAddress}
                onChange={(e) =>
                  fraudDetails.setDefendantMainAddress(e.target.value)
                }
              />
              <Input
                placeholder="나머지 주소를 입력하세요."
                size="middle"
                type="text"
                value={fraudDetails.defendantSubAddress}
                onChange={(e) =>
                  fraudDetails.setDefendantSubAddress(e.target.value)
                }
              />
            </Flex>
          ) : null}
          {fraudDetails.isDefendantPhoneNumber ? (
            <Flex vertical>
              <p className={style["fraud-menu-input__title"]}>전화번호</p>
              <Input
                placeholder="01011112222"
                value={fraudDetails.defendantPhoneNumber}
                onChange={(e) =>
                  fraudDetails.setDefendantPhoneNumber(e.target.value)
                }
                size="middle"
                type="text"
              />
            </Flex>
          ) : null}
        </Flex>
      </Flex>
      {/* 기망행위 */}
      <Flex className={style["fraud-menu__second"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>기망행위</p>
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>거래한 물건</p>
            <Input
              placeholder="물건명"
              size="middle"
              type="text"
              value={fraudDetails.tradedItem}
              onChange={(e) => fraudDetails.setTradedItem(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} gap={15}>
          <Flex vertical style={{ width: "100%" }}>
            <Tooltip
              // placement="bottom"
              placement="top"
              title={
                "날짜는 필수! 시간대는 모르면 대략적인 '시'만 체크해주세요"
              }
              arrow={true}
            >
              <p className={style["fraud-menu-input__title"]}>연락 일자</p>
              <DatePicker
                defaultValue={defaultValue}
                locale={locale}
                size="middle"
                showTime
                onChange={onChangeDate}
                style={{ width: "100%" }}
              />
            </Tooltip>
          </Flex>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} gap={15}>
          <Radio.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            onChange={(e) => fraudDetails.setTradeSite(e.target.value)}
          >
            <p className={style["fraud-menu-input__title"]}>사이트명</p>
            <Radio value="당근마켓">당근마켓</Radio>
            <Radio value="중고나라">중고나라</Radio>
            <Radio value="번개장터">번개장터</Radio>
            <Radio value="직접입력">직접입력</Radio>
            {fraudDetails.tradeSite === "직접입력" ? (
              <Input
                size="middle"
                placeholder="OO마켓"
                value={fraudDetails.directSite}
                onChange={(e) => fraudDetails.setDirectSite(e.target.value)}
              />
            ) : null}
          </Radio.Group>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} vertical>
          <p className={style["fraud-menu-input__title"]}>연락 방법</p>
          <CheckBox onChange={contactMethodHandler} boxList={contactMethod} />
        </Flex>
      </Flex>
      {/* 처분행위 */}
      <Flex className={style["fraud-menu__second"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>처분행위</p>
        <Flex className={style["fraud-menu-checkbox"]} vertical>
          <p className={style["fraud-menu-input__title"]}>처분 방법</p>
          <Radio.Group
            style={{
              display: "flex",
              gap: "10px",
            }}
            size="middle"
            onChange={(e) => fraudDetails.setDisposalMethod(e.target.value)}
          >
            <Radio value={1}>현금 직거래</Radio>
            <Radio value={2}>계좌이체</Radio>
          </Radio.Group>
        </Flex>
        {fraudDetails.disposalMethod === 2 ? (
          <Flex className={style["fraud-menu-box"]} vertical>
            <p className={style["fraud-menu-input__title"]}>계좌번호</p>
            <Flex vertical gap={10}>
              <Input
                placeholder="은행명"
                size="middle"
                type="text"
                value={fraudDetails.bankName}
                onChange={(e) => fraudDetails.setBankName(e.target.value)}
              />
              <Input
                placeholder="계좌번호"
                size="middle"
                type="text"
                value={fraudDetails.accountNumber}
                onChange={(e) => fraudDetails.setAccountNumber(e.target.value)}
              />
            </Flex>
          </Flex>
        ) : null}
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>
              교부한 금액(피해액)
            </p>
            <Flex className={style["fraud-menu-input__money"]} align="center">
              <Input
                placeholder="100,000"
                size="middle"
                type="text"
                value={fraudDetails.damageMoney}
                onChange={(e) => fraudDetails.setDamageMoney(e.target.value)}
              />
              <span>원</span>
            </Flex>
          </Flex>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} gap={15}>
          <Flex vertical style={{ width: "100%" }}>
            <Tooltip
              // placement="bottom"
              placement="top"
              title={
                "날짜는 필수! 시간대는 모르면 대략적인 '시'만 체크해주세요"
              }
              arrow={true}
            >
              <p className={style["fraud-menu-input__title"]}>금전지급 일자</p>
              <DatePicker
                defaultValue={defaultValue}
                locale={locale}
                size="middle"
                showTime
                onChange={onChangeMoneyDate}
                style={{ width: "100%" }}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
      {/* 첨부할 증거 */}
      <Flex className={style["fraud-menu__second"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>첨부할 증거</p>
        <Flex className={style["fraud-menu-checkbox"]} gap={15} vertical>
          <CheckBox boxList={addEvidenve} onChange={evidenceEtcHandler} />
          {fraudDetails.evidenceEtc ? (
            <Input size="middle" placeholder="피고소인의 사과문 or 녹음파일" />
          ) : null}
        </Flex>
      </Flex>
      <Flex className={style["fraud-menu__second"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>관할 경찰서</p>
        <Flex className={style["fraud-menu-checkbox"]} gap={15} vertical>
          <Input
            size="middle"
            placeholder="동래구경찰서 형사팀"
            value={fraudDetails.policeStation}
            onChange={(e) => fraudDetails.setPoliceStation(e.target.value)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FraudMenu;
