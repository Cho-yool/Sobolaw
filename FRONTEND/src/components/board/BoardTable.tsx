import { useNavigate } from "react-router-dom";
import { UnlockTwoTone, LockTwoTone } from "@ant-design/icons"
import { Table, Row, Col, Divider, Form, Button} from "antd";
import { BoardList } from "../../types/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import style from "../../styles/mypage/Mypaper.module.css";

interface MyLawcaseTableProps {
  boardList: BoardList[] | undefined;
}

export default function BoardTable({ boardList }: MyLawcaseTableProps) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const columnsWide = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      render: (text: any, record: any) => {
        return parseInt(text)+1;
      },
    },
    {
      title: "공개",
      dataIndex: "public",
      key: "public",
      render: (text: any, record: any) => {
        return record.public ? <UnlockTwoTone /> : <LockTwoTone />;
      },
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
      render: (text: any, record: any) => {
        return text.split(".")[0];
      },
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

  const checkPublic = (board: BoardList) => {
    if(board.memberId != user.userId && (!board.public && user.role != `ROLE_LAWYER`)){
      alert('전문가에게만 공개된 상담 입니다')
    }else{
      navigate(`/board/detail/${board.boardId}`)
    }
  }

  return (
      <Row style={{margin:`5rem`}}>
        <Col xs={0} sm={0} md={24} lg={24}>
          <div className={style["table"]}>
            <Table columns={columnsWide} dataSource={boardList} onRow={(record) => ({onClick: () => {checkPublic(record)}})} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={0}>
          <Table columns={columnsNarrow} dataSource={boardList} onRow={(record) => ({onClick: () => {checkPublic(record)}})}/>
        </Col>
      </Row>
  );
}
