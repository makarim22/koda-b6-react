import React from 'react';
import MenuIcon from '../../icons/home/Frame.svg';
import LogoIcon from '../../icons/home/Logo.svg';
import SearchIcon from '../../icons/Search.svg';
import ShoppingCartIcon from '../../icons/ShoppingCart.svg';
import CheckmarkIcon from '../../icons/checkmark.svg';
import CoffeeCupIcon from '../../icons/coffee-cup.svg';
import CoffeeShopIcon from '../../icons/coffee-shop.svg';
import FacebookIcon from '../../icons/Facebook.svg';
import TwitterIcon from '../../icons/Twitter.svg';
import InstagramIcon from '../../icons/Instagram.png';
import BaristaImage from '../../images/barista.svg';
import GlobeImage from '../../images/globe.svg';

import Header from '../layouts/header';

const HomePage = () => {
  return (
    <div className="font-sans antialiased text-gray-900">
      
      <Header />
  
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white pt-20 md:pt-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-8 md:p-16 w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Start Your Day with Coffee and Good Meals
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg">
            We provide high-quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </p>
          <button className="bg-[#FF8906] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition duration-300 mb-10">
            Get Started
          </button>
          <div className="flex justify-center md:justify-start space-x-8 md:space-x-12 mt-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">90+</h2>
              <p className="text-gray-300">Staff</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">30+</h2>
              <p className="text-gray-300">Stores</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">800+</h2>
              <p className="text-gray-300">Customers</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block image-section bg-cover bg-center h-full w-1/2 bg-gray-800">
          {/* Hero background image placeholder */}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center justify-center py-16 md:py-24 bg-white text-gray-800 px-8 md:px-32">
        <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
          <p className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            We Provide <strong className="text-[#DEB887]">Good Coffee </strong> and
            <strong className="text-[#DEB887]"> Healthy Meals</strong>
          </p>
          <p className="text-lg leading-relaxed mb-8">
            You can explore the menu that we provide with fun and have their own
            taste to make your day better.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              High-quality beans
            </li>
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              Healthy meals, you can request the ingredients
            </li>
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              Chat with our staff to get a better experience for ordering
            </li>
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              Free member card with a minimum purchase of IDR 200.000.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={BaristaImage} alt="Barista" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Favorite Section */}
      <section className="py-16 md:py-24 bg-gray-100 text-gray-800 px-8 md:px-32 text-center">
        <div className="mb-12">
          <p className="text-3xl md:text-4xl font-bold mb-4">
            Here is People's <strong className="text-[#DEB887]">Favorite</strong>
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Let's choose and have a bit of taste of people's favorite. It might be
            yours too!
          </p>
        </div>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Product Name 1</h3>
            <p className="text-gray-600">Short description of the product.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Product Name 2</h3>
            <p className="text-gray-600">Short description of the product.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Product Name 3</h3>
            <p className="text-gray-600">Short description of the product.</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800 px-8 md:px-32 text-center">
        <p className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl mx-auto">
          <strong className="text-[#8e6447]">Visit Our Store </strong>in the Spot on
          the Map Below
        </p>
        <p className="text-lg max-w-2xl mx-auto mb-12">
          You can explore the menu that we provide with fun and have their own
          taste and make your day better.
        </p>
        <div className="flex justify-center">
          <img src={GlobeImage} alt="World Map" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white px-8 md:px-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Placeholder for testimonials or customer reviews.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 md:py-16 px-8 md:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2 mb-4">
              <img src={CoffeeCupIcon} alt="Coffee Cup" className="h-8 w-8" />
              <img src={CoffeeShopIcon} alt="Coffee Shop Logo" className="h-8" />
            </div>
            <p className="mt-4 text-base max-w-xs">
              Coffee Shop is a store that sells some good meals, and especially
              coffee. We provide high quality beans.
            </p>
            <p className="mt-6 text-sm">&copy; {new Date().getFullYear()} CoffeeStore</p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Our Product</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Countries</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Engage</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Partner</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook"><img src={FacebookIcon} alt="Facebook" className="h-6 w-6 hover:opacity-75 transition-opacity duration-200" /></a>
              <a href="#" aria-label="Twitter"><img src={TwitterIcon} alt="Twitter" className="h-6 w-6 hover:opacity-75 transition-opacity duration-200" /></a>
              <a href="#" aria-label="Instagram"><img src={InstagramIcon} alt="Instagram" className="h-6 w-6 hover:opacity-75 transition-opacity duration-200" /></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;