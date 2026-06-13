import { Input } from "../component/Input";
import { Button } from "/src/component/Button";

import loginImg from "../assets/icons/barista-girl.svg";
import http from "../lib/http";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coffeeCupLogo from "../assets/icons/logo-coffee.svg";
import coffeeShopLogo from "../assets/icons/cup.svg";
import mailIcon from "../assets/icons/mail.svg";
import passwordIcon from "../assets/icons/Password.svg";
import googleIcon from "../assets/icons/google.svg";
import { Github } from "lucide-react";
import { BASE_URL } from "../lib/http";
import { loginSuccess } from "../features/user/authSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await http(
        "/api/auth/login",
        JSON.stringify({
          email: trimmedEmail,
          password: password,
        }),
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || data.message || "Login failed. Please try again.",
        );
        setLoading(false);
        return;
      }

      const user = data.data || data;

      dispatch(
        loginSuccess({
          id: user.id,
          email: user.email,
          role: user.role, 
          fullName: user.fullName,
          token: user.token,
        }),
      );

      setEmail("");
      setPassword("");

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
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
              src={loginImg}
              alt="Welcome Barista"
              className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/seed/koda/600/600";
              }}
            />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight text-center mb-4">
            Welcome back to <span className="text-orange-400">Koda.</span>
          </h1>
          <p className="text-zinc-400 text-center text-lg leading-relaxed max-w-sm">
            Sign in to access your order history, save favorites, and enjoy a seamless coffee experience.
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
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Sign in</h2>
            <p className="text-zinc-500 text-sm">Please enter your details to continue.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-fade-in-up">
              <span className="shrink-0">⚠️</span>
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            <Input
              label="Email Address"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={mailIcon}
              iconAlt="Email Icon"
            />
            
            <div>
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={passwordIcon}
                iconAlt="Password Icon"
              />
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex justify-center items-center h-[56px]"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-center text-zinc-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              Create an account
            </Link>
          </p>

          <div className="flex items-center my-8">
            <div className="grow border-t border-slate-200"></div>
            <span className="mx-4 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Or continue with</span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => window.location.href = `${BASE_URL}/api/auth/github`}
              className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl px-4 py-3.5 cursor-pointer hover:bg-slate-50 hover:border-slate-300 shadow-sm active:scale-95 transition-all duration-200 group"
            >
              <Github className="w-5 h-5 text-zinc-700 group-hover:text-zinc-900 transition-colors" />
              <span className="text-sm font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors">
                GitHub
              </span>
            </button>
            <button
              type="button"
              onClick={() => window.location.href = `${BASE_URL}/api/auth/google`}
              className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl px-4 py-3.5 cursor-pointer hover:bg-slate-50 hover:border-slate-300 shadow-sm active:scale-95 transition-all duration-200 group"
            >
              <img src={googleIcon} alt="Google Icon" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300" />
              <span className="text-sm font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors">
                Google
              </span>
            </button>
          </div>
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

export default LoginPage;
