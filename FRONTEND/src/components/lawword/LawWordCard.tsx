import { Card } from "antd";
import style from "../../styles/lawword/LawWordCard.module.css";
import { RightOutlined } from "@ant-design/icons";

interface wordProps {
  termDefinition: string;
  termId: number;
  termName: string;
  isDetail: boolean;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  searchInfo: (title: string, content: string) => void;
}

const LawWordCard = ({
  termDefinition,
  termName,
  isDetail,
  setIsDetail,
  searchInfo,
}: wordProps) => {
  const onClickHandler = () => {
    setIsDetail(!isDetail);
    searchInfo(termName, termDefinition);
  };

  return (
    <>
      <Card className={style["card-body"]} onClick={onClickHandler}>
        <p className={style["card-body__content"]}>{termName}</p>
        <RightOutlined className={style["card-body__content__arrow"]} />
      </Card>
    </>
  );
};

export default LawWordCard;
