import React, { useState, useEffect, } from 'react';
import { Pagination } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../../styles/recommend/RecommendResultList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import CircularProgressBar from './CircularProgressBar'; // Update with your actual path
import CountUp from 'react-countup';
export interface SearchResult { 
  precedentId: number;
  caseName: string;
  caseContent: string;
  similarity: number;
}

const RecommendResultList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    Array.isArray(location.state?.searchResults)
      ? location.state.searchResults
      : []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortOption, setSortOption] = useState<'similarity' | 'latest'>('similarity');
  const [isMobile, setIsMobile] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [averageSimilarity, setAverageSimilarity] = useState(50);
  const [top20Similarity, setTop20Similarity] = useState(0);

  const handleListClick = (precedentId: number) => {
    navigate(`/laws/${precedentId}`);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option: 'similarity' | 'latest') => {
    setSortOption(option);
    const sortedResults = [...searchResults];
    if (option === 'similarity') {
      sortedResults.sort((a, b) => b.similarity - a.similarity);
    } else if (option === 'latest') {
      sortedResults.sort((a, b) => b.precedentId - a.precedentId);
    }
    setSearchResults(sortedResults);
  };

  useEffect(() => {
    console.log("검색 결과:", searchResults);
    if(Array.isArray(searchResults)) {
      setTotalCount(searchResults.length);

      const top20Results = searchResults.slice(0, 20);
      const top20TotalSimilarity = top20Results.reduce(
        (sum: number, result: SearchResult) => sum + result.similarity,
        0
      );
      const top20AverageSimilarity = Math.round(
        top20TotalSimilarity / top20Results.length
      );
      setTop20Similarity(top20AverageSimilarity);
    }

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
    const top20TotalSimilarity = top20Results.reduce(
      (sum: number, result: SearchResult) => sum + result.similarity, 0);
    const top20AverageSimilarity = Math.round(top20TotalSimilarity / top20Results.length);
    setTop20Similarity(top20AverageSimilarity);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(countInterval);
    };
  }, [searchResults]);

  const currentData = searchResults.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
        {currentData.map((item: SearchResult, index: number) => (
          <div
            key={item.precedentId}
            className={style.resultItem}
            onClick={() => handleListClick(item.precedentId)}
          >
            <div className={style.rankBox}>
              {index === 0 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.gold}`} />}
              {index === 1 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.silver}`} />}
              {index === 2 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.bronze}`} />}
              {index + 1}</div>
            <div className={style.titleContent}>
              <div className={style.title}>{item.caseName}</div>
              <div className={style.content}>{item.caseContent}</div>
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
