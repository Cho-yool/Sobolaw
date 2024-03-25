import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/search/HitLawCaseList.module.css';
import { getHitPrecedentList } from '../../api/lawsearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

export interface LawCase {
    precedentId: number;
    caseName: string;
    caseContent: string;
    hit: number;
}

const HitLawCaseList: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [lawCases, setLawCases] = useState<LawCase[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        fetchHitPrecedentList();
    }, []);

    const fetchHitPrecedentList = async () => {
        try {
            const response = await getHitPrecedentList();
            console.log('판례 목록 조회 결과:', response); // 판례 목록 조회 결과 확인
            if (Array.isArray(response)) {
                const sortedLawCases = response.sort((a, b) => b.hit - a.hit); // 조회수 내림차순 정렬
                setLawCases(sortedLawCases)
                setTotalCount(response.length);
            }
        } catch (error) {
            console.error('판례 목록 조회 오류:', error);
        }
    };

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleListClick = (precedentId: number) => {
        window.scrollTo(0, 0);
        navigate(`/laws/${precedentId}`);
    };

    // HTML 태그 지우고 텍스트만 표시
    const cleanHtmlTags = (html: string) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    const currentData = lawCases.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
            <div className={style.hitLawCaseContainer}>
                {currentData.map((item, index) => (
                    <div
                        key={item.precedentId}
                        className={style.hitLawCaseItem}
                        onClick={() => handleListClick(item.precedentId)}
                    >
                        <div className={style.rankBox}>
                            {currentPage === 1 && index === 0 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.gold}`} />}
                            {currentPage === 1 && index === 1 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.silver}`} />}
                            {currentPage === 1 && index === 2 && <FontAwesomeIcon icon={faMedal} className={`${style.medal} ${style.bronze}`} />}
                            {(currentPage - 1) * pageSize + index + 1}
                        </div>
                        <div className={style.titleContent}>
                            <div className={style.title}>{item.caseName}</div>
                            <div className={style.content}>{cleanHtmlTags(item.caseContent)}</div>
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

export default HitLawCaseList;
