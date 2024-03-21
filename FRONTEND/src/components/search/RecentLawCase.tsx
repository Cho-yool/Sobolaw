// RecentLawCase.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트합니다.
import { List } from 'antd';
import style from '../../styles/search/RecentLawCase.module.css'; // Assuming you have CSS module for styling

interface LawCase {
  id: number;
  title: string;
  type: '판례' | '법령'; 
}

interface RecentLawCaseProps {
  lawCases: LawCase[];
}

const RecentLawCase: React.FC<RecentLawCaseProps> = ({ lawCases }) => {
  const navigate = useNavigate();

  // 상세 페이지로 이동하는 함수
  const handleNavigate = (id: number, type: '판례' | '법령') => {
    // type에 따라 경로를 설정합니다.
    const path = type === '판례' ? `/lawss/${id}` : `/statutes/${id}`;
    navigate(path); // 설정된 경로로 이동합니다.
  };

  return (
    <div className={style.recentLawCaseContainer}>
      <div className={style.recentLawCaseTitle}>
        <h3>최근 본 판례</h3>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={lawCases.slice(0, 10)} // 처음 10개 항목만 표시
        renderItem={(lawCase, index) => (
          <List.Item 
          className={`{style.listItem} ${index >= 5 ? style.hiddenItem : ''}`}
          onClick={() => handleNavigate(lawCase.id, lawCase.type)}> 
            <div className={style.caseTypeBox}>{lawCase.type}</div>
            <div className={style.caseTitle}>{lawCase.title}</div>
          </List.Item>
        )}
        className={style.recentLawCaseList}
        locale={{ emptyText: '최근 판례/법령 이 없습니다' }} // 빈 문자열 대신 적절한 메시지를 표시하도록 설정
      />
    </div>
  );
};

export default RecentLawCase;
