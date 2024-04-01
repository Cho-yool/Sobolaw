import { Outlet } from "react-router-dom";
import BoardTab from "../../components/board/BoardTab";
import backgroundImage from "../../assets/board_bgi.jpg";
import "../../App.css";

export default function BoardPage() {
  return (
    <div className="pages">
      <BoardTab />
      <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <Outlet />
      </div>
    </div>
  );
}
