import React from 'react'
import PropTypes from 'prop-types';
import s from './ContactList.module.css'

export const ContactList = ({ filterContacts, onDeleteContacts }) => {
    return (
        <ul className={s.list}>
            {filterContacts.map(contact => (
                <li key={contact.id} className={s.item}>
                    <p className={s.text}>{contact.name}: {contact.number} </p>
                    <button type="button" onClick={() => onDeleteContacts(contact.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
};

ContactList.propTypes = {
  filterContacts: PropTypes.array,
  onDeleteContacts: PropTypes.func,
};
