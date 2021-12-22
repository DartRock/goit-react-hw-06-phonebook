import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import actions from './redux/contacts/contactsSlicer';
import * as actions from './redux/contacts/contactsSlicer';
import { nanoid } from 'nanoid';
import * as storage from './components/services/localStorage';
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
import s from './App.module.css';
import { addContacts } from './redux/contacts/contactsSlicer';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const localContacts = storage.get('contacts');
    if (localContacts) {
      dispatch(actions.setContacts(localContacts));
    } else {
      storage.save('contacts', contacts);
    }
  }, [dispatch]);

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
      dispatch(actions.addContacts(contactToAdd));
    }
  };

  const flterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const onChangeFilter = e => dispatch(actions.filterContacts(e.target.value));

  const deleteContact = id => {
    dispatch(actions.deleteContacts(id));
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
