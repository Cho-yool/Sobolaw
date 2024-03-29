import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Radio, Input, Button, Col} from "antd";
import { registerComment } from "../../api/board";
import { Comment } from "../../types/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";

interface BoardCommentProps {
  boardId: number| undefined | null;
}

export default function BoardWrite({ boardId }: BoardCommentProps) {
  const [comment, setComment] = useState<Comment>();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(boardId){
      setComment({
        boardId: boardId,
        commentId: null,
        content: "",
        memberId: user.userId,
        name: user.nickname,
        role: user.auth,
        createdTime: null,
      })
    }
  }, [boardId]);

  

  const register = async() => {
    if(comment){
      await registerComment(comment);
    }
    alert(`작성되었습니다`);
    window.location.reload();
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if(comment){
      setComment({
        ...comment,
        [name]: value,
      });
    }
  };

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <Col style={{margin:`1rem`}}>
          <Form.Item label="작성자" style={{width:'20rem'}}>
            <Input value={comment?.name? comment.name:""}/>
          </Form.Item>

          <Form.Item label="내용">
            <Input.TextArea style={{height:`10vh`}} name='content' value={comment?.content? comment.content:""} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item  style={{display:`flex`, justifyContent:`flex-end`}}>
            <Button type="primary" onClick={register}>
              작성
            </Button>
          </Form.Item>

        </Col>
      </div>
    </div>

  );
}
