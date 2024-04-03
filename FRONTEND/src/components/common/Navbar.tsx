import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Tag,
  Layout,
  Menu,
  Button,
  Drawer,
  Row,
  Col,
  ConfigProvider,
  Flex,
  Modal,
  Divider,
  Input,
} from "antd";
import type { MenuProps } from "antd";
import {
  MenuOutlined,
  SmileTwoTone,
  EditTwoTone,
  CopyTwoTone,
  DownOutlined,
} from "@ant-design/icons";
import { postLogout } from "../../api/members";
import { postNotifications } from "../../api/notification";
import { RootState, AppDispatch } from "../../redux/store/store";
import { resetAuth } from "../../redux/reducers/user/userSlice";
import logo from "/NavLogo.png";
import MypageMenu from "./MypageMenu";
import style from "../../styles/common/Navbar.module.css";

const { Header } = Layout;
const items: MenuProps["items"] = [
  { key: "1", label: <Link to="/search">판례/법령</Link> },
  { key: "2", label: <Link to="/recommend">맞춤형판례</Link> },
  { key: "3", label: <Link to="/cal">비용계산</Link> },
  { key: "4", label: <Link to="/plaint">소장작성</Link> },
  { key: "5", label: <Link to="/board/list">상담소</Link> },
  { key: "6", label: <Link to="/news">뉴스</Link> },
];

interface ResponsiveNavProps {
  selectedKeys: string[];
  selectedSubKeys: string[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSubKeys: React.Dispatch<React.SetStateAction<string[]>>;
}

const ResponsiveNav = ({
  selectedKeys,
  selectedSubKeys,
  setSelectedKeys,
  setSelectedSubKeys,
}: ResponsiveNavProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberIdCheck, setMemberIdCheck] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handlelogout = () => {
    // postLogout(user.accessToken, user.refreshToken);
    postLogout(user.accessToken, user.refreshToken)
      .then(() => {
        dispatch(resetAuth());
        navigate("/");
      })
      .catch(() => {
        alert("다시 로그아웃해주세요");
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  function handleMemberId(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setMemberId(inputValue); // 상태를 업데이트합니다.
    const numCheck = /^[0-9]*$/;
    if (numCheck.test(inputValue)) {
      // 입력값이 숫자인 경우
      setMemberIdCheck(true);
    } else {
      setMemberId(inputValue);
      setMemberIdCheck(false);
    }
  }

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const limitedValue = inputValue.substring(0, 10);
    if (inputValue.length > 10) {
      return;
    }
    setTitle(limitedValue);
  }

  function handleContent(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const limitedValue = inputValue.substring(0, 20);
    if (inputValue.length > 20) {
      return;
    }
    setContent(limitedValue);
  }

  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    // TODO: 회원가입 비동기 통신
    // 모든 조건이 True일 때 회원가입 제출
    if (memberId === "") {
      alert("누구한테 보낼거얌!");
    } else if (title === "") {
      alert("제목!!");
    } else if (content === "") {
      alert("내용!");
    } else {
      const Data = {
        memberId: parseInt(memberId),
        // 28번 아이디 토큰
        // token:
        //   "cNsYgdXPWmrUgkwy-Yz-V-:APA91bEsgSL6A31bRHFS83424j4TJK7lm34ux8ZC7hsgooowGMcYjNDpIBK41sD2ADzzQJfCHdBg3vwZFQWCXNB1-I7bdX89KqC6RVh7HLqx4ORSMdzbgWV_TdYG5VBA_FHq3OTVR6Wz",
        title: title,
        body: content,
      };
      const response = await postNotifications(Data);
      console.log(response);
    }
  }

  return (
    // 컬러 지정
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#BF8438",
          borderRadius: 2,
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
          },
        },
      }}
    >
      {/* 웹사이즈 네브바 위치 수정해야함 */}
      {/* <Layout> */}
      <Header style={{ padding: 0, height: "auto" }}>
        <Row justify="space-between" align="middle">
          <Col
            xs={10}
            sm={20}
            md={4}
            style={{
              marginLeft: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="로고"
              style={{ width: "100px", height: "auto", cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Col>
          <Row className={style["contents"]}>
            <Col xs={0} sm={0} md={12} lg={18}>
              <Menu
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={items}
              />
            </Col>
            <Col xs={0} sm={0} md={2}>
              {user.accessToken != "" && (
                <MypageMenu
                  username={user.nickname}
                  mode={"horizontal"}
                  setSelectedKeys={setSelectedKeys}
                  selectedSubKeys={selectedSubKeys}
                  setSelectedSubKeys={setSelectedSubKeys}
                />
              )}
            </Col>
            <Col xs={0} sm={0} md={2}>
              {user.accessToken === "" ? (
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </Button>
              ) : (
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={handlelogout}
                >
                  로그아웃
                </Button>
              )}
            </Col>
          </Row>
          {/* 로그인시 활성화 */}
          {/* <Col xs={0} sm={0} md={2}></Col>

          <Col xs={0} sm={0} md={2}></Col> */}

          {/* 핸드폰 사이즈 네브바 */}
          <Col
            xs={2}
            sm={2}
            md={0}
            style={{ paddingRight: "30px", marginRight: "15px" }}
          >
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>

        <Drawer
          title="전체 메뉴"
          placement="right"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "8rem",
              backgroundColor: "#fffbf0",
              color: "644419",
            }}
          >
            {user.accessToken === "" ? (
              <Flex vertical gap={15}>
                로그인이 필요합니다
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </Button>
              </Flex>
            ) : (
              <Flex vertical gap={5}>
                {user.nickname}님! 안녕하세요
                <Button
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={showModal}
                >
                  메시지보내기
                </Button>
                <Modal
                  title="메시지 보내깅깅깅구이궁깅"
                  open={isModalOpen}
                  onOk={handleOk}
                  footer={[
                    <Button key="submit" onClick={handleOk}>
                      취소
                    </Button>,
                  ]}
                >
                  <Divider />
                  <Input
                    prefix="받을 사람"
                    value={memberId}
                    id="memberId"
                    onChange={handleMemberId}
                    suffix={memberIdCheck ? <DownOutlined /> : null}
                  />
                  <Input
                    prefix="제목"
                    value={title}
                    id="title"
                    onChange={handleTitle}
                  />
                  <Input
                    prefix="내용"
                    value={content}
                    id="content"
                    onChange={handleContent}
                  />
                  <Button onClick={onSubmit}>알람보내깅</Button>
                </Modal>
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginRight: "10px" }}
                  onClick={handlelogout}
                >
                  로그아웃
                </Button>
              </Flex>
            )}
          </div>

          {user.accessToken != "" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/mypage/user");
                }}
              >
                <SmileTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>회원정보</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/mypage/papers");
                }}
              >
                <EditTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>내가쓴소장</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/mypage/case");
                }}
              >
                <CopyTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>저장한판례</Tag>
              </div>
            </div>
          )}

          <Menu
            mode="vertical"
            items={items}
            defaultSelectedKeys={["1"]}
          ></Menu>
        </Drawer>
      </Header>
      {/* </Layout> */}
    </ConfigProvider>
  );
};

export default ResponsiveNav;
