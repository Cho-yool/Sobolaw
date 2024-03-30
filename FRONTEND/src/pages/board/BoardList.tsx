import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BoardList } from "../../types/DataTypes";
import { getBoardList } from "../../api/board";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";
import BoardTable from "../../components/board/BoardTable";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

export default function BoardList() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<BoardList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBoardList();
      const data = response.map((item: any, index:any) => ({
        key: index.toString(),
        boardId: item.boardId,
        title: item.title,
        hit: item.hit,
        memberId: item.member.memberId,
        name: item.member.name,
        createdTime: item.createdTime,
        public: item.public,
      }));
      console.log(data);
      setBoardList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <BoardTable boardList={boardList} />
      </div>
    </div>
  );
}
