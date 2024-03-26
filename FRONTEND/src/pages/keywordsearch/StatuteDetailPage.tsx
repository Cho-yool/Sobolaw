import React from 'react';
import { useLocation } from 'react-router-dom';
import style from '../../styles/search/StatuteDetail.module.css';
import { SearchResult } from '../../components/search/SearchResultList';

const StatuteDetail: React.FC = () => {
  const location = useLocation();
  const { statute } = location.state as { statute: SearchResult };

  // console.log("Received statute data:", statute.statuteTexts);

  if (!statute || !statute.statuteTexts) {
    return <div>법령 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>{statute.statuteName}</h1>
      <p className={style.subtitle}>
        [시행 {statute.enforcementDate.slice(0, 4)}. {statute.enforcementDate.slice(4, 6)}. {statute.enforcementDate.slice(6, 8)}.] [법률 제{statute.statuteNumber}호, {statute.publicationDate.slice(0, 4)}. {statute.publicationDate.slice(4, 6)}. {statute.publicationDate.slice(6, 8)}., 타법개정]
      </p>
      <div className={style.info}>
        <p>분문 : {statute.statuteType}</p>
        <p>개정 : {statute.amendmentType}</p>
      </div>
      <h2 className={style.chapterTitle}>{statute.statuteName}</h2>
      <p className={style.chapterContent}>
        법률 제 {statute.publicationNumber}호, 공포일 {statute.enforcementDate}, 시행일 {statute.publicationDate}
      </p>
      <p className={style.articleContent}>{statute.department}</p>
      {statute.statuteTexts.map((article, index) => (
          <div key={index}>
            <h2>{article.article_title || `조문 ${article.article_number}`}</h2>
            <p>{article.article_content}</p>
        </div>
      ))}
    </div>
  );
};

export default StatuteDetail;