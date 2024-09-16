import { useEffect, useState } from 'react';
import AIresponse from '@/components/AIresponse/AIresponse';
import Chatbot from '@/components/ChatBot/ChatBot';
import styles from './chatPage.module.css';
import { useRouter } from 'next/router';
import Protected from '@/components/protected';
import { getAllPreviousMessages } from '@/utils/apis/chatbotapis';
import { getIntegrations } from '@/services/integrationServices';
import { getUserDataFromLocalStorage } from '@/utils/storageHelper';
const blogService = require('@/services/blogServices');



export async function getServerSideProps(context) {
  const {chatId} = context.params;
  const blogData = await blogService.default.getBlogById(chatId); // default ko samajhna
  return {props : {
   blogData
  }}
}
export function safeParse (json){
  try {
    return JSON.parse(json)
  }
  catch (e){
    return { message:json };
  }
}

export default function ChatPage({ blogData: initBlogData}) {
  const { chatId } = useRouter().query;
  const [blogData, setBlogData] = useState(initBlogData);
  const [oldBlog, setOldBlog] = useState('');
  const [user,setUser]= useState('');

  const [messages, setMessages] = useState([{}]);
  useEffect(() => {
    ;if (!chatId) return; 
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
      if(content.markdown)
        setOldBlog(blogData);
        setBlogData(content);
    }
  }, [messages])
  useEffect(()=>{
    setUser(getUserDataFromLocalStorage());
  },[])
  return (
    <Protected >
    <div>
      <div className={styles.chatPagediv}>
        <AIresponse blogData = {blogData} oldBlog={oldBlog} isEditable={true} chatId = {chatId} user={user}/>
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
