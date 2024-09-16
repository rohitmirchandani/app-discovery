import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Blog from "@/components/Blog/Blog"
import styles from './home.module.css';
import { createChat, fetchBlogs} from '@/utils/apiHelper';

export default function Home() {
  const router = useRouter()
  const [userCreatedBlogs, setUserCreatedBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchCards(userEmail) {
      try {
        const userBlogs = await fetchBlogs(userEmail, true);
        const otherBlogs = await fetchBlogs(userEmail, false);
    
        setUserCreatedBlogs(userBlogs.data);
        setOtherBlogs(otherBlogs.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    fetchCards("test@gmail.com");
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredResults = [
        ...userCreatedBlogs,
        ...otherBlogs,
      ].filter(card =>
        JSON.stringify(card).toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery,otherBlogs,userCreatedBlogs]);

  const handleCreateChat = async () => {
    try {
      const data = await createChat();
      router.push(`/edit/${data.data._id}`);
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  }

  return (
    <div>
      <h1 className={styles.homeh1}>App Discovery</h1>
      <div className = {styles.postHeader}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search Apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.newChat} onClick={handleCreateChat}>new chat</button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <div>
            <h2 className={styles.homeh2}>Search Results</h2>
            <div className={styles.cardsGrid}>
            {searchResults.map(card => (
              <Blog key={card._id} blog={card} />
            ))}
            </div>
          </div>
        ) : (
          <>
            <section className={styles.Homesection}>
              <h2 className={styles.homeh2}>Your Categories</h2>
              <div className={styles.cardsGrid}>
                {userCreatedBlogs.map(card => (
                  <Blog key={card._id} blog={card} />
                ))}
              </div>
            </section>

            <section className={styles.Homesection}>
              <h2 className={styles.homeh2}>Top Categories</h2>
              <div className={styles.cardsGrid}>
                {otherBlogs.map(card => (
                  <Blog key={card._id} blog={card} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
