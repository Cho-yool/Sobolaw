import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { getMemberList } from "../../api/members";
import { RootState } from "../../redux/store/store";
import { MemberList } from "../../types/DataTypes";

export default function MemberAll() {
  const user = useSelector((state: RootState) => state.user);
  const [memberList, setMemberList] = useState<MemberList[]>([]);
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMemberList(user.accessToken);
      setMemberList(response);
    };
    fetchData();
  }, []);

  const getItems: (
    panelStyle: CSSProperties,
    memberList: MemberList[]
  ) => CollapseProps["items"] = (panelStyle, memberList) => {
    return memberList.map((item) => ({
      key: item.memberId.toString(),
      label: item.name,
      children: (
        <div>
          <p>멤버ID: {item.memberId}</p>
          <p>이메일: {item.email}</p>
          <p>생일: {item.birthday}</p>
          <p>회원자격: {item.role}</p>
        </div>
      ),
      style: panelStyle,
    }));
  };
  return (
    <div style={{ flexDirection: "column", width: "90%", height: "100%" }}>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle, memberList)}
      />
    </div>
  );
}
