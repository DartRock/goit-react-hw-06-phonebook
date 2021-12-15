import React from 'react'
import PropTypes from 'prop-types';
import s from './Filter.module.css'

export const Filter = ({ value, onChange }) => (
  <div className={s.wrapper}>
    <label className={s.label}>
    Find contacts by name
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={s.input}
    ></input>
  </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
