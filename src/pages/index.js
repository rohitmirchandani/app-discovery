import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Blog from '@/components/Blog/Blog';
import styles from './home.module.css';
import { createChat, fetchBlogs } from '@/utils/apiHelper';
import { toast } from 'react-toastify';
import { getUserDataFromLocalStorage } from '@/utils/storageHelper';

export default function Home() {
  const router = useRouter();
  const [userCreatedBlogs, setUserCreatedBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);  // Loader state

  // Fetch blogs
  useEffect(() => {
    async function fetchBlogsData(userEmail) {
      setLoading(true);
        

      try {
        const userBlogs = await fetchBlogs(userEmail, true);
        const otherBlogs = await fetchBlogs(userEmail, false);
    
        setUserCreatedBlogs(userBlogs.data);
        setOtherBlogs(otherBlogs.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blogs.');
      } finally {
        setLoading(false);  // Stop loader
      }
    }

      fetchBlogsData(user?.email || '');
  }, [user]);

  // Search filtering
  useEffect(() => {
    if (searchQuery) {
      const combinedBlogs = [...userCreatedBlogs, ...otherBlogs];
      const filteredResults = combinedBlogs.filter((blog) =>
        JSON.stringify(blog).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, userCreatedBlogs, otherBlogs]);
  useEffect(()=>{
    setUser(getUserDataFromLocalStorage());

  },[])

  // Handle chat creation
  const handleCreateChat = async () => {
    try {
      const { data } = await createChat();
      await router.push(`/edit/${data._id}`);
    } catch (err) {
      await router.push(`/auth`);
      toast.error(err.message);
    }
  };

  // Conditional blog rendering
  const renderBlogsSection = (blogs, title) => (
    blogs.length > 0 && (
      <section className={styles.Homesection}>
        <h2 className={styles.homeh2}>{title}</h2>
        <div className={styles.cardsGrid}>
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      </section>
    )
  );

  return (
    <div>
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
        {loading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <h2 className={styles.homeh2}>Search Results</h2>
            <div className={styles.cardsGrid}>
              {searchResults.map((blog) => (
                <Blog key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {renderBlogsSection(userCreatedBlogs, 'User Blogs')}
            {renderBlogsSection(otherBlogs, 'All Blogs')}
          </>
        )}
      </div>
    </div>
  );
}
