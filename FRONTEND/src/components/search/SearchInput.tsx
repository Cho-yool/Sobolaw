// src/components/search/SearchInput.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Input, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "../../styles/search/SearchInput.module.css";
import CountUp from "react-countup";
import { getAllWords } from "../../api/lawsearch";

const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("1");
  const [words, setWords] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  const handleSearch = (): void => {
    window.scrollTo(0, 0);
    navigate(
      `/search-results?query=${encodeURIComponent(searchTerm)}&tab=${activeTab}`
    );
  };

  const onTabChange = (activeKey: string): void => {
    setActiveTab(activeKey);
  };

  const tabItems = [
    {
      label: "판례 검색",
      key: "1",
    },
    {
      label: "법령 검색",
      key: "2",
    },
  ];

  const renderOptions = () => {
    if (!Array.isArray(words)) return [];

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
  };

  return (
    <div
      className={style.container}
      style={{ background: `url("/images/SearchInputImage.png")` }}
    >
      <h3 className={style.title}>
        소보로의 고도화된 검색 환경으로
        <br />
        <CountUp end={270222} duration={4} separator="," />
        건의 법률 데이터를 찾아보세요.
      </h3>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={onTabChange}
        items={tabItems}
        tabBarGutter={60}
        className={style.tabContainer}
      />
      <AutoComplete
        value={searchTerm}
        options={renderOptions()}
        onSelect={handleSelect}
        onSearch={handleInputChange}
        onKeyDown={handleKeyDown}
        className={style.searchInput}
        popupClassName={style.dropdownMenu}
        open={isDropdownOpen}
        >
       <Input
         prefix={<SearchOutlined style={{fontSize: 25}} />}
         className={style.searchInputInner}
         placeholder="키워드를 검색하세요"
       />
     </AutoComplete>
    </div>
  );
};

export default SearchInput;