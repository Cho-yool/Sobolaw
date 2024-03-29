import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col} from "antd";
import { BoardList, BoardDetail, Comment } from "../../types/DataTypes";
import style from "../../styles/mypage/Mypaper.module.css";

interface MyLawcaseCardProps {
    comment: Comment[] | undefined;
}

export default function BoardCard({ comment }: MyLawcaseCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);

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
            <Card title={`${item.name}(${item.role})`}>
                <div>{item.content}</div>
                <div>{item.createdTime}</div>
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

  return (
    <>
    <Row>
        {setCards}
    </Row>
    </>
  );
}
