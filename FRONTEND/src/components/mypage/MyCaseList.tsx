import React from "react";
import { Link } from "react-router-dom";
import { List, Space } from "antd";
import { GoLaw } from "react-icons/go";
import { FieldTimeOutlined } from "@ant-design/icons";
// import CaseDetail from "../../components/mypage/MyCaseDetail";
import { MemberPrecedent } from "../../types/DataTypes";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function MyCaseList({ cases }: { cases: MemberPrecedent[] }) {
  return (
    <>
      <Space
        direction="vertical"
        style={{ marginBottom: "20px" }}
        size="middle"
      />
      <List
        itemLayout="vertical"
        pagination={{ position: "bottom", align: "center", pageSize: 3 }}
        dataSource={cases}
        renderItem={(item) => (
          <List.Item
            actions={[
              <IconText
                icon={FieldTimeOutlined}
                text={`판례번호 ${item.caseNumber}`}
                key="list-vertical-star-o"
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<GoLaw />}
              title={
                <Link to={`/detail/${item.precedentId}`}>
                  {item.courtName} {item.judgmentDate} {item.judgment}{" "}
                  {item.caseName}
                </Link>
              }
              description={item.judicialNotice}
            />
          </List.Item>
        )}
      />
    </>
  );
}
