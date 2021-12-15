import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import * as storage from './components/services/localStorage';
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
import s from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = storage.get('contacts');
    if (localContacts) {
      setContacts(localContacts);
      console.log('ok');
    } else {
      storage.save('contacts', contacts);
    }
  }, []);

  useEffect(() => {
    storage.save('contacts', contacts);
  }, [contacts]);

  const submitHandler = ({ name, number }) => {
    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === contactToAdd.name.toLowerCase(),
      )
    ) {
      return alert(`${contactToAdd.name} is already in contacts!`);
    } else {
      setContacts([contactToAdd, ...contacts]);
    }
  };

  const flterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const onChangeFilter = e => setFilter(e.target.value);

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <section className={s.section}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={submitHandler} />
      <h2 className={s.title}>Contacts</h2>
      <Filter onChange={onChangeFilter} value={filter} />
      <ContactList
        filterContacts={flterContacts()}
        onDeleteContacts={deleteContact}
      />
    </section>
  );
};

export default App;
