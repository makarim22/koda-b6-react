// src/components/Button/Button.jsx
import React from 'react';
// import styles from './Button.module.css';

export function Button({ children, onClick, type = 'button', ...props }) {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}