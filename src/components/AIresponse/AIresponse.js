// components/AIresponse/AIresponse.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import ChatFooter from '@/components/ChatFooter/ChatFooter';
import styles from './AIresponse.module.scss';
import { dummyMarkdown } from '@/utils/utils';

const AIresponse = ({ messages }) => {
  const data = dummyMarkdown;
  const latestBotMessage = messages.filter(message => message?.type === 'bot').slice(-1)[0];
  const hasMarkdown = latestBotMessage?.text?.markdown?.length > 0;

  const handlePublish = async () => {
    const blogData = {
      title: latestBotMessage?.text?.title || 'blog tilte',  
      markdown: latestBotMessage?.text?.markdown || '',
      tags: latestBotMessage?.text?.tags || '',
      createdBy: {
        userName: 'Gourav choudhary ',  
        userEmail: 'test@gmail.com',  
      },
    };

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
    } catch (error) {
      console.error('Failed to publish blog:', error);
      alert('An error occurred while publishing the blog.');
    }
  };

  return (
    <div className={styles.markdownContainer}>

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {hasMarkdown ? latestBotMessage.text.markdown : data}
      </ReactMarkdown>

      {hasMarkdown && (
        <>
          <div className={styles.tagsContainer}>
            <h3>Related Tags:</h3>
            {latestBotMessage.text.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <ChatFooter
            userName="Gourav Choudhary"  
            onPublish={handlePublish}  
          />
        </>
      )}
    </div>
  );
};

export default AIresponse;
