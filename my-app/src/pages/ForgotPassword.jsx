import { Input } from '../component/Input';
import { Button } from '/src/component/Button';
import ForgotPasswordImg from '../assets/icons/forgot-password.svg';

import { useState } from 'react';
import coffeeCupLogo from '../assets/icons/logo-coffee.svg';
import coffeeShopLogo from '../assets/icons/cup.svg';
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
    <div className="min-h-screen flex flex-col md:flex-row font-sans">

      <div className="hidden md:flex md:w-3/10 bg-linear-to-br from-orange-50 to-orange-100 items-center justify-center overflow-hidden">
        <img 
          src={ForgotPasswordImg} 
          alt="Login Illustration" 
          className="w-full h-full object-cover"
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
   
       <h2 className="text-3xl text-left mb-2 text-yellow-800 "> Fill out the form correctly </h2>
       <span className="block text-left text-gray-600 mb-8 text-sm">
       We will send new password to your email
       </span>

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

    <Button
      type="submit"
      className="w-full bg-orange-400 text-black font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
    >
      Submit
    </Button>


  
  </form>
</div>
    </div>
  );
}

export default ForgotPasswordPage;