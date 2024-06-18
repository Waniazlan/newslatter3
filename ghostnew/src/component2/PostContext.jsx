import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
 

    useEffect(() => {
        async function fetchPosts() {
          try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data);
          } catch (error) {
            console.error("Error fetching posts:", error.message);
          }
        }
        fetchPosts();
      }, []);
     
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
//.....................fetching post from GHOST................
 

  return (
    <PostsContext.Provider value={{ filteredPosts, searchQuery, setSearchQuery}}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };
