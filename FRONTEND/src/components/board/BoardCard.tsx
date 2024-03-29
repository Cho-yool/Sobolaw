import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col} from "antd";
import {CloseCircleOutlined } from "@ant-design/icons"
import { deleteComment } from "../../api/board";
import { BoardList, BoardDetail, Comment } from "../../types/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import style from "../../styles/mypage/Mypaper.module.css";

interface MyLawcaseCardProps {
    comment: Comment[] | undefined;
}

export default function BoardCard({ comment }: MyLawcaseCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(comment){
        setComments(comment)
    }
  }, [comment]);

  const setCards = comments.map((item, index) => (
    <React.Fragment key={index}>
    {/* wide */}
        <Col xs={0} sm={0} md={1} lg={1} />
        <Col xs={0} sm={0} md={10} lg={10} style={{ padding: '1rem'}}>
            <Card title={`${item.name}(${item.role})`} >
                <div>{item.content}</div>
                <div>{item.createdTime}</div>
                <div>{deleteButton(item)}</div>
            </Card>
        </Col>
        <Col xs={0} sm={0} md={1} lg={1} />

    {/* narrow */}
        <Col xs={2} sm={2} md={0} lg={0} />
        <Col xs={20} sm={20} md={0} lg={0} style={{ padding: '1rem'}}>
            <Card title={`${item.name}(${item.role})`}>
                <div>{item.content}</div>
                <div>{item.createdTime}</div>
            </Card>
        </Col>
        <Col xs={2} sm={2} md={0} lg={0} />
    </React.Fragment>

  ))

  const deleteComments = async (id: number) => {
    if(confirm('댓글을 삭제하시겠습니까?')){
        await deleteComment(id);
        alert('삭제되었습니다')
        location.reload()
    }
  }

  const deleteButton = (comment: Comment) => {
    return (
        user.userId===comment.memberId && (
          <>
            <CloseCircleOutlined onClick={() => {deleteComments(comment.commentId? comment.commentId:0)}}/>
          </>
        )
    )
  }

  return (
    <>
    <Row>
        {setCards}
    </Row>
    </>
  );
}
