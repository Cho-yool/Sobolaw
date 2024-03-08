// src/pages/SearchResultPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SearchResultList, { SearchResult } from "../components/search/SearchResultList";
import inputStyle from "../styles/search/SearchInput.module.css";

const dummyData: SearchResult[] = [
  { id: 1, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 2, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 3, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 4, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 5, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 6, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 7, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 8, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 9, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 10, title: "판례 제목 1", content: "판례 내용 1" },
  { id: 11, title: "판례 제목 2", content: "판례 내용 1" },

];

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
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

  // 검색 함수
  const handleSearch = () => {
    console.log(`검색어: ${searchTerm}`);
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <Input
        prefix={<SearchOutlined style={{ fontSize: '20px', padding: '0px 20px'}} />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch} // Enter 키를 눌렀을 때 검색 실행
        className={inputStyle.searchInput}
        placeholder="키워드를 검색하세요"
      />
      <SearchResultList searchResults={searchResults} />
      <Pagination current={currentPage} pageSize={pageSize} total={searchResults.length} onChange={page => setCurrentPage(page)} />
    </div>
  );
};

export default SearchResultPage;
