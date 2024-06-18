import React, { useState} from 'react';
import axios from 'axios';


function ContactFolders() {
  const [folderId, setFolderId] = useState('');
  const [contacts,setContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectAll, setSelectAll] = useState(false)

  const handleInputChange = (e) => {
    setFolderId(e.target.value);
  };

  const handleSubmit = () => {
    axios.get(`http://localhost:3000/getContactDetails?folderId=${folderId}`)
      .then(response => {
        console.log(response.data.contacts);
        setContacts(response.data.contacts)
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
      const allContactIds = contacts.map(contact => contact.id);
      setSelectedContacts(allContactIds);
    }
    setSelectAll(prevSelectAll => !prevSelectAll);
  };

  const handleSubmitSelectedContacts = () => {
    
    const selectedEmails = contacts
      .filter(contact => selectedContacts.includes(contact.id))
      .map(contact => contact.email);
      console.log(selectedEmails)

    axios.post('http://localhost:3000/submitEmails', { emails: selectedEmails })
      .then(response => {
        console.log('Emails submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the emails!', error);
      });
  };
  

  return (
    
    <div className='w-full max-w-3xl bg-white p-1 rounded-lg '>
      <div className='mb-4 flex flex-col md:flex-row items-center justify-between'>
        <input 
          type="text" 
          value={folderId} 
          onChange={handleInputChange} 
          placeholder="Enter Folder ID" 
          className="block w-full md:w-60 px-4 py-2 mb-2 md:mb-0 md:mr-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
      {contacts.length > 0 && (
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
              {contacts.map((contact, id) => (
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
          <button 
            onClick={handleSubmitSelectedContacts}
            className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit Selected Contacts
          </button>
        </div>
      )}
    </div>
  );
}

export default ContactFolders;