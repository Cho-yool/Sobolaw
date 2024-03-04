import { Route, Routes } from "react-router-dom";
import NavBar from "./components/common/Navbar";
import ResponsiveNav from "./components/common/temp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<NavBar />}></Route>
        <Route path="/home" element={<ResponsiveNav />} />
        {/* <Route path="뭐시기" element={<???Page />} /> */}
      </Routes>
    </>
  );
}

export default App;
