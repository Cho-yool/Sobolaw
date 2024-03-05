// SearchPage.tsx
import React, { useState } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import SearchInput from '../components/search/SearchInput';
import SearchResultList from '../components/search/SearchResultList';
import pageStyle from '../styles/SearchPage.module.css';

const { Content } = Layout;
const { Title } = Typography;

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (value: string) => {
    // 여기에 검색 로직을 구현하세요.
    // 예: API 호출 및 검색 결과 상태 업데이트
    console.log('검색 실행:', value);
  };

  return (
    <Layout>
      <Content style={{ padding: '2rem' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <div className={pageStyle.searchContainer}>
              <Title level={3} style={{ color: 'white', textAlign: 'center', marginBottom: '7rem'}}>
                고도화된 검색 환경으로<br />99,999,999 건의 판례를 찾아보세요.
              </Title>
              <SearchInput onSearch={handleSearch} />
            </div>
          </Col>
        </Row>
        
        <SearchResultList searchResults={searchResults} />
      </Content>
    </Layout>
  );
};

export default SearchPage;
