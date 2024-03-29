import { useEffect, useState } from "react";
import { Form, Radio, Input, Button, Col} from "antd";
import { BoardDetail } from "../../types/DataTypes";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";
export default function BoardWrite() {
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();


  useEffect(() => {
    }, []);

  

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <Col style={{margin:`5rem`}}>
          <Form.Item
            name="radio-button"
            label="공개 범위"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group>
              <Radio.Button value="a">전체</Radio.Button>
              <Radio.Button value="b">전문가</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={['user', 'website']} label="작성자" style={{width:'20rem'}}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'website']} label="제목">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="내용">
            <Input.TextArea  style={{height:`30vh`}}/>
          </Form.Item>
          <Form.Item  style={{display:`flex`, justifyContent:`flex-end`}}>
            <Button type="primary" htmlType="submit">
              작성
            </Button>
          </Form.Item>
          </Col>
      </div>
    </div>

  );
}
