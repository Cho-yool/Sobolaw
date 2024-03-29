import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Row, Col} from "antd";
import { BoardList } from "../../types/DataTypes";
import style from "../../styles/mypage/Mypaper.module.css";

interface MyLawcaseTableProps {
  boardList: BoardList[] | undefined;
}

export default function BoardTable({ boardList }: MyLawcaseTableProps) {

  const navigate = useNavigate();

  const columnsWide = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "공개",
      dataIndex: "public",
      key: "public",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "조회수",
      dataIndex: "hit",
      key: "hit",
    },
    {
      title: "작성자",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "작성일자",
      dataIndex: "createdTime",
      key: "createdTime",
    },
  ];

  const columnsNarrow = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "공개",
      dataIndex: "public",
      key: "public",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "작성자",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <Row style={{margin:`5rem`}}>
        <Col xs={0} sm={0} md={24} lg={24}>
          <div className={style["table"]}>
            <Table columns={columnsWide} dataSource={boardList} onRow={(record) => ({
              onClick: () => {
                navigate(`/board/detail/${record.boardId}`);
              }
            })}/>
          </div>
        </Col>
        <Col xs={24} sm={24} md={0}>
          <Table columns={columnsNarrow} dataSource={boardList} onRow={(record) => ({
              onClick: () => {
                navigate(`/board/detail/${record.boardId}`);
              }
            })}/>
        </Col>
      </Row>
    </>
  );
}
