import { Outlet } from "react-router-dom";
import ResponsiveNav from "./Navbar";
import Footer from "./Footer";

// 리액트 라우터 v6 버전에서 중첩 라우팅을 이용하면
// 부모 레이아웃은 그대로 두고 자식 레이아웃만 쉽게 교체

// Outlet이 바뀌는 컴포넌트 자리

function LayoutPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
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
      <Footer />
    </div>
  );
}

export default LayoutPage;
