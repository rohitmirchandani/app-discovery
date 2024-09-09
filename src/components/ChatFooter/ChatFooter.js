// components/ChatFooter/ChatFooter.js
import styles from './ChatFooter.module.css';

const ChatFooter = ({ userName,  onPublish }) => {
  const handlePublish = () => {
    onPublish();
  };

  return (
    <div className={styles.chatFooter}>
      <h3>user: {userName}</h3>
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
};

export default ChatFooter;
