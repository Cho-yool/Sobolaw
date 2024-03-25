// SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import { BookOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import SearchInput from '../../components/search/SearchInput';
import RecentLawCase from '../../components/search/RecentLawCase';
import pageStyle from '../../styles/search/SearchPage.module.css';
import { getRecentPrecedents } from '../../api/members';

const { Content } = Layout;

const SearchPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [recentCases, setRecentCases] = useState([]);

  useEffect(() => {
    fetchRecentPrecedents();
  }, []);

  const fetchRecentPrecedents = async () => {
    try {
      if (accessToken) {
        const response = await getRecentPrecedents(accessToken);
        setRecentCases(response);
      }
    } catch (error) {
      console.error('최근 본 판례 조회 오류:', error);
    }
  };


  return (
    <Layout style={{ backgroundColor: '#F3E7C0' }}>
      <Content style={{ padding: '0rem' }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <div className={pageStyle.searchContainer}>
              <SearchInput />
            </div>
          </Col>
        </Row>
        <div className={pageStyle.middleContainer}>
          <Row gutter={[16, 16]} justify="center">
            {/* Category cards on the left side */}
            <Col span={24}>
              <div className={pageStyle.categoryCardsContainer}>
                <Card hoverable onClick={() => navigate('/hit')} className={pageStyle.singleCategoryCard}>
                  <BookOutlined style={{ marginRight: 20, color: '#644419' }} />
                  인기 판례 둘러보기
                </Card>
                <Card hoverable onClick={() => navigate('/hit')} className={pageStyle.singleCategoryCard}>
                  <CommentOutlined style={{ marginRight: 20, color: '#644419' }} />
                  인기 법령 둘러보기
                </Card>
                <Card hoverable onClick={() => navigate('/mypage/case')} className={pageStyle.singleCategoryCard}>
                  <StarOutlined style={{ marginRight: 20, color: '#644419' }} />
                  내가 저장한 판례
                </Card>
              </div>
            </Col>
            {/* Recent Law Cases List on the right side */}
            <div className={pageStyle.recentLawCaseContainer}>
              <Col span={24}>
                <RecentLawCase recentCases={recentCases} />
              </Col>
            </div>
          </Row>
        </div>
      </Content>
    </Layout >
  );
};


export default SearchPage;
