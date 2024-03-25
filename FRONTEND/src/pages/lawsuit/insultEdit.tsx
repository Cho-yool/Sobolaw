import "../../App.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import InsultA4edit from "../../components/lawsuit/insult/InsultA4edit";

export default function InsultEditPage() {
  return (
    <div className="pages">
      <LawsuitTab cates="모욕죄" />
      <InsultA4edit />
    </div>
  );
}
