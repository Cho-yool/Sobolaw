// src/components/search/SearchInput.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from '../../styles/search/SearchInput.module.css';
import CountUp from 'react-countup';

const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('precedent');

  const handleSearch = (): void => {
    window.scrollTo(0, 0);
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}&tab=${activeTab}`);
  };

  const onTabChange = (activeKey: string): void => {
    setActiveTab(activeKey);
  };

  const tabItems = [
    {
      label: '판례 검색',
      key: 'precedent',
    },
    {
      label: '법령 검색',
      key: 'statute',
    },
  ];


  return (
    <div className={style.container} style={{background: `url("/images/SearchInputImage.png")`}}>
      <h3 className={style.title}>
        소보로의 고도화된 검색 환경으로<br />
        <CountUp end={270222} duration={3} separator="," />건의 법률 데이터를 찾아보세요.
      </h3>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={onTabChange}
        items={tabItems}
        tabBarGutter={60}
        className={style.tabContainer}
      />
      <Input
        prefix={<SearchOutlined style={{ fontSize: '20px', padding: '0px 20px' }} />}
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
