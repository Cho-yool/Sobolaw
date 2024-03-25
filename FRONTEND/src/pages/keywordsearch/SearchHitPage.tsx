import React from "react";
import { useLocation } from "react-router-dom";
import HitLawCaseList from "../../components/search/HitLawCaseList";
import style from "../../styles/search/SearchHitPage.module.css";

const SearchHitPage: React.FC = () => {

    return (
        <div className={style.hitResultSection}>
            <h2>인기 판례 리스트</h2>
            <HitLawCaseList />
        </div>
    );
};

export default SearchHitPage;