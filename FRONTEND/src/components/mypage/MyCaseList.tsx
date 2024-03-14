// import { useState } from "react";
import { Avatar, List, Space } from "antd";
// import { BookTwoTone } from "@ant-design/icons";
// import CaseDetail from "../../components/mypage/MyCaseDetail";
import { MemberPrecedent } from "../../types/DataTypes";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

interface caseProps {
  cases: MemberPrecedent | undefined;
}

export default function MyCaseList({ cases }: caseProps) {
  console.log(cases);
  return (
    <>
      <Space
        direction="vertical"
        style={{ marginBottom: "20px" }}
        size="middle"
      ></Space>
      <List
        pagination={{ position: "bottom", align: "center" }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<BookTwoTone />}
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
}
