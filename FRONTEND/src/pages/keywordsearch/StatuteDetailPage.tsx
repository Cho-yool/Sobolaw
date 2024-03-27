import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from '../../styles/search/StatuteDetail.module.css';
import { SearchResult } from '../../components/search/SearchResultList';

const StatuteDetailPage: React.FC = () => {
  const location = useLocation();
  const statute = location.state as SearchResult;
  const [visibleContentSub, setVisibleContentSub] = useState<{ [key: number]: boolean }>({});

  // 내용 토글 함수
  const toggleContentSubVisibility = (index: number) => {
    setVisibleContentSub((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }
  interface ArticleSection {
    항: ArticleItem[];
    호: ArticleItem[];
    목?: ArticleItem[]; // '목'이 존재할 수도 있고 아닐 수도 있음을 가정
  }

  interface ArticleItem {
    항내용?: string;
    호내용?: string;
    목내용?: string; // '목내용'이 존재할 수도 있음
  }



  // JSON 문자열을 파싱하고, 각 항목을 리스트로 변환하여 표시하는 함수
  const parseArticleContentSub = (articleContentSub: string): JSX.Element => {
    try {
      // articleContentSub을 유효한 JSON 형식으로 전처리
      const validJsonString = articleContentSub
        .replace(/'/g, '"')
        .replace(/None/g, 'null')
        .replace(/t/g, '')
        .replace(/n/g, '')
        .replace(/ntttt/g, '    ')

      // 전처리된 문자열을 JSON으로 파싱
      const contentSubObject: ArticleSection[] = JSON.parse(validJsonString);

      // 파싱된 데이터를 바탕으로 JSX 생성
      return (
        <div>
          {contentSubObject.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.항.map((item, idx) => (
                <div key={`항-${idx}`}>
                  <p>{item.항내용}</p>
                </div>
              ))}
              {section.호.map((item, idx) => (
                <div key={`호-${idx}`}>
                  <p>{item.호내용}</p>
                </div>
              ))}
              {/* 추가적인 '목' 처리가 필요한 경우 여기에 구현 */}
            </React.Fragment>
          ))}
        </div>
      );
    } catch (error) {
      return <p></p>;
    }
  };


  if (!statute) {
    return <div>법령 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>{statute.statuteName}</h1>
      <p className={style.subtitle}>
        [시행 {statute.enforcementDate?.slice(0, 4)}. {statute.enforcementDate?.slice(4, 6)}. {statute.enforcementDate?.slice(6, 8)}.] [법률 제{statute.statuteNumber}호, {statute.publicationDate?.slice(0, 4)}. {statute.publicationDate?.slice(4, 6)}. {statute.publicationDate?.slice(6, 8)}., 타법개정]
      </p>
      <div className={style.info}>
        <p>분문 : {statute.statuteType}</p>
        <p>개정 : {statute.amendmentType}</p>
      </div>
      <p className={style.articleContent}>담당부처 : {statute.department}</p>
      {statute.statuteTexts?.map((article, index) => (
        <div key={index}>
          <h3
            className={style.articleTitle}
            onClick={() => article.article_content_sub && toggleContentSubVisibility(index)}
          >
            {article.article_title}
            {article.article_content_sub && (
              <span className={style.toggleIcon}>
                {visibleContentSub[index] ? '▲' : '▼'}
              </span>
            )}
          </h3>
          <p className={style.articleContent}>{article.article_content}</p>
          {article.article_content_sub && visibleContentSub[index] && (
            <div className={style.articleContentSub}>
              {parseArticleContentSub(article.article_content_sub)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatuteDetailPage;