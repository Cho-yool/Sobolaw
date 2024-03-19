import { useEffect, useState } from "react";
import { Button, Divider } from "antd";
import { SmileTwoTone, MailTwoTone, HeartTwoTone } from "@ant-design/icons";
import "../../App.css";
import style from "../../styles/mypage/MyInfo.module.css";
import MyKeyword from "../../components/mypage/MyKeyword";
import MyRecentCase from "../../components/mypage/MyRecentCase";
import { MemberInfo } from "../../types/DataTypes";
import { getUserInfo } from "../../api/members";

export default function MyInfo() {
  // const user = useSelector((state: RootState) => state.user);
  const [userInfo, setUserInfo] = useState<MemberInfo>();

  useEffect(() => {
    const fetchData = async () => {
      // const response = await getUserInfo({}, user.accessToken);
      const response = await getUserInfo(2);
      setUserInfo(response);
    };
    fetchData();
    // }, [user.accessToken]
  }, []);

  return (
    <>
      <div className="pages">
        <div className={style["myinfo-box"]}>
          <div className={style["box1"]}>
            <div className={style["box-title"]}>기본정보</div>
            <div className={style["box-content"]}>
              <div>
                <SmileTwoTone twoToneColor="#de9159" /> 이름:
              </div>
              <div>{userInfo?.name}</div>
            </div>
            <Divider />
            <div className={style["box-content"]}>
              <div>
                <MailTwoTone twoToneColor="#de9159" /> 이메일:
              </div>
              <div>{userInfo?.email}</div>
            </div>
            <Divider />
            <div className={style["box-content"]}>
              <div>
                <HeartTwoTone twoToneColor="#de9159" /> 생일:
              </div>
              <div>{userInfo?.birthday}</div>
            </div>
          </div>

          <div className={style["box2"]}>
            <div className={style["box-title"]}>관심 키워드</div>
            <MyKeyword keywords={userInfo?.memberKeyword} />
          </div>

          <div className={style["box3"]}>
            <div className={style["box-title"]}>최근본 판례</div>
            <MyRecentCase cases={userInfo?.memberRecents} />
          </div>

          <div className={style["box4"]}>
            <Button shape="round" type="primary" danger>
              회원탈퇴
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
