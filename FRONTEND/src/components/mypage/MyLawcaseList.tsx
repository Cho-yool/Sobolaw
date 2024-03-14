import { Table, Space, Tag } from "antd";
import type { TableProps } from "antd";
import {
  MypaperWide,
  MypaperNarrow,
  MemberLawsuit,
} from "../../types/DataTypes";

const columnsWide: TableProps<MypaperWide>["columns"] = [
  {
    title: "임시저장명",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "피고소인",
    dataIndex: "target",
    key: "target",
  },
  {
    title: "작성일자",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "소장분류",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "Fraud") {
            color = "magenta";
          } else if (tag === "Insult") {
            color = "cyan";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "설정",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>수정</a>
        <a>삭제</a>
      </Space>
    ),
  },
];

const columnsNarrow: TableProps<MypaperNarrow>["columns"] = [
  {
    title: "임시저장명",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "설정",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>수정</a>
        <a>삭제</a>
      </Space>
    ),
  },
];

const data: MypaperWide[] = [
  {
    key: "1",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "2",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "3",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "4",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "5",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "6",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "7",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "8",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "9",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "10",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "11",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
  {
    key: "12",
    name: "정의란무엇인가",
    target: "김종범",
    date: "2024-03-06",
    tags: ["명예훼손"],
  },
];

interface MyLawcaseTableProps {
  lawsuitList: MemberLawsuit[] | undefined; // 또는 | null 추가 가능, 데이터가 없을 수도 있음을 고려
}

export default function MyLawcaseTable({ lawsuitList }: MyLawcaseTableProps) {
  console.log(lawsuitList);
  // const dataWide;
  // const dataNarrow;

  return (
    <>
      <Table columns={columnsWide} dataSource={data} />

      <Table columns={columnsNarrow} dataSource={data} />
    </>
  );
}
