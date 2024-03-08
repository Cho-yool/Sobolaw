// src/pages/SearchResultPage.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Input, Tabs, Dropdown, Menu } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SearchResultList, { SearchResult } from "../components/search/SearchResultList";
import style from "../styles/search/SearchResultList.module.css";

const { TabPane } = Tabs;

const dummyData: SearchResult[] = [
  { id: 1, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 2, title: "판례 제목 2", content: "판례 내용 1" },
  { id: 3, title: "판례 제목 3", content: "판례 내용 1" },
  { id: 4, title: "판례 제목 4", content: "판례 내용 1" },
  { id: 5, title: "판례 제목 5", content: "판례 내용 1" },
  { id: 6, title: "판례 제목 6", content: "판례 내용 1" },
  { id: 7, title: "판례 제목 7", content: "판례 내용 1" },
  { id: 8, title: "판례 제목 8", content: "판례 내용 1" },
  { id: 9, title: "판례 제목 9", content: "판례 내용 1" },
  { id: 10, title: "판례 제목 10", content: "판례 내용 1" },
  { id: 11, title: "판례 제목 11", content: "판례 내용 1" },

];

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPage = 1; // 초기 페이지
  const [searchResults] = useState<SearchResult[]>(dummyData);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
  const pageSize = 10; // 한 페이지에 표시할 검색 결과의 수

  useEffect(() => {
    // URL에서 검색 쿼리 파라미터를 추출
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');

    if (searchQuery) {
      setSearchTerm(searchQuery); // 검색어 상태를 URL 쿼리에서 가져온 값으로 설정
      // 검색 쿼리를 사용하여 검색 결과를 가져오는 로직
      console.log(`검색 쿼리: ${searchQuery}`);
      // 예시: setSearchResults(검색 결과);
    }
  }, [location]);

  // 검색 결과를 현재 페이지에 맞게 필터링합니다.
  const paginatedResults = searchResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 검색 함수
  const handleSearch = () => {
    console.log(`검색어: ${searchTerm}`);
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  // 드롭다운 메뉴
  const courtMenu = (
    <Menu>
      <Menu.Item key="1">대법원</Menu.Item>
      <Menu.Item key="2">고등법원/특허법원/고등군사법원</Menu.Item>
      <Menu.Item key="3">지방법원/행정법원/가정법원/회생법원</Menu.Item>
    </Menu>
  );

  const levelMenu = (
    <Menu>
      <Menu.Item key="1">1심</Menu.Item>
      <Menu.Item key="2">2심</Menu.Item>
      <Menu.Item key="3">3심</Menu.Item>
    </Menu>
  );

  const periodMenu = (
    <Menu>
      <Menu.Item key="1">전체</Menu.Item>
      <Menu.Item key="2">1년</Menu.Item>
      <Menu.Item key="3">3년</Menu.Item>
      <Menu.Item key="4">5년</Menu.Item>
    </Menu>
  );

  return (
    <div className={style.searchPageContainer}>
      <div className={style.searchBox}>
        {/* 검색창 */}
        <Input
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: '24px', padding: '0 20px', fontWeight: '600'  }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          className={style.searchInput}
          placeholder="키워드를 검색하세요"
        />
      </div>
      <Tabs defaultActiveKey="1">
        {/* 판례 탭 */}
        <TabPane tab="판례" key="1">
          <div className={style.resultsHeader}>
            검색 결과 {searchResults.length} 건
          </div>
          <Dropdown overlay={courtMenu}>
            <span style={{ color: '#cccccc', marginRight: '10px' }}>법원</span>
          </Dropdown>
          <Dropdown overlay={levelMenu}>
            <span style={{ color: '#cccccc', marginRight: '10px' }}>심급</span>
          </Dropdown>
          <Dropdown overlay={periodMenu}>
            <span style={{ color: '#cccccc', marginRight: '10px' }}>기간</span>
          </Dropdown>
          <hr className={style.searchResultsDivider} />
          <SearchResultList searchResults={paginatedResults} />
        </TabPane>
        {/* 법령 탭 */}
        <TabPane tab="법령" key="2">
          {/* 법령 탭 컴포넌트 */}
        </TabPane>
      </Tabs>
      {/* 페이지네이션 */}
      <Pagination
        className={style.pagination}
        current={currentPage}
        pageSize={pageSize}
        total={searchResults.length}
        onChange={page => setCurrentPage(page)} />
    </div>
  );
};



export default SearchResultPage;
