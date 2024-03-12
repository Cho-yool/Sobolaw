import { useNavigate } from "react-router-dom";
import {
  FormOutlined,
  UndoOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import style from "../../styles/papers/Tab.module.css";

interface LawsuitTabProps {
  cates: string;
}

export default function LawsuitTab({ cates }: LawsuitTabProps) {
  const navigate = useNavigate();

  return (
    <div className={style["container"]}>
      <div className={style["container-mini"]}>
        <div className={style["container-title"]}>
          <FormOutlined /> 고소장({cates})
        </div>
        <Button className={style["container-button"]}>
          <ExclamationCircleOutlined /> 소장 안내
        </Button>
      </div>
      <div className={style["container-mini"]}>
        <Button className={style["container-button"]}>
          <UndoOutlined /> 전체초기화
        </Button>
        <Button
          className={style["container-button"]}
          onClick={() => {
            navigate("/mypage/papers");
          }}
        >
          <CloseOutlined /> 나가기
        </Button>
      </div>
    </div>
  );
}
