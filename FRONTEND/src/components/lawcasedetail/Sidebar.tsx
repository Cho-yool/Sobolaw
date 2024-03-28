import style from "../../styles/lawcasedetail/LawCaseSidebar.module.css";
import ARROW from "../../assets/arrow.png"; /* <a href="https://www.flaticon.com/kr/free-icons/" title="화살 아이콘">화살 아이콘  제작자: Catalin Fertu - Flaticon</a> */
import { useEffect, useState } from "react";
import { Flex } from "antd";
import { HighlightOutlined } from "@ant-design/icons";

interface SidebarProps {
  referencedStatute: string;
  referencedCase: string;
}

const Sidebar = ({ referencedStatute, referencedCase }: SidebarProps) => {
  const [isSelected, setIsselected] = useState<boolean>(false);
  const [renderRefCase, setRenderRefCase] = useState<React.ReactNode[]>([]);
  const [renderRefStatute, setRenderRefStatute] = useState<React.ReactNode[]>(
    []
  );

  useEffect(() => {
    const renderCase = referencedCase;
    const renderStatute = referencedStatute;
    if (renderCase) {
      const splitCase = renderCase.replace("<br/>", "").split("/");
      const newCase = splitCase.map((text, index) => {
        return (
          <>
            <li
              key={index}
              className={style[`sidebar__content__box__content__text`]}
            >
              {text.replace(/\n|\r/g, "").trim()}
            </li>
          </>
        );
      });
      setRenderRefCase(newCase);
    }

    if (renderStatute) {
      const splitStatute = renderStatute.replace("<br/>", "").split("/");
      const newStatute = splitStatute.map((text, index) => {
        return (
          <>
            <li
              key={index}
              className={style[`sidebar__content__box__content__text`]}
            >
              {text}
            </li>
          </>
        );
      });
      setRenderRefStatute(newStatute);
    }
  }, []);

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
          alt="side-open"
        />
      </div>
      <Flex className={style["sidebar__content"]} vertical gap={30}>
        <Flex
          className={style["sidebar__content__box"]}
          vertical
          align="center"
        >
          <p className={style["sidebar__content__box__title"]}>참조 조문</p>
          <div className={style["sidebar__content__box__content"]}>
            {referencedStatute ? (
              renderRefStatute
            ) : (
              <p className={style[`sidebar__content__box__content__text`]}>
                참조 조문이 없습니다.
              </p>
            )}
          </div>
        </Flex>
        <Flex
          className={style["sidebar__content__box"]}
          vertical
          align="center"
        >
          <p className={style["sidebar__content__box__title"]}>참조 판례</p>
          <div className={style["sidebar__content__box__content"]}>
            {referencedCase ? (
              renderRefCase
            ) : (
              <p className={style[`sidebar__content__box__content__text`]}>
                참조 판례가 없습니다
              </p>
            )}
          </div>
        </Flex>
        <Flex
          className={style["sidebar__content__box"]}
          vertical
          align="center"
        >
          <p className={style["sidebar__content__box__title"]}>하이라이트</p>
          <div className={style["sidebar__content__box__content"]}>
            <Flex justify="space-between">
              <HighlightOutlined className={style["select_color_1"]} />
              <HighlightOutlined className={style["select_color_2"]} />
              <HighlightOutlined className={style["select_color_3"]} />
              <HighlightOutlined className={style["select_color_4"]} />
              <HighlightOutlined className={style["select_color_5"]} />
            </Flex>
          </div>
        </Flex>
      </Flex>
    </article>
  );
};

export default Sidebar;
