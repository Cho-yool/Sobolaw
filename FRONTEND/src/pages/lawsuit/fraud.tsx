import "../../App.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import FraudA4 from "../../components/lawsuit/fraudA4";

export default function FraudPage() {
  return (
    <div className="pages">
      <LawsuitTab cates="사기죄" />
      <FraudA4 />
    </div>
  );
}
