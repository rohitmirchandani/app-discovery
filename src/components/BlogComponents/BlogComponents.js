import { dummyMarkdown } from '@/utils/utils';
import { List, ListItem } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Components = {
    title: (content) => (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
        </ReactMarkdown>
    ), 
    introduction : (content) => (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
        </ReactMarkdown>
    ),
    summaryList : (content) => {
        return (
            <>
                <h4>Summary List</h4>
                <List>
                    {content.map((app, idx) => (
                        <ListItem key = {idx}>
                            <h5>{app.name}</h5>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {app.description}
                            </ReactMarkdown>
                        </ListItem>
                    ))}
                </List>
            </>
        )
    },
    whatToLookFor: (content) => (
        <>
            <h4>What To Look For</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </>
    ), 
    detailedReviews : (content) => {
        const apps = content.map(app => app.name);
        return (
            <>
                <h4>Detailed Reviews</h4>
                <List>
                    {content.map((app, idx) => (
                        <ListItem key = {idx}>
                            <h5>{app.name}</h5>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {app.content}
                            </ReactMarkdown>
                        </ListItem>
                    ))}
                </List>
            </>
        )
    },
    conclusion: (content) => (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
    ), 
    dummy : () => (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {dummyMarkdown}
        </ReactMarkdown>
    )
}

export default Components;