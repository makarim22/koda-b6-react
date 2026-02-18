import React from "react";
import MenuIcon from "../assets/admin/cup-brown.svg";
import LogoIcon from "../assets/admin/brand.svg";
import SearchIcon from "../assets/admin/Search.svg";
import ShoppingCartIcon from "../assets/admin/ShoppingCart.svg";
import ProfileImg from "../assets/admin/Profile.png";
import Dropdown from "../assets/admin/dropdown.svg";
function NavbarAdmin() {
  return (
    <div>
      <div className="flex flex-row justify-between space-x-2 p-5">
        <div className="flex items-center space-x-2">
          <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
          <img src={LogoIcon} alt="Logo" className="h-6" />
        </div>
        <div className="flex flex-row gap-x-4">
          <img
            src={SearchIcon}
            alt="Search"
            className="h-5 w-5 cursor-pointer"
          />
          <img
            src={ShoppingCartIcon}
            alt="Cart"
            className="h-5 w-5 cursor-pointer"
          />
          <img
            src={ProfileImg}
            alt="Profile"
            className="h-5 w-5 cursor-pointer"
          />
          <img
            src={Dropdown}
            alt="Dropdown"
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default NavbarAdmin;
