import React, { useState } from 'react';
import { Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from '../../styles/search/SearchInput.module.css';

// Props 타입 정의
interface SearchInputProps {
  onSearch: (value: string, activeTab: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleSearch = (): void => {
    onSearch(searchTerm, activeTab);
  };
  
  const onTabChange = (activeKey: string): void => {
    setActiveTab(activeKey);
  }

  const tabItems = [
    {
      label: '판례 검색',
      key: 'lawcase',
    },
    {
      label: '법령 검색',
      key: 'law',
    },
  ]

  return (
    <div className={style.container}>
      <h3 className={style.title}>
        고도화된 검색 환경으로<br />99,999,999 건의 판례를 찾아보세요.
      </h3>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={onTabChange}
        items={tabItems}
        tabBarGutter={40}
        className={style.tabContainer}
      />
      <Input
        prefix={<SearchOutlined style={{ fontSize: '20px', padding: '0px 20px'}}/>}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={() => handleSearch()}
        className={style.searchInput}
        placeholder="키워드를 검색하세요"
      />
    </div>
  );
};

export default SearchInput;
