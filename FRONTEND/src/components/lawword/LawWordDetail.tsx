import { Flex } from "antd";
import style from "../../styles/lawword/LawWordDetail.module.css";
import { LeftOutlined } from "@ant-design/icons";

interface detailProps {
  wordInfo: string;
  wordTitle: string;
  isDetail: boolean;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const LawWordDetail = ({
  wordInfo,
  wordTitle,
  isDetail,
  setIsDetail,
}: detailProps) => {
  const clickHandler = () => {
    setIsDetail(!isDetail);
  };
  return (
    <Flex className={style[`content-box`]} vertical>
      <Flex className={style[`content-box__header`]} vertical justify="center">
        <LeftOutlined
          className={style[`content-box__header__back`]}
          onClick={clickHandler}
        />
        <p className={style[`content-box__header__title`]}>{wordTitle}</p>
      </Flex>
      <Flex className={style[`content-box__body`]}>
        <p className={style[`content-box__body__content`]}>
          {wordInfo.replace(/[{}[\]\s']/g, " ")}
        </p>
      </Flex>
    </Flex>
  );
};

export default LawWordDetail;
