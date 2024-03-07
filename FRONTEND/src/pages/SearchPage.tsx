// SearchPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import { BookOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import SearchInput from '../components/search/SearchInput';
import RecentLawCase from '../components/search/RecentLawCase'; // 최근 본 판례 리스트 컴포넌트를 임포트합니다.
import pageStyle from '../styles/search/SearchPage.module.css';

const { Content } = Layout;

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  // Dummy data for recently viewed law cases, replace with real data as needed
  const [recentLawCases, setRecentLawCases] = useState([
    { id: 1, title: 'Law Case 1', summary: 'Summary of Law Case 1' },
    { id: 2, title: 'Law Case 2', summary: 'Summary of Law Case 2' },
    { id: 3, title: 'Law Case 3', summary: 'Summary of Law Case 3' },
    { id: 4, title: 'Law Case 4', summary: 'Summary of Law Case 4' },
    { id: 5, title: 'Law Case 5', summary: 'Summary of Law Case 5' },
    { id: 6, title: 'Law Case 6', summary: 'Summary of Law Case 6' },
    { id: 7, title: 'Law Case 7', summary: 'Summary of Law Case 7' },
    { id: 8, title: 'Law Case 8', summary: 'Summary of Law Case 8' },
    { id: 9, title: 'Law Case 9', summary: 'Summary of Law Case 9' },
    { id: 10, title: 'Law Case 10', summary: 'Summary of Law Case 10' },
  ]);

  const handleSearch = (searchQuery: string, activeTab: string) => {
    console.log(`검색어: ${searchQuery}, 활성 탭: ${activeTab}`);
    // 실제 검색 로직은 여기에 구현합니다.
    // setSearchResults(검색 결과);
  };

  return (
    <Layout style={{ backgroundColor: '#F8F0D6' }}>
      <Content style={{ padding: '0rem' }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <div className={pageStyle.searchContainer}>
              <SearchInput onSearch={handleSearch}/* onSearch handler */ />
            </div>
          </Col>
        </Row>
        <div className={pageStyle.middleContainer}>
          <Row gutter={[16, 16]} justify="space-between">
            {/* Category cards on the left side */}
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className={pageStyle.categoryCardsContainer}>
                <Card hoverable onClick={() => navigate('/cases')} className={pageStyle.singleCategoryCard}>
                  <BookOutlined style={{ marginRight: 20, color: '#644419'}} />
                  사람들이 가장 많이 본 판례
                </Card>
                <Card hoverable onClick={() => navigate('/laws')} className={pageStyle.singleCategoryCard}>
                  <CommentOutlined style={{ marginRight: 20, color: '#644419' }} />
                  사람들이 가장 많이 본 법령
                </Card>
                <Card hoverable onClick={() => navigate('/favorites')} className={pageStyle.singleCategoryCard}>
                  <StarOutlined style={{ marginRight: 20, color: '#644419' }} />
                  내 스크랩
                </Card>
              </div>
            </Col>
            {/* Recent Law Cases List on the right side */}
            <div className={pageStyle.recentLawCaseContainer}>
              <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                <RecentLawCase lawCases={recentLawCases} />
              </Col>
            </div>
          </Row>
        </div>
      </Content>
    </Layout >
  );
};


export default SearchPage;
