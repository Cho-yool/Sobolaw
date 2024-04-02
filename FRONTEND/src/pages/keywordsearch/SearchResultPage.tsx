import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Tabs, Select, AutoComplete } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SearchResultList from "../../components/search/SearchResultList";
import style from "../../styles/search/SearchResultList.module.css";
import queryString from "query-string"; // query-string 라이브러리를 사용하여 쿼리스트링을 파싱
import { getAllWords } from "../../api/lawsearch";

const { Option } = Select;

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPage = 1;
  const queryParams = queryString.parse(location.search); // 쿼리스트링을 파싱하여 객체로 변환
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>(queryParams.query as string || '');
  const [selectedTab, setSelectedTab] = useState<string>(queryParams.tab as string || '1');
  const [finalSearchTerm, setFinalSearchTerm] = useState<string>(queryParams.query as string || '');
  const [selectedCourt, setSelectedCourt] = useState<string>('전체');
  const [selectedInstance, setSelectedInstance] = useState<string>('전체');
  const [selectedDate, setSelectedDate] = useState<string>('전체');
  const [words, setWords] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const pageSize = 10;

  useEffect(() => {
    // URL이 변경될 때마다 쿼리스트링을 파싱하여 상태를 업데이트
    const queryParams = queryString.parse(location.search);
    setSearchTerm(queryParams.query as string || '');
    setSelectedTab(queryParams.tab as string || '1');
    setFinalSearchTerm(queryParams.query as string || '');
    // 페이지 번호도 업데이트
    setCurrentPage(initialPage);

    if (queryParams.query) {
      handleSearch();
    }
  }, [location.search]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await getAllWords();
        if (Array.isArray(response.data)) {
          setWords(response.data);
          console.log("법령 용어명 목록 조회:", response);
        } else {
          console.error("법령 용어명 데이터는 배열이 아닙니다.", response.data);
        }
      } catch (error) {
        console.error("법령 용어명 목록 조회 오류:", error);
      }
    };
    fetchWords();
  }, []);

  const onTabChange = (key: string) => {
    setSelectedTab(key);
    setCurrentPage(1);
    // 탭 변경 시 쿼리스트링을 업데이트
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}&tab=${key}`);
  };

  const handleSearch = () => {
    setFinalSearchTerm(searchTerm); // 엔터를 누르면 검색어를 저장
    // navigate를 사용하여 쿼리 스트링을 업데이트
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}&tab=${selectedTab}`);
  };

  const onCourtChange = (value: string): void => setSelectedCourt(value);
  const onInstanceChange = (value: string): void => setSelectedInstance(value);
  const onDateChange = (value: string): void => setSelectedDate(value);

  const renderOptions = () => {
    if(!Array.isArray(words)) return [];

    return words
      .filter((word) => word.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((word) => ({
        value: word,
        label: word,
      }));
  };

  const handleSelect = (value: string) => {
    setSearchTerm(value);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      } else {
        handleSearch();
      }
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setIsDropdownOpen(value.length > 0);
  }

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
          </div>
          <SearchResultList
            searchTerm={finalSearchTerm}
            activeTab={selectedTab}
            pageNumber={currentPage}
          />
        </>
      ),
    },
    {
      label: '법령',
      key: '2',
      children: <SearchResultList
        searchTerm={finalSearchTerm}
        activeTab={selectedTab}
        pageNumber={currentPage}
      />,
    },
  ];

  return (
    <div className={style.searchPageBackground}>
      <div className={style.searchPageContainer}>
      <AutoComplete
       value={searchTerm}
       options={renderOptions()}
       onSelect={handleSelect}
       onSearch={handleInputChange}
       onKeyDown={handleKeyDown}
       placeholder="키워드를 검색하세요"
       className={style.searchInput}
       popupClassName={style.dropdownMenu}
       open={isDropdownOpen}
     >
       <Input
         prefix={<SearchOutlined style={{fontSize: 25}} />}
         className={style.searchInputInner}
       />
     </AutoComplete>
        <div className={style.tabs}>
          <Tabs
            items={tabsItems}
            tabBarGutter={40}
            activeKey={selectedTab}
            onChange={onTabChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResultPage;