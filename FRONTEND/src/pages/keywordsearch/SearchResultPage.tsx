// src/pages/SearchResultPage.tsx
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Input, Tabs, Select, Skeleton } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SearchResultList, { SearchResult } from "../../components/search/SearchResultList";
import style from "../../styles/search/SearchResultList.module.css";
import { searchPrecedent, searchStatute } from "../../api/lawsearch";

const { Option } = Select;

interface FilterOptions {
  court: string[];
  instance: string[];
  period: string[];
}

// Select 결과 분류
const classifyResults = (results: SearchResult[]) => {
  return results.map((result) => {
    let court = '';
    let instance = '';
    let period = '';

    // 법원 분류
    if (result.courtName?.includes('대법원')) {
      court = '대법원';
      instance = '3심';
    } else if (result.courtName?.includes('고법') || result.courtName?.includes('고등법원')) {
      court = '고등법원';
      instance = '2심';
    } else if (result.courtName?.includes('지법') || result.courtName?.includes('지방법원')) {
      court = '지방법원';
      instance = '1심';
    }

    // 기간 분류
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

    if (result.judgmentDate) {
      const judgmentDate = parseInt(result.judgmentDate, 10);

      if (judgmentDate > parseInt(currentDateString, 10) - 100000) {
        period = '10년';
      } else if (judgmentDate > parseInt(currentDateString, 10) - 200000) {
        period = '20년';
      } else if (judgmentDate > parseInt(currentDateString, 10) - 300000) {
        period = '30년';
      }
    } else {
      period = '알 수 없음';
    }

    return {
      ...result,
      court,
      instance,
      period,
    };
  });
};

const SearchResultPage = () => {
  const location = useLocation();
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<string>('전체');
  const [selectedInstance, setSelectedInstance] = useState<string>('전체');
  const [selectedDate, setSelectedDate] = useState<string>('전체');
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
      const classifiedResults = classifyResults(results);
      setSearchResults(classifiedResults);
      // console.log('Search results(SearchResultPage):', classifiedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = () => {
    if (!Array.isArray(searchResults)) return [];

    const filtered = searchResults.filter((result) => {
      // console.log('필터링 조건:', result.court, selectedCourt, result.instance, selectedInstance, result.period, selectedDate); // 필터링 조건 확인
      return (
        (selectedCourt === '전체' || result.court === selectedCourt) &&
        (selectedInstance === '전체' || result.instance === selectedInstance) &&
        (selectedDate === '전체' || result.period === selectedDate)
      );
    });
    return filtered;
  };

  const filteredResults = useMemo(() => filterResults(), [searchResults, selectedCourt, selectedInstance, selectedDate]);
  const paginatedResults = filteredResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = () => {
    // console.log(`검색어: ${searchTerm}`);
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
            <Select value={selectedCourt === '전체' ? '법원' : selectedCourt} style={{ width: 100 }} onChange={onCourtChange} className={style.singleSelect}>
              <Option value="전체">전체</Option>
              <Option value="대법원">대법원</Option>
              <Option value="고등법원">고등법원</Option>
              <Option value="지방법원">지방법원</Option>
            </Select>
            <Select value={selectedInstance === '전체' ? '심급' : selectedInstance} style={{ width: 100, marginLeft: 10 }} onChange={onInstanceChange} className={style.singleSelect}>
              <Option value="전체">전체</Option>
              <Option value="1심">1심</Option>
              <Option value="2심">2심</Option>
              <Option value="3심">3심</Option>
            </Select>
            <Select value={selectedDate === '전체' ? '기간' : selectedDate} style={{ width: 100, marginLeft: 10 }} onChange={onDateChange} className={style.singleSelect}>
              <Option value="전체">전체</Option>
              <Option value="10년">10년</Option>
              <Option value="20년">20년</Option>
              <Option value="30년">30년</Option>
            </Select>
          </div>
          {loading ? (
            <div>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  active
                  avatar
                  title={{ width: '100%' }}
                  paragraph={{ rows: 3, width: '400px' }}
                  style={{ marginBottom: 20 }}
                />
              ))}
            </div>
          ) : (
            <div className={style.searchResultList}>
              <SearchResultList searchResults={paginatedResults} loading={loading} />
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
          prefix={<SearchOutlined style={{ marginRight: 20 }} />}
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