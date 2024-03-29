import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Row, Col } from "antd";
import "../../App.css";
import style from "../../styles/mypage/MyInfo.module.css";
import { BoardDetail, Comment } from "../../types/DataTypes";
import { getBoard } from "../../api/board";
import { toInteger } from "lodash";
import BoardCard from "../../components/board/BoardCard";

export default function BoardDetail() {
  const { boardId } = useParams<{ boardId: string}>();
  const navigate = useNavigate();
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const [comment, setComment] = useState<Comment[]>();


  useEffect(() => {
    const fetchData = async () => {
      const response = await getBoard(toInteger(boardId));
      const board = {
        boardId: response.boardId,
        title: response.title,
        content: response.content,
        hit: response.hit,
        name: response.member.name,
        createdTime: response.createdTime, 
        comments: response.comments,
        public: response.public.toString(),
      }
      const comment = response.comments.map((item: any, index: any) => (
        {
          commentId: item.commentId,
          content: item.content,
          name: item.member.name,
          role: item.member.role,
          createdTime: item.createdTime,
        }))
      setComment(comment);
      setBoardDetail(board);
      console.log(board);
      console.log(comment)
    };
    fetchData();
  }, []);


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
              <Col span={23} style={{ margin: '3rem', fontSize:40, height:'30vh'}}>{boardDetail?.content}</Col>
            </Row>
          </div>
          <div className={style["box1"]}>
            <Divider />
            <BoardCard comment={comment}/>
          </div>
      
        </div>
      </div>
  );
}
