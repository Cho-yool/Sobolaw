import { Menu, Avatar } from "antd";
import { UserOutlined, FormOutlined, InboxOutlined } from "@ant-design/icons";

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline" | undefined;
}

const MypageMenu: React.FC<RightMenuProps> = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">이름이름</span>
          </>
        }
      >
        <Menu.Item key="project">
          <UserOutlined /> 회원정보
        </Menu.Item>
        <Menu.Item key="about-us">
          <FormOutlined /> 내가 쓴 소장
        </Menu.Item>
        <Menu.Item key="log-out">
          <InboxOutlined /> 저장한 판례
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MypageMenu;
