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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([""]);
  const [selectedSubKeys, setSelectedSubKeys] = useState<string[]>([""]);
  const location = useLocation();
  const [currentKey, setKey] = useState(0); // LawWord 컴포넌트의 key 상태
  useEffect(() => {
    const currentLocation = location.pathname.split("/");
    if (currentLocation[1] === "search") {
      setSelectedKeys(["1"]);
      setSelectedSubKeys([""]);
    } else if (currentLocation[1] === "recommend") {
      setSelectedKeys(["2"]);
      setSelectedSubKeys([""]);
    } else if (currentLocation[1] === "cal") {
      setSelectedKeys(["3"]);
      setSelectedSubKeys([""]);
    } else if (currentLocation[1] === "plaint") {
      setSelectedKeys(["4"]);
      setSelectedSubKeys([""]);
    } else if (currentLocation[1] === "mypage") {
      setSelectedKeys([""]);
      if (currentLocation[2] === "user") {
        setSelectedSubKeys(["1"]);
      } else if (currentLocation[2] === "papers") {
        setSelectedSubKeys(["2"]);
      } else if (currentLocation[2] === "case") {
        setSelectedSubKeys(["3"]);
      }
    } else {
      setSelectedKeys([""]);
      setSelectedSubKeys([""]);
    }
  }, [location]);

  // 위치 변경 감지하여 LawWord 컴포넌트를 다시 렌더링
  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // key 상태를 변경하여 LawWord 컴포넌트를 다시 렌더링
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
      <ResponsiveNav
        selectedKeys={selectedKeys}
        selectedSubKeys={selectedSubKeys}
        setSelectedKeys={setSelectedKeys}
        setSelectedSubKeys={setSelectedSubKeys}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "visible",
        }}
      >
        <Outlet />
      </div>
      <LawWord key={currentKey} />
      <Footer />
    </div>
  );
}

export default LayoutPage;
