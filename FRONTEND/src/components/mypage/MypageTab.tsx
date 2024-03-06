import { NavLink, useParams } from "react-router-dom";
import style from "../../styles/mypase/MypageTabs.module.css";
import { useState } from "react";

interface MyTabContent {
  [key: string]: { text: string; backgroundColor: string };
}

export default function MyPageTab() {
  const { tab } = useParams(); // 현재 URL에서 파라미터를 가져옴
  const [currentName, setCurrentName] = useState("hello");
  // 링크가 특정 값일 때 텍스트와 배경색을 변경하는 객체
  const tabContent: MyTabContent = {
    user: { text: "회원정보", backgroundColor: "red" },
    case: { text: "저장한 판례", backgroundColor: "red" },
    default: { text: currentName, backgroundColor: "#f3e9d2" },
  };

  // 현재 탭에 대한 텍스트와 배경색 가져오기
  const { text, backgroundColor } = tabContent[tab || "default"];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          backgroundColor: backgroundColor,
          color: "white",
        }}
      >
        <div
          style={{
            padding: "3rem",
          }}
        >
          <p>{text}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
            backgroundColor: "#a68b60",
            color: "white",
          }}
        >
          <NavLink
            to="/mypage/user"
            className={({ isActive }) =>
              isActive
                ? `${style["nav-link"]} ${style.active}`
                : style["nav-link"]
            }
            onClick={() => setCurrentName("hi")}
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
