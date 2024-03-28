import { Flex, Input, Spin } from "antd";
import style from "../../styles/lawword/LawWordModal.module.css";
import LawWordCard from "./LawWordCard";
import { ReactNode, useEffect, useState } from "react";
import { getWordList } from "../../api/lawword";
import { wordListProps } from "../../types/DataTypes";
import LawWordDetail from "./LawWordDetail";

const LawWordDict = () => {
  const { Search } = Input;
  const [wordList, setWordList] = useState<wordListProps[]>([]);
  const [renderWord, setRenderWord] = useState<ReactNode[]>([]);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [wordInfo, setWordInfo] = useState<string>("");
  const [wordTitle, setWordTitle] = useState<string>("");
  const searchInfo = (title: string, content: string) => {
    setWordTitle(title);
    setWordInfo(content);
  };
  useEffect(() => {
    try {
      const wordLists = async () => {
        const response = await getWordList();
        setWordList(response.data.data.content);
      };
      wordLists();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const words = wordList.map((word, index) => {
      console.log(word);
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
            placeholder="검색할 단어를 입력하세요. "
            style={{ width: "90%" }}
          />
          {isDetail ? (
            <LawWordDetail
              wordInfo={wordInfo}
              wordTitle={wordTitle}
              isDetail={isDetail}
              setIsDetail={setIsDetail}
            />
          ) : (
            <Flex
              className={style["modal-body__content"]}
              vertical
              align="center"
            >
              {renderWord}
            </Flex>
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
