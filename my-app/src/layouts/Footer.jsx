import React from "react";

import CoffeeCupIcon from "../assets/icons/homepage/cup-brown.svg";
import CoffeeShopIcon from "../assets/icons/homepage/CoffeeShop.svg";
import FacebookIcon from "../assets/icons/Facebook.png";
import TwitterIcon from "../assets/icons/Twitter.png";
import InstagramIcon from "../assets/icons/Instagram.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-12 md:py-16 px-8 md:px-32">
      <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
        <div className="footer-section about flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center space-x-2 mb-4">
            <img src={CoffeeCupIcon} alt="Coffee Cup" className="h-8 w-8" />
            <img src={CoffeeShopIcon} alt="Coffee Shop Logo" className="h-8" />
          </div>
          <p className="mt-4 text-base max-w-xs">
            Coffee Shop is a store that sells some good meals, and especially
            coffee. We provide high quality beans.
          </p>
          <p className="mt-6 text-sm">
            &copy; {new Date().getFullYear()} CoffeeStore
          </p>
        </div>

        <div className="footer-section products text-center md:text-left">
          <h3 className="text-lg font-semibold text-black mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
              >
                Our Product
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                Locations
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                Countries
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section engage text-center md:text-left">
          <h3 className="text-lg font-semibold text-black mb-4">Engage</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
              >
                Partner
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section social-media text-center md:text-left">
          <h3 className="text-lg font-semibold text-black mb-4">
            Social Media
          </h3>
          <div className="social-icons flex justify-center md:justify-center">
            <img
              src={FacebookIcon}
              alt="Facebook"
              className="w-15 h-15 "
            />
            <img
              src={TwitterIcon}
              alt="Twitter"
              className="w-15 h-15 "
            />
            <img
              src={InstagramIcon}
              alt="Instagram"
              className="w-15 h-15 "
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
