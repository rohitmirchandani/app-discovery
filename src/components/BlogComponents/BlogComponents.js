import blogServices from '@/services/blogServices';
import { dummyMarkdown } from '@/utils/utils';
import { List, ListItem } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './BlogComponents.module.scss'

const Components = {
    title: (content) => (
        <ReactMarkdown className = {styles.title} remarkPlugins={[remarkGfm]}>
        {content}
        </ReactMarkdown>
    ), 
    introduction : (content) => (
        <ReactMarkdown className = {styles.introduction} remarkPlugins={[remarkGfm]}>
        {content}
        </ReactMarkdown>
    ),
    summaryList : (content) => {
        return (
            <div className = {styles.summaryList}>
                <h4>Summary List</h4>
                <List className='list'>
                    {content.map((app, idx) => (
                        <ListItem className = {styles.listItem} key = {idx}>
                            <h5>{app.name}</h5>
                            <ReactMarkdown className = {styles.description} remarkPlugins={[remarkGfm]}>
                                {app.description}
                            </ReactMarkdown>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    },
    whatToLookFor: (content) => (
        <div className = {styles.whatToLookFor}>
            <h4>What To Look For</h4>
            <ReactMarkdown className = {styles.content} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    ), 
    detailedReviews : (content) => {
        const apps = content.map(app => app.name);
        return (
            <div className = {styles.detailedReviews}>
                <h4>Detailed Reviews</h4>
                <List>
                    {content.map((app, idx) => (
                        <ListItem className = {styles.listItem} key = {idx}>
                            <h5>{app.name}</h5>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {app.content}
                            </ReactMarkdown>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    },
    conclusion: (content) => (
        <div className = {styles.conclusion}>
            <h4>Conclusion</h4>
            <ReactMarkdown className = {styles.content} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    ), 
    dummy : () => (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {dummyMarkdown}
        </ReactMarkdown>
    )
}

export default Components;