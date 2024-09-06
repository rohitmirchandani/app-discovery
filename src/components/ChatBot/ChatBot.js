// components/ChatbotEmbed.js
import { useEffect } from 'react';
import styles from './Chatbot.module.css'; // Adjust the path as needed

const ChatbotEmbed = ({ embedToken }) => {
  useEffect(() => {
    // Ensure the script is only added once
    if (document.getElementById('chatbot-main-script')) return;

    const script = document.createElement('script');
    script.id = 'chatbot-main-script';
    script.src = 'https://chatbot-embed.viasocket.com/chatbot-prod.js';
    script.setAttribute('embedToken', embedToken);
    document.body.appendChild(script);

    script.onload = () => {
      // Ensure the chatbot opens as soon as the script is loaded
      if (window.openChatbot) {
        window.openChatbot();
      }

      // Send configuration to the chatbot
      if (window.SendDataToChatbot) {
        window.SendDataToChatbot({
          bridgeName: 'somthing',
          threadId: '66daab55cc75aee1af1f6231',
          hideCloseButton: true, // Hide the close button
          fullScreen: false,     // Set to true if you want it to be in fullscreen
          hideIcon: true,       // Set to true if you want to hide the icon
          variables: {
            // Add any additional variables here
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [embedToken]);

  return (
    <div className={styles.chatbotContainer}>
      {/* The chatbot will be managed by the script */}
    </div>
  );
};

export default ChatbotEmbed;
