// src/pages/Auth/LoginPage.jsx
import React from 'react';
import { Input } from '../component/input';
import { Button } from '/src/component/Button';
import AuthLayout from '/src/layouts/AuthLayout';
import loginImg from '../assets/coffee-cup.svg';

import { useState } from 'react';
import { Link } from 'react-router-dom';

// Imports for logos inside the form
import coffeeCupLogo from '../assets/icons/logo-coffee.svg';
import coffeeShopLogo from '../assets/icons/cup.svg';

// Imports for input icons
import mailIcon from '../assets/icons/mail.svg';

const STORAGE_KEY = 'user-data';

const getStoredCredentials = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveCredentials = (credentialsArray) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentialsArray));
};

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    let allCredentials = getStoredCredentials();
    console.log('Stored Credentials:', allCredentials);


    if (!allCredentials.some(user => user.email === trimmedEmail)) {
      alert('Email tersebut belum terdaftar di sistem kami');
      return;
    }

    const userIndex = allCredentials.findIndex(user => user.email === trimmedEmail);

    if (userIndex !== -1) {
      allCredentials[userIndex] = { ...allCredentials[userIndex], isLoggedIn: true };
      saveCredentials(allCredentials);

      setEmail('');

      alert("Berhasil masuk! mengarahkan ke halaman utama");
      window.location.href = "home.html";
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    // Container utama: full height, flex row untuk side-by-side
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-white bg-black">

      {/* Bagian Kiri: Gambar (40% width) */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-orange-50 to-orange-100 items-center justify-center p-8 overflow-hidden">
        <img 
          src={loginImg} 
          alt="Login Illustration" 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Bagian Kanan: Form Login (60% width) */}
<div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12 bg-white">
  <form 
    onSubmit={handleSubmit} 
    className="w-full max-w-md flex flex-col"
  >
    {/* Logo Container */}
    <div className="flex flex-col items-center mb-8">
      <img src={coffeeCupLogo} alt="Logo" className="w-14 h-14 mb-3" />
      <img src={coffeeShopLogo} alt="Coffee Shop Logo" className="h-7" />
    </div>

    {/* Heading */}
    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Fill out the form correctly</h2>
    <span className="block text-center text-gray-600 mb-8 text-sm">
      We will send new password to your email
    </span>

    {/* Email Input */}
    <div className="mb-6">
      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        placeholder="Enter Your Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        icon={mailIcon}
        iconAlt="Email Icon"
      />
    </div>

    {/* Login Button */}
    <Button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
    >
      Submit
    </Button>


  
  </form>
</div>
    </div>
  );
}

export default ForgotPasswordPage;