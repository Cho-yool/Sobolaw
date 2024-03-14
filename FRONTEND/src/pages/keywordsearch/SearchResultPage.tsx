// src/pages/SearchResultPage.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Input, Tabs, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SearchResultList, { SearchResult } from "../../components/search/SearchResultList";
import style from "../../styles/search/SearchResultList.module.css";

const dummyData: SearchResult[] = [
  { id: 1, title: "판례 제목 판례 제목판례 제목판례 제목판례 제목판례 제목판례 제목판례 제목 1", content: "판례 내용 1판례 내용 1판례 내용 1판례 내용판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1" },
  { id: 2, title: "판례 제목 2판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1", content: "판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1판례 내용 1" },
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

const { Option } = Select;

interface FilterOptions {
  court: string[];
  instance: string[];
  date: string[];
}

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPage = 1; // 초기 페이지
  const [searchResults] = useState<SearchResult[]>(dummyData);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
  const [selectedCourt, setSelectedCourt] = useState<string>(''); // 선택된 법원 상태
  const [selectedInstance, setSelectedInstance] = useState<string>(''); // 선택된 심급 상태
  const [selectedDate, setSelectedDate] = useState<string>(''); // 선택된 기간 상태
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

  // 필터링 로직
  const filterResults = () => {
    const filtered = dummyData.filter(result =>
      (selectedCourt ? result.court === selectedCourt : true) &&
      (selectedInstance ? result.instance === selectedInstance : true) &&
      (selectedDate ? result.date === selectedDate : true)
    );

    console.log(selectedCourt, selectedInstance, selectedDate, filtered)
    return filtered
  };

  // 필터링된 검색 결과
  const filteredResults = filterResults();

  // 검색 결과를 현재 페이지에 맞게 필터링합니다.
  const paginatedResults = searchResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 검색 함수
  const handleSearch = () => {
    console.log(`검색어: ${searchTerm}`);
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  // 필터링된 검색 결과를 현재 페이지에 맞게 필터링합니다.
  const onCourtChange = (value: string): void => setSelectedCourt(value);
  const onInstanceChange = (value: string): void => setSelectedInstance(value);
  const onDateChange = (value: string): void => setSelectedDate(value);

  const tabsItems = [
    {
      label: '판례',
      key: '1',
      children: (
        <>
          <div className={style.selectContainer}>
            <Select defaultValue="법원" style={{ width: 95 }} onChange={onCourtChange} className={style.singleSelect}>
              <Option value="대법원">대법원</Option>
              <Option value="고등법원">고등법원</Option>
              <Option value="지방법원">지방법원</Option>
            </Select>
            <Select defaultValue="심급" style={{ width: 70 }} onChange={onInstanceChange} className={style.singleSelect}>
              <Option value="1심">1심</Option>
              <Option value="2심">2심</Option>
              <Option value="3심">3심</Option>
            </Select>
            <Select defaultValue="기간" style={{ width: 70 }} onChange={onDateChange} className={style.singleSelect}>
              <Option value="전체">전체</Option>
              <Option value="1년">1년</Option>
              <Option value="3년">3년</Option>
              <Option value="5년">5년</Option>
            </Select>
          </div>
          <div className={style.searchResultList}>
            <SearchResultList searchResults={paginatedResults} />
          </div>
        </>
      ),
    },
    {
      label: '법령',
      key: '2',
      children: (
        // 법령 탭 내용
        <div>법령 관련 내용</div>
      ),
    },
  ];

  return (
    <div className={style.searchPageBackground}>
      <div className={style.searchPageContainer}>
        <Input
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          className={style.searchInput}
          placeholder="키워드를 검색하세요"
        />
        <div className={style.tabs}>
          <Tabs
            items={tabsItems}
            tabBarGutter={40}
          />
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize} // 페이지 사이즈, 필요에 따라 조정
          total={filteredResults.length}
          onChange={(page) => setCurrentPage(page)}
          className={style.pagination}
        />
      </div>
    </div>
  );
};

export default SearchResultPage;
