// components/ChatFooter/ChatFooter.js
import styles from './ChatFooter.module.scss';

const ChatFooter = ({ userName,  onPublish }) => {
  const handlePublish = () => {
    onPublish();
  };

  return (
    <div className={styles.chatFooter}>
      <h3>Curated by: <span>{userName}</span></h3>
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
};

export default ChatFooter;
