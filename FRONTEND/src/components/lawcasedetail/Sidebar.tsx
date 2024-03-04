import style from "../../styles/lawcasedetail/LawCaseSidebar.module.css";
import ARROW from "../../assets/arrow.png"; /* <a href="https://www.flaticon.com/kr/free-icons/" title="화살 아이콘">화살 아이콘  제작자: Catalin Fertu - Flaticon</a> */
import { useState } from "react";

const Sidebar = () => {
  const [isSelected, setIsselected] = useState<boolean>(false);
  return (
    <article
      className={
        isSelected ? `${style["sidebar"]} ${style["hide"]}` : style["sidebar"]
      }
    >
      <div
        className={style["side-btn"]}
        onClick={() => setIsselected(!isSelected)}
      >
        <img
          className={isSelected ? style["rotate"] : style["side-btn-img"]}
          src={ARROW}
          alt=""
        />
      </div>
    </article>
  );
};

export default Sidebar;
