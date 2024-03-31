import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { getNewsList } from '../../api/lawapi';

const { TabPane } = Tabs;

const SoboroNewsListPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('손해배상');
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNewsList(searchKeyword);
  }, [searchKeyword]);

  const fetchNewsList = async (keyword: string) => {
    try {
      const response = await getNewsList(keyword);
      setNewsList(response.data);
    } catch (error) {
<<<<<<< HEAD
      console.error('뉴스 목록 조회 오류: ', error);
=======
      console.error('뉴스 목록 조회 오류:', error);
>>>>>>> 40734387e00cc5dbdb0999227160f9ec3f201c29
    }
  };

  const handleTabChange = (key: string) => {
    setSearchKeyword(key);
  };

  return (
    <div>
      <h2>소보로 추천 뉴스</h2>
      <Tabs defaultActiveKey="손해배상" onChange={handleTabChange}>
        <TabPane tab="손해배상" key="손해배상" />
        <TabPane tab="사기" key="사기" />
        <TabPane tab="횡령" key="횡령" />
        <TabPane tab="계약위반" key="계약위반" />
        <TabPane tab="고용법" key="고용법" />
        <TabPane tab="청구이의" key="청구이의" />
        <TabPane tab="소유권분쟁" key="소유권분쟁" />
      </Tabs>
      <div>
        {newsList.map((news, index) => (
          <div key={index}>
            <h3>{news.title}</h3>
            <p>{news.description}</p>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              자세히 보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoboroNewsListPage;