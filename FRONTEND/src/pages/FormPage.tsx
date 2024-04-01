import { Link } from "react-router-dom";
import style from "../styles/papers/Select.module.css";
import "../App.css";
import { Button, Modal } from "antd";
import { useState } from "react";

<div
  style={{
    display: "flex",
    height: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7cac9",
  }}
></div>;

export default function FormPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    showModal();
  };
  return (
    <div className={style["container"]}>
      <div className={style["select-box"]}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          문서를 선택해주세요
        </h1>
        <div className={style["select-button"]}>
          <Link
            to="/plaint/2"
            style={{
              display: "block",
              borderRadius: "8px",
              backgroundColor: "#bf8438",
              padding: "12px 24px",
              color: "white",
            }}
          >
            중고거래 사기
          </Link>
          <Link
            to="/plaint/3"
            style={{
              display: "block",
              borderRadius: "8px",
              backgroundColor: "#bf8438",
              padding: "12px 24px",
              color: "white",
            }}
          >
            온라인 모욕
          </Link>
          <Link
            to="/plaint/1"
            style={{
              display: "block",
              borderRadius: "8px",
              backgroundColor: "#bf8438",
              padding: "12px 24px",
              color: "white",
            }}
            onClick={(e) => clickHandler(e)}
          >
            명예훼손
          </Link>
          <Modal
            title="명예훼손"
            open={isModalOpen}
            closeIcon={false}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                OK
              </Button>,
            ]}
          >
            <p>준비중입니다....ㅜㅜ</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
