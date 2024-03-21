// src/pages/SearchResultPage.tsx
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Input, Tabs, Select, Skeleton } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SearchResultList, { SearchResult } from "../../components/search/SearchResultList";
import style from "../../styles/search/SearchResultList.module.css";
import { searchPrecedent, searchStatute } from "../../api/lawsearch";

const { Option } = Select;

interface FilterOptions {
  court: string[];
  instance: string[];
  date: string[];
}

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [selectedInstance, setSelectedInstance] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const pageSize = 10;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');
    const activeTab = location.state?.activeTab || 'precedent';

    if (searchQuery) {
      setSearchTerm(searchQuery);
      fetchSearchResults(searchQuery, activeTab);
    }
  }, [location]);

  const fetchSearchResults = async (searchQuery: string, activeTab: string) => {
    setLoading(true);
    try {
      let results: SearchResult[] = [];
      if (activeTab === 'precedent') {
        const response = await searchPrecedent(searchQuery);
        if (response.data && Array.isArray(response.data)) {
          results = response.data;
        }
      } else if (activeTab === 'statute') {
        const response = await searchStatute(searchQuery);
        if (response.data && Array.isArray(response.data)) {
          results = response.data;
        }
      }
      setSearchResults(results);
      // navigate(`/search-results?query=${encodeURIComponent(searchQuery)}&tab=${activeTab}`, {
      //   state: { searchResults: results, activeTab },
      // });
      console.log('Search results(SearchResultPage):', results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = () => {
    if (!Array.isArray(searchResults)) return [];

    const filtered = searchResults.filter(
      (result) =>
      (selectedCourt ? result.courtName === selectedCourt : true) &&
      (selectedInstance ? result.instance === selectedInstance : true) &&
      (selectedDate ? result.judgmentDate === selectedDate : true)
    );
    return filtered;
  };

  const filteredResults = useMemo(() => filterResults(), [searchResults, selectedCourt, selectedInstance, selectedDate]);
  const paginatedResults = filteredResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = () => {
    console.log(`검색어: ${searchTerm}`);
    fetchSearchResults(searchTerm, 'precedent');
  };

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
              <Option value="전체">전체</Option>
              <Option value="대법원">대법원</Option>
              <Option value="고등법원">고등법원</Option>
              <Option value="지방법원">지방법원</Option>
            </Select>
            <Select defaultValue="심급" style={{ width: 70 }} onChange={onInstanceChange} className={style.singleSelect}>
              <Option value="전체">전체</Option>
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
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                active
                avatar
                title={{ width: '100%' }}
                paragraph={{ rows: 3, width: '400px'}}
                style={{ marginBottom: 20 }}
              />
            ))
          ) : (
          <div className={style.searchResultList}>
            <SearchResultList searchResults={paginatedResults} loading={loading}/>
          </div>
          )}
        </>
      ),
    },
    {
      label: '법령',
      key: '2',
      children: (
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
          pageSize={pageSize}
          total={filteredResults.length}
          onChange={(page) => setCurrentPage(page)}
          className={style.pagination}
        />
      </div>
    </div>
  );
};

export default SearchResultPage;