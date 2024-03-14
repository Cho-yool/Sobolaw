import { Flex, Input } from "antd";
import style from "../../styles/papers/FraudMenu.module.css";
import CheckBox from "../common/CheckBox";
import { useEffect, useState } from "react";

const FraudMenu = () => {
  const [checkedList, setCheckList] = useState<string[]>([]);
  const boxList = ["당근마켓", "중고나라", "번개장터"];
  const onchange = (e) => {
    setCheckList(e.target.name);
  };
  useEffect(() => {
    console.log(checkedList);
  }, [checkedList]);
  return (
    <Flex className={style["fraud-menu"]} vertical align="center">
      <Flex className={style["fraud-menu__first"]} vertical align="center">
        <p className={style["fraud-menu__title"]}>당사자</p>
        <Flex className={style["fraud-menu-box"]} vertical>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>고소인(본인)</p>
            <Input placeholder="성명" size="large" type="text" />
          </Flex>
          <Flex className={style["fraud-menu-input"]} vertical>
            <p className={style["fraud-menu-input__title"]}>피고소인(상대방)</p>
            <Input placeholder="성명" size="large" type="text" />
          </Flex>
        </Flex>
        <CheckBox onChange={onchange} boxList={boxList} />
      </Flex>
      <Flex></Flex>
      <Flex></Flex>
      <Flex></Flex>
      <Flex></Flex>
      <Flex></Flex>
      <Flex></Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default FraudMenu;
