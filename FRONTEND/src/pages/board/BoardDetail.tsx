import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Row, Col, Form, Button } from "antd";
import type { BoardDetail, Comment } from "../../types/DataTypes";
import { getBoard, deleteBoard } from "../../api/board";
import { toInteger } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import BoardCard from "../../components/board/BoardCard";
import BoardComment from "../../components/board/BoardComment";
import style from "../../styles/mypage/MyInfo.module.css";
import "../../App.css";

export default function BoardDetail() {
  const user = useSelector((state: RootState) => state.user);
  const { boardId } = useParams<{ boardId: string}>();
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const [comment, setComment] = useState<Comment[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBoard(toInteger(boardId));
      const board = {
        boardId: response.boardId,
        title: response.title,
        content: response.content,
        hit: response.hit,
        memberId: response.member.memberId,
        name: response.member.name,
        createdTime: response.createdTime, 
        comments: response.comments,
        public: response.public.toString(),
      }
      const comment = response.comments.map((item: any, index: any) => (
        {
          boardId: response.boardId,
          commentId: item.commentId,
          content: item.content,
          memberId: item.member.memberId,
          name: item.member.name,
          role: item.member.role,
          createdTime: item.createdTime,
        }))
      setComment(comment);
      setBoardDetail(board);
    };
    fetchData();
  }, []);

  const lineText = (content: any) => content.split(/(?:\r\n|\r|\n)/g).map((line: any, index: any) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  const deleteBoardDetail = async () => {
    if(window.confirm("정말 삭제하시겠습니까?") && boardDetail?.boardId){
      await deleteBoard(boardDetail?.boardId);
      window.alert('삭제되었습니다.')
      navigate(`/board/list`);
    }
  }

  return (
      <div className="pages">
        <div className={style["myinfo-box"]}>
          <div className={style["box1"]} style={{margin:`5rem`}}>
            <div className={style["box-title"]} style={{textAlign:'center', fontSize:50}}>{boardDetail?.title}</div>
            <Row>
              <Col span={23} style={{ margin: '1rem', textAlign:'right'}}> 작성자: {boardDetail?.name}</Col>
            </Row>
            <Row>
              <Col span={23} style={{ margin: '1rem', textAlign:'right'}}> 작성 시간: {boardDetail?.createdTime}</Col>
            </Row>
            <Row> 
              <Col span={23} style={{ margin: '1rem', textAlign:'right'}}> 조회수: {boardDetail?.hit}</Col>
            </Row>
            <Row> 
              <Col span={23} style={{ margin: '3rem', fontSize:40, height:'30vh'}}>{boardDetail? lineText(boardDetail.content):""}</Col>
            </Row>
          </div>
          <Form.Item  style={{display:`flex`, justifyContent:`flex-end`}}>
            <Button type="primary" style={{'margin':'1rem'}} onClick={() => navigate('/board/list')}>
              이전
            </Button>
            {
              user.userId===boardDetail?.memberId && (
                <>
                  <Button type="primary" style={{'marginRight':'1rem'}} onClick={() => navigate(`/board/write`, {state: {boardDetail}})}>
                    수정
                  </Button>
                  <Button type="primary" style={{'marginRight':'5rem'}} onClick={deleteBoardDetail}>
                    삭제
                  </Button>
                </>
              )
            }
          </Form.Item>
          <div className={style["box1"]}>
            <Divider />
            <BoardCard comment={comment}/>
            <Divider />
            <BoardComment boardId={boardDetail?.boardId}/>
          </div>
      
        </div>
      </div>
  );
}
