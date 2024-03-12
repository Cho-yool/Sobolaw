import { Outlet, useLocation } from "react-router-dom";
import ResponsiveNav from "./Navbar";
import Footer from "./Footer";
import LawWord from "../../pages/LawWord";
import "../../App.css";
import { useEffect, useState } from "react";

// 리액트 라우터 v6 버전에서 중첩 라우팅을 이용하면
// 부모 레이아웃은 그대로 두고 자식 레이아웃만 쉽게 교체

// Outlet이 바뀌는 컴포넌트 자리

function LayoutPage() {
  const location = useLocation();
  const [currentKey, setKey] = useState(0); // LawWord 컴포넌트의 key 상태

  // 위치 변경 감지하여 LawWord 컴포넌트를 다시 렌더링
  useEffect(() => {
    setKey(prevKey => prevKey + 1); // key 상태를 변경하여 LawWord 컴포넌트를 다시 렌더링
  }, [location]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ResponsiveNav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "visible",
        }}
      >
        <Outlet />
      </div>
      <LawWord key={currentKey}/>
      <Footer />
    </div>
  );
}

export default LayoutPage;
