// components/AIresponse/AIresponse.js
import { List, Avatar, Link } from '@mui/material';
import React from 'react';
import styles from './Integerations.module.scss';

const Integrations = ({ integrations, pluginData }) => {
  if (!integrations?.length) return null;  
  return (
    <div className={styles.integrationDiv}>
        <h3 className = {styles.integrationHeading}>Top Integrations with the following apps.. </h3>
        <List className = {styles.integrationList}>
            {integrations?.map((integration, index) => (
                <li key={index} className = {styles.integrationItem}>
                  <div className = {styles.integrationIcons}>
                    <Avatar alt={integration.trigger.name} src={pluginData[integration.trigger.name].iconurl || ''} variant = 'square'/>
                    <Avatar alt={integration.actions[0].name} src={pluginData[integration.actions[0].name].iconurl || ''} variant = 'square'/>
                  </div>
                  <h5 className = {styles.integrationName}>{integration.description}</h5>
                  <Link className = {styles.integrationLink}>Try It</Link>
                </li>
            ))}
        </List>
    </div>
  );
};

export default Integrations;
