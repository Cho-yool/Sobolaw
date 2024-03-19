import React, { useState } from 'react';
import { Select, Input, Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/recommend/RecommendSearch.module.css';
import LoadingImage from './LoadingImage';

const { Option } = Select;
const { TextArea } = Input;

const RecommendSearch: React.FC = () => {
  const topKeyWords = ['토지', '등기', '보험', '회사', '건물', '채권', '항고']; // 상위 키워드 목록
  const [selectedCaseType, setSelectedCaseType] = useState<string>('');
  const [stepTwoValue, setStepTwoValue] = useState<string>('');
  const [stepThreeValue, setStepThreeValue] = useState<string>('');
  const [stepFourValue, setStepFourValue] = useState<string>('');
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

  const handleStepTwoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStepTwoValue(event.target.value);
    if (event.target.value.length >= 6 && currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepThreeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStepThreeValue(event.target.value);
    if (event.target.value.length >= 6 && currentStep === 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepFourChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStepFourValue(event.target.value);
    if (event.target.value.length >= 6 && currentStep === 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Tooltip 내용을 별도의 함수로 정의합니다.
  const placeTooltipContent = (
    <>
      <span style={{ fontWeight: 'bold', color: '#FF0000' }}>6자 이상 입력해주세요.</span><br />
      예: 회사, 건물, 주택, 농지, 아파트, 은행, 도로, 자동차 등<br />
      실제 지명 보다 <span style={{ fontWeight: 'bold', color: '#644419' }}>장소의 특성</span> 또는<br /> <span style={{ fontWeight: 'bold', color: '#644419' }}>장소의 카테고리</span>를 입력하는 게 좋습니다.<br /><br />
      예를 들어, <br />
      OO기업(X) ⭢ <span style={{ fontWeight: 'bold', color: '#644419' }}>회사(O)</span><br />
      OO아파트(X) ⭢ <span style={{ fontWeight: 'bold', color: '#644419' }}>아파트(O)</span>
    </>
  )

  const objectTooltipContent = (
    <>
      <span style={{ fontWeight: 'bold', color: '#FF0000' }}>6자 이상 입력해주세요.</span><br />
      예: 토지, 등기, 보험, 채권, 부동산, 소유권, 항고, 자동차 등<br /><br />
      실제 대상명 보다 <span style={{ fontWeight: 'bold', color: '#644419' }}>대상의 특성</span> 또는 <span style={{ fontWeight: 'bold', color: '#644419' }}>대상의 카테고리</span>를 입력하는 것이 좋습니다.
      이를 통해 추천 검색 결과의 정확도를 높일 수 있습니다.<br /><br />
      예를 들어,<br />
      OO로 OO(X) ⭢ <span style={{ fontWeight: 'bold', color: '#644419' }}>토지(O)</span><br />
      OO차,OO원(X) ⭢ <span style={{ fontWeight: 'bold', color: '#644419' }}>자동차, 자산(O)</span>
    </>
  );

  const personTooltipContent = (
    <>
      <span style={{ fontWeight: 'bold', color: '#FF0000' }}>6자 이상 입력해주세요.</span><br />
      예: 채무자, 채권자, 근로자, 참가인, 조합원, 피해자, 소유자 등<br /><br />
      인물의 실명보다 <span style={{ fontWeight: 'bold', color: '#644419' }}>인물의 역할, 관계</span>를 입력하는 것이 좋습니다.<br />
      이를 통해 추천 검색 결과의 정확도를 높일 수 있습니다.<br /><br />
      예를 들어,<br />
      김OO(X) ⭢ <span style={{ fontWeight: 'bold', color: '#644419' }}>채무자(O)</span><br />
      황OO씨(X) ⭢ <span style={{ fontWeight: 'bold', color: '#644419' }}>피해자(O)</span>
    </>
  );

  // 로딩 프로세스를 시뮬레이션하는 함수
  const simulateLoadingProcess = () => {
    setIsLoading(true);
    setProgress(0); // 진행률을 0으로 초기화
    const totalDuration = 7000; // 총 로딩 시간(ms)
    const updateInterval = 70; // 진행률 업데이트 간격(ms)

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1; // 매 업데이트마다 진행률을 1%씩 증가
        if (newProgress >= 100) {
          clearInterval(timer); // 진행률이 100%에 도달하면 인터벌을 중지
          // 100% 로딩 후 2초 대기
          setTimeout(() => {
            setIsLoading(false); // 로딩 상태를 false로 설정
            // 결과 페이지로 이동하기 전에 페이지 최상단으로 스크롤
            window.scrollTo(0, 0);
            navigate('/recommend-results'); // 결과 페이지로 이동
          }, 1500); // 1.5초 후 실행
          return 100;
        }
        return newProgress;
      });
    }, updateInterval);
  };


  

  const handleSubmit = () => {
    const submissionData = [{
      selectedCaseType,
      stepTwoValue,
      stepThreeValue,
      stepFourValue,
    }];
    console.log('Submitting', submissionData);
    simulateLoadingProcess();
    // 여기에 제출 로직을 추가하세요, 예를 들어:
    // fetch('/api/submit', { method: 'POST', body: JSON.stringify(submissionData), headers: { 'Content-Type': 'application/json' } })
  }

  if(isLoading) {
    return <LoadingImage progress={progress} />
  }

  return (
    <div className={style.searchContainer}>
      <div className={style.searchItem}>
        <h4>1단계 : 사건분류를 선택하세요.</h4>
        <Select
          showSearch
          placeholder="사건분류"
          optionFilterProp="children"
          onChange={handleCaseTypeChange}
          filterOption={(input, option) =>
            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: '30%', height: '70%', fontSize: '15px' }}
        >
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
          <h4>
            2단계 : 사건 관련 장소를 입력하세요.
            <Tooltip title={placeTooltipContent} placement='right' overlayInnerStyle={{ backgroundColor: '#F3E7C0', color: '#000000' }}>
              <InfoCircleOutlined 
              style={{ marginLeft: 10, color: '#595959' }} 
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              />
            </Tooltip>
          </h4>
          <TextArea
            value={stepTwoValue}
            placeholder="예) 회사, 건물, 주택, 농지, 아파트, 은행, 도로, 자동차 등"
            onChange={handleStepTwoChange}
            style={{ width: '100%', height: '100%' }}
            autoSize={{ minRows: 3, maxRows: 6 }} // 자동 크기 조정 활성화
          />
        </div>
      )}
      {currentStep > 2 && (
        <div className={`${style.searchItem} ${style.fadeInUp}`}>
          <h4>
            3단계 : 사건 관련 대상을 입력하세요.
            <Tooltip title={objectTooltipContent} placement='right' overlayInnerStyle={{ backgroundColor: '#F3E7C0', color: '#000000' }}>
              <InfoCircleOutlined
               style={{ marginLeft: 10, color: '#595959' }}
               onPointerEnterCapture={() => {}}
               onPointerLeaveCapture={() => {}}
               />
            </Tooltip>
          </h4>
          <TextArea
            value={stepThreeValue}
            placeholder="예)  토지, 등기, 보험, 채권, 부동산, 소유권, 항고, 자동차 등"
            onChange={handleStepThreeChange}
            style={{ width: '100%', height: '100%' }}
            autoSize={{ minRows: 3, maxRows: 6 }} // 자동 크기 조정 활성화
          />
        </div>
      )}
      {currentStep > 3 && (
        <div className={`${style.searchItem} ${style.fadeInUp}`}>
          <h4>
            4단계 : 사건 관련 주요 인물을 입력하세요.
            <Tooltip title={personTooltipContent} placement='right' overlayInnerStyle={{ backgroundColor: '#F3E7C0', color: '#000000' }}>
              <InfoCircleOutlined 
              style={{ marginLeft: 10, color: '#595959'}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              />
              
            </Tooltip>
          </h4>
          <TextArea
            value={stepFourValue}
            placeholder="예) 채무자, 채권자, 근로자, 참가인, 조합원, 피해자, 소유자 등"
            onChange={handleStepFourChange}
            style={{ width: '100%', height: '100%' }}
            autoSize={{ minRows: 3, maxRows: 6 }} // 자동 크기 조정 활성화
          />
        </div>
      )}
      {currentStep > 4 && (
        <div className={`${style.searchItem} ${style.fadeInUp}`}>
          <Button type="primary" onClick={handleSubmit} style={{ width: 100, height: 40, fontSize: 18, marginLeft: '83%' }}>제출</Button>
        </div>
      )}
    </div>
  );
};

export default RecommendSearch;
