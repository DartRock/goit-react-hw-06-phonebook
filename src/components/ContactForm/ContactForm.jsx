import React from 'react'
import { useState } from 'react';
import s from './ContactForm.module.css'

const ContactForm = ({onSubmit}) => {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  const onChangeHandler = e => {
    const { name, value } = e.target;
    
    switch (name) {
      case "name":
        setName( value );
        break;
    
      case "number":
        setNumber( value );
        break;
    
      default:
        break;
    }
    
  };

  const submitHandler = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName("");
    setNumber("");
  };

    return (
      <form onSubmit={submitHandler} className={s.form}>
        <label className={s.label}>
          Name
          <input  
            name="name"
            type="text"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={onChangeHandler}
            className={s.input}
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input        
            name="number"
            type="tel"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={onChangeHandler}
            className={s.input}
            required
          />
        </label>
        <button type="submit" className={s.button}> Add contact</button>
      </form>
    );
}

export default ContactForm