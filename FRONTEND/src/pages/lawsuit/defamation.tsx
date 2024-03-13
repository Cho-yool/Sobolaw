// import { useState } from "react";
import "../../App.css";
import style from "../../styles/papers/Lawsuit.module.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import DefamationMenu from "../../components/lawsuit/defamationMenu";
import DefamatinoA4 from "../../components/lawsuit/defamationA4";

//지워라
import { postDefamation } from "../../api/lawsuit";
import { DefamationForm } from "../../types/DataTypes";

export default function DefamatinoPage() {
  const cates = "명예훼손";
  // const [lawsuitId, setLawsuitId] = useState(0);
  // const [title, setTitle] = useState("");
  // const [plaintiffName, setPlaintiffName] = useState("");
  // const [
  //   plaintiffResidentRegistrationNumber,
  //   setPlaintiffResidentRegistrationNumber,
  // ] = useState("");
  // const [plaintiffAddress, setPlaintiffAddress] = useState("");
  // const [plaintiffPhoneNumber, setPlaintiffPhoneNumber] = useState("");
  // const [defendantName, setDefendantName] = useState("");
  // const [defendantAddress, setDefendantAddress] = useState("");
  // const [defendantPhoneNumber, setDefendantPhoneNumber] = useState("");
  // const [defendantIdentificationDetails, setDefendantIdentificationDetails] =
  //   useState("");
  // const [incidentDate, setIncidentDate] = useState("");
  // const [incidentTime, setIncidentTime] = useState({
  //   hour: 0,
  //   minute: 0,
  //   second: 0,
  //   nano: 0,
  // });
  // const [location, setLocation] = useState("");
  // const [defamationContent, setDefamationContent] = useState("");
  // const [isFalseAccusation, setIsFalseAccusation] = useState(true);
  // const [relatedPeople, setRelatedPeople] = useState("");
  // const [evidence, setEvidence] = useState("");
  // const [submissionDate, setSubmissionDate] = useState("");
  // const [policeStationTeam, setPoliceStationTeam] = useState("");

  const requestbody: DefamationForm = {
    // lawsuitId: 0,
    title: "고소할거야",
    plaintiffName: "김싸피",
    plaintiffResidentRegistrationNumber: "1518151515151",
    plaintiffAddress: "서울시강남구역삼동",
    plaintiffPhoneNumber: "01055555555",
    defendantName: "김종범",
    defendantAddress: "",
    defendantPhoneNumber: "",
    defendantIdentificationDetails: "랄로를좋아해요",
    incidentDate: "2024 -03-13",
    incidentTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
    location: "멀캠",
    defamationContent: "이지메로 놀려요",
    isFalseAccusation: true,
    relatedPeople: "8",
    evidence: "없음",
    submissionDate: "2024-03-13",
    policeStationTeam: "강남경찰서 형사과",
  };

  return (
    <div className="pages">
      <button
        onClick={() => {
          postDefamation(2, requestbody);
        }}
      ></button>
      <LawsuitTab cates={cates} />
      <div className={style["container"]}>
        <div className={style["left-menu"]}>
          <DefamationMenu />
        </div>
        <div className={style["right-menu"]}>
          <DefamatinoA4 />
        </div>
      </div>
    </div>
  );
}
