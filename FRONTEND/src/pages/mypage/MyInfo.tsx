import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Modal, Tooltip, Tag, message } from "antd";
import {
  SmileTwoTone,
  MailTwoTone,
  HeartTwoTone,
  SafetyCertificateTwoTone,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "../../App.css";
import style from "../../styles/mypage/MyInfo.module.css";
import { RootState, AppDispatch } from "../../redux/store/store";
import { resetAuth, updateAuth } from "../../redux/reducers/user/userSlice";
import { MemberInfo, MemberKeyword } from "../../types/DataTypes";
import { getUserInfo, deleteUser } from "../../api/members";
import MyKeyword from "../../components/mypage/MyKeyword";
import MyRecentCase from "../../components/mypage/MyRecentCase";
import ApplyLawyer from "../../components/mypage/ApplyLawyer";

export default function MyInfo() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.user.refreshToken
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState<MemberInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [directKeyword, setDirectKeyword] = useState<MemberKeyword[]>();
  const [relatedKeyword, setRelatedKeyword] = useState<MemberKeyword[]>();
  const tagColors = [
    "processing",
    "success",
    "magenta",
    "red",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  let buttonText;
  switch (userInfo?.role) {
    case "ROLE_USER":
      buttonText = "X";
      break;
    case "ROLE_LAWYER":
      buttonText = "변호사";
      break;
    case "ROLE_ADMIN":
      buttonText = "관리자";
      break;
    case "ROLE_WAITING":
      buttonText = "요청 승인을 기다리는 중입니다";
      break;
    default:
      buttonText = "요청 승인을 기다리는 중입니다"; // 특별한 역할이 없을 경우에 대비하여 기본값을 설정합니다.
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserInfo(accessToken);
      setUserInfo(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // userInfo가 존재하고 memberKeyword가 존재할 때만 처리
    if (userInfo && userInfo.memberKeyword) {
      // "DIRECT" 키워드와 "RELATED" 키워드를 분리하여 각각의 배열에 저장
      const direct = userInfo.memberKeyword.filter(
        (keyword) => keyword.keywordType === "DIRECT"
      );
      const related = userInfo.memberKeyword.filter(
        (keyword) => keyword.keywordType === "RELATED"
      );
      setDirectKeyword(direct);
      setRelatedKeyword(related);
    }
    if (userInfo && userInfo.role != user.auth) {
      dispatch(updateAuth(userInfo.role));
    }
  }, [userInfo, dispatch]); // userInfo가 업데이트될 때마다 실행됨

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showApplyModal = () => {
    setIsApplyModalOpen(true);
  };

  const handleApplyOk = () => {
    setIsApplyModalOpen(false);
  };

  const handleApplyOkUpdate = () => {
    setIsApplyModalOpen(false);
    if (userInfo) {
      setUserInfo({ ...userInfo, role: "ROLE_WAITING" });
    }
  };

  const handleDetAccount = () => {
    deleteUser(accessToken, refreshToken).then(() => {
      const success = () => {
        messageApi.open({
          type: "success",
          content: "회원탈퇴가 정상적으로 처리되었습니다.",
        });
      };
      success();
      dispatch(resetAuth());
      navigate("/");
    });
  };

  return (
    <>
      <div className="pages">
        {contextHolder}
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
            <Divider />
            <div className={style["box-content"]}>
              <div>
                <SafetyCertificateTwoTone twoToneColor="#de9159" /> 전문가 여부:{" "}
              </div>
              {/* 아래는 개발용코드(수정해야할 때 사용) */}
              {/* <div>{userInfo?.role}</div>
              <Button
                shape="round"
                type="primary"
                size="small"
                className={style["mypaper-button"]}
                onClick={showApplyModal}
              >
                변호사 전환 신청하기
              </Button> */}
              <div>
                {userInfo?.role === "ROLE_USER" ? (
                  <>
                    {buttonText}{" "}
                    <Button
                      shape="round"
                      type="primary"
                      size="small"
                      className={style["mypaper-button"]}
                      onClick={showApplyModal}
                    >
                      전환 신청하기
                    </Button>
                  </>
                ) : (
                  <div>{buttonText}</div>
                )}
              </div>
              <Modal
                title="변호사 전환 신청하기"
                open={isApplyModalOpen}
                onOk={handleApplyOk}
                footer={[
                  <Button key="submit" onClick={handleApplyOk}>
                    취소
                  </Button>,
                ]}
              >
                <Divider />
                <ApplyLawyer onUpdate={handleApplyOkUpdate} />
              </Modal>
            </div>
          </div>

          <div className={style["box2"]}>
            <div className={style["box-title"]}>관심 키워드</div>
            <MyKeyword
              keywords={directKeyword}
              accessToken={accessToken}
              patchwords={relatedKeyword}
            />
          </div>

          {relatedKeyword !== undefined && relatedKeyword.length > 0 && (
            <div className={style["box2"]}>
              <div className={style["box-title"]}>
                추천 키워드{" "}
                <Tooltip
                  // placement="bottom"
                  placement="top"
                  title={
                    "내가 저장한 판례를 바탕으로 관련 높은 키워드를 보여드려요!"
                  }
                  arrow={true}
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
              <div className={style["box-content"]}>
                <div>
                  {relatedKeyword?.map((item, index) => (
                    <Tag
                      bordered={false}
                      closable
                      color={tagColors[index]}
                      style={{ fontSize: "1rem" }}
                    >
                      {item.word}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          )}

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
