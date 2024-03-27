import { Flex, Input } from "antd";
import style from "../../styles/lawword/LawWordModal.module.css";
import LawWordCard from "./LawWordCard";
import { ReactElement, useEffect, useState } from "react";
import { getWordList } from "../../api/lawword";
import { wordListProps } from "../../types/DataTypes";

const LawWordDict = () => {
  const { Search } = Input;
  const [wordList, setWordList] = useState<wordListProps[]>([]);
  const [renderWord, setRenderWord] = useState<ReactElement[]>([]);
  useEffect(() => {
    try {
      const wordLists = async () => {
        const response = await getWordList();
        setWordList(response.data.content);
      };
      wordLists();
      const words = wordList.map((word) => {
        <LawWordCard word={word} />;
      });

      setRenderWord(words);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Flex
      className={style["modal-body"]}
      justify="space-around"
      align="center"
      vertical
    >
      <Search
        placeholder="검색할 단어를 입력하세요. "
        style={{ width: "90%" }}
      />
      <Flex
        className={style["modal-body__content"]}
        vertical
        align="center"
      ></Flex>
    </Flex>
  );
};

export default LawWordDict;
