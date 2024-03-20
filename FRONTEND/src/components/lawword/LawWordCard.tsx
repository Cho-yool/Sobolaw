import { Card } from "antd";
import style from "../../styles/lawword/LawWordCard.module.css";

const LawWordCard = () => {
  return (
    <>
      <Card className={style["card-body"]}>
        <p className={style["card-body__content"]}>길다 길어 길어 주르르륵</p>
      </Card>
      <Card className={style["card-body"]}>
        <p className={style["card-body__content"]}>
          길다 길어 길어 주르르륵 길다 길어 길어 주르르륵 길다 길어 길어
          주르르륵
        </p>
      </Card>
      <Card className={style["card-body"]}>
        <p className={style["card-body__content"]}>hello</p>
      </Card>
      <Card className={style["card-body"]}>
        <p className={style["card-body__content"]}>hello</p>
      </Card>
    </>
  );
};

export default LawWordCard;
