import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "../../styles/search/StatuteDetail.module.css";
import { getStatuteDetail } from "../../api/lawsearch";

interface Statute {
  statuteNumber: number;
  statuteName: string;
  statuteType: string;
  amendmentType: string;
  department: string;
  enforcementDate: string;
  publicationDate: string;
  publicationNumber: string;
  hit: number;
  statuteTexts: StatuteText[];
}

interface StatuteText {
  statuteId: number;
  articleContent: string;
  articleContentSub: string;
  articleEffectiveDate: string;
  articleNumber: number;
  articleNumberSub: number;
  articleTitle: string;
  articleType: string;
}

interface ArticleSection {
  항: ArticleItem[];
  호: ArticleItem[];
  목?: ArticleItem[];
}

interface ArticleItem {
  항번호?: string;
  항내용?: string;
  호번호?: string;
  호내용?: string;
  목번호?: string;
  목내용?: string;
}

const StatuteDetailPage: React.FC = () => {
  const { statuteNumber } = useParams<{ statuteNumber: string }>();
  const [statute, setStatute] = useState<Statute | null>(null);
  const [visibleContentSub, setVisibleContentSub] = useState<{
    [key: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuteDetail = async () => {
      try {
        if (statuteNumber) {
          const data = await getStatuteDetail(Number(statuteNumber));
          setStatute(data);
          setLoading(false);
        }
      } catch (error) {
        setError("법령 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchStatuteDetail();
  }, [statuteNumber]);

  // 내용 토글 함수
  const toggleContentSubVisibility = (index: number) => {
    setVisibleContentSub((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // JSON 문자열을 파싱하고, 각 항목을 리스트로 변환하여 표시하는 함수
  const parseArticleContentSub = (articleContentSub: string): JSX.Element => {
    try {
      const validJsonString = articleContentSub
        .replace(/'/g, '"')
        .replace(/None/g, "null")
        .replace(/t/g, "")
        .replace(/n/g, "")
        .replace(/ntttt/g, "    ");

      const contentSubObject: ArticleSection[] = JSON.parse(validJsonString);

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
              {section.목?.map((item, idx) => (
                <div key={`목-${idx}`}>
                  <p>{item.목내용}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      );
    } catch (error: any) {
      return <p>해당 법령 세부내용이 존재하지 않습니다.</p>;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!statute) {
    return <div>법령 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>{statute.statuteName}</h1>
      <p className={style.subtitle}>
        [공포일{" "}
        {statute.enforcementDate ? statute.enforcementDate.slice(0, 4) : ""}.
        {""}
        {statute.enforcementDate ? statute.enforcementDate.slice(4, 6) : ""}.
        {""}
        {statute.enforcementDate ? statute.enforcementDate.slice(6, 8) : ""},
        시행일{" "}
        {statute.publicationDate ? statute.publicationDate.slice(0, 4) : ""}.
        {""}
        {statute.publicationDate ? statute.publicationDate.slice(4, 6) : ""}.
        {""}
        {statute.publicationDate ? statute.publicationDate.slice(6, 8) : ""}]
      </p>
      <div className={style.info}>
        <p>분문 : {statute.statuteType}</p>
        <p>개정 : {statute.amendmentType}</p>
      </div>
      <p className={style.articleContent}>담당부처 : {statute.department}</p>
      {statute.statuteTexts.map((article, index) => (
        <div key={article.statuteId}>
          <h3
            className={style.articleTitle}
            onClick={() =>
              article.articleContentSub && toggleContentSubVisibility(index)
            }>
            {article.articleTitle}
            {article.articleContentSub && (
              <span className={style.toggleIcon}>
                {visibleContentSub[index] ? "▲" : "▼"}
              </span>
            )}
          </h3>
          <p className={style.articleContent}>{article.articleContent}</p>
          {article.articleContentSub && visibleContentSub[index] && (
            <div className={style.articleContentSub}>
              {parseArticleContentSub(article.articleContentSub)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatuteDetailPage;
