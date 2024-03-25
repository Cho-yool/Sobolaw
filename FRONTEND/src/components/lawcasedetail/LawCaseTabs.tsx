import { useEffect, useRef, useState } from "react";
import style from "../../styles/lawcasedetail/LawCaseTabs.module.css";
import { Switch } from "antd";
import { getLawDetailSummary, saveLawDetail } from "../../api/lawdetail";
import { useQuery } from "react-query";

interface TabMenusProps {
  id: number;
  title: string;
}

interface getDataProps {
  getData: {
    precdientId: number;
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

const LawCaseTabs = ({ getData }: getDataProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [onEditing, setOnEditing] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectionNode, setSelectionNode] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectionPos, setSelectionPos] = useState<any>();
  const [isSummary, setIsSummary] = useState<boolean>(false);
  const judgmentRef = useRef<HTMLDivElement>(null);
  const rulingRef = useRef<HTMLDivElement>(null);
  const precedentRef = useRef<HTMLDivElement>(null);
  const [summaryData, setSummaryData] = useState<string>("");
  const [newRenderText, setNewRenderText] = useState<React.ReactNode[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectionPosition, setSelectionPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const onChange = () => {
    setIsSummary(!isSummary);
  };

  const optionSelectDiv = (x: number, y: number) => {
    return (
      <div className={style["color-select"]} style={{ left: x, top: y }}>
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#f3e7c0" }}
          onClick={() => colorChange("#f3e7c0")}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#feda89" }}
          onClick={() => colorChange("#feda89")}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#dba651" }}
          onClick={() => colorChange("#dba651")}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#bf8538" }}
          onClick={() => colorChange("#bf8538")}
        />
        <div
          className={style["color-option"]}
          style={{ backgroundColor: "#644419" }}
          onClick={() => colorChange("#644419")}
        />
      </div>
    );
  };
  const savePrecedent = (precdientId: number) => {
    try {
      const response = saveLawDetail(precdientId);
      console.log(response);
      setIsSaved(true);
    } catch (error) {
      console.error(error);
    }
  };
  useQuery("detailSummary", () => getLawDetailSummary(), {
    onSuccess: (response) => {
      setSummaryData(response.data.summary);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const colorChange = (color: string) => {
    console.log(isSaved);
    setShowOptions(false);
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    span.innerText = selectionPos.toString();
    selectionPos.deleteContents();
    selectionPos.insertNode(span);
    if (!isSaved) {
      savePrecedent(getData.precdientId);
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
  const onMouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setOnEditing(false);
    if (selectionPos) {
      console.log(selectionPos.commonAncestorContainer.parentNode);
      console.log(selectionPos.startOffset);
      console.log(selectionPos.endOffset);
      setShowOptions(true);
    }
  };

  useEffect(() => {
    if (getData && Object.keys(getData).length !== 0) {
      const renderText = getData.caseContent.split("<br/>");
      const newText = renderText.map((text) => {
        return <span>{text}</span>;
      });
      setNewRenderText(newText);
    }
  }, [getData]);

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
            onClick={() => handleTabClick(tab.id)}
          >
            <p className={style["tab-title"]}>{tab.title}</p>
          </div>
        ))}
      </div>
      <p>사건번호 : {getData.caseNumber}</p>
      <br />
      <p>선고일자: {getData.judgmentDate}</p>
      <br />
      <p>법원명 : {getData.courtName}</p>
      <br />
      <p>사건종류명 : {getData.caseType}</p>
      <br />
      <p>{getData.verdictType}</p>
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
        }}
      ></p>
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
        }}
      ></p>
      <br />
      <br />
      <p className={style["tab-menu__title"]} ref={precedentRef}>
        판례내용
      </p>
      <br />
      <br />

      <div className={style["tab-menu__summary"]}>
        <div className={style["tab-menu__summary__btn"]}>
          <p>요약 보기</p>
          <Switch onChange={onChange} />
        </div>

        {isSummary ? (
          <p
            className={style["content-box__contents"]}
            dangerouslySetInnerHTML={{
              __html: summaryData,
            }}
          ></p>
        ) : (
          <div
            className={style["content-box__contents"]}
            onMouseDown={onMouseClickHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseOutHandler}
          >
            {" "}
            {showOptions
              ? optionSelectDiv(selectionPosition.x, selectionPosition.y)
              : null}
            {newRenderText ? <>{newRenderText}</> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawCaseTabs;
