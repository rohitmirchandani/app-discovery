import { dummyMarkdown } from '@/utils/utils';
import { Avatar, List, ListItem } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './BlogComponents.module.scss'
import Integrations from '../Integrations/Integrations';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Components = {
    title: ({content, user, createdAt}) => (
        <div className={styles.titleDiv}>
            <ReactMarkdown className = {styles.title} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
            <div className = {styles.author}>
                <Avatar className = {styles.avatar}>{user.name.charAt(0).toUpperCase()}</Avatar>
                <span>By <strong>{user.name}</strong></span>
                <FiberManualRecordIcon className = {styles.dot}/>
                <span>{new Date(createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}</span>
            </div>
        </div>
    ), 
    introduction : ({content}) => (
        <ReactMarkdown className = {styles.introduction} remarkPlugins={[remarkGfm]}>
        {content}
        </ReactMarkdown>
    ),
    summaryList : ({content, integrations}) => {
        return (
            <div className = {styles.summaryList}>
                <h4>Summary List</h4>
                <List className='list'>
                    {content.map((app, idx) => {
                        const appName = app.name.toLowerCase();
                        const appData = integrations?.[appName]?.plugins[appName];
                        return (
                            <ListItem className = {styles.listItem} key = {idx}>
                                <Avatar className = {styles.appIcon} alt={app.name} src={appData?.iconurl || 'https://thingsofbrand.com/api/viasocket.com/logos/viasocket_logo_1'} variant='square'/>
                                <div className = {styles.content}>
                                    <h5>{app.name}</h5>
                                    <ReactMarkdown className = {styles.description} remarkPlugins={[remarkGfm]}>
                                        {appData?.description || app.description}
                                    </ReactMarkdown>
                                </div>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    },
    whatToLookFor: ({content}) => (
        <div className = {styles.whatToLookFor}>
            <h4>What To Look For</h4>
            <ReactMarkdown className = {styles.content} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    ), 
    detailedReviews : ({content, integrations}) => {
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
                            <Integrations integrations = {integrations?.[app.name.toLowerCase()]} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    },
    conclusion: ({content}) => (
        <div className = {styles.conclusion}>
            <h4>Conclusion</h4>
            <ReactMarkdown className = {styles.content} remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    ), 
    dummy : () => (
        <ReactMarkdown className = {styles.dummyMarkdown} remarkPlugins={[remarkGfm]}>
            {dummyMarkdown}
        </ReactMarkdown>
    )
}

export default Components;