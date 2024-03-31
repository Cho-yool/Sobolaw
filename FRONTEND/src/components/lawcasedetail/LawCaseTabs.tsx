import { Fragment, useEffect, useRef, useState } from "react";
import style from "../../styles/lawcasedetail/LawCaseTabs.module.css";
import { Switch, Spin } from "antd";
import {
  getHighLight,
  getLawDetailSummary,
  saveHighLight,
  saveLawDetail,
} from "../../api/lawdetail";
import { store } from "../../redux/store/store";
import { useLocation } from "react-router-dom";

interface TabMenusProps {
  id: number;
  title: string;
}

interface getDataProps {
  getData: {
    precedentId: number;
    caseContent: string;
    caseName: string;
    caseNumber: string;
    caseType: string;
    courtName: string;
    judgment: string;
    judgmentDate: string;
    judicialNotice: string;
    referencedCase: string;
    referencedStatute: string;
    verdictSummary: string;
    verdictType: string;
  };
  currentLocation: number;
  isEditMode: boolean;
  currentColor: string;
}

const TABMENUS: TabMenusProps[] = [
  {
    id: 0,
    title: "판시사항",
  },
  {
    id: 1,
    title: "판결요지",
  },
  {
    id: 2,
    title: "판례내용",
  },
];

interface highLightProps {
  content: string;
  endPoint: number;
  highlightType: string;
  main: string;
  memberPrecedentHighlightId: number;
  memberPrecedentId: number;
  startPoint: number;
}

