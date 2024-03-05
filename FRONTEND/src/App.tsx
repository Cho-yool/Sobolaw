import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import RecommendPage from "./pages/RecommendPage";
import FormPage from "./pages/FormPage";
import CalculatorPage from "./pages/CalculatorPage";

function App() {
  return (
    <>
      <Routes>
        {/* 레이아웃을 미리 짜놓고, 그 사이에 새로 만든 페이지들이 들어가게 함 */}
        <Route path="/*" element={<Layout />}> // 모든 페이지에 공통되는 레이아웃을 제공한다.
          <Route path="login" element={<LoginPage />} />
          {/* 임의로 이름 써놨는데 알아서 바꾸셈여 */}
          <Route path="search" element={<SearchPage />} /> // 검색 페이지
          <Route path="recommend" element={<RecommendPage />} /> // 추천 페이지
          <Route path="form" element={<FormPage />} /> // 양식 작성 페이지
          <Route path="cal" element={<CalculatorPage />} />
        </Route>
        {/* 다른 Route도 추가가능~ */}
      </Routes>
    </>
  );
}

export default App;
