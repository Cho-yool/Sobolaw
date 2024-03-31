import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button} from "antd";
import { CloseSquareTwoTone } from "@ant-design/icons"
import { deleteComment } from "../../api/board";
import { Comment } from "../../types/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface MyLawcaseCardProps {
    comment: Comment[] | undefined;
}

export default function BoardCard({ comment }: MyLawcaseCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [modal, setModal] = useState({modelState: 0, commentId: 0});
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if(comment){
        setComments(comment)
    }
  }, [comment]);

  const deleteComments = async (id: number) => {
    await deleteComment(id);
    setModal({modelState: 2, commentId: 0})
  }

  const deleteButton = (comment: Comment) => {
    return (
        user.userId===comment.memberId ? (
            <CloseSquareTwoTone  onClick={() => {setModal({modelState: 1, commentId: comment.commentId? comment.commentId:0})}}/>
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

        <Col xs={2} sm={2} md={1} lg={1} />
        <Col xs={20} sm={20} md={10} lg={10} style={{ padding: '1rem'}}>
            <Card title={`${item.name}${item.role==="ROLE_LAWYER"? "[변호사]":""}`} style={{border: '1px solid #F4B13D'}}>
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
    <Modal
          title="정말 삭제하시겠습니까?"
          open={modal.modelState == 1}
          onCancel={() => setModal({modelState: 0, commentId: 0})}
          footer={[
            <Button key="delete" type="primary" onClick={() => deleteComments(modal.commentId)}>
              삭제  
            </Button>,
            <Button key="cancel" onClick={() => setModal({modelState: 0, commentId: 0})}>
            취소
          </Button>,
          ]}/>

          <Modal
            title="삭제되었습니다"
            open={modal.modelState == 2}
            onCancel={() => setModal({modelState: 0, commentId: 0})}
            afterClose={() => location.reload()}
            footer={[
              <Button key="submit" type="primary" onClick={() => setModal({modelState: 0, commentId: 0})}>
                확인  
              </Button>,
            ]}/>
    </>
  );
}
