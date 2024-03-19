import "../../App.css";
import style from "../../styles/papers/Lawsuit.module.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import FraudA4 from "../../components/lawsuit/fraudA4";
import FraudMenu from "../../components/lawsuit/fraudMenu";
import { useState } from "react";
import { FraudDetails } from "../../types/DataTypes";

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

  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    nano: 0,
  });
  const [paperIDate, setPaperIDate] = useState("");
  const [paperITime, setPaperITime] = useState("");
  const [tradedItem, setTradedItem] = useState<string>(""); // 물건
  const [tradeSite, setTradeSite] = useState<number>(); // 사이트명
  const [contactDate, setContactDate] = useState<string>(""); // 연락 일자
  const [contactTime, setContactTime] = useState<object>({}); // 연락 시간

  const [contact, setContact] = useState<string[]>([]); // 연락방법
  const [disposalMethod, setDisposalMethod] = useState<number>(); // 처분방법
  const [bankName, setBankName] = useState<string>(""); // 은행 이름
  const [accountNumber, setAccountNumber] = useState<string>(""); // 계좌 번호
  const [damageMoney, setDamageMoney] = useState<string>(""); // 피해액수
  const [evidence, setEvidence] = useState<string>(""); // 기타 증거
  const [evidenceEtc, setEvidenceEtc] = useState<boolean>(false); // 기타 체크시
  const [evidenceList, setEvidenceList] = useState<string[]>([]); // 출력할 증거리스트
  const [policeStation, setPoliceStation] = useState<string>("");

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
    tradedItem: tradedItem,
    setTradedItem: setTradedItem,
    tradeSite: tradeSite,
    setTradeSite: setTradeSite,
    contactDate: contactDate,
    setContactDate: setContactDate,
    contactTime: contactTime,
    setContactTime: setContactTime,
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
    evidence: evidence,
    setEvidence: setEvidence,
    evidenceEtc: evidenceEtc,
    setEvidenceEtc: setEvidenceEtc,
    evidenceList: evidenceList,
    setEvidenceList: setEvidenceList,
    policeStation: policeStation,
    setPoliceStation: setPoliceStation,
  };

  return (
    <div className="pages">
      <LawsuitTab cates="사기죄" />
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
