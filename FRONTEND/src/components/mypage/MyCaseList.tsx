import { useState } from "react";
import type { Key } from "react";
import { ProList } from "@ant-design/pro-components";
import CaseDetail from "../../components/mypage/MyCaseDetail";

export default function MyCaseList() {
  const dataSource = [
    {
      title:
        "아파트 매매계약서에 인도일과 실제 명도일 약정이 별도로 있는 경우 매도인의 현실인도의무 인정 여부가 문제된 사건",
    },
    {
      title: "[도로교통법위반(음주운전)]",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const [split] = useState<0 | 1>(1);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <>
      <br />
      <br />
      <ProList<{ title: string }>
        split={split === 1}
        metas={{
          title: {},
          description: {
            render: () => {
              return <CaseDetail />;
            },
          },
          content: {
            render: () => (
              <div
                style={{
                  minWidth: 200,
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "200px",
                  }}
                ></div>
              </div>
            ),
          },
          actions: {
            render: () => {
              return [<a key="init">삭제</a>];
            },
          },
        }}
        expandable={{
          expandedRowKeys,
          defaultExpandAllRows: false,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        rowKey="title"
        rowSelection={rowSelection}
        dataSource={dataSource}
      />
    </>
  );
}
