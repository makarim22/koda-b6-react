// src/pages/Auth/LoginPage.jsx
import React from 'react';
import { Input } from '/src/component/Input';
import { Button } from '/src/component/Button';
import AuthLayout from '/src/layouts/AuthLayout';


function LoginPage() {
  // Tanpa state atau event handler untuk login, hanya tampilan
  const handleLoginClick = () => {
    alert('Simulasi: Tombol login ditekan. (Tidak ada logika di sini)');
  };

  return (
    <AuthLayout>
      <div >
        <h2 >Login to Your Account</h2>
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            // value dan onChange tidak diatur karena tidak ada state di sini
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            // value dan onChange tidak diatur
          />
          <Button type="submit" onClick={handleLoginClick}>Login</Button>
        </form>
        <p >
          Don't have an account? <a href="#">Register here</a>
          {/* Tautan ini tidak akan kemana-mana karena tidak ada router */}
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;