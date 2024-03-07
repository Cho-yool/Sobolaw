import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "../../styles/mypase/MypageTabs.module.css";

interface MyTabContent {
  id: number;
  title: string;
  path: string;
  isSelected: boolean;
}

export default function MyPageTab() {
  const [tabContent] = useState<MyTabContent[]>([
    { id: 1, title: "회원정보", path: "/mypage/user", isSelected: false },
    { id: 2, title: "작성한 소장", path: "/mypage/papers", isSelected: false },
    { id: 3, title: "저장한 판례", path: "/mypage/case", isSelected: false },
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
            to="/mypage/user"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style.active}`
                : style["nav-link"]
            }
          >
            회원정보
          </NavLink>
          <NavLink
            to="/mypage/papers"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style.active}`
                : style["nav-link"]
            }
          >
            작성한 소장
          </NavLink>
          <NavLink
            to="/mypage/case"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style.active}`
                : style["nav-link"]
            }
          >
            저장한 판례
          </NavLink>
        </div>
      </div>
    </>
  );
}
