import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleContactClick = (contact) => {
      setSelectedContact(contact); // Set the selected contact to open the dialog
    };
  
    const handleCloseDialog = () => {
      setSelectedContact(null); // Clear the selected contact to close the dialog
    };


    return (
        <div className="app">
            <header className="header" style={{display:'flex', justifyContent:'center'}}>
                <h1
                style={{margin:'20px 0'}}>Contacts</h1>
                <input
                style={{margin:'10px 20px'}}
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </header>
            <div className="contacts-list">
                {filteredContacts.map(contact => (
                    <div key={contact.id} className="contact-card" onClick={() => handleContactClick(contact)}>

                        <div style={{display: 'flex', flexDirection: 'row'}}>

                          <img src="/user.png" alt={`${contact.name}'s profile`} className='profile-image' />
                          <div className='separator'></div>

                        <div>

                          <h2>{contact.name}</h2>
                          {/* <p>Email: {contact.email}</p> */}
                          <p>{contact.phone}</p>
                          {/* <p>Website: {contact.website}</p> */}
                        </div>

                        </div>
                    </div>
                ))}
            </div>
            {selectedContact && (
               <div className="dialog-overlay">
               <div className="dialog">
               <img src="/user.png" alt={`${selectedContact.name}'s profile`} className='profile-image' />
               <h2>{selectedContact.name}</h2>
                 <p>
                   <strong>Email:</strong> {selectedContact.email}
                 </p>
                 <p>
                   <strong>Phone:</strong> {selectedContact.phone}
                 </p>
                 <p>
                   <strong>Website:</strong> {selectedContact.website}
                 </p>
                 <p>
                   <strong>Address:</strong>{" "}
                   {`${selectedContact.address.street}, ${selectedContact.address.city}`}
                 </p>
                 <button className="close-button" onClick={handleCloseDialog}>
                   Close
                 </button>
               </div>
              </div>
            )}

        </div>
    );
};

export default App;
