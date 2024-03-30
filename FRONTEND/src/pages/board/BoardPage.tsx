import { Outlet } from "react-router-dom";
import BoardTab from "../../components/board/BoardTab";
import "../../App.css";

export default function BoardPage() {
  return (
    <div className="pages">
      <BoardTab />
      <Outlet />
    </div>
  );
}
