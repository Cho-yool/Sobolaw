import React, { useState } from "react";
import { Table, Tag, Transfer } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from "antd";
import difference from "lodash/difference";
import { KeywordType } from "../../types/DataTypes";

type TransferItem = GetProp<TransferProps, "dataSource">[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: KeywordType[];
  leftColumns: TableColumnsType<KeywordType>;
  rightColumns: TableColumnsType<KeywordType>;
}

const keywordList: Array<string> = [
  "강제추행",
  "강간",
  "공무집행방해",
  "개인정보보호법위반",
  "누수",
  "농지법",
  "뇌물",
  "도주치상",
  "대여금",
  "도로교통",
  "리그오브레전드",
  "랜덤채팅",
  "라인",
  "통신매체음란",
  "명예훼손",
  "무고",
  "미성년자의제강간",
  "모욕죄",
  "보이스피싱",
  "부당이득",
  "보험금",
  "사기",
  "비트코인",
  "손해배상",
  "살인",
  "스토킹",
  "음주운전",
  "업무방해",
  "의제강간",
  "이혼",
  "업무상횡령",
  "준강간",
  "주거침입",
  "절도",
  "재산분할",
  "전자금융거래법위반",
  "차용사기",
  "추행",
  "층간소움",
  "촬영물등이용협박",
  "처분문서",
  "카메라등이용촬영",
  "컴퓨터등사용사기",
  "통신매체이용음란",
  "토렌트",
  "통매음",
  "폭행",
  "폭행치상",
  "포괄일죄",
  "횡령",
  "협박",
  "학교폭력",
  "허위사실",
  "확인의이익",
];

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string)
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockData: KeywordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: keywordList[i],
}));

const originTargetKeys = mockData
  .filter((item) => Number(item.key) % 3 > 1)
  .map((item) => item.key);

const leftTableColumns: TableColumnsType<KeywordType> = [
  {
    dataIndex: "title",
    title: "Name",
    render: (Name) => <Tag>{Name}</Tag>,
  },
];

const rightTableColumns: TableColumnsType<KeywordType> = [
  {
    dataIndex: "title",
    title: "Name",
  },
];

export default function MyKeyword() {
  const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        showSearch={true}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title!.indexOf(inputValue) !== -1 ||
          item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </>
  );
}
