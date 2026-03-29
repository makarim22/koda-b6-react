
import React from 'react';
import { Input } from '../component/Input';
import { Button } from '/src/component/Button';
import AuthLayout from '/src/layouts/AuthLayout';
import RegisterImg from '../assets/coffee-cup.svg';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import coffeeCupLogo from '../assets/icons/logo-coffee.svg';
import coffeeShopLogo from '../assets/icons/cup.svg';
import mailIcon from '../assets/icons/mail.svg';
import ProfileIcon from '../assets/icons/productPage/Profile.svg';
import passwordIcon from '../assets/icons/Password.svg';
import facebookIcon from '../assets/icons/facebook.svg';
import googleIcon from '../assets/icons/google.svg';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import http from '../lib/http'


// const STORAGE_KEY = 'user-data';

// const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8888';

// const getStoredCredentials = () => {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [];
// };

// const saveCredentials = (credentialsArray) => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(credentialsArray));
// };

function RegisterPage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      alert('You are already logged in! Redirecting to home.');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedFullname = fullname.trim();
    const trimmedEmail = email.trim();

    // Frontend validation
    if (!trimmedFullname || !trimmedEmail || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await http('/admin/auth/register', JSON.stringify({
        name: trimmedFullname,
        email: trimmedEmail,
        password: password,
      }), {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'Registration failed. Please try again.');
        return;
      }

      // Clear form
      setFullname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      alert('Registration successful! Redirecting to login.');
      navigate('/login');
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-white">

      <div className="hidden md:flex md:w-3/10 bg-linear-to-br from-orange-50 to-orange-100 items-center justify-center overflow-hidden">
        <img 
          src={RegisterImg} 
          alt="Barista Girl" 
          className="w-full h-full object-cover "
        />
      </div>

<div className="w-full md:w-7/10 flex items-center justify-center p-6 md:p-12 bg-white">
  <form 
    onSubmit={handleSubmit} 
    className="w-full max-w-md flex flex-col"
  >
    <div className="flex flex-row items-center gap-3">
      <img src={coffeeShopLogo} alt="Logo" className="h-7" />
      <img src={coffeeCupLogo} alt="Text" className="w-22 h-22" />
    </div>

    <h2 className="text-3xl text-left mb-2 text-yellow-800 ">Register</h2>
    <span className="block text-left text-gray-600 mb-8 text-sm">
      Fill out the form correctly
    </span>
       <div className="mb-2">
      <Input
        label="Fullname"
        type="text"
        id="fullname"
        name="fullname"
        placeholder="Enter Your Fullname"
        required
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        icon={ProfileIcon}
        iconAlt="Profile Icon"
      />
    </div>

    <div className="mb-2">
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
        label="Confirm Password"
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

    <div className="text-right mb-6">
      {/* <a
        className="text-orange-400 text-sm font-medium transition duration-200"
        href="forgot-password.html"
      >
        Forgot Password?
      </a> */}
      <Link
        className="text-orange-400 text-sm font-medium transition duration-200"
        to="/forgot-password"
      >
        Forgot Password?
      </Link>
    </div>
    <Button
      type="submit"
      className="w-full bg-orange-400 text-black font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
    >
      Register
    </Button>
    <p className="text-center text-gray-600 text-sm mt-6">
      Already Have an Account?{' '}
     <Link to="/login" className="text-orange-500 hover:text-orange-600 transition duration-200">
        Login
      </Link>
    </p>

    <div className="flex items-center mt-8 mb-6">
      <div className="grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500 text-sm">Or</span>
      <div className="grow border-t border-gray-300"></div>
    </div>

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