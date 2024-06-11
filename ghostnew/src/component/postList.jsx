import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/post.css'

function Post() {
  const [posts, setPosts] = useState([]);
  const [showFullExcerpt, setShowFullExcerpt] = useState(false);

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

 
  const maxLength = 150; 
  const toggleExcerpt = () => {
    setShowFullExcerpt(!showFullExcerpt);
  };
  return (
    <>
    <div className='grid '>
      <h4 className='font-bold text-xl mt-5 text-center '>All post</h4>
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {posts.map((post) => (
            <div key={post.id} className="bg-black shadow-xl rounded-md p-6 text-white hover:bg-slate-600 cursor-pointer">
              <Link to={`/send-email/${post.id}`} className="block text-white ">
                <p className='text-blue-400 font-bold text-xl py-2'>{post.title}</p>
                <div className="flex flex-wrap text-sm  ">
                  <p className="mr-4 "><strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}</p>
                  <p className="mr-4 "><strong>Updated At:</strong> {new Date(post.updated_at).toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
       
    </>
  );
}

export default Post;
