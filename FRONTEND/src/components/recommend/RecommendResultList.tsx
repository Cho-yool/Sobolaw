import React from 'react';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/search/SearchResultList.module.css'; // 적절한 경로로 수정

// 더미 데이터 생성 함수
const createDummyData = () => {
  return Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    title: `제목 ${index + 1}`,
    content: `본문 내용 ${index + 1}. 이 텍스트는 예시를 위한 것입니다. 여기에 다양한 정보를 담아서 표시할 수 있으며, 최대 세 줄까지만 보여집니다. 본문은 매우 길어질 수 있으며, 이 경우 나머지 부분은 숨겨지고 말줄임표로 처리됩니다.`,
    similarity: Math.floor(Math.random() * 101),
  }));
};

export interface SearchResult {
  id: number;
  title: string;
  content: string;
  similarity: number;
}

interface RecommendResultListProps {
  searchResults?: SearchResult[];
}

const RecommendResultList: React.FC<RecommendResultListProps> = ({ searchResults }) => {
  const navigate = useNavigate();
  const dummySearchResults = createDummyData(); // 더미 데이터 사용

  const handleListClick = (id: number) => {
    navigate(`/laws/${id}`);
  };

  return (
    <List
      className={style.searchResultList}
      itemLayout="horizontal"
      dataSource={dummySearchResults} // 더미 데이터를 dataSource로 지정
      renderItem={item => (
        <List.Item 
          key={item.id}
          className={style.item}
          onClick={() => handleListClick(item.id)}
          actions={[<div className={style.similarity}>{item.similarity}% 유사도</div>]}
        >
          <List.Item.Meta
            title={<a className={style.itemTitle}>{item.title}</a>}
            description={<p className={style.itemContent}>{item.content}</p>}
          />
        </List.Item>
      )}
    />
  );
};

export default RecommendResultList;
