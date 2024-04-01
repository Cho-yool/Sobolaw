import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Radio, Input, Button, Col, Modal} from "antd";
import { registerBoard, updateBoard } from "../../api/board";
import { BoardDetail } from "../../types/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";


export default function BoardWrite() {
  const { boardDetail } = useLocation().state || {};
  const user = useSelector((state: RootState) => state.user);
  const [modal, setModal] = useState({title: "", isModalOpen: false});
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
      setModal({title: "로그인 후 이용해 주세요", isModalOpen: true})
    }
  }, [])

  const register = async() => {
    if(!formData.title || !formData.content){
      setModal({title: "제목과 내용을 입력해 주세요", isModalOpen: true})
      return
    }
    if(boardDetail){
      await updateBoard(formData);
      setModal({title: "수정되었습니다", isModalOpen: true})
    }else{
      await registerBoard(formData);
      setModal({title: "작성되었습니다", isModalOpen: true})
    }
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
        <Col style={{margin:`8%`, padding:`3%`, backgroundColor:'#FCFCFC'}} >

          <Form.Item label="공개 범위">
            <Radio.Group name='public' value={formData.public ? "true" : "false"} onChange={handleInputChange} >
              <Radio.Button value="true">전체</Radio.Button>
              <Radio.Button value="false">전문가</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="작성자">
            <Input value={formData.name? formData.name:""} style={{width:'50%'}}/>
          </Form.Item>

          <Form.Item label="제목">
            <Input name='title' value={formData.title} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="내용">
            <Input.TextArea style={{height:`40vh`}} name='content' value={formData.content} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item  style={{display:`flex`, justifyContent:`flex-end`}}>
            <Button type="primary" onClick={register}>
              {boardDetail? "수정":"작성"}
            </Button>
          </Form.Item>

        </Col>
      </div>
      <Modal
        title={modal.title}
        open={modal.isModalOpen}
        onCancel={() => setModal({title:"", isModalOpen: false})}
        afterClose={() => navigate('/board/list')}
        footer={[
          <Button key="submit" type="primary" onClick={() => setModal({title:"", isModalOpen: false})}>
            확인  
          </Button>,
        ]}/>
    </div>
  );
}
