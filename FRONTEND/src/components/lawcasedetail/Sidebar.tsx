import style from "../../styles/lawcasedetail/LawCaseSidebar.module.css";
import ARROW from "../../assets/arrow.png"; /* <a href="https://www.flaticon.com/kr/free-icons/" title="화살 아이콘">화살 아이콘  제작자: Catalin Fertu - Flaticon</a> */
import { useState } from "react";
import { Flex } from "antd";

const Sidebar = () => {
  const [isSelected, setIsselected] = useState<boolean>(false);

  return (
    <article
      className={
        isSelected ? style["sidebar"] : `${style["sidebar"]} ${style["hide"]}`
      }
    >
      <div
        className={isSelected ? style["hide-btn"] : style["side-btn"]}
        onClick={() => setIsselected(!isSelected)}
      >
        <img
          className={isSelected ? style["rotate"] : style["side-btn-img"]}
          src={ARROW}
          alt=""
        />
      </div>
      <Flex
        className={style["sidebar__content"]}
        vertical
        justify="space-around"
      >
        <Flex
          className={style["sidebar__content__box"]}
          vertical
          align="center"
        >
          <p className={style["sidebar__content__box__title"]}>참조 조문</p>
          <div className={style["sidebar__content__box__content"]}>
            <li>형법 제70조</li>
            <li>
              형법 제69조 수원지방법원 평택지원 2021. 9. 9. 선고 2021고정113
              판결 [성폭력범죄의처벌등에관한특례법위반(비밀준수등)]
            </li>
          </div>
        </Flex>
        <Flex
          className={style["sidebar__content__box"]}
          vertical
          align="center"
        >
          <p className={style["sidebar__content__box__title"]}>참조 판례</p>
          <div className={style["sidebar__content__box__content"]}>
            <li>
              수원지방법원평택지원 2021고정113 수원지방법원 평택지원 2021. 9. 9.
              선고 2021고정113 판결
              [성폭력범죄의처벌등에관한특례법위반(비밀준수등)]
            </li>
          </div>
        </Flex>
        <Flex
          className={style["sidebar__content__box"]}
          vertical
          align="center"
        >
          <p className={style["sidebar__content__box__title"]}>하이라이트</p>
          <div className={style["sidebar__content__box__content"]}>
            <p>형광펜</p>
            <Flex justify="space-between">
              <div className={style["select_color_1"]}></div>
              <div className={style["select_color_2"]}></div>
              <div className={style["select_color_3"]}></div>
              <div className={style["select_color_4"]}></div>
              <div className={style["select_color_5"]}></div>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </article>
  );
};

export default Sidebar;
