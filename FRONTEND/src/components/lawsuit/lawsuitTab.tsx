import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormOutlined,
  // UndoOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Divider } from "antd";
import style from "../../styles/papers/Tab.module.css";

interface LawsuitTabProps {
  cates: string;
}

export default function LawsuitTab({ cates }: LawsuitTabProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showCloseModal = () => {
    setIsCloseModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCloseCancel = () => {
    setIsCloseModalOpen(false);
  };

  return (
    <div className={style["container"]}>
      <div className={style["container-mini"]}>
        <div className={style["container-title"]}>
          <FormOutlined /> 고소장({cates})
        </div>
        <Button className={style["container-button"]} onClick={showModal}>
          <ExclamationCircleOutlined /> 소장 안내
        </Button>
        {cates == "모욕죄" && (
          <Modal
            title="모욕죄 고소장 작성 가이드"
            open={isModalOpen}
            onOk={handleOk}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                확인
              </Button>,
            ]}
          >
            <Divider />
            <p>
              모욕죄는 <br />
              1. 공연성 <br />
              2. 특정성 <br />
              3. 모욕성 <br />위 3가지를 모두 충족시켜야 성립됩니다.
            </p>
            <Divider />
            <p>주요상황</p>
            <p>SNS에서 제3자가 공개적으로 나에게 욕설이나 비하를 한 경우</p>
            <p>네이버카페 등 커뮤니티에서 나에게 모욕적인 말을 댓글로 한경우</p>
            <p>운영하는 블로그에 찾아와 지속적으로 욕설, 험담 등을 하는 경우</p>
            <Divider />
            <p>
              모바일 메신저(카카오톡, 라인 등)에서 발생한 사건은 다른 문서를
              이용해주세요
            </p>
            <Divider />
          </Modal>
        )}
        {cates == "사기죄" && (
          <Modal
            title="사기죄 고소장 작성 가이드"
            open={isModalOpen}
            onOk={handleOk}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                확인
              </Button>,
            ]}
          >
            <Divider />
            <p>수정예정</p>
            <Divider />
          </Modal>
        )}
        {cates == "명예훼손" && (
          <Modal
            title="명예훼손죄 고소장 작성 가이드"
            open={isModalOpen}
            onOk={handleOk}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                확인
              </Button>,
            ]}
          >
            <Divider />
            <p>알아서 써주셍용</p>
            <Divider />
          </Modal>
        )}
      </div>
      <div className={style["container-mini"]}>
        {/* <Button className={style["container-button"]}>
          <UndoOutlined /> 전체초기화
        </Button> */}
        <Button className={style["container-button"]} onClick={showCloseModal}>
          <CloseOutlined /> 나가기
        </Button>
        <Modal
          title="이 페이지를 떠나면 내용은 복구되지 않습니다"
          open={isCloseModalOpen}
          onOk={handleOk}
          onCancel={handleCloseCancel}
          footer={[
            <Button key="back" onClick={handleCloseCancel}>
              취소
            </Button>,
            <Button
              key="link"
              type="primary"
              onClick={() => {
                navigate("/mypage/papers");
              }}
            >
              나가기
            </Button>,
          ]}
        >
          <Divider />
          <p>나가기 전 저장하지 않으면, 내용은 복구되지 않습니다</p>
          <Divider />
        </Modal>
      </div>
    </div>
  );
}
