import React from 'react';

import MenuIcon from '../assets/icons/cup-white.svg';
import LogoIcon from '../assets/icons/coffee-shop.svg';
import SearchIcon from '../assets/icons/Search.svg';
import ShoppingCartIcon from '../assets/icons/ShoppingCart.svg';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { bgColor } = props;
  return (
    <header className={`flex items-center justify-between px-5 md:px-32 py-4 fixed top-0 left-0 right-0 w-full ${bgColor || 'bg-transparent'} z-10`}>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
          <img src={LogoIcon} alt="Logo" className="h-6" />
        </div>

        <nav className="flex space-x-6">
          <Link
            to="/"
            className="text-white text-base hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="text-white text-base hover:text-gray-300"
          >
            Product
          </Link>
        </nav>
      </div>

      <nav className="flex items-center space-x-6">
        <img src={SearchIcon} alt="Search" className="h-5 w-5 cursor-pointer" />
        <img src={ShoppingCartIcon} alt="Cart" className="h-5 w-5 cursor-pointer" />

        <Link 
         to="/login"
         className="text-white text-sm border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors duration-200"
        >
          Sign In
        </Link>
        <Link 
         to="/register"
         className="text-[#0B132A] text-sm bg-[#FF8906] px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;