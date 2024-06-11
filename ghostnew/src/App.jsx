import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './component/postList';
import SendEmailForm from './component/SendEmail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Post/>} />
        <Route path="/send-email/:postId" element={<SendEmailForm />} />    
      </Routes>
    </Router>
  );
}

export default App;
