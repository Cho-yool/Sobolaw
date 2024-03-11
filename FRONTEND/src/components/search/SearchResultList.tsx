// src/components/search/SearchResultList.tsx
import React from 'react';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/search/SearchResultList.module.css';

export interface SearchResult {
  id: number;
  title: string;
  content: string;
}

interface SearchResultListProps {
  searchResults: SearchResult[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchResults }) => {
  const navigate = useNavigate();

  // list 아이템 클릭 시 호출되는 함수
  const handleItemClick = (id: number) => {
    navigate(`/laws/${id}`);
  };

  return (
    <List
      className={style.searchResultList}
      itemLayout="vertical"
      dataSource={searchResults}
      renderItem={item => (
        <List.Item 
        key={item.id}
        className={style.item}
        onClick={() => handleItemClick(item.id)}> 
          <List.Item.Meta
            title={<a className={style.itemTitle} href={`/laws/${item.id}`}>{item.title}</a>}
            description={<p className={style.itemContent}>{item.content}</p>}
          />
        </List.Item>
      )}
    />
  );
};

export default SearchResultList;
