import { Input } from "../component/Input";
import { Button } from "/src/component/Button";
import ForgotPasswordImg from "../assets/icons/forgot-password.svg";

import { useState } from "react";
import coffeeCupLogo from "../assets/icons/logo-coffee.svg";
import coffeeShopLogo from "../assets/icons/cup.svg";
import mailIcon from "../assets/icons/mail.svg";
import { useNavigate } from "react-router-dom";
import http from "../lib/http";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    // Frontend validation
    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await http(
        "/api/auth/forgot-password",
        JSON.stringify({
          email: trimmedEmail,
        }),
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || data.message || "Failed to send OTP. Please try again.",
        );
        return;
      }

      // Store email and OTP in localStorage for reset page
      localStorage.setItem(
        "forgotPasswordData",
        JSON.stringify({
          email: trimmedEmail,
          code_otp: data.data?.code_otp,
        }),
      );

      // Clear form
      setEmail("");

      alert("OTP sent successfully! Check your email.");
      navigate("/reset-password");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col">
          <div className="flex flex-row items-center gap-3">
            <img src={coffeeShopLogo} alt="Logo" className="h-7" />
            <img src={coffeeCupLogo} alt="Text" className="w-22 h-22" />
          </div>

          <h2 className="text-3xl text-left mb-2 text-yellow-800 ">
            {" "}
            Fill out the form correctly{" "}
          </h2>
          <span className="block text-left text-gray-600 mb-8 text-sm">
            We will send new password to your email
          </span>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

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
