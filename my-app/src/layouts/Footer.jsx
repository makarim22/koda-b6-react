import React from 'react';


import CoffeeCupIcon from '../../icons/coffee-cup.svg';
import CoffeeShopIcon from '../../icons/coffee-shop.svg';
import FacebookIcon from '../../icons/Facebook.svg';
import TwitterIcon from '../../icons/Twitter.svg';
import InstagramIcon from '../../icons/Instagram.png'; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 md:py-16 px-8 md:px-32">
      <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
        {/* About Section */}
        <div className="footer-section about flex flex-col items-center md:items-start text-center md:text-left">
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


        <div className="footer-section products text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Our Product</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Locations</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Countries</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section engage text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Engage</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Partner</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section social-media text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
          <div className="social-icons flex justify-center md:justify-start space-x-4">
            <a href="#" aria-label="Facebook"><img src={FacebookIcon} alt="Facebook" className="h-6 w-6 hover:opacity-75 transition-opacity duration-200" /></a>
            <a href="#" aria-label="Twitter"><img src={TwitterIcon} alt="Twitter" className="h-6 w-6 hover:opacity-75 transition-opacity duration-200" /></a>
            <a href="#" aria-label="Instagram"><img src={InstagramIcon} alt="Instagram" className="h-6 w-6 hover:opacity-75 transition-opacity duration-200" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;