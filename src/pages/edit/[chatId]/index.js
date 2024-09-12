import { useEffect, useState } from 'react';
import AIresponse from '@/components/AIresponse/AIresponse';
import Chatbot from '@/components/ChatBot/ChatBot';
import styles from './chatPage.module.css';
import { useRouter } from 'next/router';
const blogService = require('@/services/blogServices');


export async function getServerSideProps(context) {
  const {chatId} = context.params;
  const chatHistory = await fetch(
    `https://routes.msg91.com/api/proxy/1258584/32nghul25/api/v1/config/threads/${chatId}/${process.env.NEXT_PUBLIC_BRIDGE_ID}`,
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

export default function ChatPage({chatHistory, blogData: initBlogData}) {
  const [blogData, setBlogData] = useState(initBlogData);
  const [oldBlog, setOldBlog] = useState('');
  const prevMessages = chatHistory.map(chat => ({
    role: chat.role,
    content: chat.role == 'user' ? chat.content : JSON.parse(chat.content)
  }))
  const [messages, setMessages] = useState(prevMessages);
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if(lastMessage?.role == 'assistant'){
      const content = lastMessage.content;
      if(content.markdown)
        setOldBlog(blogData);
        setBlogData(content);
    }
  }, [messages])
  const { chatId } = useRouter().query;
  return (
    <div>
      <div className={styles.chatPagediv}>
        <AIresponse blogData = {blogData} oldBlog={oldBlog} isEditable={true} chatId = {chatId}/>
        <Chatbot 
          messages={messages}
          setMessages={setMessages}
          embedToken={process.env.NEXT_PUBLIC_CHAT_BOT_TOKEN}
          chatId = {chatId}
          setBlogData = {setBlogData}
        />
      </div>
    </div>
  );
}
