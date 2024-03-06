import style from "../../styles/lawword/LawWordChatCard.module.css";

interface LawWordChatCardProps {
  question: string;
}

const LawWordChatCard = ({ question }: LawWordChatCardProps) => {
  return (
    <>
      <div className={style["chat-card__question"]}>
        <p className={style["chat-card__question__text"]}>{question}</p>
      </div>
      <div className={style["chat-card__answer"]}>
        <p className={style["chat-card__answer__text"]}>아직 미완성</p>
      </div>
    </>
  );
};

export default LawWordChatCard;
