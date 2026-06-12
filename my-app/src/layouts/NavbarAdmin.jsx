import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, ChevronDown, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/authSlice";

function NavbarAdmin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
      if (activeUser?.user?.name) setAdminName(activeUser.user.name);
      else if (activeUser?.name) setAdminName(activeUser.name);
      if (activeUser?.user?.email) setAdminEmail(activeUser.user.email);
      else if (activeUser?.email) setAdminEmail(activeUser.email);
    } catch { /* silent */ }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout(adminEmail));
    localStorage.removeItem("currentUserSession");
    navigate("/login");
  };

  return (
    <header
      className="h-14 flex items-center justify-between px-6 bg-zinc-950 border-b border-white/8 shrink-0"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
          <Coffee size={14} className="text-white" />
        </div>
        <span className="text-white font-bold text-base tracking-tight">
          Koda<span className="text-orange-400">.</span>
          <span className="text-zinc-500 text-xs font-normal ml-1.5">Admin</span>
        </span>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
        >
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
            <User size={13} className="text-white" />
          </div>
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-semibold text-zinc-200">{adminName}</span>
            <span className="text-[10px] text-zinc-500">Administrator</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
            <div className="px-3 py-2.5 border-b border-white/8">
              <p className="text-xs font-semibold text-zinc-200 truncate">{adminName}</p>
              <p className="text-[10px] text-zinc-500 truncate">{adminEmail || "Administrator"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
            >
              <LogOut size={13} /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavbarAdmin;
