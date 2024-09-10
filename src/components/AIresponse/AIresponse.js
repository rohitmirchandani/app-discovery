// components/AIresponse/AIresponse.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import ChatFooter from '@/components/ChatFooter/ChatFooter';
import styles from './AIresponse.module.scss';
import { dummyMarkdown } from '@/utils/utils';
import Head from 'next/head'
import { toast } from 'react-toastify';

const AIresponse = ({ blogData , isEditable, chatId}) => {
  
  const data = dummyMarkdown;
  const hasMarkdown = blogData?.markdown

  const handlePublish = async () => {
    const blogDataToPublish = {
      ...blogData, 
      createdBy: {
        userName: 'Gourav choudhary ',  
        userEmail: 'test@gmail.com',  
      }, 
      published: true
    }
    try {
      const response = await fetch(`/api/blog/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogDataToPublish),
      });
      toast.success('Blog published successfully!');
    } catch (error) {
      console.error('Failed to publish blog:', error);
      toast.error('An error occurred while publishing the blog: ' + error);
    }
  };
  return (
    <>
      <Head>
        <title>{(blogData.title || "New chat") + ' | Viasocket'}</title>
      </Head>
      <div className={styles.markdownContainer}>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {hasMarkdown ? blogData.markdown : data}
        </ReactMarkdown>
        {hasMarkdown && (
          <>
            <div className={styles.tagsContainer}>
              <h3>Related Tags:</h3>
              {blogData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <ChatFooter
              userName="Gourav Choudhary"  
              onPublish={handlePublish}  
              isEditable={isEditable}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AIresponse;
