import { Fragment, useEffect, useRef, useState } from "react";
import style from "../../styles/lawcasedetail/LawCaseTabs.module.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import { updatePrecedents } from "../../redux/reducers/user/userSlice";
import { Switch, Spin } from "antd";
import {
  deletePrecedent,
  getHighLight,
  getLawDetailSummary,
  saveHighLight,
  saveLawDetail,
} from "../../api/lawdetail";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled, StarOutlined } from "@ant-design/icons";

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
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [highLightLists, setHighLightLists] = useState<highLightProps[]>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currnetPage, setCurrentPage] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const precedents = user.precedents;
    const currentPrecedent =
      location.pathname.split("/")[location.pathname.split("/").length - 1];
    setCurrentPage(currentPrecedent);
    if (
      precedents.find((prece: number) => prece === Number(currentPrecedent))
    ) {
      setIsSaved(true);
      const highLightData = async () => {
        const response = await getHighLight(
          user.accessToken,
          Number(currentPrecedent)
        );
        setHighLightLists(response.data.data);
      };
      highLightData();
    }
  }, []);

  useEffect(() => {
    if (getData && Object.keys(getData).length !== 0) {
      const renderText = getData.caseContent.split("<br/>");
      const newText = renderText.map((text, index) => {
        const modifiedText = text;
        let renderingText = "";
        highLightLists.forEach((targetText) => {
          if (modifiedText.includes(targetText.content)) {
            renderingText = targetText.main;
          }
        });

        // 수정된 텍스트 반환
        return (
          <Fragment key={index}>
            {renderingText ? (
              <>
                <p
                  dangerouslySetInnerHTML={{
                    __html: renderingText,
                  }}
                ></p>
                <div className={style["block"]}></div>
              </>
            ) : (
              <>
                <p>{modifiedText.replace(/\n/g, " ").trim()}</p>
                <div className={style["block"]}></div>
              </>
            )}
          </Fragment>
        );
      });
      setNewRenderText(newText);
    }
  }, [getData, highLightLists]);

  const savePrecedent = async (precedentId: number) => {
    try {
      await saveLawDetail(user.accessToken, precedentId);
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
  const onMouseOutHandler = () => {
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
        const fetchData = async () => {
          await savePrecedent(getData.precedentId).then(() => {
            dispatch(
              updatePrecedents([...user.precedents, getData.precedentId])
            );
            saveHighLight(
              {
                precedentId: getData.precedentId,
                main: selectionPos.commonAncestorContainer.outerHTML,
                highlightType: value,
                startPoint: selectionPos.startOffset,
                endPoint: selectionPos.endOffset,
                content: selectionPos.toString(),
              },
              user.accessToken
            );
          });
          setIsSaved(true);
        };
        fetchData();
      } else {
        saveHighLight(
          {
            precedentId: getData.precedentId,
            main: selectionPos.commonAncestorContainer.outerHTML,
            highlightType: value,
            startPoint: selectionPos.startOffset,
            endPoint: selectionPos.endOffset,
            content: selectionPos.toString(),
          },
          user.accessToken
        );
      }
    }
  };

  const deletePrecedentHandler = () => {
    deletePrecedent(user.accessToken, Number(currnetPage)).then(() => {
      const filterPrecedents = user.precedents.filter(
        (precedent: number) => precedent !== Number(currnetPage)
      );
      dispatch(updatePrecedents(filterPrecedents));
      setIsSaved(false);
      setHighLightLists([]);
    });
  };

  const savePrecedentHandler = () => {
    savePrecedent(Number(currnetPage)).then(() => {
      dispatch(updatePrecedents([...user.precedents, getData.precedentId]));
      setIsSaved(true);
    });
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
        {isSaved ? (
          <StarFilled
            className={style["remove-precedent"]}
            onClick={deletePrecedentHandler}
          />
        ) : (
          <StarOutlined
            className={style["save-precedent"]}
            onClick={savePrecedentHandler}
          />
        )}
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
      <div
        className={
          isEditMode
            ? `${style["tab-menu__summary"]}  ${style["edit-mode"]}`
            : `${style["tab-menu__summary"]}`
        }
      >
        <div className={style["tab-menu__summary__btn"]}>
          <p>요약 보기</p>
          <Switch
            onChange={summaryHandler}
            size={screenWidth <= 700 ? "small" : "default"}
          />
        </div>
        {isSummary ? (
          isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <p
              className={style["content-box__contents"]}
              dangerouslySetInnerHTML={{
                __html: summaryData,
              }}
            ></p>
          )
        ) : (
          <div
            className={style["content-box__contents"]}
            onMouseDown={onMouseClickHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseOutHandler}
          >
            {" "}
            {newRenderText ? <>{newRenderText}</> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawCaseTabs;
