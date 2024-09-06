import { useEffect, useState } from 'react';
import AIresponse from '@/components/AIresponse/AIresponse';
import Chatbot from '@/components/ChatBot/ChatBot';
import styles from './chatPage.module.css'

export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from the local API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/posts');  
        const result = await res.json();
        setData(result.content);  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <div className={styles.chatPagediv}>
      <AIresponse data={data} />
      <Chatbot embedToken={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMDAxNSIsImNoYXRib3RfaWQiOiI2NmRhYWI1NWNjNzVhZWUxYWYxZjYyMzEiLCJ1c2VyX2lkIjoiZ291cmF2Y2hvdWRoYXJ5MjAyNDZAZ21haWwuY29tIn0.cue9dpNOAhuT8DDXvRuAGsMQBW5OD_N3KEF3BztmUvA'}/>
    </div>
    </div>
  );
}
