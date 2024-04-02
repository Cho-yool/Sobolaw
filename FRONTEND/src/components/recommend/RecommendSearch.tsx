import React, { useState, ReactNode } from "react";
import { Select, Input, Button, Steps } from "antd";
import {
  ClusterOutlined,
  HomeOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RecommendTextMessage from "./RecommendTextMessage";
import style from "../../styles/recommend/RecommendSearch.module.css";
import LoadingImage from "./LoadingImage";
import { searchPrecedents } from "../../api/recommendsearch";

const { Option } = Select;
const { TextArea } = Input;

type Message = {
  text: ReactNode;
  type: "sent" | "received";
};

const RecommendSearch: React.FC = () => {
  const [selectedCaseType, setSelectedCaseType] = useState<string>("");
  const [stepTwoValue, setStepTwoValue] = useState<string>("");
  const [stepThreeValue, setStepThreeValue] = useState<string>("");
  const [stepFourValue, setStepFourValue] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false); // 새로운 상태로 로딩 상태를 추가합니다.
  const [progress, setProgress] = useState(0); // 새로운 상태로 로딩 진행률을 추가합니다.
  const navigate = useNavigate();

  const handleCaseTypeChange = (value: string) => {
    setSelectedCaseType(value);
    // 1단계 선택 시에는 currentStep을 변경하지 않습니다.
    if (value.length >= 2 && currentStep === 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepTwoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setStepTwoValue(event.target.value);
    if (event.target.value.length >= 6 && currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepThreeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setStepThreeValue(event.target.value);
    if (event.target.value.length >= 6 && currentStep === 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepFourChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setStepFourValue(event.target.value);
    if (event.target.value.length >= 6 && currentStep === 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Message 내용을 별도의 함수로 정의합니다.
  const placeMessages: Message[] = [
    {
      text: (
        <>
          <strong>6자 이상 입력해주세요.</strong>
          <br />
          예: 회사, 건물, 주택, 농지, <br />
          아파트, 은행, 도로, 자동차 등<br />
          <br />
          예를 들어,
          <br /> OO기업(X) ⭢ <strong>회사(O)</strong>
          <br />
          OO아파트(X) ⭢ <strong>아파트(O)</strong>
        </>
      ),
      type: "received",
    },
  ];

  const objectMessages: Message[] = [
    {
      text: (
        <>
          <strong>6자 이상 입력해주세요.</strong>
          <br />
          예: 토지, 등기, 보험, 채권,
          <br /> 부동산, 소유권, 항고, 자동차 등<br />
          <br />
          예를 들어,
          <br /> OO로 OO(X) ⭢ <strong>토지(O)</strong>
          <br />
          OO차,OO원(X) ⭢ <strong>자동차, 자산(O)</strong>
        </>
      ),
      type: "received",
    },
  ];

  const personMessages: Message[] = [
    {
      text: (
        <>
          <strong>6자 이상 입력해주세요.</strong>
          <br />
          예: 채무자, 채권자, 근로자,
          <br /> 참가인, 조합원, 피해자, 소유자 등
          <br />
          <br />
          예를 들어,
          <br /> 김OO(X) ⭢ <strong>채무자(O)</strong>
          <br />
          황OO씨(X) ⭢ <strong>피해자(O)</strong>
        </>
      ),
      type: "received",
    },
  ];

  const handleSubmit = async () => {
    const situation = `${selectedCaseType} ${stepTwoValue} ${stepThreeValue} ${stepFourValue}`;

    setIsLoading(true); // 로딩 상태를 true로 설정
    setProgress(0); // 진행률을 0으로 초기화

    try {
      // simulateLoadingProcess(); // 로딩 프로세스를 시뮬레이션하는 함수 호출
      const searchResults = await searchPrecedents(situation);
      // TODO: 검색 결과 페이지로 이동
      // 예: 결과 페이지로 이동하면서 검색 결과 데이터 전달

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            // 로딩이 100%에 도달한 후 1.5초 기다린 다음 결과 페이지로 이동
            setTimeout(() => {
              setIsLoading(false);
              window.scrollTo(0, 0);
              navigate("/recommend-results", {
                state: { searchResults: searchResults.data },
              });
            }, 1500);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 70);
    } catch (error) {
      console.error("검색 중 오류가 발생하였습니다", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingImage progress={progress} />;
  }

  return (
    <div className={style.recommendSearchContainer}>
      <div className={`${style.stepsContainer} ${style.fadeInUp}`}>
        <Steps
          direction="vertical"
          current={currentStep - 1}
          style={{ height: "50%", fontWeight: "bold" }}
          size="small"
          items={[
            {
              style: { height: "35%" },
              title: "사건 분류",
              icon: <ClusterOutlined />,
            },
            {
              style: { height: "45%" },
              title: "사건 장소",
              icon: <HomeOutlined />,
            },
            {
              style: { height: "45%" },
              title: "사건 대상",
              icon: <CarOutlined />,
            },
            {
              title: "사건 인물",
              icon: <UserOutlined />,
            },
          ]}
        />
      </div>
      <div className={style.searchContainer}>
        <div className={style.searchFirstItem}>
          <h4>1단계 : 사건분류를 선택하세요.</h4>
          <Select
            showSearch
            placeholder="사건분류"
            optionFilterProp="children"
            onChange={handleCaseTypeChange}
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            style={{ width: "35%", height: "50px", fontSize: "15px" }}>
            <Option value="손해배상">손해배상</Option>
            <Option value="사기">사기</Option>
            <Option value="횡령">횡령</Option>
            <Option value="계약위반">계약위반</Option>
            <Option value="고용법">고용법</Option>
            <Option value="청구이의">청구이의</Option>
            <Option value="소유권분쟁">소유권분쟁</Option>
            <Option value="기타">기타</Option>
          </Select>
        </div>
        {currentStep > 1 && (
          <div className={`${style.searchItem} ${style.fadeInUp}`}>
            <h4>2단계 : 사건 관련 장소를 입력하세요.</h4>
            <div className={style.searchItemContent}>
              <div className={style.textAreaWrapper}>
                <TextArea
                  value={stepTwoValue}
                  placeholder="예) 회사, 건물, 주택, 농지, 아파트, 은행, 도로, 자동차 등"
                  onChange={handleStepTwoChange}
                  style={{ width: "100%", height: "100%" }}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  className={stepTwoValue.length < 6 ? style.redBorder : ""}
                />
                <div className={style.inputCount}>
                  {stepTwoValue.length}/6자 이상
                </div>
              </div>
              <div className={style.recommendTextMessageWrapper}>
                <RecommendTextMessage messages={placeMessages} />
              </div>
            </div>
          </div>
        )}
        {currentStep > 2 && (
          <div className={`${style.searchItem} ${style.fadeInUp}`}>
            <h4>3단계 : 사건 관련 대상을 입력하세요.</h4>
            <div className={style.searchItemContent}>
              <div className={style.textAreaWrapper}>
                <TextArea
                  value={stepThreeValue}
                  placeholder="예)  토지, 등기, 보험, 채권, 부동산, 소유권, 항고, 자동차 등"
                  onChange={handleStepThreeChange}
                  style={{ width: "100%", height: "100%" }}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  className={stepThreeValue.length < 6 ? style.redBorder : ""}
                />
                <div className={style.inputCount}>
                  {stepThreeValue.length}/6자 이상
                </div>
              </div>
              <div className={style.recommendTextMessageWrapper}>
                <RecommendTextMessage messages={objectMessages} />
              </div>
            </div>
          </div>
        )}
        {currentStep > 3 && (
          <div className={`${style.searchItem} ${style.fadeInUp}`}>
            <h4>4단계 : 사건 관련 주요 인물을 입력하세요.</h4>
            <div className={style.searchItemContent}>
              <div className={style.textAreaWrapper}>
                <TextArea
                  value={stepFourValue}
                  placeholder="예) 채무자, 채권자, 근로자, 참가인, 조합원, 피해자, 소유자 등"
                  onChange={handleStepFourChange}
                  style={{ width: "100%", height: "100%" }}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  className={stepFourValue.length < 6 ? style.redBorder : ""}
                />
                <div className={style.inputCount}>
                  {stepFourValue.length}/6글자 이상
                </div>
              </div>
              <div className={style.recommendTextMessageWrapper}>
                <RecommendTextMessage messages={personMessages} />
              </div>
            </div>
          </div>
        )}
        {currentStep > 4 && (
          <div className={`${style.searchItem} ${style.fadeInUp}`}>
            <div className={style.submitButtonWrapper}>
              <a
                className={style.submitButton}
                data-text="Ready?"
                data-hover-text="Confirm!"
                onClick={handleSubmit}></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendSearch;
