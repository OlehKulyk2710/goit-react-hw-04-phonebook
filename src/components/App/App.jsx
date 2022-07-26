import React from 'react';
import { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import css from './App.module.css';

import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { Toaster } from 'react-hot-toast';

const LC_KEY = 'phonebook';

// ------ Option 1: with custom hook useLocalStorage ------

const App = () => {
  const [contacts, setContacts] = useLocalStorage(LC_KEY, []);
  const [filter, setFilter] = useState('');

  function updateContacts(contact) {
    setContacts([...contacts, contact]);
  }

  function deleteContact(id) {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  }

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title__phonebook}>Phonebook</h1>
        <ContactForm contacts={contacts} onUpdateContacts={updateContacts} />

        <h2 className={css.title__contacts}>Contacts</h2>
        <Filter filter={filter} onFilterChange={setFilter} />
        {contacts.length !== 0 && (
          <ContactList
            contacts={contacts}
            filter={filter}
            onDeleteContact={deleteContact}
          />
        )}
      </div>
      <Toaster position="top-left" />
    </>
  );
};

export default App;

// ------ Option 2: without custom hooks ------

// const App = () => {
//   const [error, setError] = useState(null);
//   const [contacts, setContacts] = useState(checkLocalStorage);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     localStorage.setItem(LC_KEY, JSON.stringify(contacts));

//     if (contacts.length !== 0 && error) {
//       setError(null);
//     }
//   }, [contacts, error]);

//   function checkLocalStorage() {
//     try {
//       const dataFromLocStorage = JSON.parse(localStorage.getItem(LC_KEY));
//       return dataFromLocStorage ? dataFromLocStorage : [];
//     } catch (err) {
//       setError('LocalStorage is corrupted :(');
//       return [];
//     }
//   }

//   function updateContacts(contact) {
//     setContacts([...contacts, contact]);
//   }

//   function deleteContact(id) {
//     setContacts(prevState => prevState.filter(contact => contact.id !== id));
//   }

//   return (
//     <>
//       <div className={css.container}>
//         <h1 className={css.title__phonebook}>Phonebook</h1>
//         <ContactForm contacts={contacts} onUpdateContacts={updateContacts} />

//         <h2 className={css.title__contacts}>Contacts</h2>
//         <Filter filter={filter} onFilterChange={setFilter} />
//         {contacts.length !== 0 && (
//           <ContactList
//             contacts={contacts}
//             filter={filter}
//             onDeleteContact={deleteContact}
//           />
//         )}
//         {error && <p>{error}</p>}
//       </div>
//       <Toaster position="top-left" />
//     </>
//   );
// };

// export default App;
