import { useState } from 'react';
import AIresponse from '@/components/AIresponse/AIresponse';
import Chatbot from '@/components/ChatBot/ChatBot';
import styles from './chatPage.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  

  return (
    <div>
      <div className={styles.chatPagediv}>
        <AIresponse  messages={messages} />
        <Chatbot 
          messages={messages}
          setMessages={setMessages}
          embedToken={process.env.NEXT_PUBLIC_CHAT_BOT_TOKEN}
        />
      </div>
    </div>
  );
}
