// RecentLawCase.tsx
import React from 'react';
import { List } from 'antd';
import style from '../../styles/search/RecentLawCase.module.css'; // Assuming you have CSS module for styling

interface LawCase {
  id: number;
  title: string;
  summary: string;
}

interface RecentLawCaseProps {
  lawCases: LawCase[];
}

const RecentLawCase: React.FC<RecentLawCaseProps> = ({ lawCases }) => {
  return (
    <div className={style.recentLawCaseContainer}>
      <div className={style.recentLawCaseTitle}>
        <h3>최근 본 판례</h3>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={lawCases.slice(0, 10)} // 처음 10개 항목만 표시
        renderItem={(lawCase, index) => (
          <List.Item className={index >= 5 ? style.hiddenItem : ''}>
            <List.Item.Meta
              title={<a href={`/cases/${lawCase.id}`}>{lawCase.title}</a>}
              description={lawCase.summary}
            />
          </List.Item>
        )}
        className={style.recentLawCaseList}
        locale={{ emptyText: '' }}
      />
    </div>
  );
};

export default RecentLawCase;
