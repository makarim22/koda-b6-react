import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  Users,
  Tag,
  Ticket,
  Star,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "dashboard",  label: "Dashboard",  to: "/admin-dashboard",  icon: LayoutDashboard },
  { key: "product",    label: "Products",   to: "/admin-products",   icon: Coffee },
  { key: "categories", label: "Categories", to: "/admin-categories", icon: Tag },
  { key: "vouchers",   label: "Vouchers",   to: "/admin-vouchers",   icon: Ticket },
  { key: "reviews",    label: "Reviews",    to: "/admin-reviews",    icon: Star },
  { key: "order",      label: "Orders",     to: "/admin-orders",     icon: ShoppingBag },
  { key: "user",       label: "Users",      to: "/admin-users",      icon: Users },
];

function Sidebar() {
  const location = useLocation();
  const isActive = (to) => location.pathname === to;

  return (
    <aside
      className="w-56 bg-zinc-900 border-r border-white/8 flex flex-col h-full shrink-0"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-3 mb-3">
          Navigation
        </p>
        {NAV_ITEMS.map(({ key, label, to, icon: Icon }) => (
          <Link
            key={key}
            to={to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
              isActive(to)
                ? "bg-white/10 text-white border border-white/15"
                : "text-zinc-400 hover:text-white hover:bg-white/6"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
