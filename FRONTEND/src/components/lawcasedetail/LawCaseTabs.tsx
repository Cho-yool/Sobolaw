import { useRef, useState } from "react";
import style from "../../styles/lawcasedetail/LawCaseTabs.module.css";
import { Switch } from "antd";
import { getLawDetailSummary } from "../../api/lawdetail";
import { useQuery } from "react-query";

interface TabMenusProps {
  id: number;
  title: string;
}

interface getDataProps {
  getData: {
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
  const [activeTab, setActiveTab] = useState(0);
  const [onEditing, setOnEditing] = useState<boolean>(false);
  const [isSummary, setIsSummary] = useState<boolean>(false);
  const judgmentRef = useRef<HTMLDivElement>(null);
  const rulingRef = useRef<HTMLDivElement>(null);
  const precedentRef = useRef<HTMLDivElement>(null);
  const [summaryData, setSummaryData] = useState<string>("");
  const onChange = () => {
    setIsSummary(!isSummary);
  };

  useQuery("detailSummary", () => getLawDetailSummary(), {
    onSuccess: (response) => {
      setSummaryData(response.data.summary);
    },

    onError: (error) => {
      console.error(error);
    },
  });

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

  const onMouseClickHandler = () => {
    setOnEditing(true);
  };
  const onMouseMoveHandler = () => {
    if (onEditing) {
      console.log(window.getSelection()?.toString());
      console.log(window.getSelection()?.focusOffset);
      const range = window.getSelection()?.getRangeAt(0);

      const test = range?.startContainer;
      console.log(test);
      window.getSelection()?.deleteFromDocument();
    }
  };
  const onMouseOutHandler = () => {
    setOnEditing(false);
  };

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
          <p
            className={style["content-box__contents"]}
            dangerouslySetInnerHTML={{
              __html: getData.caseContent,
            }}
            onMouseDown={onMouseClickHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseOutHandler}
          ></p>
        )}
      </div>
    </div>
  );
};

export default LawCaseTabs;
