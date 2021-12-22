import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contacts/contactsSlicer';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
