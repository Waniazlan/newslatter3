
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const SendEmailForm = () => {
    const [recipient, setRecipient] = useState('');
    const [sender, setSender] = useState('');
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState(null);
    const [emailSubject, setEmailSubject] = useState('');
    const [contacts, setContacts] = useState([]);
    const [displayedContacts, setDisplayedContacts] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
  
   

    useEffect(() => {
        if (postId) {
            async function fetchPost() {
                try {
                    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
                    setPost(response.data);
                    setEmailSubject(response.data.title)
                } catch (error) {
                    console.error("Error fetching post:", error.message);
                }
            }

            fetchPost();
        }
    }, [postId]);

    const sendEmail = async (post) => {
        if (!post) {
            alert('No post to send email for.');
            return;
        }

      const { title, excerpt, html } = post;
      const htmlContent = `
        <html>
        <head>
        <style>
        body {
         font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
         margin: 0;
         padding: 0;
         color: #333;
        }
        .container {
         max-width: 700px;
         margin: 20px auto;
         background-color: #ffffff;
         border-radius: 10px;
         overflow: hidden;
         box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
        
         color: #555;
         padding: 15px;
         text-align: center;
        }
        .header h2 {
         margin: 0;
         font-size: 22px;
        }
        .content {
         padding: 20px;
        }
        .content p {
         margin: 10px 0;
         line-height: 1.8;
        }
        
        .content .value {
         display: inline-block;
         padding: 4px 8px;
         color: #555;
         font-weight: bold
        }
        .content .post-html {
         margin-top: 20px;
         padding: 20px;
         background-color: #f9f9f9;
         border-radius: 4px;
        }
        .footer {
         text-align: center;
         padding: 20px;
         border-top: 1px solid #eeeeee;
         font-size: 14px;
        }
        .footer a {
         color: #555;
         text-decoration: none;
        }
        .footer a:hover {
         text-decoration: underline;
        }
        
        </style>
        </head>
        <body>
        <div class="container">
        <div class="header">
         <h2>${title}</h2>
        </div>
        <div class="content">
         <p><span class="label"></span> <span class="value">${excerpt}</span></p>
         <div class="post-html">${html}</div>
        </div>
        <div class="footer">
         <p>&copy; ${new Date().getFullYear()} Imago Technologies. All rights reserved.</p>
         <p><a href="https://blog.imago.us">Visit our blog website</a></p>
        </div>
        </div>
        </body>
        </html>
        `;
        
        try {
            const response = await axios.post('http://localhost:3000/send-email', {
              recipientEmails,
                sender,
                htmlContent,
                emailSubject
                

            });

            if (response.data.success) {
                alert('Email sent successfully!');
                console.log('email send successfully')
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            alert('Error sending email.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendEmail(post);
    };

    useEffect(() => {
        async function fetchContacts() {
          try {
            const response = await axios.get('http://localhost:3000/getAllContactList');
            setContacts(response.data.contacts);
            setDisplayedContacts(response.data.contacts.slice(0, 5));
          } catch (error) {
            console.error("Error fetching contacts:", error.message);
          }
        }
    
        fetchContacts();
      }, []);
      
      
      const handleRecipientChange = (selectedOptions) => {
        setSelectedRecipients(selectedOptions);

    };


         const handleInputChange = (inputValue) => {
            if (inputValue) {
               
                const filteredOptions = contacts.filter(contact =>
                    contact.email && contact.email.toLowerCase().includes(inputValue.toLowerCase())
                );
                setDisplayedContacts(filteredOptions);
            } else {
                
                setDisplayedContacts(contacts.slice(0, 5));
            }
        };
        
        const loadMoreContacts = () => {
         
            setDisplayedContacts(contacts); 
        };

        const recipientEmails = selectedRecipients.map(recipient => ({
            email: recipient.label
        }));

       
    return (
    
  <div className="container mx-auto my-5 bg-slate-400 rounded-md py-6 px-5">
  <div className='flex flex-row'>
         
    <div className="w-full lg:w-1/2 mx-2 mb-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-md max-w-lg rounded px-8 pt-6 pb-8 mb-4">
        {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
            Recipient Email:
            </label>
            <input
            type="email"
            id="recipient"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            />
        </div> */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
            Sender Email:
            </label>
            <input
            type="email"
            id="sender"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
            />
        </div> 
     
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postId">
            Ghost Post ID:
            </label>
            <input
            type="text"
            id="postId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            required
            />
        </div>
        <div className="mb-4">
                    <label htmlFor="emailSubject" className="block text-gray-700 text-sm font-bold mb-2">
                        Email Subject:
                    </label>
                    <input
                        type="text"
                        id="emailSubject"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        required
                    />
        </div>
        <Select
               
                isMulti
                options={displayedContacts.map(contact => ({ value: contact.id, label: contact.email }))}
                value={selectedRecipients}
                onChange={handleRecipientChange}
                onMenuScrollToBottom={loadMoreContacts} // Load more contacts when user scrolls to bottom
                onInputChange={handleInputChange} // Handle input change for search
                placeholder="Select recipient..."
              
        />
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Send Email
        </button>
        {!post && postId && <div className="text-gray-600 mt-2">Loading post details...</div>}
        </form>
      </div>

        <div className="w-full lg:w-1/2 mx-2 mb-4" >
            {post && (
            <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
                <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-700 mb-2">{post.excerpt}</p>
                <div
                dangerouslySetInnerHTML={{ __html: post.html }}
                className="py-2  my-2 rounded-md"
                ></div>
            </div>
            )}
        </div>
      
  </div>
              {selectedRecipients.map((recipient, index) => (
                    <li key={index}>{recipient.label}</li>
                ))}
</div>

    );
};

export default SendEmailForm;
