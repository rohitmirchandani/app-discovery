import AIresponse from '@/components/AIresponse/AIresponse';
import Chatbot from '@/components/ChatBot/ChatBot';
import styles from './chatPage.module.css';
import { useRouter } from 'next/router';
import Protected from '@/components/protected';
import { getAllPreviousMessages } from '@/utils/apis/chatbotapis';
import { getIntegrations } from '@/services/integrationServices';
import { useUser } from '@/context/UserContext';
import React , { useState, useEffect } from 'react';
const blogService = require('@/services/blogServices');



export async function getServerSideProps(context) {
  const {chatId} = context.params;
  const blogData = await blogService.default.getBlogById(chatId); // default ko samajhna
  const props = {blogData};
  try{
    const integrations = await getIntegrations(blogData.apps);
    props.integrations = integrations;
  }catch(error){
    console.error('Error fetching integrations:', error);
  }
  return {props};
}
export function safeParse (json){
  try {
    return JSON.parse(json)
  }
  catch (e){
    return { message:json };
  }
}

export default function ChatPage({ blogData: initBlogData, integrations}) {
  const { chatId } = useRouter().query;
  const [blogData, setBlogData] = useState(initBlogData);
  const [oldBlog, setOldBlog] = useState('');
  const {user}= useUser();

  const [messages, setMessages] = useState([{}]);
  useEffect(() => {
    if (!chatId) return; 
       ( async ()=>{
        const chatHistoryData = await getAllPreviousMessages(chatId)
        const prevMessages = chatHistoryData.data.map(chat => ({
          role: chat.role,
          content: chat.role === 'user' ? chat.content : safeParse(chat.content),
        }));
        setMessages(prevMessages);

        })()
  }, [chatId]);
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if(lastMessage?.role == 'assistant'){
      const content = lastMessage.content;
      if(content?.blog)
        setBlogData(content);
    }
  }, [messages])
  return (
    <Protected >
    <div>
      <div className={styles.chatPagediv}>
        <AIresponse blogData = {blogData} oldBlog={oldBlog} isEditable={true} chatId = {chatId} user={user} integrations={integrations} setOldBlog={setOldBlog}/>
        <Chatbot 
          messages={messages}
          setMessages={setMessages}
          embedToken={process.env.NEXT_PUBLIC_CHAT_BOT_TOKEN}
          chatId = {chatId}
          setBlogData = {setBlogData}
        />
      </div>
    </div>
    </Protected>
  );
}
