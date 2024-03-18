import React, { useState, useEffect, } from 'react';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/recommend/RecommendResultList.module.css';
import CircularProgressBar from './CircularProgressBar'; // Update with your actual path

// 더미 데이터 생성 함수
const createDummyData = () => {
  return Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    title: `제목 ${index + 1}`,
    content: `본문 내용 ${index + 1}. 이 텍스트는 예시를 위한 것입니다. 여기에 다양한 정보를 담아서 표시할 수 있으며, 최대 세 줄까지만 보여집니다. 이 텍스트는 예시를 위한 것입니다. 여기에 다양한 정보를 담아서 표시할 수 있으며, 최대 세 줄까지만 보여집니다.이 텍스트는 예시를 위한 것입니다. 여기에 다양한 정보를 담아서 표시할 수 있으며, 최대 세 줄까지만 보여집니다. 본문은 매우 길어질 수 있으며, 이 경우 나머지 부분은 숨겨지고 말줄임표로 처리됩니다.`,
    similarity: Math.floor(Math.random() * 101),
  })).sort((a, b) => b.similarity - a.similarity); // 유사도에 따라 내림차순 정렬
};

export interface SearchResult {
  id: number;
  title: string;
  content: string;
  similarity: number;
}

const TypingEffect = ( text: string ) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeedMs = 50; // 타이핑 속도를 조절합니다.

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(timer);
    }, typingSpeedMs);

    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const RecommendResultList: React.FC = () => {
  const navigate = useNavigate();
  const searchResults = createDummyData();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 페이지당 보여질 결과 수

  const handleListClick = (id: number) => {
    navigate(`/laws/${id}`);
  };

  // 현재 페이지에 보여질 데이터만 추출
  const currentData = searchResults.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 페이지 변경 시 호출되는 함수
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <>
      <div className={style.resultListContainer}>
        {currentData.map((item, index) => (
          <div
            key={item.id}
            className={style.resultItem}
            onClick={() => handleListClick(item.id)}
          >
            <div className={style.rankBox}>{index + 1}</div>
            <div className={style.titleContent}>
              <div className={style.title}>{item.title}</div>
              <div className={style.content}>{item.content}</div>
            </div>
            <div className={style.similarity}>
              <CircularProgressBar percentage={item.similarity} />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={searchResults.length}
        onChange={newPage => setCurrentPage(newPage)}
        showSizeChanger={false}
        style={{ textAlign: 'center', marginTop: '5%' }}
      />
    </>
  );
};


export default RecommendResultList;
