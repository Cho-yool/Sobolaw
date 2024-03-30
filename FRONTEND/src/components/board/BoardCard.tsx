import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col} from "antd";
import {CloseSquareTwoTone } from "@ant-design/icons"
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

  const deleteComments = async (id: number) => {
    if(confirm('댓글을 삭제하시겠습니까?')){
        const response = await deleteComment(id);
        alert('삭제되었습니다')
        console.log(response)
        location.reload()
    }
  }

  const deleteButton = (comment: Comment) => {
    return (
        user.userId===comment.memberId ? (
            <CloseSquareTwoTone  onClick={() => {deleteComments(comment.commentId? comment.commentId:0)}}/>
        ):null
    )
  }

  const lineText = (content: any) => content.split(/(?:\r\n|\r|\n)/g).map((line: any, index: any) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  const setCards = comments.map((item, index) => (
    <React.Fragment key={index}>
    {/* wide */}
        <Col xs={2} sm={2} md={1} lg={1} />
        <Col xs={20} sm={20} md={10} lg={10} style={{ padding: '1rem'}}>
            <Card title={`${item.name}${item.role==="ROLE_LAWYER"? "[변호사]":""}`} >
                <div style={{display: 'flex', justifyContent:'flex-end'}}>{item.createdTime?.split(".")[0]}</div>
                <div style={{fontSize: '1.1rem'}}>{item? lineText(item.content):""}</div>
                <div style={{display: 'flex', justifyContent:'flex-end'}}>{deleteButton(item)}</div>
            </Card>
        </Col>
        <Col xs={2} sm={2} md={1} lg={1} />
    </React.Fragment>
  ))

 

  return (
    <>
    <Row>
        {setCards}
    </Row>
    </>
  );
}
