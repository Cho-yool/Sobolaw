import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "antd";
import { MemberLawsuit } from "../../types/DataTypes";
import { RootState } from "../../redux/store/store";
import { getLawsuitList } from "../../api/lawsuit";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";
import MyLawcaseTable from "../../components/mypage/MyLawcaseList";

export default function Mypaper() {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [lawsuitList, setLawsuitList] = useState<MemberLawsuit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLawsuitList(accessToken);
      setLawsuitList(response);
    };
    fetchData();
    console.log(lawsuitList);
  }, []);

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <div className={style["button-box"]}>
          <Button
            shape="round"
            type="primary"
            className={style["mypaper-button"]}
            onClick={() => {
              navigate("/plaint");
            }}
          >
            새로작성하기
          </Button>
        </div>
        <Divider />
        <MyLawcaseTable lawsuitList={lawsuitList} />
      </div>
    </div>
  );
}
