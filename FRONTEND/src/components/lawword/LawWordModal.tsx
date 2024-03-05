import { Flex, Button, Input } from "antd";
import style from "../../styles/lawword/LawWordModal.module.css";
import DICTIONARY from "../../assets/dictionary.png";
import CHAT from "../../assets/chat.png";
import CHARACTER from "../../assets/character.png";
import CLOSE from "../../assets/close.png";
import LawWordCard from "./LawWordCard";

{
  /* <a target="_blank" href="https://icons8.com/icon/35087/dictionary">사전</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a>
<a target="_blank" href="https://icons8.com/icon/blkASdk2Luuz/talk">이야기</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a>
<a target="_blank" href="https://icons8.com/icon/3atPSvSnKydZ/close">닫기</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a>*/
}

interface LawWordModalProps {
  modalHandler: () => void;
}

const LawWordModal = ({ modalHandler }: LawWordModalProps) => {
  const { Search } = Input;
  return (
    <section className={style["modal-page"]}>
      <Flex vertical>
        <Flex className={style["modal-header"]}>
          <img className={style["modal-header__icon"]} src={CHARACTER} alt="" />
          <p className={style["modal-header__title"]}>어학사전</p>
          <img
            className={style["modal-header__close"]}
            src={CLOSE}
            alt=""
            onClick={modalHandler}
          />
        </Flex>
        <Flex
          className={style["modal-body"]}
          justify="space-around"
          align="center"
          vertical
        >
          <Search
            placeholder="검색할 단어를 입력하세요. "
            style={{ width: "90%" }}
          />
          <Flex
            className={style["modal-body__content"]}
            vertical
            align="center"
          >
            <LawWordCard></LawWordCard>
          </Flex>
        </Flex>
        <Flex className={style["footer-btn"]}>
          <Button type="primary" className={style["footer-btn__1"]}>
            <img
              className={style["footer-btn__image"]}
              src={DICTIONARY}
              alt=""
            />
          </Button>
          <Button type="primary" className={style["footer-btn__2"]}>
            <img className={style["footer-btn__image"]} src={CHAT} alt="" />
          </Button>
        </Flex>
      </Flex>
    </section>
  );
};

export default LawWordModal;
