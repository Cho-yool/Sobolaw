import { Flex, Button } from "antd";
import style from "../../styles/lawword/LawWordModal.module.css";
import DICTIONARY from "../../assets/dictionary.png";
import CHAT from "../../assets/chat.png";
import CHARACTER from "../../assets/character.png";
import CLOSE from "../../assets/close.png";
import { useState } from "react";
import LawWordDict from "./LawWordDict";
import LawWordChat from "./LawWordChat";

{
  /* <a target="_blank" href="https://icons8.com/icon/35087/dictionary">사전</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a>
<a target="_blank" href="https://icons8.com/icon/blkASdk2Luuz/talk">이야기</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a>
<a target="_blank" href="https://icons8.com/icon/3atPSvSnKydZ/close">닫기</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a>*/
}

interface LawWordModalProps {
  modalHandler: () => void;
}

const LawWordModal = ({ modalHandler }: LawWordModalProps) => {
  const [currentSelect, setCurrentSelect] = useState<boolean>(true);

  return (
    <section className={style["modal-page"]}>
      <Flex vertical>
        <Flex className={style["modal-header"]}>
          <img className={style["modal-header__icon"]} src={CHARACTER} alt="" />
          <p className={style["modal-header__title"]}>
            {currentSelect ? "법령 용어 사전" : "보로Law"}
          </p>
          <img
            className={style["modal-header__close"]}
            src={CLOSE}
            alt=""
            onClick={modalHandler}
          />
        </Flex>
        {currentSelect ? (
          <LawWordDict></LawWordDict>
        ) : (
          <LawWordChat></LawWordChat>
        )}
        <Flex className={style["footer-btn"]}>
          <Button
            type="primary"
            className={
              currentSelect
                ? `${style["active"]} ${style["footer-btn__1"]}`
                : style["footer-btn__1"]
            }
            onClick={() => setCurrentSelect(true)}>
            <img
              className={style["footer-btn__image"]}
              src={DICTIONARY}
              alt=""
            />
          </Button>
          <Button
            type="primary"
            className={
              currentSelect
                ? style["footer-btn__2"]
                : `${style["active"]} ${style["footer-btn__2"]}`
            }
            onClick={() => setCurrentSelect(false)}>
            <img className={style["footer-btn__image"]} src={CHAT} alt="" />
          </Button>
        </Flex>
      </Flex>
    </section>
  );
};

export default LawWordModal;
