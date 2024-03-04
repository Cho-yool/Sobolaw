import React, { ReactNode } from "react";
import { Menu, ConfigProvider, Button } from "antd";
import type { MenuProps } from "antd";
import logo from "/NavLogo.png";
import "../../App.css";

const items: MenuProps["items"] = [
  "판례/법령",
  "맞춤형판례",
  "비용계산",
  "소장작성",
].map((key) => ({
  key,
  label: `${key}`,
}));

const Navbar = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#BF8438",
          borderRadius: 2,

          // // Alias Token
          // colorBgContainer: "#f6ffed",
        },
      }}
    >
      <div className="Navbar">
        <div className="Navbar-service-logo">
          <img
            src={logo}
            alt="로고"
            style={{ width: "100px", height: "auto" }}
          />
        </div>
        <div className="Navbar-tab">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }} // 로고 너비만큼 제외한 나머지 공간을 차지하도록 설정
          />
          <Button
            type="primary"
            shape="round"
            // size={size}
          >
            로그인
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Navbar;
