import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Title from "antd/es/typography/Title";
import style from "../../styles/board/BoardTabs.module.css";

interface MyTabContent {
  id: number;
  title: string;
  path: string;
  isSelected: boolean;
}

export default function BoardTab() {
  const [tabContent] = useState<MyTabContent[]>([
    { id: 1, title: "상담 목록", path: "/board/list", isSelected: false },
    { id: 2, title: "상담 받기", path: "/board/write", isSelected: false }
  ]);

  const location = useLocation();

  // 현재 선택된 탭의 제목을 추적하는 함수
  const getCurrentTabTitle = () => {
    const currentTab = tabContent.find((tab) => tab.path === location.pathname);
    return currentTab ? currentTab.title : "";
  };

  return (
    <>
      <div className={style["tab-box"]}>
        <div className={style["tab-title"]}>
          <Title
            level={2}
            style={{ color: "#644419", textAlign: "center"}}
          >
            전문가의 조언을 받아 법률 고민을 해결해 보세요!
          </Title>
          <div style={{ textAlign: "center" }}>변호사만 답변 가능하도록 공개범위를 설정할 수 있습니다</div>  
        </div>
        <div className={style["tab-categories"]}>
          <NavLink
            to="/board/list"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style.active}`
                : style["nav-link"]
            }
          >
            상담 목록
          </NavLink>
          <NavLink
            to="/board/write"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style.active}`
                : style["nav-link"]
            }
          >
           상담 받기
          </NavLink>
        </div>
      </div>
    </>
  );
}
