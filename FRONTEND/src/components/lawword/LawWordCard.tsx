import { Card } from "antd";
import style from "../../styles/lawword/LawWordCard.module.css";
import { wordListProps } from "../../types/DataTypes";

const LawWordCard = (word: wordListProps) => {
  console.log(word);
  return (
    <>
      <Card className={style["card-body"]}>
        <p className={style["card-body__content"]}>길다 길어 길어 주르르륵</p>
      </Card>
    </>
  );
};

export default LawWordCard;
