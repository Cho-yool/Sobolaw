import { Outlet } from "react-router-dom";
import MyPageTab from "../../components/mypage/MypageTab";

export default function MyPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <MyPageTab />
      <Outlet />
    </div>
  );
}
