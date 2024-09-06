
import styles from './ChatFooter.module.css'; // Assuming you want to use CSS Modules for styling

const Chatbot = (props) => {

  return (
    <div className={styles.chatFooter}>
      <h3>user : {props.userName}</h3>
      <button> publish </button>
    </div>
  );
};

export default Chatbot;
