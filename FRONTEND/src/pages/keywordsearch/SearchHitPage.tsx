import React from "react";
import { useLocation } from "react-router-dom";
import HitPrecedentList from "../../components/search/HitPrecedentList";
import HitStatuteList from "../../components/search/HitStatuteList";
import style from "../../styles/search/SearchHitPage.module.css";

const SearchHitPage: React.FC = () => {
    const location = useLocation();

    return (
        <div className={style.hitResultSection}>
            {location.pathname === "/hit/precedent" ? (
                <>
                    <h2>인기 판례 리스트</h2>
                    <HitPrecedentList />
                </>
            ) : location.pathname === "/hit/statute" ? (
                <>
                    <h2>인기 법령 리스트</h2>
                    <HitStatuteList />
                </>
            ) : null}
        </div>
    );
};

export default SearchHitPage;