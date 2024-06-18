
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FiMail, FiList, FiChevronDown, FiFolder } from 'react-icons/fi';




const SendEmailForm = () => {
    
    const [senders, setSenders] = useState([]);
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState(null);
    const [emailSubject, setEmailSubject] = useState('');
    const [contacts, setContacts] = useState([]);
    const [displayedContacts, setDisplayedContacts] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [selectedSender,setSelectedSender] = useState('')
    const [folderId, setFolderId] = useState('');
    const [FolderContacts,setFolderContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [selectAll, setSelectAll] = useState(false)
  
   

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
   //send email
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
                htmlContent,
                emailSubject,
                sender: selectedSender.value,
                selectedEmails
                
                
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

    //handle submit for the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        sendEmail(post);
    };

    //gett all the contact
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
    
      //get all the sender
    useEffect(() =>{
        async function fetchSender(){
            try {
                const response = await axios.get('http://localhost:3000/getsender')
                setSenders(response.data.senders)   
                
            } catch (error) {
                console.error("Error fetching sender:", error.message);
            }
        }
        fetchSender()
    },[])

        const handleRecipientChange = (selectedOptions) => {
                setSelectedRecipients(selectedOptions);
            };

        //show only 5 contact, when scroll it will show more
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
        //to load more all the contact
        const loadMoreContacts = () => {      
            setDisplayedContacts(contacts); 
        };
       
        const recipientEmails = selectedRecipients.map(recipient => ({
            email: recipient.label
           
        }));
       
        const handleSenderChange = selectedOption => {
            setSelectedSender(selectedOption);
           
        };
       

        //....folder.......
        const handleFolderChange = (e) => {
            setFolderId(e.target.value);
          };
          
          const handleSubmitFolder = () => {
            axios.get(`http://localhost:3000/getContactDetails?folderId=${folderId}`)
              .then(response => {
                console.log(response.data.contacts);
                setFolderContacts(response.data.contacts)
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
          };
          
          const handleContactSelect = (contactId) => {
            setSelectedContacts(prevSelected => 
              prevSelected.includes(contactId)
                ? prevSelected.filter(id => id !== contactId)
                : [...prevSelected, contactId]
            );
            
          };
          
          const handleSelectAllContacts = () => {
            if (selectAll) {
              setSelectedContacts([]);
            } else {
              const allContactIds = FolderContacts.map(contact => contact.id);
              setSelectedContacts(allContactIds);
            }
            setSelectAll(prevSelectAll => !prevSelectAll);
          };
          
      
            
       
            
           const selectedEmails = FolderContacts
           .filter(contact => selectedContacts.includes(contact.id))
           .map(contact => contact.email);
         
         
         
         

    
       
    return (
    
  <div className="container mx-auto my-5 rounded-md py-6 px-5">
  <div className='flex flex-row'>
         
    <div className="w-full lg:w-1/2 mx-2 mb-4">
    <form onSubmit={handleSubmit} className=" shadow-xl max-w-xl rounded-3xl px-10 pt-8 pb-10 mb-8 mx-auto transform transition-all hover:shadow-2xl">
            <div className='mb-3'>
           
            <Select
                value={selectedSender}
                onChange={handleSenderChange}
                options={senders.map(sender => ({ value: sender.email, label:sender.email}))}
                placeholder="Sender email..."
                styles={{
                    control: (provided) => ({
                        ...provided,
                        borderRadius: '0.75rem',
                        padding: '0.2rem',
                        borderColor: 'transparent',
                        boxShadow: '0 0 0 2px #f3edf2',
                        '&:hover': {
                        boxShadow: '0 0 0 2px #f3edf2',
                        }
                    })
                    }}
            />    
            </div> 
     
            <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FiMail />
                    </span>
                    <input
                    type="text"
                    id="emailSubject"
                    className="shadow-md appearance-none border border-transparent rounded-lg w-full py-3 pl-10 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#f3edf2] focus:shadow-outline transition duration-200"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder='Email subject'
                    required
                    />
            </div>
            <div className=" relative mb-4">
                    <label className="block text-[#513e4e] text-sm font-bold mb-2" htmlFor="postId">
                    Ghost post ID
                    </label>
                    <input
                    type="text"
                    id="postId"
                    className="shadow-md appearance-none border border-transparent rounded-lg w-full py-3 pl-10 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#f3edf2] focus:shadow-outline transition duration-200"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    required
                    />
            </div>
      
            <Select
                isMulti
                options={displayedContacts.map(contact => ({ value: contact.id, label: contact.email }))}
                value={selectedRecipients}
                onChange={handleRecipientChange}
                onMenuScrollToBottom={loadMoreContacts} 
                onInputChange={handleInputChange}
                placeholder="Select recipient..."
                className="mb-8"
                styles={{
                control: (provided) => ({
                    ...provided,
                    borderRadius: '0.75rem',
                    padding: '0.2rem',
                    borderColor: 'transparent',
                    boxShadow: '0 0 0 2px #f3edf2',
                    '&:hover': {
                    boxShadow: '0 0 0 2px #f3edf2',
                    }
                })
                }}
            />

<div className='w-full max-w-3xl bg-white p-1 rounded-lg '>
      <div className='mb-4 flex flex-col md:flex-row items-center justify-between'>
        <input 
          type="text" 
          value={folderId} 
          onChange={handleFolderChange} 
          placeholder="Enter Folder ID" 
          className="block w-full md:w-60 px-4 py-2 mb-2 md:mb-0 md:mr-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button 
          onClick={handleSubmitFolder} 
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
      {FolderContacts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input 
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllContacts}
                    className="form-checkbox h-5 w-5 text-indigo-600  focus:ring-indigo-500"
                  />
                </th>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {FolderContacts.map((contact, id) => (
                <tr key={id} className="border-t">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleContactSelect(contact.id)}
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-2">{contact.id}</td>
                  <td className="px-4 py-2"><span className='mr-1'>{contact.attributes.FIRSTNAME}</span>{contact.attributes.LASTNAME}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      )}
    </div>
 
      <button
        type="submit"
        className="bg-[#513e4e] hover:bg-black text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-outline transition duration-200 transform hover:scale-105"
      >
        Send Email
      </button>
      
      {!post && postId && <div className="text-white mt-4">Loading post details...</div>}
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
</div>

    );
};

export default SendEmailForm;
