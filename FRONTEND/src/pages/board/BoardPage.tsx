import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { updateAuth } from "../../redux/reducers/user/userSlice";
import { getUserInfo } from "../../api/members";
import BoardTab from "../../components/board/BoardTab";
import backgroundImage from "../../assets/board_bgi.jpg";
import "../../App.css";

export default function BoardPage() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo(user.accessToken);
      if (userInfo.role != user.auth) {
        dispatch(updateAuth(userInfo.role));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pages">
      <BoardTab />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
