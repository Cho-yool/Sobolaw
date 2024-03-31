import style from "../../styles/lawcasedetail/LawCaseSidebar.module.css";
import ARROW from "../../assets/arrow.png"; /* <a href="https://www.flaticon.com/kr/free-icons/" title="화살 아이콘">화살 아이콘  제작자: Catalin Fertu - Flaticon</a> */
import { Fragment, useEffect, useState } from "react";
import { Flex } from "antd";
import { HighlightOutlined } from "@ant-design/icons";

interface SidebarProps {
  referencedStatute: string;
  referencedCase: string;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({
  referencedStatute,
  referencedCase,
  setIsEditMode,
  setCurrentColor,
}: SidebarProps) => {
  const [isSelected, setIsselected] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [renderRefCase, setRenderRefCase] = useState<React.ReactNode[]>([]);
  const [renderRefStatute, setRenderRefStatute] = useState<React.ReactNode[]>(
    []
  );
  const [currentSelect, setCurrentSelect] = useState<string>("");

  const modeChange = (value: string) => {
    setIsEditMode(true);
    setCurrentSelect(value);
    setCurrentColor(value);
  };

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);
  }, [screenWidth]);

  useEffect(() => {
    const renderCase = referencedCase;
    const renderStatute = referencedStatute;
    if (renderCase) {
      const splitCase = renderCase.replace("<br/>", "").split("/");
      const newCase = splitCase.map((text, index) => {
        return (
          <Fragment key={index}>
            <li
              key={index}
              className={style[`sidebar__content__box__content__text`]}>
              {text.replace(/\n|\r/g, "").trim()}
            </li>
          </Fragment>
        );
      });
      setRenderRefCase(newCase);
    }

    if (renderStatute) {
      const splitStatute = renderStatute.replace("<br/>", "").split("/");
      const newStatute = splitStatute.map((text, index) => {
        return (
          <Fragment key={index}>
            <li className={style[`sidebar__content__box__content__text`]}>
              {text.replace(/\n|\r/g, "").trim()}
            </li>
          </Fragment>
        );
      });
      setRenderRefStatute(newStatute);
    }
  }, [referencedStatute, referencedCase]);

  return (
    <>
      {screenWidth <= 576 ? (
        <article className={style["sidebar"]}>
          <Flex className={style["sidebar__content"]} gap={10}>
            <Flex
              className={style["sidebar__content__box"]}
              vertical
              align="center">
              <p className={style["sidebar__content__box__title"]}>참조 조문</p>
              {/* <div className={style["sidebar__content__box__content"]}>
                {referencedStatute ? (
                  renderRefStatute
                ) : (
                  <p className={style[`sidebar__content__box__content__text`]}>
                    참조 조문이 없습니다.
                  </p>
                )}
              </div> */}
            </Flex>
            <Flex
              className={style["sidebar__content__box"]}
              vertical
              align="center">
              <p className={style["sidebar__content__box__title"]}>참조 판례</p>
              {/* <div className={style["sidebar__content__box__content"]}>
                {referencedCase ? (
                  renderRefCase
                ) : (
                  <p className={style[`sidebar__content__box__content__text`]}>
                    참조 판례가 없습니다
                  </p>
                )}
              </div> */}
            </Flex>
            <Flex
              className={style["sidebar__content__box"]}
              vertical
              align="center">
              <p className={style["sidebar__content__box__title"]}>
                하이라이트
              </p>
              {/* <div className={style["sidebar__content__box__content"]}>
                <Flex justify="space-between">
                  <HighlightOutlined
                    className={
                      currentSelect === "#f3e7c0"
                        ? `${style["select_color_1"]} ${style["selected"]}`
                        : style["select_color_1"]
                    }
                    onClick={() => modeChange("#f3e7c0")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#feda89"
                        ? `${style["select_color_2"]} ${style["selected"]}`
                        : style["select_color_2"]
                    }
                    onClick={() => modeChange("#feda89")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#dba651"
                        ? `${style["select_color_3"]} ${style["selected"]}`
                        : style["select_color_3"]
                    }
                    onClick={() => modeChange("#dba651")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#bf8538"
                        ? `${style["select_color_4"]} ${style["selected"]}`
                        : style["select_color_4"]
                    }
                    onClick={() => modeChange("#bf8538")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#644419"
                        ? `${style["select_color_5"]} ${style["selected"]}`
                        : style["select_color_5"]
                    }
                    onClick={() => modeChange("#644419")}
                  />
                </Flex>
              </div> */}
            </Flex>
          </Flex>
        </article>
      ) : (
        <article
          className={
            isSelected
              ? style["sidebar"]
              : `${style["sidebar"]} ${style["hide"]}`
          }>
          <div
            className={isSelected ? style["hide-btn"] : style["side-btn"]}
            onClick={() => setIsselected(!isSelected)}>
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
              align="center">
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
              align="center">
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
              align="center">
              <p className={style["sidebar__content__box__title"]}>
                하이라이트
              </p>
              <div className={style["sidebar__content__box__content"]}>
                <Flex justify="space-between">
                  <HighlightOutlined
                    className={
                      currentSelect === "#f3e7c0"
                        ? `${style["select_color_1"]} ${style["selected"]}`
                        : style["select_color_1"]
                    }
                    onClick={() => modeChange("#f3e7c0")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#feda89"
                        ? `${style["select_color_2"]} ${style["selected"]}`
                        : style["select_color_2"]
                    }
                    onClick={() => modeChange("#feda89")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#dba651"
                        ? `${style["select_color_3"]} ${style["selected"]}`
                        : style["select_color_3"]
                    }
                    onClick={() => modeChange("#dba651")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#bf8538"
                        ? `${style["select_color_4"]} ${style["selected"]}`
                        : style["select_color_4"]
                    }
                    onClick={() => modeChange("#bf8538")}
                  />
                  <HighlightOutlined
                    className={
                      currentSelect === "#644419"
                        ? `${style["select_color_5"]} ${style["selected"]}`
                        : style["select_color_5"]
                    }
                    onClick={() => modeChange("#644419")}
                  />
                </Flex>
              </div>
            </Flex>
          </Flex>
        </article>
      )}
    </>
  );
};

export default Sidebar;
