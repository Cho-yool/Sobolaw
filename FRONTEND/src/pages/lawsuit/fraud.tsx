import "../../App.css";
import style from "../../styles/papers/Lawsuit.module.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import FraudA4 from "../../components/lawsuit/fraudA4";
import FraudMenu from "../../components/lawsuit/fraudMenu";
import { useEffect, useState } from "react";
import {
  FraudDetails,
  TimeContent,
  fraudType,
  submitType,
} from "../../types/DataTypes";

export default function FraudPage() {
  const [title, setTitle] = useState<string>(""); // 제목
  const [plaintiffName, setPlaintiffName] = useState<string>(""); // 고소인
  const [isPlaintiff, setIsplaintiff] = useState<boolean>(false); // 고소인 이름 적었는지
  const [
    plaintiffResidentRegistrationNumber,
    setPlaintiffResidentRegistrationNumber,
  ] = useState<string>(""); // 고소인 주민등록번호
  const [plaintiffMainAddress, setPlaintiffMainAddress] = useState<string>(""); // 고소인 주소
  const [plaintiffSubAddress, setPlaintiffSubAddress] = useState<string>(""); // 고소인 상세주소
  const [plaintiffPhoneNumber, setPlaintiffPhoneNumber] = useState<string>(""); // 고소인 전화번호
  const [defendantName, setDefendantName] = useState<string>(""); // 피고소인
  const [isDefendantName, setIsDefendantName] = useState<boolean>(false); // 피고소인 이름 작성했는지
  const [isDefendantAddress, setIsDefendantAddress] = useState<boolean>(false); // 피고인 주소를 아는지
  const [isDefendantPhoneNumber, setIsDefendantPhoneNumber] =
    useState<boolean>(false); // 피고인 전화번호를 아는지
  const [defendantMainAddress, setDefendantMainAddress] = useState<string>(""); // 피고소인 주소
  const [defendantSubAddress, setDefendantSubAddress] = useState<string>(""); // 피고소인 상세주소
  const [defendantPhoneNumber, setDefendantPhoneNumber] = useState<string>(""); // 피고소인 전화번호
  const [incidentDate, setIncidentDate] = useState<string>("");
  const [incidentTime, setIncidentTime] = useState<string>("");
  const [paperIDate, setPaperIDate] = useState<string>("");
  const [paperITime, setPaperITime] = useState<string>("");
  const [tradedItem, setTradedItem] = useState<string>(""); // 물건
  const [tradeSite, setTradeSite] = useState<string>(""); // 사이트명
  const [directSite, setDirectSite] = useState<string>(""); // 사이트명
  const [contact, setContact] = useState<string[]>([]); // 연락방법
  const [disposalMethod, setDisposalMethod] = useState<number>(); // 처분방법
  const [bankName, setBankName] = useState<string>(""); // 은행 이름
  const [accountNumber, setAccountNumber] = useState<string>(""); // 계좌 번호
  const [damageMoney, setDamageMoney] = useState<string>(""); // 피해액수
  const [moneyDate, setMoneyDate] = useState<string>("");
  const [moneyTime, setMoneyTime] = useState<string>("");
  const [evidence, setEvidence] = useState<string>(""); // 기타 증거
  const [evidenceEtc, setEvidenceEtc] = useState<boolean>(false); // 기타 체크시
  const [evidenceList, setEvidenceList] = useState<string[]>([]); // 출력할 증거리스트
  const [policeStation, setPoliceStation] = useState<string>("");
  const [saveData, setSaveData] = useState<fraudType>({});
  const FraudDetails: FraudDetails = {
    title: title,
    setTitle: setTitle,
    plaintiffName: plaintiffName,
    setPlaintiffName: setPlaintiffName,
    isPlaintiff: isPlaintiff,
    setIsplaintiff: setIsplaintiff,
    plaintiffResidentRegistrationNumber: plaintiffResidentRegistrationNumber,
    setPlaintiffResidentRegistrationNumber:
      setPlaintiffResidentRegistrationNumber,
    plaintiffMainAddress: plaintiffMainAddress,
    setPlaintiffMainAddress: setPlaintiffMainAddress,
    plaintiffSubAddress: plaintiffSubAddress,
    setPlaintiffSubAddress: setPlaintiffSubAddress,
    plaintiffPhoneNumber: plaintiffPhoneNumber,
    setPlaintiffPhoneNumber: setPlaintiffPhoneNumber,
    defendantName: defendantName,
    setDefendantName: setDefendantName,
    isDefendantName: isDefendantName,
    setIsDefendantName: setIsDefendantName,
    isDefendantAddress: isDefendantAddress,
    setIsDefendantAddress: setIsDefendantAddress,
    isDefendantPhoneNumber: isDefendantPhoneNumber,
    setIsDefendantPhoneNumber: setIsDefendantPhoneNumber,
    defendantMainAddress: defendantMainAddress,
    setDefendantMainAddress: setDefendantMainAddress,
    defendantSubAddress: defendantSubAddress,
    setDefendantSubAddress: setDefendantSubAddress,
    defendantPhoneNumber: defendantPhoneNumber,
    setDefendantPhoneNumber: setDefendantPhoneNumber,
    incidentDate: incidentDate,
    setIncidentDate: setIncidentDate,
    incidentTime: incidentTime,
    setIncidentTime: setIncidentTime,
    paperIDate: paperIDate,
    setPaperIDate: setPaperIDate,
    paperITime: paperITime,
    setPaperITime: setPaperITime,
    tradedItem: tradedItem,
    setTradedItem: setTradedItem,
    directSite: directSite,
    setDirectSite: setDirectSite,
    tradeSite: tradeSite,
    setTradeSite: setTradeSite,
    contact: contact,
    setContact: setContact,
    disposalMethod: disposalMethod,
    setDisposalMethod: setDisposalMethod,
    bankName: bankName,
    setBankName: setBankName,
    accountNumber: accountNumber,
    setAccountNumber: setAccountNumber,
    damageMoney: damageMoney,
    setDamageMoney: setDamageMoney,
    moneyDate,
    setMoneyDate,
    moneyTime,
    setMoneyTime,
    evidence: evidence,
    setEvidence: setEvidence,
    evidenceEtc: evidenceEtc,
    setEvidenceEtc: setEvidenceEtc,
    evidenceList: evidenceList,
    setEvidenceList: setEvidenceList,
    policeStation: policeStation,
    setPoliceStation: setPoliceStation,
  };

  useEffect(() => {
    setSaveData({
      title: title,
      plaintiffName: plaintiffName,
      plaintiffResidentRegistrationNumber: plaintiffResidentRegistrationNumber,
      plaintiffAddress: plaintiffMainAddress + "/" + plaintiffSubAddress,
      plaintiffPhoneNumber: plaintiffPhoneNumber,
      defendantName: defendantName,
      defendantAddress: defendantMainAddress + "/" + defendantSubAddress,
      defendantPhoneNumber: defendantPhoneNumber,
      contactDate: incidentDate,
      contactTime: incidentTime,
      tradeSite: directSite,
      tradedItem: tradedItem,
      depositDate: moneyDate,
      depositTime: moneyTime,
      depositAmount: 0,
      contactMethod: disposalMethod === 1 ? "현금 직거래" : "계좌이체",
      isCashDeposit: disposalMethod === 1 ? true : false,
      bankName: bankName,
      accountNumber: accountNumber,
      evidence: evidence,
      policeStationTeam: policeStation,
    });
  }, [
    title,
    plaintiffName,
    plaintiffResidentRegistrationNumber,
    plaintiffMainAddress,
    plaintiffSubAddress,
    plaintiffPhoneNumber,
    defendantName,
    defendantMainAddress,
    defendantSubAddress,
    defendantPhoneNumber,
    incidentDate,
    incidentTime,
    directSite,
    tradedItem,
    moneyDate,
    moneyTime,
    disposalMethod,
    bankName,
    accountNumber,
    evidence,
    policeStation,
  ]);

  return (
    <div>
      <LawsuitTab cates="사기죄" saveData={saveData} />
      <div className={style["container"]}>
        <div className={style["left-menu"]}>
          <FraudMenu fraudDetails={FraudDetails} />
        </div>
        <div className={style["right-menu"]}>
          <FraudA4 fraudDetails={FraudDetails} />
        </div>
      </div>
    </div>
  );
}
