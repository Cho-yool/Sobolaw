// src/components/search/SearchResultList.tsx
import React from 'react';
import { List } from 'antd';
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
  return (
    <List
      className={style.searchResultList}
      itemLayout="vertical"
      dataSource={searchResults}
      renderItem={item => (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={<a href={`/laws/${item.id}`}>{item.title}</a>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};

export default SearchResultList;
