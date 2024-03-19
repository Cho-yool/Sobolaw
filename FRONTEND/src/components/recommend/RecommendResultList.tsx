import React, { useState, useEffect, } from 'react';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/recommend/RecommendResultList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import CircularProgressBar from './CircularProgressBar'; // Update with your actual path
import CountUp from 'react-countup';

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

const RecommendResultList: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>(createDummyData());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 페이지당 보여질 결과 수
  const [sortOption, setSortOption] = useState<'similarity' | 'latest'>('similarity');
  const [isMobile, setIsMobile] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [averageSimilarity, setAverageSimilarity] = useState(50);
  const [top20Similarity, setTop20Similarity] = useState(0);

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

  const handleSortChange = (option: 'similarity' | 'latest') => {
    setSortOption(option);
    if (option === 'similarity') {
      setSearchResults([...searchResults].sort((a, b) => b.similarity - a.similarity));
    } else if (option === 'latest') {
      setSearchResults([...searchResults].sort((a, b) => b.id - a.id));
    }
  };

  useEffect(() => {
    const totalCount = searchResults.length;
    setTotalCount(totalCount);

    // 숫자 올라가는 효과 구현
    let currentCount = 0;
    const countInterval = setInterval(() => {
      if (currentCount >= totalCount) {
        clearInterval(countInterval);
      }
      if (currentCount < totalCount) {
        setTotalCount(currentCount + 1);
        currentCount++;
      }
    }, 50);

    const top20Results = searchResults.slice(0, 20);
    const top20TotalSimilarity = top20Results.reduce((sum, result) => sum + result.similarity, 0);
    const top20AverageSimilarity = Math.round(top20TotalSimilarity / top20Results.length);
    setTop20Similarity(top20AverageSimilarity);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 렌더링 시 호출
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(countInterval);
    };
  }, [searchResults]);

  return (
    <>
      <div className={style.headerContainer}>
        <div className={style.sortButtons}>
          <button
            className={sortOption === 'similarity' ? style.active : ''}
            onClick={() => handleSortChange('similarity')}
          >
            유사도 높은 순
          </button>
          <button
            className={sortOption === 'latest' ? style.active : ''}
            onClick={() => handleSortChange('latest')}
          >
            최신 순
          </button>
        </div>
        <div className={style.resultSummary}>
          <div className={style.summaryItem}>
            <div className={style.summaryValue}>
              <CountUp end={totalCount} duration={2} />
            </div>
            <div className={style.summaryLabel}>검색된 판례</div>
          </div>
          <div className={style.summaryItem}>
            <div className={style.summaryValue}>
              <CountUp end={averageSimilarity} duration={2} />%
            </div>
            <div className={style.summaryLabel}>전체 평균 유사도</div>
          </div>
          <div className={style.summaryItem}>
            <div className={style.summaryValue}>
              <CountUp end={top20Similarity} duration={2} />%
            </div>
            <div className={style.summaryLabel}>상위 20개 평균 유사도</div>
          </div>
        </div>
      </div>
      <div className={style.resultListContainer}>
        {currentData.map((item, index) => (
          <div
            key={item.id}
            className={style.resultItem}
            onClick={() => handleListClick(item.id)}
          >
            <div className={style.rankBox}>
              {index === 0 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.gold}`} />}
              {index === 1 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.silver}`} />}
              {index === 2 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.bronze}`} />}
              {index + 1}</div>
            <div className={style.titleContent}>
              <div className={style.title}>{item.title}</div>
              <div className={style.content}>{item.content}</div>
            </div>
            <div className={`${style.similarity} ${style.similarityMobile}`}>
              <CircularProgressBar percentage={item.similarity} size={isMobile ? 60 : 100} isMobile={isMobile} />
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
