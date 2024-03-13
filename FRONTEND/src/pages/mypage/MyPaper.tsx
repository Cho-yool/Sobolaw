import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Row, Col } from "antd";
import { MemberLawsuit } from "../../types/DataTypes";
import { getLawsuitList } from "../../api/lawsuit";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";
import MyLawcaseTable from "../../components/mypage/MyLawcaseList";

export default function Mypaper() {
  const navigate = useNavigate();
  const [lawsuitList, setLawsuitList] = useState<MemberLawsuit[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLawsuitList(1);
      setLawsuitList(response);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   getLawsuitList(1)
  //     .then((res) => {
  //       console.log(res);
  //       setLawsuitList(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <div className={style["button-box"]}>
          <Button
            shape="round"
            type="primary"
            className={style["mypaper-button"]}
            onClick={() => {
              navigate("/plaint");
            }}
          >
            새로작성하기
          </Button>
        </div>
        <Divider />
        <Row>
          <Col xs={0} sm={0} md={24} lg={24}>
            <div className={style["table"]}>
              <MyLawcaseTable lawsuitList={lawsuitList} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={0}>
            <MyLawcaseTable lawsuitList={lawsuitList} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
