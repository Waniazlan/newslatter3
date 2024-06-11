// ContactList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const ContactList = () => {
  
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get('http://localhost:3000/getAllList');
        setContacts(response.data.contacts);
        console.log(response.data.contacts)
      } catch (error) {
        console.error("Error fetching contacts:", error.message);
      }
    }

    fetchContacts();
  }, []);
   

  // const handleSelectChange = (selectedOptions) => {
  //   setSelectedContacts(selectedOptions);
  // };

  // const contactOptions = contacts.map((contact) => ({
  //   value: contact.id,
  //   label: `${contact.email}`

  // }));

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      {/* <h1>Contact List</h1>
      <Select
        isMulti
        options={contactOptions}
        value={selectedContacts}
        onChange={handleSelectChange}
        placeholder="Select contacts..."
      /> */}
      <div>
        <h2>Selected Contacts</h2>
       {contacts.map((contact,id) =>{
        return(
          <div>
            {contact.email}
          </div>
        )
       })}
      </div>
    </div>
  );
};

export default ContactList;
