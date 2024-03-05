import { Route, Routes } from "react-router-dom";
import LayoutPage from "./components/common/Layout";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import RecommendPage from "./pages/RecommendPage";
import FormPage from "./pages/FormPage";
import CalculatorPage from "./pages/CalculatorPage";
import MainPage from "./pages/Main";
import MyPage from "./pages/Mypage";

function App() {
  return (
    <>
      <Routes>
        {/* 레이아웃을 미리 짜놓고, 그 사이에 새로 만든 페이지들이 들어가게 함 */}
        <Route path="/*" element={<LayoutPage />}>
          <Route path="" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="intesrch" element={<SearchPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="plaint" element={<FormPage />} />
          <Route path="cal" element={<CalculatorPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
        {/* 다른 Route도 추가가능~ */}
      </Routes>
    </>
  );
}

export default App;
