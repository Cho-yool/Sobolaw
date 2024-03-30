import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Radio, Input, Button, Col} from "antd";
import { registerBoard, updateBoard } from "../../api/board";
import { BoardDetail } from "../../types/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";


export default function BoardWrite() {
  const { boardDetail } = useLocation().state || {};
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<BoardDetail>(boardDetail? boardDetail:{
    boardId: null,
    hit: null,
    createdTime: null,
    title: "",
    content: "",
    memberId: user.userId,
    name: user.nickname,
    public: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.userId){
      alert(`로그인 후 이용해 주세요`)
      navigate(`/board/list`)
    }
  }, [])

  const register = async() => {
    console.log(formData)
    console.log(boardDetail)
    if(boardDetail){
      await updateBoard(formData);
      window.alert('수정 되었습니다.')
    }else{
      await registerBoard(formData);
      window.alert('작성 되었습니다.')
    }
    navigate('/board/list')
  }

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    if(name == `public`) 
      value = (value == 'true')
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <Col style={{margin:`5rem`}}>

          <Form.Item label="공개 범위">
            <Radio.Group name='public' value={formData.public ? "true" : "false"} onChange={handleInputChange} >
              <Radio.Button value="true">전체</Radio.Button>
              <Radio.Button value="false">전문가</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="작성자" style={{width:'20rem'}}>
            <Input value={formData.name? formData.name:""}/>
          </Form.Item>

          <Form.Item label="제목">
            <Input name='title' value={formData.title} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="내용">
            <Input.TextArea style={{height:`30vh`}} name='content' value={formData.content} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item  style={{display:`flex`, justifyContent:`flex-end`}}>
            <Button type="primary" onClick={register}>
              {boardDetail? "수정":"작성"}
            </Button>
          </Form.Item>

        </Col>
      </div>
    </div>

  );
}
