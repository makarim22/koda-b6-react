import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, LogOut, User, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/authSlice";
import MenuIcon from "../assets/icons/cup-white.svg";

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

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout(authState?.email));
    navigate("/login");
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const navLinkClass = (to) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive(to) ? "text-orange-400" : "text-white/80 hover:text-white"
    }`;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          bgColor ||
          (scrolled
            ? "bg-zinc-950/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]"
            : "bg-transparent")
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={MenuIcon} alt="Logo" className="h-6 w-6" />
              <span className="text-white font-semibold text-base tracking-tight hidden sm:block">
                Koda<span className="text-orange-400">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} className={`${navLinkClass(to)} px-3 py-1.5 rounded-md hover:bg-white/5`}>
                  {label}
                  {isActive(to) && (
                    <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-orange-400 rounded-full" />
                  )}
                </Link>
              ))}
              {loggedInUser && (
                <Link to="/order-history" className={`${navLinkClass("/order-history")} px-3 py-1.5 rounded-md hover:bg-white/5`}>
                  Orders
                  {isActive("/order-history") && (
                    <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-orange-400 rounded-full" />
                  )}
                </Link>
              )}
            </nav>
          </div>

          {/* Right: Icons + Auth */}
          <div className="flex items-center gap-2">
            {/* Icon strip — desktop only */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              <Link to="/wishlist" className="p-2 rounded-lg text-white/70 hover:text-red-400 hover:bg-white/5 transition">
                <Heart size={18} />
              </Link>
              <button className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">
                <ShoppingBag size={18} />
              </button>
            </div>

            {/* Auth */}
            {loggedInUser ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="max-w-[120px] truncate">{loggedInUser}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-white/5 transition"
                  title="Log out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-white px-4 py-1.5 rounded-lg transition active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/5 transition"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-zinc-900 border-b border-white/10 shadow-xl">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive(to) ? "bg-orange-500/10 text-orange-400" : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
              {loggedInUser && (
                <Link
                  to="/order-history"
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive("/order-history") ? "bg-orange-500/10 text-orange-400" : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Orders
                </Link>
              )}
            </nav>

            <div className="px-4 pb-3 border-t border-white/10 pt-3 flex flex-col gap-2">
              <div className="flex gap-3 mb-2">
                <Link to="/wishlist" className="p-2 rounded-lg text-white/70 hover:text-red-400 hover:bg-white/5 transition">
                  <Heart size={18} />
                </Link>
                <button className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">
                  <ShoppingBag size={18} />
                </button>
              </div>
              {loggedInUser ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition"
                  >
                    <User size={16} /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
                  >
                    <LogOut size={16} /> Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-center py-2.5 rounded-lg text-sm font-medium text-white border border-white/20 hover:bg-white/5 transition">
                    Sign In
                  </Link>
                  <Link to="/register" className="block text-center py-2.5 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-white transition">
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
