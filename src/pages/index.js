import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Blog from "@/components/Blog/Blog"
import styles from './home.module.css';

export default function Home() {
  const router = useRouter()
  const [userCreatedBlogs, setuserCreatedBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const userBlogResponse = await fetch('/api/blog');
        const otherBlogResponse = await fetch('/api/blog');

        const userBlogs = await userBlogResponse.json();
        const otherBlogs = await otherBlogResponse.json();

        setuserCreatedBlogs(userBlogs.data);
        setOtherBlogs(otherBlogs.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    fetchCards();
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

  const createChat = async () => {
    try{
    const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create chat');
      }
      const data = await res.json();
      console.log(data.data._id)
      router.push(`/edit/${data.data._id}`);
    } catch (err) {
      console.error("Error creating chat:", err);
    } 

  }

  return (
    <div>
      <h1 className={styles.homeh1}>App Discovery</h1>

      <input
        type="text"
        className={styles.search}
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className={styles.search} onClick={createChat}>new chat</button>
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
              <h2 className={styles.homeh2}>User</h2>
              <div className={styles.cardsGrid}>
                {userCreatedBlogs.map(card => (
                  <Blog key={card._id} blog={card} />
                ))}
              </div>
            </section>

            <section className={styles.Homesection}>
              <h2 className={styles.homeh2}>All Blogs</h2>
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
