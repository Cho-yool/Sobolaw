import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStatuteDetail } from '../../api/lawsearch';
import style from '../../styles/search/StatuteDetail.module.css';

interface Article {
  statute_id: number;
  statute_number: number;
  article_content: string;
  article_content_sub: string;
  article_effective_date: string;
  article_number: string;
  article_number_sub: string;
  article_title: string;
  article_type: string;
}

interface Statute {
  statuteNumber: number;
  statuteName: string;
  statuteType: string;
  amendmentType: string;
  department: string;
  enforcementDate: string;
  publicationDate: string;
  publicationNumber: string;
  statuteTexts: Article[];
}

const StatuteDetail: React.FC = () => {
  const { statuteNumber } = useParams<{ statuteNumber: string }>();
  const [statute, setStatute] = useState<Statute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatute = async () => {
      try {
        if(statuteNumber) {
          const data = await getStatuteDetail(Number(statuteNumber));
          setStatute(data);
          setLoading(false);
        }
      } catch(error) {
        setError('법령 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchStatute();
  }, [statuteNumber]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!statute) {
    return null;
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
      <h2 className={style.chapterTitle}>행정조사기본법</h2>
      <p className={style.chapterContent}>
        제1장 총칙
      </p>
      {statute.statuteTexts.map((article) => (
        <div key={article.statute_id}>
          <h3 className={style.articleTitle}>{article.article_title}</h3>
          <p className={style.articleContent}>{article.article_content}</p>
        </div>
      ))}
    </div>
  );
};

export default StatuteDetail;