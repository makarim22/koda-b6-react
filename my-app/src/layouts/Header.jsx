import React from "react";

import MenuIcon from "../assets/icons/cup-white.svg";
import LogoIcon from "../assets/icons/coffee-shop.svg";
import SearchIcon from "../assets/icons/Search.svg";
import ShoppingCartIcon from "../assets/icons/ShoppingCart.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = (props) => {
  const STORAGE_KEY = "user-data";
  const [loggedinUser, setLoggedinUser] = React.useState({});
  const { bgColor } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      try {
        const usersString = localStorage.getItem(STORAGE_KEY);

        if (usersString) {
          const allUsers = JSON.parse(usersString);
          const activeUser = allUsers.find((user) => user.isLoggedIn === true);

          if (activeUser) {
            setLoggedinUser(activeUser);
          } else {
            setLoggedinUser(null);
          }
        } else {
          setLoggedinUser(null);
        }
      } catch (error) {
        console.error("Error parsing users data:", error);
        setLoggedinUser(null);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    const usersString = localStorage.getItem(STORAGE_KEY);
    if (usersString) {
      try {
        let allUsers = JSON.parse(usersString);
        const loggedInUserIndex = allUsers.findIndex(
          (user) => user.isLoggedIn === true,
        );

        if (loggedInUserIndex !== -1) {
          allUsers[loggedInUserIndex].isLoggedIn = false;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));
        }

        setLoggedinUser(null);
        navigate("/login");
      } catch (error) {
        console.error(
          "Error parsing or updating users data during logout:",
          error,
        );
        setLoggedinUser(null);
        navigate("/login");
      }
    } else {
      setLoggedinUser(null);
      navigate("/login");
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`flex items-center justify-between px-5 md:px-32 py-4 fixed top-0 left-0 right-0 w-full ${bgColor || "bg-transparent"} z-10  shadow-md border-b border-white/20  `}
    >
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <button className="md:hidden p-2" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
          <img src={LogoIcon} alt="Logo" className="h-6" />
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white text-base hover:text-gray-300">
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
        <div className="hidden md:flex flex-row gap-6">
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
        </div>

        {loggedinUser ? (
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-white text-sm text-right border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors duration-200"
              onClick={() => navigate("/profile")}
            >
              <p className="text-sm font-semibold">
                {" "}
                Hi, {loggedinUser.fullname}!{" "}
              </p>
            </button>
            <button
              onClick={handleLogout}
              className="text-white text-sm border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}

        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-0 bg-transparent bg-opacity-50 z-30 md:hidden">
            <div className="fixed top-16 left-0 h-screen w-64 bg-amber-600 shadow-lg z-40 flex flex-col overflow-y-auto">
              <nav className="flex flex-col space-y-1 px-4 py-6">
                <Link
                  onClick={toggleMobileMenu}
                  to="/"
                  className="text-black hover:bg-[#FF8906] px-4 py-3 rounded-lg transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  onClick={toggleMobileMenu}
                  to="/product"
                  className="text-black hover:bg-[#FF8906] px-4 py-3 rounded-lg transition-colors duration-200"
                >
                  Product
                </Link>
              </nav>

              <div className="border-t border-gray-700 px-4 py-6">
                <div className="flex flex-row gap-6 mb-6">
                  <img
                    src={SearchIcon}
                    alt="Search"
                    className="h-6 w-6 cursor-pointer hover:opacity-80"
                  />
                  <img
                    src={ShoppingCartIcon}
                    alt="Cart"
                    className="h-6 w-6 cursor-pointer hover:opacity-80"
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 px-4 py-6 mt-auto">
                {loggedinUser ? (
                  <>
                    <button
                      className="w-full text-black text-sm border-2 border-white px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 mb-3"
                      onClick={() => {
                        navigate("/profile");
                        toggleMobileMenu();
                      }}
                    >
                      Hi, {loggedinUser.fullname}!
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="w-full text-black text-sm border-2 border-white px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={toggleMobileMenu}
                      to="/login"
                      className="w-full block text-center text-black text-sm border-2 border-white px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 mb-3"
                    >
                      Sign In
                    </Link>
                    <Link
                      onClick={toggleMobileMenu}
                      to="/register"
                      className="w-full block text-center text-black text-sm bg-[#FF8906] px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
