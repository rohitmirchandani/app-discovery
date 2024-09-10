import { useState } from 'react';
import styles from './Chatbot.module.css';
import { Tooltip } from '@mui/material';

const Chatbot = ({ messages, setMessages, chatId, setBlogData }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const PAUTH_KEY = process.env.NEXT_PUBLIC_PAUTH_KEY;
  const BRIDGE_ID = process.env.NEXT_PUBLIC_BRIDGE_ID;

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = { role: 'user', content: inputMessage };
      setMessages([...messages, userMessage]);
      setInputMessage("");
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://routes.msg91.com/api/proxy/1258584/29gjrmh24/api/v2/model/chat/completion',
          {
            method: 'POST',
            headers: {
              'pauthkey': PAUTH_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: userMessage.content,
              bridge_id: BRIDGE_ID,
              thread_id: chatId
            }),
          }
        );

        const data = await response.json();
        if (data && data?.response?.data?.content) {
          const botMessage = { role: 'assistant', content: JSON.parse(data?.response?.data?.content) };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error("Error communicating with the chatbot API:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatWindow}>
        {messages.map((message, index) => {
          const isBot = message.role === 'assistant';
          const clickable = isBot && message?.content?.markdown;
          return (
            <div
              key={index}
              className={isBot ? styles.receivedMessage : styles.sentMessage }
              cursor = {clickable ? 'pointer' : 'default'}
            >
              {isBot ? message.content.message : message.content}
              {clickable && 
              <Tooltip title="revert to this version">
                <button
                  onClick = {() => setBlogData(message.content)}
                  className={styles.revertButton}
                >
                  &#x21BA;
                </button>
              </Tooltip>}
            </div>
          )
        })}
        {isLoading && (
          <div className={styles.thinkingMessage}>
            Generating results...
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
