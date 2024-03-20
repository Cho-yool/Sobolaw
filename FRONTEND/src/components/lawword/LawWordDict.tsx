import { Flex, Input } from "antd";
import style from "../../styles/lawword/LawWordModal.module.css";
import LawWordCard from "./LawWordCard";

const LawWordDict = () => {
  const { Search } = Input;
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
      <Flex className={style["modal-body__content"]} vertical align="center">
        <LawWordCard></LawWordCard>
      </Flex>
    </Flex>
  );
};

export default LawWordDict;
