import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import style from "../../styles/recommend/RecommendResultList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import CircularProgressBar from "./CircularProgressBar";
import CountUp from "react-countup";

export interface SearchResult {
  precedentId: number;
  caseName: string;
  caseContent: string;
  similarity: number;
  judgmentDate: string;
}

const RecommendResultList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortOption, setSortOption] = useState<"similarity" | "latest">(
    "similarity"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [averageSimilarity, setAverageSimilarity] = useState(0);
  const [top20Similarity, setTop20Similarity] = useState(0);

  useEffect(() => {
    const results = location.state?.searchResults?.precedents;
    if (results && Array.isArray(results)) {
      setSearchResults(results);
      setTotalCount(results.length);
      calculateAverageSimilarity(results);
      calculateTop20Similarity(results);
    }
  }, [location.state]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateAverageSimilarity = (results: SearchResult[]) => {
    const totalSimilarity = results.reduce(
      (sum, result) => sum + result.similarity,
      0
    );
    const averageSimilarity = Math.round(totalSimilarity / results.length);
    setAverageSimilarity(averageSimilarity);
  };

  const calculateTop20Similarity = (results: SearchResult[]) => {
    const top20Results = results.slice(0, 20);
    const top20TotalSimilarity = top20Results.reduce(
      (sum, result) => sum + result.similarity,
      0
    );
    const top20AverageSimilarity = Math.round(
      top20TotalSimilarity / top20Results.length
    );
    setTop20Similarity(top20AverageSimilarity);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option: "similarity" | "latest") => {
    setSortOption(option);
    const sortedResults = [...searchResults];

    if (option === "similarity") {
      sortedResults.sort((a, b) => b.similarity - a.similarity);
    } else if (option === "latest") {
      sortedResults.sort((a, b) =>
        b.judgmentDate.localeCompare(a.judgmentDate)
      );
    }
    setSearchResults(sortedResults);
  };

  const handleListClick = (precedentId: number) => {
    window.scrollTo(0, 0);
    navigate(`/laws/${precedentId}`, { state: { currentPage, sortOption } }); // 페이지 이동 시 상태 전달
  };

  // HTML 태그 지우고 텍스트만 표시
  const cleanHtmlTags = (htmlString: string) => {
    return htmlString.replace(/<[^>]*>?/gm, "");
  };

  const currentData = searchResults.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className={style.headerContainer}>
        <div className={style.sortButtons}>
          <button
            className={sortOption === "similarity" ? style.active : ""}
            onClick={() => handleSortChange("similarity")}>
            유사도 높은순
          </button>
          <button
            className={sortOption === "latest" ? style.active : ""}
            onClick={() => handleSortChange("latest")}>
            최신순
          </button>
        </div>
        <div className={style.resultSummary}>
          <div className={style.summaryItem}>
            <div className={style.summaryValue}>
              <CountUp end={totalCount} duration={2} />건
            </div>
            <div className={style.summaryLabel}>검색된 판례수</div>
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
            <div className={style.summaryLabel}>상위 20개 유사도</div>
          </div>
        </div>
      </div>
      <div className={style.resultListContainer}>
        {currentData.map((item, index) => (
          <div
            key={item.precedentId}
            className={style.resultItem}
            onClick={() => handleListClick(item.precedentId)}>
            <div className={style.rankBox}>
              {currentPage === 1 && index === 0 && (
                <FontAwesomeIcon
                  icon={faMedal}
                  className={`${style.medal} ${style.gold}`}
                />
              )}
              {currentPage === 1 && index === 1 && (
                <FontAwesomeIcon
                  icon={faMedal}
                  className={`${style.medal} ${style.silver}`}
                />
              )}
              {currentPage === 1 && index === 2 && (
                <FontAwesomeIcon
                  icon={faMedal}
                  className={`${style.medal} ${style.bronze}`}
                />
              )}
              {(currentPage - 1) * pageSize + index + 1}
            </div>
            <div className={style.titleContent}>
              <div className={style.title}>{item.caseName}</div>
              <div className={style.content}>
                {cleanHtmlTags(item.caseContent)}
              </div>
            </div>
            <div className={`${style.similarity} ${style.similarityMobile}`}>
              <CircularProgressBar
                percentage={Math.round(item.similarity)}
                size={isMobile ? 60 : 100}
                isMobile={isMobile}
              />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={searchResults.length}
        onChange={handleChangePage}
        showSizeChanger={false}
        style={{ textAlign: "center", marginTop: "5%" }}
      />
    </>
  );
};

export default RecommendResultList;
