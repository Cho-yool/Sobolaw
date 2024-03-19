import React from 'react';
import RecommendResultList from '../../components/recommend/RecommendResultList'; // 경로에 맞게 수정하세요
import style from '../../styles/recommend/RecommendResultPage.module.css'; // CSS 모듈 파일 경로를 확인하세요

const RecommendResultPage: React.FC = () => {
    return (
        <div className={style.resultSection}>
            <h2 className={style.resultsHeader}>추천 검색 결과</h2>
            <RecommendResultList />
        </div>
    );
};

export default RecommendResultPage;
