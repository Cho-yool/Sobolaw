import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FormOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Divider, Input, message } from "antd";
import { RootState } from "../../redux/store/store";
import style from "../../styles/papers/Tab.module.css";
import { submitType } from "../../types/DataTypes";
import { postFraud, postInsult } from "../../api/lawsuit";

interface LawsuitTabProps {
  cates: string;
  saveData: submitType;
}

export default function LawsuitTab({ cates, saveData }: LawsuitTabProps) {
  console.log(saveData);
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [title, setTitle] = useState<string>("");
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

  const handleLeavePage = () => {
    if (accessToken != "") {
      navigate("/mypage/papers");
    } else {
      navigate("/plaint");
    }
  };

  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    if (accessToken === "") {
      alert("로그인 시 이용 가능합니다! ");
    } else {
      console.log("hi", cates);
      if (cates == "모욕죄") {
        const sendData: submitType = {
          ...saveData,
          title: title,
        };
        postInsult(accessToken, sendData).then(() => {
          const success = () => {
            messageApi.open({
              type: "success",
              content: "고소장(모욕죄)이 저장되었습니다",
            });
          };
          success();
          navigate("/mypage/papers");
        });
      } else if (cates == "사기죄") {
        const sendData: submitType = {
          ...saveData,
          title: title,
        };
        postFraud(accessToken, sendData).then(() => {
          const success = () => {
            messageApi.open({
              type: "success",
              content: "고소장(사기죄)가 저장되었습니다",
            });
          };
          success();
          navigate("/mypage/papers");
        });
      }
    }
  }
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);
  }, [screenWidth]);

  return (
    <div className={style["container"]}>
      {contextHolder}
      {screenWidth > 1000 ? (
        <>
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
                  <br />
                  <strong>
                    1. 공연성 <br />
                    2. 특정성 <br />
                    3. 모욕성
                  </strong>
                  <br />
                  <br />위 3가지를 모두 충족시켜야 성립됩니다.
                </p>
                <Divider />
                <strong>주요상황</strong>
                <br />
                <br />
                <p>SNS에서 제3자가 공개적으로 나에게 욕설이나 비하를 한 경우</p>
                <p>
                  네이버카페 등 커뮤니티에서 나에게 모욕적인 말을 댓글로 한경우
                </p>
                <p>
                  운영하는 블로그에 찾아와 지속적으로 욕설, 험담 등을 하는 경우
                </p>
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
                사기죄에 대한 고소장을 작성할 때 다음과 같은 유의사항을 고려해야
                합니다:
                <br />
                <br />
                <strong>1. 사실 기반의 기술</strong>: 고소장에는 명확하고
                사실적인 사건의 개요를 포함해야 합니다. 가능한 한 구체적으로
                명예훼손 행위를 설명하는 것이 중요합니다.
                <br />
                <strong>2. 증거 자료 첨부</strong>: 고소장에는 피고인이
                명예훼손을 저지른 사실을 뒷받침하는 증거 자료를 첨부하는 것이
                좋습니다. 예를 들어, 명예를 훼손한 메시지의 스크린샷이나 기타
                증거들을 포함할 수 있습니다.
                <br />
                <strong>3. 증인 명시</strong>: 고소장에는 가능한 한 명예훼손
                행위를 목격한 증인들의 정보를 포함하는 것이 좋습니다. 증인의
                이름, 연락처, 그리고 목격한 사건에 대한 진술을 포함할 수
                있습니다.
                <br />
                <strong>4. 법적 절차 따름</strong>: 고소를 위한 적절한 법적
                절차를 따라야 합니다. 이를 위해 변호사나 법률 전문가의 도움을
                받는 것이 좋습니다.
                <br />
                <strong>5. 상대방의 신원 보호</strong>: 고소장에는 피고인의 개인
                정보나 기타 민감한 정보를 공개하지 않아야 합니다. 대신, 피고인을
                명확하게 식별할 수 있는 정보를 포함해야 합니다.
                <br />
                <strong>6. 객관적인 표현</strong>: 고소장에는 주관적인
                의견보다는 객관적인 사실과 증거를 중심으로 작성하는 것이
                좋습니다.
                <br />
                <strong>7. 적절한 수신자 지정</strong>: 고소장을 올바른
                수신자에게 제출하는 것이 중요합니다. 따라서 고소할 대상이 되는
                당사자나 해당 사건과 관련된 당사자에게 고소장을 보내는 것이
                좋습니다.
                <br />
                <br />
                위의 유의사항을 준수하여 명예훼손죄 고소를 위한 고소장을
                작성하면 더 효과적으로 법적 절차를 진행할 수 있습니다. 단,
                법률상의 문제에 대해서는 항상 전문가의 조언을 구하는 것이
                좋습니다.
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
                명예훼손죄에 대한 고소장을 작성할 때 다음과 같은 유의사항을
                고려해야 합니다:
                <br />
                <br />
                <strong>1. 사실의 명확한 기술</strong>: 고소장에는 명확하고
                사실적인 사건의 개요를 포함해야 합니다. 이 때 관련된 사실들은
                가능한 한 구체적으로 기술해야 합니다.
                <br />
                <strong>2. 증거 자료 첨부</strong>: 고소장에는 피고인이
                명예훼손을 저지른 사실을 뒷받침하는 증거 자료를 첨부하는 것이
                좋습니다. 예를 들어, 명예를 훼손한 메시지의 스크린샷이나 기타
                증거들을 포함할 수 있습니다.
                <br />
                <strong>3. 법적 용어 사용</strong>: 고소장을 작성할 때는 법적
                용어를 사용하는 것이 중요합니다. 법적 용어는 명확하고 강력한
                주장을 전달하는 데 도움이 될 수 있습니다.
                <br />
                <strong>4. 문서 형식 준수</strong>: 고소장은 보통 특정한 형식을
                따라야 합니다. 따라서 주변의 법률 전문가나 변호사의 도움을 받는
                것이 좋습니다.
                <br />
                <strong>5. 상대방의 신원 보호</strong>: 고소장에는 피고인의 개인
                정보나 기타 민감한 정보를 공개하지 않아야 합니다. 대신, 피고인을
                명확하게 식별할 수 있는 정보를 포함해야 합니다.
                <br />
                <strong>6. 적절한 법적 절차 따름</strong>: 고소를 위한 절차나
                필요한 서류 등을 올바르게 따르는 것이 중요합니다. 이를 위해
                변호사나 법률 전문가의 조언을 구하는 것이 좋습니다.
                <br />
                <strong>7. 객관적인 표현</strong>: 고소장에는 주관적인
                의견보다는 객관적인 사실과 증거를 중심으로 작성하는 것이
                좋습니다.
                <br />
                <strong>8. 적절한 수신자 지정</strong>: 고소장을 올바른
                수신자에게 제출하는 것이 중요합니다. 따라서 고소할 대상이 되는
                당사자나 해당 사건과 관련된 당사자에게 고소장을 보내는 것이
                좋습니다.
                <br />
                <br />
                위의 유의사항을 준수하여 명예훼손죄 고소를 위한 고소장을
                작성하면 더 효과적으로 법적 절차를 진행할 수 있습니다. 단,
                법률상의 문제에 대해서는 항상 전문가의 조언을 구하는 것이
                좋습니다.
                <Divider />
              </Modal>
            )}
          </div>
          <div className={style["contents-center"]}>
            <Input
              className={style["button"]}
              placeholder="고소장 저장 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%" }}
            />
            <Button
              className={style["button"]}
              type="primary"
              onClick={onSubmit}
            >
              저장하기
            </Button>
          </div>
          <div className={style["container-mini"]}>
            {/* <Button className={style["container-button"]}>
            <UndoOutlined /> 전체초기화
          </Button> */}
            <Button
              className={style["container-button"]}
              onClick={showCloseModal}
            >
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
                <Button key="link" type="primary" onClick={handleLeavePage}>
                  나가기
                </Button>,
              ]}
            >
              <Divider />
              <p>나가기 전 저장하지 않으면, 내용은 복구되지 않습니다</p>
              <Divider />
            </Modal>
          </div>
        </>
      ) : (
        <>
          <div className={style["container-box"]}>
            <div className={style["container-mini"]}>
              <div className={style["container-title"]}>
                <FormOutlined /> 고소장({cates})
              </div>
              <Button
                className={style["container-button"]}
                size={screenWidth < 500 ? "small" : "middle"}
                onClick={showModal}
              >
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
                    <br />
                    <strong>
                      1. 공연성 <br />
                      2. 특정성 <br />
                      3. 모욕성
                    </strong>
                    <br />
                    <br />위 3가지를 모두 충족시켜야 성립됩니다.
                  </p>
                  <Divider />
                  <strong>주요상황</strong>
                  <br />
                  <br />
                  <p>
                    SNS에서 제3자가 공개적으로 나에게 욕설이나 비하를 한 경우
                  </p>
                  <p>
                    네이버카페 등 커뮤니티에서 나에게 모욕적인 말을 댓글로
                    한경우
                  </p>
                  <p>
                    운영하는 블로그에 찾아와 지속적으로 욕설, 험담 등을 하는
                    경우
                  </p>
                  <Divider />
                  <p>
                    모바일 메신저(카카오톡, 라인 등)에서 발생한 사건은 다른
                    문서를 이용해주세요
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
                  사기죄에 대한 고소장을 작성할 때 다음과 같은 유의사항을
                  고려해야 합니다:
                  <br />
                  <br />
                  <strong>1. 사실 기반의 기술</strong>: 고소장에는 명확하고
                  사실적인 사건의 개요를 포함해야 합니다. 가능한 한 구체적으로
                  명예훼손 행위를 설명하는 것이 중요합니다.
                  <br />
                  <strong>2. 증거 자료 첨부</strong>: 고소장에는 피고인이
                  명예훼손을 저지른 사실을 뒷받침하는 증거 자료를 첨부하는 것이
                  좋습니다. 예를 들어, 명예를 훼손한 메시지의 스크린샷이나 기타
                  증거들을 포함할 수 있습니다.
                  <br />
                  <strong>3. 증인 명시</strong>: 고소장에는 가능한 한 명예훼손
                  행위를 목격한 증인들의 정보를 포함하는 것이 좋습니다. 증인의
                  이름, 연락처, 그리고 목격한 사건에 대한 진술을 포함할 수
                  있습니다.
                  <br />
                  <strong>4. 법적 절차 따름</strong>: 고소를 위한 적절한 법적
                  절차를 따라야 합니다. 이를 위해 변호사나 법률 전문가의 도움을
                  받는 것이 좋습니다.
                  <br />
                  <strong>5. 상대방의 신원 보호</strong>: 고소장에는 피고인의
                  개인 정보나 기타 민감한 정보를 공개하지 않아야 합니다. 대신,
                  피고인을 명확하게 식별할 수 있는 정보를 포함해야 합니다.
                  <br />
                  <strong>6. 객관적인 표현</strong>: 고소장에는 주관적인
                  의견보다는 객관적인 사실과 증거를 중심으로 작성하는 것이
                  좋습니다.
                  <br />
                  <strong>7. 적절한 수신자 지정</strong>: 고소장을 올바른
                  수신자에게 제출하는 것이 중요합니다. 따라서 고소할 대상이 되는
                  당사자나 해당 사건과 관련된 당사자에게 고소장을 보내는 것이
                  좋습니다.
                  <br />
                  <br />
                  위의 유의사항을 준수하여 명예훼손죄 고소를 위한 고소장을
                  작성하면 더 효과적으로 법적 절차를 진행할 수 있습니다. 단,
                  법률상의 문제에 대해서는 항상 전문가의 조언을 구하는 것이
                  좋습니다.
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
                  명예훼손죄에 대한 고소장을 작성할 때 다음과 같은 유의사항을
                  고려해야 합니다:
                  <br />
                  <br />
                  <strong>1. 사실의 명확한 기술</strong>: 고소장에는 명확하고
                  사실적인 사건의 개요를 포함해야 합니다. 이 때 관련된 사실들은
                  가능한 한 구체적으로 기술해야 합니다.
                  <br />
                  <strong>2. 증거 자료 첨부</strong>: 고소장에는 피고인이
                  명예훼손을 저지른 사실을 뒷받침하는 증거 자료를 첨부하는 것이
                  좋습니다. 예를 들어, 명예를 훼손한 메시지의 스크린샷이나 기타
                  증거들을 포함할 수 있습니다.
                  <br />
                  <strong>3. 법적 용어 사용</strong>: 고소장을 작성할 때는 법적
                  용어를 사용하는 것이 중요합니다. 법적 용어는 명확하고 강력한
                  주장을 전달하는 데 도움이 될 수 있습니다.
                  <br />
                  <strong>4. 문서 형식 준수</strong>: 고소장은 보통 특정한
                  형식을 따라야 합니다. 따라서 주변의 법률 전문가나 변호사의
                  도움을 받는 것이 좋습니다.
                  <br />
                  <strong>5. 상대방의 신원 보호</strong>: 고소장에는 피고인의
                  개인 정보나 기타 민감한 정보를 공개하지 않아야 합니다. 대신,
                  피고인을 명확하게 식별할 수 있는 정보를 포함해야 합니다.
                  <br />
                  <strong>6. 적절한 법적 절차 따름</strong>: 고소를 위한 절차나
                  필요한 서류 등을 올바르게 따르는 것이 중요합니다. 이를 위해
                  변호사나 법률 전문가의 조언을 구하는 것이 좋습니다.
                  <br />
                  <strong>7. 객관적인 표현</strong>: 고소장에는 주관적인
                  의견보다는 객관적인 사실과 증거를 중심으로 작성하는 것이
                  좋습니다.
                  <br />
                  <strong>8. 적절한 수신자 지정</strong>: 고소장을 올바른
                  수신자에게 제출하는 것이 중요합니다. 따라서 고소할 대상이 되는
                  당사자나 해당 사건과 관련된 당사자에게 고소장을 보내는 것이
                  좋습니다.
                  <br />
                  <br />
                  위의 유의사항을 준수하여 명예훼손죄 고소를 위한 고소장을
                  작성하면 더 효과적으로 법적 절차를 진행할 수 있습니다. 단,
                  법률상의 문제에 대해서는 항상 전문가의 조언을 구하는 것이
                  좋습니다.
                  <Divider />
                </Modal>
              )}
            </div>
            <div className={style["container-mini"]}>
              {/* <Button className={style["container-button"]}>
            <UndoOutlined /> 전체초기화
          </Button> */}
              <Button
                className={style["container-button"]}
                onClick={showCloseModal}
                size={screenWidth < 500 ? "small" : "middle"}
              >
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
                  <Button key="link" type="primary" onClick={handleLeavePage}>
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
          <div className={style["contents-center"]}>
            {/* 상단 저장 버튼 */}
            <Input
              className={style["button"]}
              placeholder="고소장 저장 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%" }}
            />
            <Button
              className={style["button"]}
              type="primary"
              onClick={onSubmit}
            >
              저장하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
