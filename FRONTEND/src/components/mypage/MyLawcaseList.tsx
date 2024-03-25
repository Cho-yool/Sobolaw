import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Space, Tag, Row, Col, Modal, Button } from "antd";
import {
  MypaperWide,
  MypaperNarrow,
  MemberLawsuit,
} from "../../types/DataTypes";
import { RootState } from "../../redux/store/store";
import { deleteInsult } from "../../api/lawsuit";
import style from "../../styles/mypage/Mypaper.module.css";

interface MyLawcaseTableProps {
  lawsuitList: MemberLawsuit[] | undefined;
}

export default function MyLawcaseTable({ lawsuitList }: MyLawcaseTableProps) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [dataWide, setDataWide] = useState<MypaperWide[]>([]);
  const [dataNarrow, setDataNarrow] = useState<MypaperNarrow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const showModal = (id: number) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedItemId !== null) {
      try {
        await deleteInsult(selectedItemId, accessToken);
        setIsModalOpen(false);
        setSelectedItemId(null);
      } catch (error) {
        console.error("Error deleting insult:", error);
      }
    }
  };

  useEffect(() => {
    if (lawsuitList) {
      const wideData = lawsuitList.map((item, index) => ({
        key: index.toString(),
        type: item.type,
        id: item.id,
        name: item.title ? item.title : "제목없음",
        target: item.defendantName ? item.defendantName : "피고소인 미지정",
        date: item.createdTime ? item.createdTime.substring(0, 10) : "No Date",
        tags: transformTags(item.type),
      }));
      setDataWide(wideData);

      const narrowData = lawsuitList.map((item, index) => ({
        key: index.toString(),
        name: item.title ? item.title : "제목없음",
        type: item.type,
        id: item.id,
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
      render: (text: string, record: MypaperWide) => (
        <Link to={`/mylawsuit/${record.type}/${record.id}`}>{text}</Link>
      ),
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
      render: (record: MypaperWide) => (
        <Space size="middle">
          <Link to={`/plaint/edit/${record.id}`}>수정</Link>
          <a onClick={() => showModal(record.id)}>삭제</a>
        </Space>
      ),
    },
  ];

  const columnsNarrow = [
    {
      title: "임시저장명",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: MypaperNarrow) => (
        <Link to={`/mylawsuit/${record.type}/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "설정",
      key: "action",
      render: (record: MypaperNarrow) => (
        <Space size="middle">
          <Link to={`/plaint/edit/${record.id}`}>수정</Link>
          <a onClick={() => showModal(record.id)}>삭제</a>
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
      <Modal
        title="삭제 시 복구되지 않습니다"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        <br />
        정말 삭제하시겠습니까?
      </Modal>
    </>
  );
}
