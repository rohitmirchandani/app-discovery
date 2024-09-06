import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // Enables GitHub-flavored markdown
import ChatFooter from '@/components/ChatFooter/ChatFooter';

import styles from "./AIresponse.module.css"

// GptResponse component to render Markdown content
const AIresponse = ({ data }) => {
  return (
    <div className={styles.markdownContainer}> 
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {data}
      </ReactMarkdown>
      <ChatFooter />      
    </div>
  );
};

export default AIresponse;
