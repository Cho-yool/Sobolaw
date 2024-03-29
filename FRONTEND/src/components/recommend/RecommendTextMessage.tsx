import React, {ReactNode} from 'react';
import style from '../../styles/recommend/RecommendTextMessage.module.css';

interface Message {
  text: ReactNode;
  type: 'sent' | 'received';
}

interface RecommendTextMessageProps {
  messages: Message[];
}

const RecommendTextMessage: React.FC<RecommendTextMessageProps> = ({ messages }) => {
  return (
    <div className={style.messageBubbleContainer}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${style.messageBubble} ${
            message.type === 'sent' ? style.sent : style.received
          }`}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendTextMessage;