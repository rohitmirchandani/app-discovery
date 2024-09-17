// components/ChatFooter/ChatFooter.js
import styles from './ChatFooter.module.scss';

const ChatFooter = ({ userName,  onPublish, isEditable}) => {
  const handlePublish = () => {
    onPublish();
  };

  return (
    <div className={styles.chatFooter}>
      <h3>Created by: <span>{userName}</span></h3>
      { isEditable &&
      <button onClick={handlePublish}>Publish</button> 
      }
    </div>
  );
};

export default ChatFooter;
