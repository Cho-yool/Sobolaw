import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "../../styles/board/BoardTabs.module.css";

interface MyTabContent {
  id: number;
  title: string;
  path: string;
  isSelected: boolean;
}

export default function BoardTab() {
  const [tabContent] = useState<MyTabContent[]>([
    { id: 1, title: "상담 목록", path: "/board", isSelected: false },
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
        <div className={style["tab-title"]}>{getCurrentTabTitle()}</div>
        <div className={style["tab-categories"]}>
          <NavLink
            to="/board"
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
