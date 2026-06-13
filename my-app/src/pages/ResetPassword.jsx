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
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Left Side - Image/Branding */}
      <div className="hidden md:flex md:w-[45%] relative bg-zinc-950 items-center justify-center overflow-hidden p-12 isolate">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 z-0" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] z-0" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] z-0" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm p-8 mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={ResetPasswordImg} 
              alt="Reset Password" 
              className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/seed/resetpass/600/600";
              }}
            />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight text-center mb-4">
            Secure your <span className="text-orange-400">Account.</span>
          </h1>
          <p className="text-zinc-400 text-center text-lg leading-relaxed max-w-sm">
            Please enter your verification code and set a new password.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-6 md:p-12 lg:p-20 bg-white relative">
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col relative z-10">
          
          <div className="flex flex-row items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 shadow-sm">
              <img src={coffeeShopLogo} alt="Logo" className="h-6 w-6" />
            </div>
            <img src={coffeeCupLogo} alt="Koda Logo" className="h-7" />
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Reset Password</h2>
            <p className="text-zinc-500 text-sm">Enter the OTP and your new password below.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-fade-in-up">
              <span className="shrink-0">⚠️</span>
              {error}
            </div>
          )}

          {email && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-zinc-700 animate-fade-in-up">
              Recovery email: <strong className="text-zinc-900">{email}</strong>
            </div>
          )}

          <div className="space-y-4 mb-8">
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
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex justify-center items-center h-[56px]"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ResetPasswordPage;