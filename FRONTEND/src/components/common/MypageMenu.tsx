import { Link } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, FormOutlined, InboxOutlined } from "@ant-design/icons";

interface RightMenuProps {
  mode: "horizontal";
}

const MypageMenu: React.FC<RightMenuProps> = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        key="userMenu"
        title={
          <span className="username" style={{ width: "2rem" }}>
            이름이름
          </span>
        }
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/mypage/user">회원정보</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FormOutlined />}>
          <Link to="/mypage/papers">내가 쓴 소장</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<InboxOutlined />}>
          <Link to="/mypage/case">저장한 판례</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MypageMenu;
