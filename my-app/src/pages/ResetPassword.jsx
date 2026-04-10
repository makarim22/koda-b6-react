import { Input } from '../component/Input';
import { Button } from '../component/Button';
import ResetPasswordImg from '../assets/icons/forgot-password.svg';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coffeeCupLogo from '../assets/icons/logo-coffee.svg';
import coffeeShopLogo from '../assets/icons/cup.svg';
import { Lock } from 'lucide-react';
 import http from '../lib/http'

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('forgotPasswordData');
    
    if (!storedData) {
      setError('Session expired. Please start forgot password process again.');
      setTimeout(() => navigate('/forgot-password'), 3000);
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      setEmail(parsedData.email);
   
      if (parsedData.code_otp) {
        setOtp(parsedData.code_otp.toString());
      }
    } catch (err) {
      setError('Invalid session data. Please try again.');
      setTimeout(() => navigate('/forgot-password'), 3000);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    if (!newPassword.trim()) {
      setError('New password is required');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const body = JSON.stringify({
        email: email.trim(),
        code_otp: otp.trim(),
        new_password: newPassword,
      });

      const response = await http('/api/auth/reset-password', body, { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to reset password. Please try again.');
        setLoading(false);
        return;
      }

      localStorage.removeItem('forgotPasswordData');
      alert('Password reset successful! Please login with your new password.');
      navigate('/login');
    } catch (err) {
      setError('An error occurred. Please check your connection and try again.');
      console.error('Reset password error:', err);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex md:w-3/10 bg-gradient-to-br from-orange-50 to-orange-100 items-center justify-center overflow-hidden">
        <img 
          src={ResetPasswordImg} 
          alt="Reset Password Illustration" 
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

          <h2 className="text-3xl text-left mb-2 text-yellow-800">Reset Your Password</h2>
          <span className="block text-left text-gray-600 mb-8 text-sm">
            Enter the OTP and your new password below
          </span>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {email && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              Recovery email: <strong>{email}</strong>
            </div>
          )}

          <div className="mb-6">
            <Input
              label="OTP Code"
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-6">
            <Input
              label="New Password"
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password (min 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              icon={Lock}
              iconAlt="Lock Icon"
              required
            />
          </div>

          <div className="mb-6">
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              icon={Lock}
              iconAlt="Lock Icon"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 text-black font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;