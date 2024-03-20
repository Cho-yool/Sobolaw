import { useQuery } from "react-query";
import { getChatAnswer } from "../../api/lawword";
import style from "../../styles/lawword/LawWordChatCard.module.css";
import { useEffect, useState } from "react";
import { Spin } from "antd";

interface LawWordChatCardProps {
  question: string;
}

const LawWordChatCard = ({ question }: LawWordChatCardProps) => {
  const [renderData, setRenderData] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, isLoading } = useQuery(
    ["word", question],
    async () => {
      const response = await getChatAnswer(question);
      return response.data.choices[0].message.content;
    },
    {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    setRenderData(data);
  }, [data]);
  return (
    <>
      <div className={style["chat-card__question"]}>
        <p className={style["chat-card__question__text"]}>{question}</p>
      </div>
      <div className={style["chat-card__answer"]}>
        <span className={style["chat-card__answer__text"]}>
          {isLoading ? <Spin /> : renderData}
        </span>
      </div>
    </>
  );
};

export default LawWordChatCard;
