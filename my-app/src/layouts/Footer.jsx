import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Coffee, MapPin, Mail, ArrowUpRight } from "lucide-react";

const LINKS = {
  Explore: [
    { label: "Our Menu", to: "/product" },
    { label: "Order History", to: "/order-history" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Profile", to: "/profile" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
    { label: "Partner With Us", to: "/partner" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "FAQ", to: "/faq" },
  ],
};

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter,   label: "Twitter",   href: "#" },
  { icon: Facebook,  label: "Facebook",  href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">

          {/* Brand column — takes 2 cols on large */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:bg-orange-400 transition-colors">
                <Coffee size={20} className="text-white" />
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tighter">
                Koda<span className="text-orange-400">.</span>
              </span>
            </Link>

            <p className="text-base leading-relaxed max-w-[34ch] mb-8 text-zinc-500">
              High-quality beans, healthy meals, and a warm space — crafted with care for people who value a good start to their day.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-500 font-medium hover:text-zinc-400 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-orange-400" />
                </div>
                Jakarta, Indonesia · 30+ Locations
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-500 font-medium hover:text-zinc-400 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-orange-400" />
                </div>
                hello@koda.coffee
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-10">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className="mt-4 lg:mt-0">
              <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest mb-6">
                {group}
              </h4>
              <ul className="space-y-4">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm font-medium text-zinc-500 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {label}
                      {to.startsWith("/") ? null : (
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-zinc-600">
          &copy; {new Date().getFullYear()} Koda Coffee. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm font-medium text-zinc-600 hover:text-zinc-400 transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm font-medium text-zinc-600 hover:text-zinc-400 transition-colors">Terms</Link>
          <p className="text-sm font-medium text-zinc-600">
            Made with care in Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
