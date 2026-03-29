import { Input } from '../component/Input';
import { Button } from '/src/component/Button';
import ForgotPasswordImg from '../assets/icons/forgot-password.svg';

import { useState} from 'react';
import coffeeCupLogo from '../assets/icons/logo-coffee.svg';
import coffeeShopLogo from '../assets/icons/cup.svg';
import mailIcon from '../assets/icons/mail.svg';
import {useNavigate} from 'react-router-dom';


const STORAGE_KEY = 'user-data';
const API_BASE_URL = 'http://localhost:8888';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    // Basic validation
    if (!trimmedEmail) {
      setError('Email tidak boleh kosong');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Gagal mengirim OTP. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      // Store OTP data for reset password page
      localStorage.setItem('forgotPasswordData', JSON.stringify({
        email: data.data.email,
        otp: data.data.code_otp,
      }));

      setEmail('');
      setLoading(false);

      // Redirect to reset password page
      navigate('/reset-password');
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
      console.error('Forgot password error:', err);
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