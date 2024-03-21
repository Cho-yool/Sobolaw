// SearchPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import { BookOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import SearchInput from '../../components/search/SearchInput';
import RecentLawCase from '../../components/search/RecentLawCase'; // 최근 본 판례 리스트 컴포넌트를 임포트합니다.
import pageStyle from '../../styles/search/SearchPage.module.css';

const { Content } = Layout;

const SearchPage = () => {
  const navigate = useNavigate();
  // Dummy data for recently viewed law cases, replace with real data as needed
  const [recentLawCases] = useState([
    { id: 1, title: '서울고등법원 2007. 4. 19. 선고 2007노78 판결 살인·살인미수·살인음모', type: '판례' as '판례' },
    { id: 2, title: '서울고등법원 2020. 8. 27. 선고 2020노927,2020전노73(병합),2020보노35(병합) 판결 살인,살인미수,마약류관리에관한법률위반(향정),절도,부착명령,보호관찰명령', type: '판례' as '판례' },
    { id: 3, title: '서울고등법원 2018. 8. 10. 선고 2018노547,2018전노27(병합) 판결 살인미수,도로교통법위반(음주운전),부착명령', type: '판례' as '판례' },
    { id: 4, title: '부산고등법원 2013. 8. 21. 선고 2013노72 판결 살인,유해화학물질관리법위반(환각물질흡입)', type: '판례' as '판례' },
    { id: 5, title: '부산고등법원 2019. 7. 18. 선고 2019노183 판결 살인미수,출입국관리법', type: '판례' as '판례' },
    { id: 6, title: '서울고등법원 2014. 12. 18. 선고 2014노1883 판결 살인미수,감금', type: '법령' as '법령' },
    { id: 7, title: '부산고등법원 2018. 5. 30. 선고 2018노22 판결 살인,살인미수', type: '법령' as '법령' },
    { id: 8, title: '대전고등법원 2015. 7. 17. 선고 2015노266 판결 살인미수,특정범죄가중처벌등에괸한법률위반(위험운전치사상),도로교통법위반(음주운전)', type: '법령' as '법령' },
    { id: 9, title: '대법원 1951. 5. 1. 선고 4283형상73 판결 방화살인미수', type: '법령' as '법령' },
    { id: 10, title: '대전고등법원 2019. 1. 18. 선고 2018노485,2018전노32(병합) 판결 살인,살인예비,절도,도로교통법위반(음주측정거부),부착명령', type: '법령' as '법령' },
  ]);

  // 검색 함수
  const handleSearch = (searchTerm: string, activeTab: string, results: any) => {
    console.log(`검색어: ${searchTerm}, 활성 탭: ${activeTab}`);
    console.log('검색 결과(SearchPage):', results);
  }

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
          <Row gutter={[16, 16]} justify="space-between">
            {/* Category cards on the left side */}
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className={pageStyle.categoryCardsContainer}>
                <Card hoverable onClick={() => navigate('/cases')} className={pageStyle.singleCategoryCard}>
                  <BookOutlined style={{ marginRight: 20, color: '#644419' }} />
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
