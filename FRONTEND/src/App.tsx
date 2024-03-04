import { Route, Routes } from "react-router-dom";
import NavBar from "./components/common/Navbar";
import LawCaseDetail from "./pages/lawcasedetail/LawCaseDetail";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="뭐시기" element={<???Page />} /> */}
        <Route path="/detail" element={<LawCaseDetail />} />
      </Routes>
    </>
  );
}

export default App;
