// src/components/Input/Input.jsx
import React from 'react';
// import styles from './Input.module.css';

export function Input({ label, type = 'text', value, onChange, ...props }) {
  return (
    <div >
      {label && <label htmlFor={props.id || label.toLowerCase()}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        // className={}
        id={props.id || label.toLowerCase()}
        {...props}
      />
    </div>
  );
}