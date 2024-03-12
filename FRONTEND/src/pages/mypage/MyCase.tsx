import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import MyCaseList from "../../components/mypage/MyCaseList";
import { MemberPrecedent } from "../../types/DataTypes";
import style from "../../styles/mypage/Mycase.module.css";
import { dummydata2 } from "../../dummy";

export default function MyCase() {
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.user);
  const [paperList, setpaperList] = useState<MemberPrecedent>();

  useEffect(() => {
    const fetchData = async () => {
      //     const response = await getUserInfo({}, user.accessToken);
      //     setUserInfo(response);
      setpaperList(dummydata2);
    };
    fetchData();
    // }, [user.accessToken]
  }, []);

  return (
    <>
      <div className="pages">
        <div className={style["mycase-box"]}>
          <div className={style["button-box"]}>
            <Button
              shape="round"
              type="primary"
              className={style["mypaper-button"]}
              onClick={() => {
                navigate("/recommend");
              }}
            >
              판례 추천받기
            </Button>
          </div>
          <MyCaseList />
        </div>
      </div>
    </>
  );
}
