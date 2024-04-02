import { Flex, Input, Spin, Pagination } from "antd";
import style from "../../styles/lawword/LawWordModal.module.css";
import LawWordCard from "./LawWordCard";
import { ReactNode, useEffect, useState } from "react";
import { getSearchList, getWordList } from "../../api/lawword";
import { wordListProps } from "../../types/DataTypes";
import LawWordDetail from "./LawWordDetail";

const LawWordDict = () => {
  const { Search } = Input;
  const [wordList, setWordList] = useState<wordListProps[]>([]);
  const [renderWord, setRenderWord] = useState<ReactNode[]>([]);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [wordInfo, setWordInfo] = useState<string>("");
  const [wordTitle, setWordTitle] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [baseWord, setBaseWord] = useState<wordListProps[]>([]);

  const searchInfo = (title: string, content: string) => {
    setWordTitle(title);
    setWordInfo(content);
  };

  useEffect(() => {
    try {
      const wordLists = async () => {
        const response = await getWordList();
        setWordList(response.data.data.content);
        setBaseWord(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      };
      wordLists();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const words = wordList.map((word, index) => {
      return (
        <LawWordCard
          termDefinition={word.termDefinition}
          termId={word.termId}
          termName={word.termName}
          setIsDetail={setIsDetail}
          isDetail={isDetail}
          key={index}
          searchInfo={searchInfo}
        />
      );
    });
    setRenderWord(words);
  }, [wordList]);

  const pageChange = (page: number) => {
    try {
      const wordLists = async () => {
        const response = await getWordList(page);
        setWordList(response.data.data.content);
        setBaseWord(response.data.data);
        setTotalPages(response.data.data.totalPages);
        setCurrentPage(page);
      };
      wordLists();
    } catch (error) {
      console.error(error);
    }
  };

  const searchHandler = (value: string) => {
    if (value.trim()) {
      setIsDetail(false);
      try {
        const searchWord = async () => {
          const response = await getSearchList(value);
          if (response.data.data.length > 0) {
            setWordList(response.data.data);
            setIsSearch(true);
            setSearchKeyword("");
          } else {
            alert("검색 결과가 없습니다");
            setSearchKeyword("");
          }
        };
        searchWord();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("검색어를 입력해주세요.");
      setIsSearch(false);
      setWordList(baseWord);
    }
  };

  return (
    <Flex
      className={style["modal-body"]}
      justify="space-around"
      align="center"
      vertical
    >
      {wordList.length > 0 ? (
        <>
          <Search
            placeholder="검색할 제목, 내용을 입력해주세요."
            style={{ width: "90%" }}
            enterButton
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={searchHandler}
            value={searchKeyword}
          />
          {isDetail ? (
            <LawWordDetail
              wordInfo={wordInfo}
              wordTitle={wordTitle}
              isDetail={isDetail}
              setIsDetail={setIsDetail}
            />
          ) : (
            <>
              <Flex
                className={style["modal-body__content"]}
                vertical
                align="center"
              >
                {renderWord}
              </Flex>
              {isSearch ? null : (
                <Pagination
                  simple
                  total={totalPages}
                  defaultPageSize={20}
                  defaultCurrent={currentPage}
                  showSizeChanger={false}
                  onChange={pageChange}
                />
              )}
            </>
          )}
        </>
      ) : (
        <Flex
          style={{ width: "100%", height: "100%" }}
          justify="center"
          align="center"
        >
          <Spin size="large" />
        </Flex>
      )}
    </Flex>
  );
};

export default LawWordDict;
