import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => ({ ...state, items: action.payload }),
    addContacts: (state, action) => ({
      ...state,
      items: [action.payload, ...state.items],
    }),
    deleteContacts: (state, action) => ({
      ...state,
      items: state.items.filter(contact => contact.id !== action.payload),
    }),
    filterContacts: (state, action) => ({
      ...state,
      filter: action.payload,
    }),
  },
});

export const { setContacts, addContacts, deleteContacts, filterContacts } =
  contactSlice.actions;

export default contactSlice.reducer;