const LawCaseTabs = ({
  getData,
  currentLocation,
  isEditMode,
  currentColor,
}: getDataProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [onEditing, setOnEditing] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectionNode, setSelectionNode] = useState<any>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectionPos, setSelectionPos] = useState<any>();
  const [isSummary, setIsSummary] = useState<boolean>(false);
  const judgmentRef = useRef<HTMLDivElement>(null);
  const rulingRef = useRef<HTMLDivElement>(null);
  const precedentRef = useRef<HTMLDivElement>(null);
  const [summaryData, setSummaryData] = useState<string>("");
  const [newRenderText, setNewRenderText] = useState<React.ReactNode[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectRange, setSelectRange] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [highLightLists, setHighLightLists] = useState<highLightProps[]>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectionPosition, setSelectionPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const optionSelectDiv = (x: number, y: number) => {
    return (
      <div
        className={style["color-select"]}
        style={{
          left: x + "px",
          top: y + "px",
        }}>
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#f3e7c0" }}
          onClick={() => colorChange({ color: "#f3e7c0", value: 1 })}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#feda89" }}
          onClick={() => colorChange({ color: "#feda89", value: 2 })}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#dba651" }}
          onClick={() => colorChange({ color: "#dba651", value: 3 })}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#bf8538" }}
          onClick={() => colorChange({ color: "#bf8538", value: 4 })}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#644419" }}
          onClick={() => colorChange({ color: "#644419", value: 5 })}
        />
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const precedents = store.getState().user.precedents;
    const currentPrecedent =
      location.pathname.split("/")[location.pathname.split("/").length - 1];
    if (
      precedents.find((prece: number) => prece === Number(currentPrecedent))
    ) {
      setIsSaved(!isSaved);
      const highLightData = async () => {
        const response = await getHighLight(Number(currentPrecedent));
        setHighLightLists(response.data.data);
      };
      highLightData();
    }
  }, []);

  useEffect(() => {
    if (getData && Object.keys(getData).length !== 0) {
      const renderText = getData.caseContent.split("<br/>");
      const newText = renderText.map((text, index) => {
        let modifiedText = text;
        highLightLists.forEach((targetText) => {
          const color = targetText.highlightType.slice(
            2,
            targetText.highlightType.length
          );
          if (modifiedText.includes(targetText.content)) {
            // 대상 텍스트를 찾아서 span 태그로 감싸고 스타일을 적용
            {
              color === "644419"
                ? (modifiedText = modifiedText.replace(
                    new RegExp(
                      targetText.content.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                      "g"
                    ),
                    `<span style="background-color: #${targetText.highlightType.slice(2, targetText.highlightType.length)};">${targetText.content}</span>`
                  ))
                : (modifiedText = modifiedText.replace(
                    new RegExp(
                      targetText.content.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                      "g"
                    ),
                    `<span style="background-color: #${targetText.highlightType.slice(2, targetText.highlightType.length)}; color=${color}">${targetText.content}</span>`
                  ));
            }
          }
        });
        // 수정된 텍스트 반환
        return (
          <Fragment key={index}>
            <span
              dangerouslySetInnerHTML={{
                __html: modifiedText.replace(/\n|\r/g, "").trim(),
              }}></span>
            <div className={style["block"]}></div>
          </Fragment>
        );
      });
      setNewRenderText(newText);
    }
  }, [getData, highLightLists]);

  const savePrecedent = async (precedentId: number) => {
    try {
      await saveLawDetail(precedentId);
      setIsSaved(true);
    } catch (error) {
      console.error(error);
    }
  };

  const summaryHandler = async () => {
    try {
      setIsSummary(!isSummary);
      if (!summaryData) {
        const response = await getLawDetailSummary(currentLocation);
        setSummaryData(response.data.summary);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const colorChange = ({ color, value }: { color: string; value: number }) => {
    setShowOptions(false);
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    if (value === 5) {
      span.style.color = "white";
    } else {
      span.style.color = "black";
    }
    span.innerText = selectionPos.toString();
    selectionPos.deleteContents();
    selectionPos.insertNode(span);
    if (!isSaved) {
      try {
        savePrecedent(getData.precedentId);
      } catch (error) {
        console.error(error);
      } finally {
        saveHighLight({
          precedentId: getData.precedentId,
          main: selectionPos.startContainer.textContent,
          highlightType: value,
          startPoint: selectRange[0],
          endPoint: selectRange[1],
          content: selectionPos.toString().trim(),
        });
      }
    } else {
      saveHighLight({
        precedentId: getData.precedentId,
        main: selectionPos.startContainer.textContent,
        highlightType: value,
        startPoint: selectRange[0],
        endPoint: selectRange[1],
        content: selectionPos.toString().trim(),
      });
    }
  };

  const handleTabClick = (id: number) => {
    setActiveTab(id);
    let ref;
    switch (id) {
      case 0:
        ref = judgmentRef;
        break;
      case 1:
        ref = rulingRef;
        break;
      case 2:
        ref = precedentRef;
        break;
      default:
        ref = null;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 마우스 눌렀을때
  const onMouseClickHandler = () => {
    setOnEditing(true);
  };

  // 마우스가 누른채로 움직일때 선택한 범위를 가져옴
  const onMouseMoveHandler = () => {
    if (onEditing) {
      const selection = window.getSelection();
      if (selection) {
        setSelectionPos(selection.getRangeAt(0));
        setSelectionNode(selection);
      }
    }
  };

  // 마우스 클릭이 끝났을때
  const onMouseOutHandler = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setOnEditing(false);
    if (isEditMode) {
      const span = document.createElement("span");
      span.style.backgroundColor = currentColor;
      let value = 0;
      if (currentColor === "#f3e7c0") {
        value = 1;
      } else if (currentColor === "#feda89") {
        value = 2;
      } else if (currentColor === "#dba651") {
        value = 3;
      } else if (currentColor === "#bf8538") {
        value = 4;
      } else if (currentColor === "#644419") {
        value = 5;
      }
      if (currentColor === "#644419") {
        span.style.color = "white";
      } else {
        span.style.color = "black";
      }
      span.innerText = selectionPos.toString();
      selectionPos.deleteContents();
      selectionPos.insertNode(span);
      if (!isSaved) {
        try {
          savePrecedent(getData.precedentId);
        } catch (error) {
          console.error(error);
        } finally {
          saveHighLight({
            precedentId: getData.precedentId,
            main: selectionPos.startContainer.textContent,
            highlightType: value,
            startPoint: selectionPos.startOffset,
            endPoint: selectionPos.endOffset,
            content: selectionPos.toString(),
          });
        }
      } else {
        saveHighLight({
          precedentId: getData.precedentId,
          main: selectionPos.startContainer.textContent,
          highlightType: value,
          startPoint: selectionPos.startOffset,
          endPoint: selectionPos.endOffset,
          content: selectionPos.toString(),
        });
      }
    } else {
      const { top, left } = selectionPos.getBoundingClientRect();
      const parentTop = e.currentTarget.getBoundingClientRect().top;
      let clientX = 0;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      setSelectionPosition({
        x: clientX - left,
        y: -parentTop + top,
      });
      if (selectionPos) {
        setShowOptions(true);
      }
      setSelectRange([selectionPos.startOffset, selectionPos.endOffset]);
    }
  };
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);
  }, [screenWidth]);

  return (
    <div className={style["tab-container"]}>
      <div className={style["tab-menu"]}>
        {TABMENUS.map((tab) => (
          <div
            key={tab.id}
            className={
              activeTab === tab.id
                ? `${style["tab"]} ${style["active"]}`
                : style["tab"]
            }
            onClick={() => handleTabClick(tab.id)}>
            <p className={style["tab-title"]}>{tab.title}</p>
          </div>
        ))}
      </div>
      <p className={style["tab-menu__info"]}>사건번호 : {getData.caseNumber}</p>
      <br />
      <p className={style["tab-menu__info"]}>
        선고일자: {getData.judgmentDate}
      </p>
      <br />
      <p className={style["tab-menu__info"]}>법원명 : {getData.courtName}</p>
      <br />
      <p className={style["tab-menu__info"]}>사건종류명 : {getData.caseType}</p>
      <br />
      <p className={style["tab-menu__info"]}>{getData.verdictType}</p>
      <br />
      <br />
      <p className={style["tab-menu__title"]} ref={judgmentRef}>
        판시사항
      </p>
      <br />
      <p
        className={style["content-box__contents"]}
        dangerouslySetInnerHTML={{
          __html: getData.judicialNotice,
        }}></p>
      <br />
      <br />
      <p className={style["tab-menu__title"]} ref={rulingRef}>
        판결요지
      </p>
      <br />
      <br />
      <p
        className={style["content-box__contents"]}
        dangerouslySetInnerHTML={{
          __html: getData.verdictSummary,
        }}></p>
      <br />
      <br />
      <p className={style["tab-menu__title"]} ref={precedentRef}>
        판례내용
      </p>
      <br />
      <br />
      <div
        className={
          isEditMode
            ? `${style["tab-menu__summary"]}  ${style["edit-mode"]}`
            : `${style["tab-menu__summary"]}`
        }>
        <div className={style["tab-menu__summary__btn"]}>
          <p>요약 보기</p>
          <Switch
            onChange={summaryHandler}
            size={screenWidth <= 700 ? "small" : "default"}
          />
        </div>
        {showOptions && !isEditMode
          ? optionSelectDiv(selectionPosition.x, selectionPosition.y)
          : null}
        {isSummary ? (
          isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}>
              <Spin size="large" />
            </div>
          ) : (
            <p
              className={style["content-box__contents"]}
              dangerouslySetInnerHTML={{
                __html: summaryData,
              }}></p>
          )
        ) : (
          <div
            className={style["content-box__contents"]}
            onMouseDown={onMouseClickHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseOutHandler}
            onTouchStart={onMouseClickHandler}
            onTouchMove={onMouseMoveHandler}
            onTouchEnd={onMouseOutHandler}>
            {" "}
            {newRenderText ? <>{newRenderText}</> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawCaseTabs;
