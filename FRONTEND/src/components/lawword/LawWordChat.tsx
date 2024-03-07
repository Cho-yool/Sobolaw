import { Flex } from "antd";
import style from "../../styles/lawword/LawWordChat.module.css";
import SEND from "../../assets/send.png";
import LawWordChatCard from "./LawWordChatCard";
import { useEffect, useRef, useState } from "react";
{
  /* <a href="https://www.flaticon.com/kr/free-icons/" title="보내다 아이콘">보내다 아이콘  제작자: feen - Flaticon</a> */
}

const LawWordChat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [keyCounter, setKeyCounter] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const [chatList, setChatList] = useState<JSX.Element[]>([]);
  const textHandler = () => {
    if (!inputText.trim()) {
      alert("검색어를 입력하세요");
      return;
    }
    const newChatItem: JSX.Element = (
      <LawWordChatCard key={keyCounter} question={inputText} />
    );
    const newChatList = [...chatList, newChatItem];
    setChatList(newChatList);
    setInputText("");
    setKeyCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <Flex
      className={style["chat-body"]}
      justify="space-around"
      align="center"
      vertical
    >
      <Flex
        className={style["chat-body__content"]}
        ref={chatRef}
        vertical
        align="center"
      >
        {chatList.length > 0 ? chatList : <p>　</p>}
      </Flex>
      <Flex className={style["chat-body__input"]}>
        <textarea
          value={inputText}
          rows={1}
          className={style["chat-body__input__area"]}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className={style["chat-body__input__image"]} onClick={textHandler}>
          <img src={SEND} alt="" />
        </div>
      </Flex>
    </Flex>
  );
};

export default LawWordChat;
