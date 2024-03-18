import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
import type { DatePickerProps, CheckboxProps } from "antd";
import { Flex, Input, DatePicker, Tooltip, Radio, Space } from "antd";
import style from "../../styles/papers/FraudMenu.module.css";
import CheckBox from "../common/CheckBox";
import { useEffect, useState } from "react";

const FraudMenu = () => {
  const defaultValue = dayjs("2024-01-01");
  const [checkedList, setCheckList] = useState<string[]>([]);
  const [plaintiff, setPlaintiff] = useState<string>(""); // 고소인
  const [isPlaintiff, setIsplaintiff] = useState<boolean>(false); // 고소인 이름 적었는지
  const [identityNumber, setIdentityNumber] = useState<string>(""); // 고소인 주민등록번호
  const [plaintiffMainAddress, setPlaintiffMainAddress] = useState<string>(""); // 고소인 주소
  const [plaintiffSubAddress, setPlaintiffSubAddress] = useState<string>(""); // 고소인 상세주소
  const [respondent, setRespondent] = useState<string>(""); // 피고소인
  const [isRespondent, setIsRespondent] = useState<boolean>(false); // 피고소인 이름 작성했는지
  const [isRespondentAddress, setIsRespondentAddress] =
    useState<boolean>(false); // 피고인 주소를 아는지
  const [isRespondentPhone, setIsRespondentPhone] = useState<boolean>(false); // 피고인 전화번호를 아는지
  const [respondentMainAddress, setRespondentMainAddress] =
    useState<string>(""); // 피고소인 주소
  const [respondentSubAddress, setRespondentSubAddress] = useState<string>(""); // 피고소인 상세주소
  const [respondentPhone, setRespondentPhone] = useState<string>(""); // 피고소인 전화번호
  const [productName, setProductName] = useState<string>("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    nano: 0,
  });
  const [paperIDate, setPaperIDate] = useState("");
  const [paperITime, setPaperITime] = useState("");
  const [community, setCommunity] = useState<Number>();
  const [contact, setContact] = useState<string[]>([]);

  const respondentCheck = ["주소를 알고있습니다.", "전화번호를 알고있습니다."];
  const contactMethod = [
    "전화통화",
    "문자메세지",
    "SNS 메신저",
    "사이트 내부 메신저",
  ];

  // 공통적인 중복 체크
  const isPlaintffCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      setIsplaintiff(true);
    } else {
      setIsplaintiff(false);
    }
  };

  // 고소인 성명 변경 부분
  const plaintiffHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    isPlaintffCheck(e);
    setPlaintiff(e.target.value);
  };

  const identityNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    isPlaintffCheck(e);
    setIdentityNumber(e.target.value);
  };

  const respondentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "주소를 알고있습니다.") {
      if (e.target.checked) {
        setIsRespondentAddress(true);
      } else {
        setIsRespondentAddress(false);
      }
    } else {
      if (e.target.checked) {
        setIsRespondentPhone(true);
      } else {
        setIsRespondentPhone(false);
      }
    }
  };

  const contactMethodHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setContact((preList) => [...preList, e.target.name]);
    } else {
      setContact((preList) => preList.filter((list) => list !== e.target.name));
    }
  };
  useEffect(() => {
    console.log(contact);
  }, [contact]);
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
      if (minuteStr == "00") {
        const modifiedTimePart = `${hourStr}시 경`;
        setPaperITime(modifiedTimePart);
      } else {
        const modifiedTimePart = `${hourStr}시 ${minuteStr}분 경`;
        setPaperITime(modifiedTimePart);
      }
      // 변경된 날짜와 시간을 상태 변수에 할당합니다.
      setPaperIDate(modifiedDatePart);
    }
  };

  return (
    <Flex className={style["fraud-menu"]} vertical align="center">
      <Flex className={style["fraud-menu__first"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>당사자</p>
        <Flex className={style["fraud-menu-box"]} vertical gap={15}>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>고소인(본인)</p>
            <Input
              placeholder="성명"
              size="large"
              type="text"
              value={plaintiff}
              onChange={plaintiffHandler}
            />
          </Flex>
          <Flex className={style["fraud-menu-input"]} gap={20}>
            <Flex vertical>
              <p className={style["fraud-menu-input__title"]}>성명</p>
              <Input
                placeholder="성명"
                size="large"
                type="text"
                value={plaintiff}
                onChange={plaintiffHandler}
              />
            </Flex>
            <Flex vertical>
              <p className={style["fraud-menu-input__title"]}>주민등록번호</p>
              <Input
                placeholder="960617-1"
                size="large"
                type="text"
                value={identityNumber}
                onChange={identityNumberHandler}
              />
            </Flex>
          </Flex>
          <Flex vertical gap={10}>
            <p className={style["fraud-menu-input__title"]}>주소</p>
            <Input
              placeholder="클릭하여 주소를 검색하세요."
              size="large"
              type="text"
              value={plaintiffMainAddress}
              onChange={(e) => setPlaintiffMainAddress(e.target.value)}
            />
            <Input
              placeholder="나머지 주소를 입력하세요."
              size="large"
              type="text"
              value={plaintiffSubAddress}
              onChange={(e) => setPlaintiffSubAddress(e.target.value)}
            />
          </Flex>
          <Flex vertical>
            <p className={style["fraud-menu-input__title"]}>전화번호</p>
            <Input placeholder="01011112222" size="large" type="text" />
          </Flex>
        </Flex>
      </Flex>
      <Flex className={style["fraud-menu__second"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>가해자</p>
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>피고소인(상대방)</p>
            <Input placeholder="성명" size="large" type="text" />
          </Flex>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} vertical gap={15}>
          <CheckBox onChange={respondentHandler} boxList={respondentCheck} />
          {isRespondentAddress ? (
            <Flex vertical gap={10}>
              <p className={style["fraud-menu-input__title"]}>주소</p>
              <Input
                placeholder="클릭하여 주소를 검색하세요."
                size="large"
                type="text"
                value={respondentMainAddress}
              />
              <Input
                placeholder="나머지 주소를 입력하세요."
                size="large"
                type="text"
                value={respondentSubAddress}
              />
            </Flex>
          ) : null}
          {isRespondentPhone ? (
            <Flex vertical>
              <p className={style["fraud-menu-input__title"]}>전화번호</p>
              <Input
                placeholder="01011112222"
                value={respondentPhone}
                onChange={(e) => setRespondentPhone(e.target.value)}
                size="large"
                type="text"
              />
            </Flex>
          ) : null}
        </Flex>
      </Flex>
      <Flex
        className={style["fraud-menu__second"]}
        vertical
        align="center"
        gap={15}
      >
        <p className={style["fraud-menu__title"]}>기망행위</p>
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>거래한 물건</p>
            <Input
              placeholder="성명"
              size="large"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
                size="large"
              />
            </Tooltip>
          </Flex>
          <Flex vertical style={{ width: "100%" }}>
            <p className={style["fraud-menu-input__title"]}>연락 일시</p>
            <Input
              placeholder="오전 10시 경"
              size="large"
              type="text"
              value={respondentSubAddress}
              onChange={(e) => setRespondentSubAddress(e.target.value)}
            />
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
            onChange={(e) => setCommunity(e.target.value)}
          >
            <p className={style["fraud-menu-input__title"]}>사이트명</p>
            <Radio value={1}>당근마켓</Radio>
            <Radio value={2}>중고나라</Radio>
            <Radio value={3}>번개장터</Radio>
            <Radio value={4}>직접입력</Radio>
            {community === 4 ? (
              <Input size="large" placeholder="OO마켓" />
            ) : null}
          </Radio.Group>
        </Flex>
        <Flex className={style["fraud-menu-checkbox"]} vertical>
          <p className={style["fraud-menu-input__title"]}>연락 방법</p>
          <CheckBox onChange={contactMethodHandler} boxList={contactMethod} />
        </Flex>
      </Flex>
      <Flex
        className={style["fraud-menu__second"]}
        vertical
        align="center"
        gap={15}
      >
        <p className={style["fraud-menu__title"]}>처분행위</p>
        <Flex className={style["fraud-menu-checkbox"]} gap={15} vertical>
          <p className={style["fraud-menu-input__title"]}>처분 방법</p>
          <Radio.Group
            style={{
              display: "flex",
              gap: "10px",
            }}
            size="large"
            onChange={(e) => setCommunity(e.target.value)}
          >
            <Radio value={1}>현금 직거래</Radio>
            <Radio value={2}>계좌이체</Radio>
          </Radio.Group>
        </Flex>
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>
              교부한 금액(피해액)
            </p>
            <Input
              placeholder="성명"
              size="large"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              <p className={style["fraud-menu-input__title"]}>금전지급 일자</p>
              <DatePicker
                defaultValue={defaultValue}
                locale={locale}
                size="large"
              />
            </Tooltip>
          </Flex>
          <Flex vertical style={{ width: "100%" }}>
            <p className={style["fraud-menu-input__title"]}>일시</p>
            <Input
              placeholder="오전 10시 경"
              size="large"
              type="text"
              value={respondentSubAddress}
              onChange={(e) => setRespondentSubAddress(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex></Flex>
      <Flex></Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default FraudMenu;
