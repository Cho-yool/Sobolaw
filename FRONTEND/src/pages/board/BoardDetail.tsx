import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Row, Col, Form, Button, Modal } from "antd";
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
  const [modal, setModal] = useState(0);
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
    if(boardDetail?.boardId){
      await deleteBoard(boardDetail?.boardId);
      setModal(2)
    }
  }

  return (
      <div className="pages">
        <div className={style["myinfo-box"]}>
          <div style={{ borderRadius:'0rem' , margin: '10%', padding: '5%', paddingBottom:'0%', backgroundColor: '#FCFCFC', lineHeight: '1.3'}}>
            <div className={style["box1"]} style={{margin:`0rem`}}>
              <div className={style["box-title"]} style={{textAlign:'center', fontSize:'220%', borderRadius:`2rem`}}>{boardDetail?.title}</div>
              <Row>
                <Col span={23} style={{ margin: '0.3rem', textAlign:'right'}}>{boardDetail?.createdTime?.split(".")[0]}</Col>
              </Row>
              <Row>
                <Col span={23} style={{ margin: '0.3rem', textAlign:'right', fontSize:'130%'}}> 조회수: {boardDetail?.hit}</Col>
              </Row>
              <Row> 
                <Col span={23} style={{ margin: '0.3rem', textAlign:'right', fontSize:'150%'}}> 작성자: {boardDetail?.name}</Col>
              </Row>
              <Divider />
              <Row> 
                <Col sm={22} md={0} lg={0} style={{ margin: '2%', fontSize:12, minHeight:'30vh'}}>{boardDetail? lineText(boardDetail.content):""}</Col>
                <Col xs={0} sm={0} md={22} style={{ margin: '5%', fontSize:20, minHeight:'30vh'}} >{boardDetail? lineText(boardDetail.content):""}</Col>
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
                    <Button type="primary" style={{'marginRight':'1rem'}} onClick={() => setModal(1)}>
                      삭제
                    </Button>
                  </>
                )
              }
            </Form.Item>
            <div className={style["box1"]}>
              <Divider />
              <BoardCard comment={comment} />
              <Divider />
              <BoardComment boardId={boardDetail?.boardId}/>
            </div>
        
          </div>
        </div>

        <Modal
          title="정말 삭제하시겠습니까?"
          open={modal == 1}
          onCancel={() => setModal(0)}
          footer={[
            <Button key="delete" type="primary" onClick={deleteBoardDetail}>
              삭제  
            </Button>,
            <Button key="cancel" onClick={() => setModal(0)}>
            취소
          </Button>,
          ]}/>

          <Modal
            title="삭제되었습니다"
            open={modal == 2}
            onCancel={() => setModal(0)}
            afterClose={() => navigate('/board/list')}
            footer={[
              <Button key="submit" type="primary" onClick={() => setModal(0)}>
                확인  
              </Button>,
            ]}/>
      </div>
  );
}
