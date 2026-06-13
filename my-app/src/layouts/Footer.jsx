import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Coffee, MapPin, Mail, ArrowUpRight } from "lucide-react";
import CoffeeCupIcon from "../assets/icons/homepage/cup-brown.svg";

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
    <footer
      className="bg-zinc-950 text-zinc-400 border-t border-white/5"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — takes 2 cols on large */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Coffee size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Koda<span className="text-orange-400">.</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-[34ch] mb-6 text-zinc-500">
              High-quality beans, healthy meals, and a warm space — crafted with care for people who value a good start to their day.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-zinc-500">
                <MapPin size={13} className="text-zinc-600 shrink-0" />
                Jakarta, Indonesia · 30+ Locations
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-500">
                <Mail size={13} className="text-zinc-600 shrink-0" />
                hello@koda.coffee
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2 mt-7">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-zinc-500 hover:text-white transition-colors duration-150 flex items-center gap-1 group"
                    >
                      {label}
                      {to === "#" && (
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
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
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Koda Coffee. All rights reserved.
        </p>
        <p className="text-xs text-zinc-700">
          Made with care in Jakarta
        </p>
      </div>
    </footer>
  );
};

export default Footer;
