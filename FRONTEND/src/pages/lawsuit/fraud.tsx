import "../../App.css";
import style from "../../styles/papers/Lawsuit.module.css";
import LawsuitTab from "../../components/lawsuit/lawsuitTab";
import FraudA4 from "../../components/lawsuit/fraudA4";
import FraudMenu from "../../components/lawsuit/fraudMenu";
import { Button } from "antd";
export default function FraudPage() {
  return (
    <div className="pages">
      <LawsuitTab cates="사기죄" />
      <div className={style["container"]}>
        <div className={style["left-menu"]}>
          <FraudMenu />
        </div>
        <div className={style["right-menu"]}>
          <FraudA4 />
        </div>
      </div>
    </div>
  );
}
