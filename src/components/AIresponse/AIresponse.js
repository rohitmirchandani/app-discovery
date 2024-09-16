// components/AIresponse/AIresponse.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import { useRouter } from 'next/router';
import ChatFooter from '@/components/ChatFooter/ChatFooter';
import styles from './AIresponse.module.scss';
import Head from 'next/head'
import { toast } from 'react-toastify';
import { compareBlogs, publishBlog, updateBlog } from '@/utils/apiHelper';
import Popup from '../PopupModel/PopupModel';
import Components from '../BlogComponents/BlogComponents';

const AIresponse = ({ blogData ,oldBlog, isEditable, chatId}) => {
  const [isPopupOpen,setIsPopUpOpen]=useState(false);
  const router = useRouter()
  const hasMarkdown = blogData?.blog;

  const handlePublish = async () => {
    const blogDataToPublish = {
      ...blogData, 
      createdBy: {
        userName: 'Gourav choudhary ',  
        userEmail: 'test1@gmail.com',  
      }, 
      published: true,
      apps : blogData.blog.find(section => section.section ==='summaryList').content.map(app => app.name)
    }
    try {
      const res=await compareBlogs(
        {
          current_blog : oldBlog?.markdown,
          updated_blog : blogData?.markdown
        })
      if(!oldBlog?.markdown || JSON.parse(res.response.data.content).ans === 'yes'){
        await updateBlog(chatId, blogDataToPublish);
        toast.success('Blog updated successfully!');
      }else{
        setIsPopUpOpen(true);
      }
    } catch (error) {
      console.error('Failed to publish blog:', error);
      toast.error('An error occurred while publishing the blog: ' + error.message);
    }
  };
  const handleNewPublish = async () => {
    const blogDataToPublish = {
      ...blogData, 
      createdBy: {
        userName: 'Gourav Choudhary',  
        userEmail: 'test1@gmail.com',  
      }, 
      published: true
    };
    try {
      const data = await publishBlog(blogDataToPublish);
      router.push(`/edit/${data.data._id}`);
      toast.success('Blog published successfully!');
    } catch (error) {
      console.error('Failed to publish blog:', error);
      toast.error('An error occurred while publishing the blog: ' + error.message);
    }finally{
      setIsPopUpOpen(false)
    }
  };
  return (
    <>
      <Head>
        <title>{(blogData?.title || "New chat") + ' | Viasocket'}</title>
      </Head>
      <div className={styles.markdownContainer}>
      
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {hasMarkdown ? blogData.markdown : data}
        </ReactMarkdown> */}
        {!hasMarkdown && Components['dummy']()}
        {hasMarkdown && (
          <>
            {
              blogData.blog.map(({section, content}) => Components[section]?.(content))
            }
            <div className={styles.tagsContainer}>
              <h3>Related Tags:</h3>
              {blogData?.tags?.map((tag, index) => (
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
      <Popup isOpen={isPopupOpen} onClose={()=>setIsPopUpOpen(false)} handlePublish={handleNewPublish}/>
    </>
  );
};

export default AIresponse;
