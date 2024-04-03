import "../../App.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import InsultA4 from "../../components/lawsuit/insult/InsultA4";
import { useState } from "react";
import { submitType } from "../../types/DataTypes";

export default function InsultPage() {
  const [saveData, setSaveData] = useState<submitType>({});

  return (
    <div className="pages">
      <LawsuitTab cates="모욕죄" saveData={saveData} />
      <InsultA4 setSaveData={setSaveData} />
    </div>
  );
}
