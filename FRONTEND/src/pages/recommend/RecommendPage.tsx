import React, { useState, useEffect } from 'react';
import { Layout, Row, Tooltip, Steps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import RecommendCards from '../../components/recommend/RecommendCard';
import RecommendSearch from '../../components/recommend/RecommendSearch';
import style from '../../styles/recommend/RecommendPage.module.css';

const { Content } = Layout;

const words = ['손해배상', '사기', '횡령', '계약위반', '고용법', '청구이의', '소유권분쟁']; // 변화할 단어 목록
const tooltipMessage = (
  <>
    <span>판례를 분석하기 위해 한국어 형태소 분석기인 koNLPy를 사용하여 텍스트를 단어로 나누고,</span>
    <br />
    <span>가장 중요한 단어를 찾아내기 위해 TF-IDF 방식을 활용했습니다.</span>
    <br />
    <br />
    <span>TF-IDF는 각 단어의 중요도를 가중치로 계산하여, 판례별로 가장 중요한 10개의 단어를 선정합니다. 이 정보를 바탕으로 사용자의 검색어와 비슷한 판례를 추천해 드립니다.</span>
  </>
);

const RecommendPage: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const checkScroll = () => {
    const cardsShowPoint = 365;
    const searchShowPoint = 1100;
    const currentScroll = window.scrollY;

    setIsCardsVisible(currentScroll > cardsShowPoint);
    setIsSearchVisible(currentScroll > searchShowPoint);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let wordTimer: NodeJS.Timeout;
    let letterIndex = 0;

    const typeWord = () => {
      if (letterIndex <= words[wordIndex].length) {
        setCurrentWord(words[wordIndex].slice(0, letterIndex));
        letterIndex++;
        timer = setTimeout(typeWord, 100);
      } else {
        wordTimer = setTimeout(() => {
          setIsDeleting(true);
          deleteWord();
        }, 1000);
      }
    };

    const deleteWord = () => {
      if (letterIndex >= 0) {
        setCurrentWord(words[wordIndex].slice(0, letterIndex));
        letterIndex--;
        timer = setTimeout(deleteWord, 100);
      } else {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        letterIndex = 0;
        wordTimer = setTimeout(typeWord, 500);
      }
    };

    typeWord();

    return () => {
      clearTimeout(timer);
      clearTimeout(wordTimer);
    };
  }, [wordIndex]);

  // 버튼 클릭 시 검색 섹션으로 스크롤 이동
  const scrollToSearchSection = () => {
    const searchSection = document.querySelector(`.${style.recommendSearchSection}`);
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={style.recommendContainer}>
      <Layout className={style.recommendBackground} style={{ backgroundImage: `url("/images/recommend-background.PNG")` }}>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Row justify="center">
            <div className={style.titleContainer}>
              <div className={style.title}>
                <h3>내 상황에 맞는</h3>
              </div>
              <div className={style.title}>
                <h3>{currentWord} 판례를 찾는</h3>
              </div>
              <div className={style.title}>
                <h3>가장 확실한 방법.</h3>
              </div>
              <div className={style.subtitle}>
                <h3>
                  <span style={{ color: '#F3E7C0', fontSize: 20 }}>소보로</span>만의 추천 알고리즘으로 지금 바로 검색해보세요
                  <Tooltip title={tooltipMessage} placement='right' overlayInnerStyle={{ backgroundColor: '#644419', color: '#F3E7C0', fontSize: 15 }}>
                    <QuestionCircleOutlined style={{ color: '#ffffff', marginLeft: 15 }} />
                  </Tooltip>
                </h3>
                <button className={style.startSearchButton} onClick={scrollToSearchSection}>추천 검색 시작하기</button>
              </div>
            </div>
          </Row>
        </Content>
      </Layout>
      <div className={`${style.recommendCardSection} ${isCardsVisible ? style.visible : ''}`}>
        <h2>소보로 추천 검색은 무엇이 다를까요?</h2>
        <RecommendCards />
      </div>
      <div className={`${style.recommendSearchSection} ${isSearchVisible ? style.visible : ''}`}>
        <h2>소보로 추천 검색 이용하기</h2>
        <RecommendSearch />
      </div>
    </div>
  );
};

export default RecommendPage;