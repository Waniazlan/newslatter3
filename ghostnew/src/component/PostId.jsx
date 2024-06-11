import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GetList from './GetList'



function PostId() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [folders,setFolders] = useState([])

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get('http://localhost:3000/getemailFolder');
        setFolders(response.data.data.folders);
      } catch (error) {
        console.error("Error fetching contacts:", error.message);
      }
    }

    fetchContacts();
  }, []);
   

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }



  return (
    <div className='bg-blue-100 text-center py-2 px-3 mx-2 my-2 '>
      <div>
          <div>
            <h2 className='text-2xl font-bold text-black '>{post.title}</h2>
                <p><strong>Excerpt:</strong> {post.excerpt}</p>
                <p><strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(post.updated_at).toLocaleString()}</p>
                <p><strong>Slug:</strong> {post.slug}</p> 
                <div dangerouslySetInnerHTML={{ __html: post.html }} className='bg-blue-200 py-2 my-3 '></div> 
            </div>
            
            <button className='py-3 px-2 rounded '>
                send Email
            </button>
      </div>
      
     <div>
      <h3>folder id</h3>
      {folders.map((folder,index) =>{
        return(
          <div key={index} className='flex gap-2'>
         <p>{folder.id}</p>
         <p>{folder.name}</p>
    
          </div>
        )
      })}
    </div> 
    </div>
  );
}

export default PostId;
