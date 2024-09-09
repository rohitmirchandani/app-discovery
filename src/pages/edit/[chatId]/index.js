import { useEffect, useState } from 'react';
import AIresponse from '@/components/AIresponse/AIresponse';
import Chatbot from '@/components/ChatBot/ChatBot';
import styles from './chatPage.module.css';
const blogService = require('@/services/blogServices');


export async function getServerSideProps(context) {
  const {chatId} = context.params;
  const chatHistory = await fetch(
    `https://routes.msg91.com/api/proxy/1258584/32nghul25/api/v1/config/threads/${process.env.NEXT_PUBLIC_BRIDGE_ID}/${chatId}`,
    {
      headers: {
        pauthkey: process.env.NEXT_PUBLIC_PAUTH_KEY,
      },
    }
  ).then(res => res.json()).then(res => res.data);
  const blogData = await blogService.default.getBlogById(chatId); // default ko samajhna
  return {props : {
    chatHistory, blogData
  }}
}
export default function ChatPage({chatHistory, blogData}) {
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
