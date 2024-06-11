const express = require('express');
const axios = require('axios');
var SibApiV3Sdk = require('sib-api-v3-sdk');
const cors = require('cors')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
require('dotenv').config();

  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.API_KEY;

app.use(express.json())
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods:['GET', 'POST','DELETE']
   }));
app.use(bodyParser.json());
const GHOST_URL = 'https://blog.imago.us';
const API_KEY = process.env.GHOST_API;


app.get('/',(req,res) =>{
    
})

app.get('/posts', async (req, res) => {
    try {
      const response = await fetch(
        `${GHOST_URL}/ghost/api/v3/content/posts/?key=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        res.json(data.posts);
      } else {
        throw new Error(data.errors[0].message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const response = await fetch(
            `${GHOST_URL}/ghost/api/v3/content/posts/${postId}/?key=${API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
            res.json(data.posts[0]);
        } else {
            throw new Error(data.errors[0].message);
        }
    } catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({ error: error.message });
    }
});


 app.get('/getAllContactList', async (req, res) => {
    try {
      let apiInstance = new SibApiV3Sdk.ContactsApi();
      let allContacts = [];
      let limit = 1000;
      let offset = 0;
      let hasMore = true;

     while (hasMore) {
        const opts = {
          'limit': limit,
          'offset': offset,
       
        };

        const data = await apiInstance.getContacts(opts);
         allContacts = allContacts.concat(data.contacts);

        if (data.contacts.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }

      res.status(200).json({ contacts: allContacts });
    } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
   }
  });


//..................................................................................
app.post('/send-email', async (req, res) => {
  const { recipientEmails, sender,htmlContent,emailSubject} = req.body;

 
  console.log(recipientEmails)
  
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
 

  sendSmtpEmail.subject = emailSubject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = { email: sender };
  sendSmtpEmail.to =recipientEmails;
  try {
  
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });