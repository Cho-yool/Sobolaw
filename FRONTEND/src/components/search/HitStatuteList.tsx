import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import style from "../../styles/search/HitStatuteList.module.css";
import { getHitStatuteList } from "../../api/lawsearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export interface Statute {
    statuteNumber: number;
    statuteName: string;
    statuteType: string;
    amendmentType: string;
    department: string;
    enforcementDate: string;
    publicationDate: string;
    publicationNumber: string;
    hit: number;
};

const HitStatuteList: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [statutes, setStatutes] = useState<Statute[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        fetchHitStatuteList();
    }, []);

    const fetchHitStatuteList = async () => {
        try {
            const response = await getHitStatuteList();
            if (Array.isArray(response)) {
                const sortedStatutes = response.sort((a, b) => b.hit - a.hit);
                setStatutes(sortedStatutes);
                setTotalCount(response.length);
            }
        } catch (error) {
            console.error("법령 목록 조회 오류:", error);
        }
    };

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleListClick = (statuteNumber: number) => {
        window.scrollTo(0, 0);
        console.log('클릭한 법령 번호:', statuteNumber)
        navigate(`/statutes/${statuteNumber}`);
    };

    const cleanHtmlTags = (html: string) => {
        return html.replace(/<[^>]*>?/gm, "");
    };

    const currentData = statutes.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
            <div className={style.hitStatuteContainer}>
                {currentData.map((item, index) => (
                    <div
                        key={item.statuteNumber}
                        className={style.hitStatuteItem}
                        onClick={() => handleListClick(item.statuteNumber)}
                    >
                        <div className={style.rankBox}>
                            {currentPage === 1 && index === 0 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.gold}`} />}
                            {currentPage === 1 && index === 1 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.silver}`} />}
                            {currentPage === 1 && index === 2 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.bronze}`} />}
                            {(currentPage - 1) * pageSize + index + 1}
                        </div>
                        <div className={style.titleContent}>
                            <div className={style.title}>{item.statuteName}</div>
                            <div className={style.content}>
                                법률 제 {item.publicationNumber}호,
                                공포일 {item.enforcementDate ? item.enforcementDate.slice(0, 4) : ''}.{''}
                                {item.enforcementDate ? item.enforcementDate.slice(4, 6) : ''}.{''}
                                {item.enforcementDate ? item.enforcementDate.slice(6, 8) : ''},
                                시행일 {item.publicationDate ? item.publicationDate.slice(0, 4) : ''}.{''}
                                {item.publicationDate ? item.publicationDate.slice(4, 6) : ''}.{''}
                                {item.publicationDate ? item.publicationDate.slice(6, 8) : ''}
                            </div>
                        </div>
                        <div className={style.hit}>
                            조회수: {item.hit}
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCount}
                onChange={handleChangePage}
                showSizeChanger={false}
                style={{ textAlign: 'center', marginTop: '5%' }}
            />
        </>
    );
};

export default HitStatuteList;