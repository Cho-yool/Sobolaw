import { useEffect, useState } from "react";
import { Table, Space, Tag, Row, Col } from "antd";
import {
  MypaperWide,
  MypaperNarrow,
  MemberLawsuit,
} from "../../types/DataTypes";
import style from "../../styles/mypage/Mypaper.module.css";

interface MyLawcaseTableProps {
  lawsuitList: MemberLawsuit[] | undefined;
}

export default function MyLawcaseTable({ lawsuitList }: MyLawcaseTableProps) {
  const [dataWide, setDataWide] = useState<MypaperWide[]>([]);
  const [dataNarrow, setDataNarrow] = useState<MypaperNarrow[]>([]);

  useEffect(() => {
    if (lawsuitList) {
      const wideData = lawsuitList.map((item, index) => ({
        key: index.toString(),
        name: item.title ? item.title : "제목없음",
        target: item.defendantName ? item.defendantName : "피고소인 미지정",
        date: item.createdTime ? item.createdTime.substring(0, 10) : "No Date",
        tags: transformTags(item.type),
      }));
      setDataWide(wideData);

      const narrowData = lawsuitList.map((item, index) => ({
        key: index.toString(),
        name: item.title ? item.title : "제목없음",
      }));
      setDataNarrow(narrowData);
    }
  }, [lawsuitList]);

  const transformTags = (type: string | null | undefined): string[] => {
    if (!type) return ["소장 미지정"];
    switch (type) {
      case "Fraud":
        return ["사기"];
      case "Insult":
        return ["모욕"];
      case "Defamation":
        return ["명예훼손"];
      default:
        return [type];
    }
  };

  const columnsWide = [
    {
      title: "임시저장명",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
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
      sorter: (a: MypaperWide, b: MypaperWide) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "소장분류",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "사기") {
              color = "magenta";
            } else if (tag === "모욕") {
              color = "cyan";
            } else if (tag === "명예훼손") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
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

  const columnsNarrow = [
    {
      title: "임시저장명",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
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

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={24} lg={24}>
          <div className={style["table"]}>
            <Table columns={columnsWide} dataSource={dataWide} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={0}>
          <Table columns={columnsNarrow} dataSource={dataNarrow} />
        </Col>
      </Row>
    </>
  );
}
