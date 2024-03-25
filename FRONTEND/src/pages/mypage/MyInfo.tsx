import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Modal } from "antd";
import { SmileTwoTone, MailTwoTone, HeartTwoTone } from "@ant-design/icons";
import "../../App.css";
import style from "../../styles/mypage/MyInfo.module.css";
import { RootState, AppDispatch } from "../../redux/store/store";
import { resetAuth } from "../../redux/reducers/user/userSlice";
import MyKeyword from "../../components/mypage/MyKeyword";
import MyRecentCase from "../../components/mypage/MyRecentCase";
import { MemberInfo } from "../../types/DataTypes";
import { getUserInfo, deleteUser } from "../../api/members";

export default function MyInfo() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.user.refreshToken
  );
  const [userInfo, setUserInfo] = useState<MemberInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await getUserInfo(accessToken);
      const response = await getUserInfo(accessToken);
      setUserInfo(response);
    };
    fetchData();
    // }, [user.accessToken]
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleDetAccount = () => {
    deleteUser(accessToken, refreshToken).then(() => {
      alert("회원탈퇴가 정상적으로 처리되었습니다.");
      dispatch(resetAuth());
      navigate("/");
    });
  };

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
            {userInfo?.birthday != null && (
              <>
                <Divider />
                <div className={style["box-content"]}>
                  <div>
                    <HeartTwoTone twoToneColor="#de9159" /> 생일:
                  </div>
                  <div>{userInfo?.birthday}</div>
                </div>
              </>
            )}
          </div>

          <div className={style["box2"]}>
            <div className={style["box-title"]}>관심 키워드</div>
            <MyKeyword
              keywords={userInfo?.memberKeyword}
              accessToken={accessToken}
            />
          </div>

          <div className={style["box3"]}>
            <div className={style["box-title"]}>최근본 판례</div>
            {userInfo &&
            userInfo.memberRecents &&
            userInfo.memberRecents.length > 0 ? (
              <MyRecentCase cases={userInfo?.memberRecents} />
            ) : (
              <div className={style["box-recent"]}>
                <p>최근 본 판례가 없습니다</p>
                <Button
                  onClick={() => {
                    navigate("/search");
                  }}
                  style={{ color: "#BF8438" }}
                >
                  소보로 친구들이 많이 찾은 판례 보러가기
                </Button>
              </div>
            )}
          </div>

          <div className={style["box4"]}>
            <Button shape="round" type="primary" danger onClick={showModal}>
              회원탈퇴
            </Button>
            <Modal
              title="정말 탈퇴하시겠습니까?"
              open={isModalOpen}
              onOk={handleOk}
              footer={[
                <Button key="submit" onClick={handleOk}>
                  취소
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={handleDetAccount}
                >
                  탈퇴하기
                </Button>,
              ]}
            >
              <Divider />
              <p>
                탈퇴 시 모든 회원정보는 삭제되며, 저장했던 자료들은 복구되지
                않습니다.
              </p>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
