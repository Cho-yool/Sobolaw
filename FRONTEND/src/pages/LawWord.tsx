import style from "../styles/lawword/LawWord.module.css";
import Character from "../assets/character.png";
import TOP from "../assets/toparrow.png";
import LawWordModal from "../components/lawword/LawWordModal";
import { useState } from "react";
{
  // <a href="https://www.flaticon.com/kr/free-icons/" title="하위 아이콘">하위 아이콘  제작자: Freepik - Flaticon</a>
}

const LawWord = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function modalHandler() {
    setIsOpen(!isOpen);
  }
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {isOpen ? (
        <LawWordModal modalHandler={modalHandler}></LawWordModal>
      ) : null}

      <section className={style["btn-area"]}>
        <article className={style["word-btn"]} onClick={modalHandler}>
          <div className={style["btn-contents"]}>
            <img className={style["btn-image"]} src={Character} alt="" />
            <p className={style["btn-text"]}>도움</p>
          </div>
        </article>
        <article className={style["word-btn"]} onClick={goTop}>
          <div className={style["btn-contents"]}>
            <img className={style["btn-image__second"]} src={TOP} alt="" />
            <p className={style["btn-text"]}>Top</p>
          </div>
        </article>
      </section>
    </>
  );
};

export default LawWord;
