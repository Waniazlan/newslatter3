import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { PostsContext } from '../component2/PostContext';
import '../css/post.css'

function Post() {
  const { filteredPosts, searchQuery, setSearchQuery } = useContext(PostsContext);
  

  return (
    <>
    <div className='grid'>
      <h4 className='font-bold text-2xl mt-5 text-center text-gray-800'>All Posts</h4>
      
      <div className="flex justify-center mt-5">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-500 text-gray-700"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button className="p-2 bg-blue-500 rounded-full text-white shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15.9 15.9A7.5 7.5 0 1118 10.5a7.5 7.5 0 01-2.1 5.4z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 shadow-md rounded-lg p-6 text-white transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            <Link to={`/send-email/${post.id}`} className="block text-white no-underline">
              <p className='text-gray-300 font-bold text-lg mb-3'>{post.title}</p>
              <div className="flex flex-col text-sm text-gray-400">
                <p className="mb-1"><strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}</p>
                <p className="mb-1"><strong>Updated At:</strong> {new Date(post.updated_at).toLocaleString()}</p>
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
