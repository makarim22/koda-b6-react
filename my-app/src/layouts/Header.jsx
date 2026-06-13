import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/authSlice";
import MenuIcon from "../assets/icons/cup.svg";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/product" },
];

const Header = ({ bgColor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.user);
  const loggedInUser = authState?.email;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout(authState?.email));
    navigate("/login");
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const navLinkClass = (to) =>
    `relative text-sm font-semibold transition-colors duration-200 px-1 py-5 border-b-2 ${
      isActive(to) ? "border-orange-400 text-orange-500" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-slate-300"
    }`;

  // If a specific dark background is passed via props (like on StaticPage hero), we must adapt.
  // We'll use a dynamic theme based on whether bgColor is dark.
  const isDark = bgColor && bgColor.includes('zinc-950');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          bgColor ||
          (scrolled
            ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200/50"
            : "bg-transparent")
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 py-4">
              <img src={MenuIcon} alt="Logo" className={`h-6 w-6 ${isDark ? 'brightness-0 invert' : ''}`} />
              <span className={`font-extrabold text-lg tracking-tighter hidden sm:block ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                Koda<span className="text-orange-400">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 h-full">
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} className={isDark ? navLinkClass(to).replace('text-zinc-500', 'text-zinc-400').replace('hover:text-zinc-900', 'hover:text-white').replace('hover:border-slate-300', 'hover:border-white/30') : navLinkClass(to)}>
                  {label}
                </Link>
              ))}
              {loggedInUser && (
                <Link to="/order-history" className={isDark ? navLinkClass("/order-history").replace('text-zinc-500', 'text-zinc-400').replace('hover:text-zinc-900', 'hover:text-white').replace('hover:border-slate-300', 'hover:border-white/30') : navLinkClass("/order-history")}>
                  Orders
                </Link>
              )}
            </nav>
          </div>

          {/* Right: Icons + Auth */}
          <div className="flex items-center gap-4">
            {/* Icon strip */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              <Link to="/wishlist" className={`p-2 rounded-xl transition ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-red-500 hover:bg-slate-100'}`}>
                <Heart size={20} />
              </Link>
              <button className={`p-2 rounded-xl transition ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-zinc-950 hover:bg-slate-100'}`}>
                <ShoppingBag size={20} />
              </button>
            </div>

            {/* Auth */}
            {loggedInUser ? (
              <div className="hidden md:flex items-center gap-3 border-l border-slate-200/50 pl-6 py-2">
                <button
                  onClick={() => navigate("/profile")}
                  className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-xl transition ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-zinc-700 hover:text-zinc-950 hover:bg-slate-100'}`}
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="max-w-[120px] truncate tracking-tight">{loggedInUser}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className={`p-2 rounded-xl transition ${isDark ? 'text-white/50 hover:text-red-400 hover:bg-white/10' : 'text-zinc-400 hover:text-red-500 hover:bg-slate-100'}`}
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className={`text-sm font-bold px-4 py-2 rounded-xl transition ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-zinc-600 hover:text-zinc-950 hover:bg-slate-100'}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold bg-zinc-950 text-white px-5 py-2.5 rounded-xl hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-zinc-900/10"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`md:hidden p-2 rounded-xl transition ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-zinc-600 hover:bg-slate-100'}`}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute top-16 left-4 right-4 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in-up">
            <nav className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition ${
                    isActive(to) ? "bg-orange-50 text-orange-500" : "text-zinc-600 hover:bg-slate-50 hover:text-zinc-950"
                  }`}
                >
                  {label}
                </Link>
              ))}
              {loggedInUser && (
                <Link
                  to="/order-history"
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition ${
                    isActive("/order-history") ? "bg-orange-50 text-orange-500" : "text-zinc-600 hover:bg-slate-50 hover:text-zinc-950"
                  }`}
                >
                  Orders
                </Link>
              )}
            </nav>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
              <div className="flex gap-2 mb-2">
                <Link to="/wishlist" className="p-3 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-white bg-white/50 border border-transparent hover:border-slate-200 transition shadow-sm w-full flex justify-center">
                  <Heart size={20} />
                </Link>
                <button className="p-3 rounded-xl text-zinc-500 hover:text-zinc-950 hover:bg-white bg-white/50 border border-transparent hover:border-slate-200 transition shadow-sm w-full flex justify-center">
                  <ShoppingBag size={20} />
                </button>
              </div>
              {loggedInUser ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-bold text-zinc-700 hover:bg-slate-50 transition"
                  >
                    <User size={18} /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition"
                  >
                    <LogOut size={18} /> Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center justify-center w-full px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-bold text-zinc-700 hover:bg-slate-50 transition">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex items-center justify-center w-full px-4 py-3 bg-zinc-950 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition shadow-md">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
