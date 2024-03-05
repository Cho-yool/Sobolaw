import { Route, Routes } from "react-router-dom";
import LawCaseDetail from "./pages/lawcasedetail/LawCaseDetail";
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
        <Route path="/*" element={<Layout />}>
          <Route path="detail" element={<LawCaseDetail />} />
          <Route path="login" element={<LoginPage />} />
          {/* 임의로 이름 써놨는데 알아서 바꾸셈여 */}
          <Route path="intesrch" element={<SearchPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="plaint" element={<FormPage />} />
          <Route path="cal" element={<CalculatorPage />} />
        </Route>
        {/* 다른 Route도 추가가능~ */}
      </Routes>
    </>
  );
}

export default App;
