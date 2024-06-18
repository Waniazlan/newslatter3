import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './component/postList';
import SendEmailForm from './component/SendEmail';
import ContactFolder from './component/ContactFolder'
import Header from './component2/Header'
import { PostsProvider } from './component2/PostContext';



function App() {
  return (
    <Router>
      <Header />
      <PostsProvider>
      <div className="container mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<Post/>} />
        <Route path="/send-email/:postId" element={<SendEmailForm />} />     
        <Route path="/getContactDetails" element={<ContactFolder />} />   

         
      </Routes>
      </div>
      </PostsProvider>
    </Router>
  );
}

export default App;
