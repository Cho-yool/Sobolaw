import { Route, Routes } from "react-router-dom";
import NavBar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<NavBar />}>
          {/* <Route path="home" element={<LandingPage />} /> */}
        </Route>
        {/* <Route path="뭐시기" element={<???Page />} /> */}
      </Routes>
    </>
  );
}

export default App;
