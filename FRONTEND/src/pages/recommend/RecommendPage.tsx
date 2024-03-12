import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import style from '../../styles/recommend/RecommendPage.module.css';

const { Content } = Layout;
const { Title } = Typography;

const words = ['사기', '명예훼손', '살인', '폭행', '강제추행']; // 변화할 단어 목록

const RecommendPage: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    // 모든 글자가 타이핑된 후 다음 단어로 넘어가기 전 지연을 주는 로직
    if (letterIndex > words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setLetterIndex(0);
      }, 1000); // 단어가 완성된 후 다음 단어로 넘어가기 전의 지연 시간

      return () => clearTimeout(timeout);
    }

    // 글자를 타이핑하는 로직
    const timer = setTimeout(() => {
      setLetterIndex((prev) => prev + 1);
      setCurrentWord(words[wordIndex].substring(0, letterIndex));
    }, 100); // 글자가 타이핑되는 속도

    return () => clearTimeout(timer);
  }, [letterIndex, wordIndex]);

  return (
    <Layout className={style.recommendBackground}>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className={style.titleContainer}>
              <div className={style.title}>
                <Title level={2} style={{ color: '#ffffff', fontSize: 40 }}>내 상황에 맞는</Title>
              </div>
              <div className={style.title}>
                <Title level={2} style={{ color: '#ffffff', fontSize: 40 }}>{currentWord} 사건을 찾는</Title>
              </div>
              <div className={style.title}>
                <Title level={2} style={{ color: '#ffffff', fontSize: 40 }}>가장 확실한 방법</Title>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default RecommendPage;
