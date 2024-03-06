// SearchPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { BookOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import SearchInput from '../components/search/SearchInput';
import SearchResultList from '../components/search/SearchResultList';
import pageStyle from '../styles/SearchPage.module.css';

const { Content } = Layout;

const SearchPage: React.FC = () => {
  const navigate = useNavigate();


  return (
    <Layout>
      <Content style={{ padding: '2rem' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <div className={pageStyle.searchContainer}>
              <SearchInput />
            </div>
            <div className={pageStyle.iconContainer}>
              <div className={pageStyle.iconWrapper} onClick={() => navigate('/cases')}>
                <BookOutlined className={pageStyle.icon} />
                <div className={pageStyle.iconText}>판례</div>
              </div>
              <div className={pageStyle.iconWrapper} onClick={() => navigate('/laws')}>
                <CommentOutlined className={pageStyle.icon} />
                <div className={pageStyle.iconText}>법령</div>
              </div>
              <div className={pageStyle.iconWrapper} onClick={() => navigate('/favorites')}>
                <StarOutlined className={pageStyle.icon} />
                <div className={pageStyle.iconText}>스크랩</div>
              </div>
            </div>
            <SearchResultList searchResults={[]}/>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchPage;
