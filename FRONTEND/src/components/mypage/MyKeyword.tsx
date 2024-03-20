import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Transfer } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from "antd";
import difference from "lodash/difference";
import style from "../../styles/mypage/Mycase.module.css";
import { KeywordType, MemberKeyword } from "../../types/DataTypes";
import { dataSource } from "../../types/KeywordList";
import { postMyKeyword } from "../../api/members";

type TransferItem = GetProp<TransferProps, "dataSource">[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: KeywordType[];
  leftColumns: TableColumnsType<KeywordType>;
  rightColumns: TableColumnsType<KeywordType>;
}

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer pagination={{ showSizeChanger: true }} {...restProps}>
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

interface MemberKeywordProps {
  keywords: MemberKeyword[] | undefined;
}

const leftTableColumns: TableColumnsType<KeywordType> = [
  {
    dataIndex: "title",
    title: "이름",
    render: (Name) => <Tag>{Name}</Tag>,
  },
];

const rightTableColumns: TableColumnsType<KeywordType> = [
  {
    dataIndex: "title",
    title: "이름",
    render: (Name) => <Tag color="volcano">{Name}</Tag>,
  },
];

const MyKeyword: React.FC<MemberKeywordProps> = ({ keywords }) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const originTargetKeys =
      keywords?.filter((item) => item.word).map((item) => item.word) ?? [];
    setTargetKeys(originTargetKeys);
  }, [keywords]);

  useEffect(() => {
    setIsDisabled(false);
  }, [targetKeys]);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleCheck = () => {
    postMyKeyword(1, targetKeys)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TableTransfer
        dataSource={dataSource}
        targetKeys={targetKeys}
        showSearch={true}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title!.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
      <div className={style["button-box"]}>
        <Button
          shape="round"
          type="primary"
          className={style["mypaper-button"]}
          onClick={handleCheck}
          disabled={isDisabled}
        >
          저장하기
        </Button>
      </div>
    </>
  );
};

export default MyKeyword;
