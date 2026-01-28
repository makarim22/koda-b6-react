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
import passwordIcon from '../assets/icons/Password.svg';

// Social media icons
import facebookIcon from '../assets/icons/facebook.svg';
import googleIcon from '../assets/icons/google.svg';

const STORAGE_KEY = 'user-data';

const getStoredCredentials = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveCredentials = (credentialsArray) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentialsArray));
};

function RegisterPage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    let allCredentials = getStoredCredentials();
    console.log('Stored Credentials:', allCredentials);

    // const wrongPassword = allCredentials.some(
    //   user => user.email === trimmedEmail && user.password !== password
    // );
    // if (wrongPassword) {
    //   alert('Email atau password yang dimasukkan salah');
    //   return;
    // }

    // if (!allCredentials.some(user => user.email === trimmedEmail)) {
    //   alert('Email tersebut belum terdaftar di sistem kami');
    //   return;
    // }

    const userIndex = allCredentials.findIndex(user => user.email === trimmedEmail);

    if (userIndex !== -1) {
      allCredentials[userIndex] = { ...allCredentials[userIndex], isLoggedIn: true };
      saveCredentials(allCredentials);

      setEmail('');
      setPassword('');

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
    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Register</h2>
    <span className="block text-center text-gray-600 mb-8 text-sm">
      Fill out the form correctly
    </span>

       <div className="mb-6">
      <Input
        label="Fullname"
        type="text"
        id="fullname"
        name="fullname"
        placeholder="Enter Your Fullname"
        required
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        icon={mailIcon}
        iconAlt="Email Icon"
      />
    </div>

    {/* Email Input */}
    <div className="mb-6">
      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        placeholder="Enter Your Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={mailIcon}
        iconAlt="Email Icon"
      />
    </div>

    {/* Password Input */}
    <div className="mb-2">
      <Input
        label="Password"
        type="password"
        id="password"
        name="password"
        placeholder="Enter Your Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={passwordIcon}
        iconAlt="Password Icon"
      />
    </div>

        <div className="mb-2">
      <Input
        label="ConfirmPassword"
        type="password"
        id="password"
        name="password"
        placeholder="Confirm Your Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={passwordIcon}
        iconAlt="Password Icon"
      />
    </div>

    {/* Forgot Password */}
    <div className="text-right mb-6">
      <a
        className="text-orange-500 hover:text-orange-600 text-sm font-medium transition duration-200"
        href="forgot-password.html"
      >
        Forgot Password?
      </a>
    </div>

    {/* Login Button */}
    <Button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
    >
      Login
    </Button>

    {/* Register Link */}
    <p className="text-center text-gray-600 text-sm mt-6">
      Already Have an Account?{' '}
     <Link to="/login" className="text-orange-500 hover:text-orange-600 font-bold transition duration-200">
        Login
      </Link>
      {/* <a 
        href="register.html" 
        className="text-orange-500 hover:text-orange-600 font-bold transition duration-200"
      >
        Register
      </a> */}
    </p>

    {/* Divider */}
    <div className="flex items-center mt-8 mb-6">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500 text-sm">Or login with</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>

    {/* Social Media Login */}
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition duration-150"
      >
        <img src={facebookIcon} alt="Facebook Icon" className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-700">Facebook</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition duration-150"
      >
        <img src={googleIcon} alt="Google Icon" className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-700">Google</span>
      </button>
    </div>
  </form>
</div>
    </div>
  );
}

export default RegisterPage;