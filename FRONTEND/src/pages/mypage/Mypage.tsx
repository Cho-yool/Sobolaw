import { Outlet } from "react-router-dom";
import MyPageTab from "../../components/mypage/MypageTab";
import "../../App.css";

export default function MyPage() {
  return (
    <div className="pages">
      <MyPageTab />
      <Outlet />
    </div>
  );
}
