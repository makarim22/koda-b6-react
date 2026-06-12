import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../assets/admin/cup-brown.svg";
import LogoIcon from "../assets/admin/brand.svg";
import ProfileImg from "../assets/admin/Profile.png";
import DropdownIcon from "../assets/admin/dropdown.svg";

function NavbarAdmin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
      if (activeUser?.user?.name) {
        setAdminName(activeUser.user.name);
      } else if (activeUser?.name) {
        setAdminName(activeUser.name);
      }
    } catch (error) {
      console.warn("Could not retrieve admin data");
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUserSession");
    navigate("/login");
  };

  return (
    <div className="relative z-50">
      <div className="flex flex-row justify-between space-x-2 p-5 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
          <img src={LogoIcon} alt="Logo" className="h-6" />
        </div>
        
        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex flex-row gap-x-3 items-center hover:bg-gray-50 px-3 py-1.5 rounded-lg transition"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-sm font-semibold text-gray-800">{adminName}</span>
              <span className="text-xs text-gray-500">Administrator</span>
            </div>
            <img
              src={ProfileImg}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover border border-gray-200"
            />
            <img
              src={DropdownIcon}
              alt="Dropdown"
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{adminName}</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarAdmin;
