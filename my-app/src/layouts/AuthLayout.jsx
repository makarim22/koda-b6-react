// src/layouts/AuthLayout.jsx
import React from 'react';


function AuthLayout({ children }) {
  return (
    <div >
      <header >
        <h1>My Simple App</h1>
      </header>
      <main >
        {children} 
      </main>
      <footer >
        <p>&copy; 2023 My Simple App</p>
      </footer>
    </div>
  );
}

export default AuthLayout;