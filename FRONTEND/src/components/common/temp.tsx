import { useState } from "react";
import {
  Tag,
  Layout,
  Menu,
  Button,
  Drawer,
  Row,
  Col,
  ConfigProvider,
} from "antd";
import type { MenuProps } from "antd";
import {
  MenuOutlined,
  SmileTwoTone,
  EditTwoTone,
  CopyTwoTone,
} from "@ant-design/icons";
import logo from "/NavLogo.png";

const { Header } = Layout;
const items: MenuProps["items"] = [
  "판례/법령",
  "맞춤형판례",
  "비용계산",
  "소장작성",
].map((key) => ({
  key,
  label: `${key}`,
}));

const ResponsiveNav = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
      {/* 웹사이즈 네브바 */}
      <Layout className="layout">
        <Header style={{ padding: 0 }}>
          <Row justify="space-between" align="middle">
            <Col xs={20} sm={20} md={4}>
              <img
                src={logo}
                alt="로고"
                style={{ width: "100px", height: "auto" }}
              />
            </Col>
            <Col xs={0} sm={0} md={20}>
              <Menu mode="horizontal" items={items} defaultSelectedKeys={["1"]}>
                {/* {items.map((item) => (
                  <Menu.Item key={item.key}>{item.label}</Menu.Item>
                ))} */}
              </Menu>
              <div>
                <Button type="primary" style={{ marginRight: "10px" }}>
                  Sign in
                </Button>
                <Button>Sign up</Button>
              </div>
            </Col>

            {/* 핸드폰 사이즈 네브바 */}
            <Col xs={2} sm={2} md={0}>
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
              로그인이 필요합니다
              <Button
                type="primary"
                shape="round"
                style={{ marginRight: "10px", marginTop: "1rem" }}
              >
                로그인
              </Button>
            </div>

            {/* <div
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
                }}
              >
                <Avatar
                  shape="square"
                  size={64}
                  src={<img src={userinfo} alt="avatar" />}
                />
                <Tag bordered={false}>회원정보</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  shape="square"
                  size={64}
                  src={<img src={papers} alt="avatar" />}
                />
                <Tag bordered={false}>내가쓴소장</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  shape="square"
                  size={64}
                  src={<img src={hammer} alt="avatar" />}
                />
                <Tag bordered={false}>저장한판례</Tag>
              </div>
            </div> */}

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
                }}
              >
                <SmileTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag color="white" bordered={false}>
                  회원정보
                </Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
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
                }}
              >
                <CopyTwoTone
                  style={{ fontSize: "3rem" }}
                  twoToneColor="#BF8438"
                />
                <Tag bordered={false}>저장한판례</Tag>
              </div>
            </div>

            <Menu mode="vertical" items={items} defaultSelectedKeys={["1"]}>
              {/* {items.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              ))} */}
            </Menu>
          </Drawer>
        </Header>
      </Layout>
    </ConfigProvider>
  );
};

export default ResponsiveNav;
