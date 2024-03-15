import React from 'react';
import { Card } from 'antd';
import style from '../../styles/recommend/RecommendCard.module.css'; // CSS 스타일 파일 경로 확인 필요

// 가상의 카드 데이터
const cardData = [
    {
        description: "소중한 시간. 사용자의 상황에 맞게 판례를 찾아드립니다.",
        backgroundImageUrl: "/images/recommend_card1.png" // 실제 이미지 경로로 변경 필요
    },
    {
        description: "보다 정밀한 검색. 관심사와 필요에 꼭 맞춰 추천드립니다.",
        backgroundImageUrl: "/images/recommend_card2.png"
    },
    {
        description: "로직에 기반한 분석. 검색의 효율을 최대한 높여드립니다.",
        backgroundImageUrl: "/images/recommend_card3.png"
    }
];

const RecommendCards: React.FC = () => {
    return (
        <div className={style.cardsContainer}> {/* Flex 컨테이너로 카드들을 감쌈 */}
            {cardData.map((card, index) => (
                <div key={index} className={style.cardContainer} style={{ backgroundImage: `url(${card.backgroundImageUrl})` }}>
                    <Card bordered={false} className={style.customCard}>
                        <p>
                            {/* 첫 글자만 다른 색상으로 변경 */}
                            <span style={{ color: "#f3e7c0", fontWeight: 600, fontSize: 30 }}>{card.description.charAt(0)}</span>
                            {card.description.slice(1)}
                        </p>
                    </Card>

                </div>
            ))}
        </div>
    );
};

export default RecommendCards;
