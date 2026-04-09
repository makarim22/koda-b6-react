// src/pages/Auth/LoginPage.jsx
import React from "react";
import { Input } from "../component/Input";
import { Button } from "/src/component/Button";
import AuthLayout from "/src/layouts/AuthLayout";
import loginImg from "../assets/icons/barista-girl.svg";
import http from "../lib/http";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import coffeeCupLogo from "../assets/icons/logo-coffee.svg";
import coffeeShopLogo from "../assets/icons/cup.svg";
import mailIcon from "../assets/icons/mail.svg";
import passwordIcon from "../assets/icons/Password.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import googleIcon from "../assets/icons/google.svg";

import { loginSuccess } from "../features/user/authSlice";

import { useDispatch, useSelector } from "react-redux";

const STORAGE_KEY = "user-data";

// const API_BASE_URL = import.meta.env.VITE_ || 'http://localhost:8888';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Effect to redirect if already authenticated via Redux
  useEffect(() => {
    if (isAuthenticated) {
      alert("You are already logged in! Redirecting to home.");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
      dispatch(loginSuccess(user));

      setEmail("");
      setPassword("");

      alert("Login successful! Redirecting to home.");
      navigate("/");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-white">
      <div className="hidden md:flex md:w-3/10 bg-linear-to-br from-orange-50 to-orange-100 items-center justify-center overflow-hidden">
        <img
          src={loginImg}
          alt="Cup of Coffee"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="w-full md:w-7/10 flex items-center justify-center p-6 md:p-12 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col">
          <div className="flex flex-row items-center gap-3">
            <img src={coffeeShopLogo} alt="Logo" className="h-7" />
            <img src={coffeeCupLogo} alt="Text" className="w-22 h-22" />
          </div>

          <h2 className="text-3xl text-left mb-2 text-yellow-800 ">Login</h2>
          <span className="block text-left text-gray-600 mb-8 text-sm">
            Fill out the form correctly
          </span>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

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
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-orange-400 hover:text-orange-600  transition duration-200"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-400 text-black font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
          >
            Login
          </Button>

          <p className="text-center text-gray-600 text-sm mt-6">
            Not Have an Account?{" "}
            <Link
              to="/register"
              className="text-orange-400 transition duration-200"
            >
              Register
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
              <span className="text-sm font-medium text-gray-700">
                Facebook
              </span>
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

export default LoginPage;
