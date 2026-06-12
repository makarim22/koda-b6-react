import CheckmarkIcon from "../assets/icons/homepage/checklist.svg";
import GrinderImage from "../assets/icons/homepage/coffee-grinder.svg";
import BaristaImage from "../assets/icons/homepage/barista.png";
import GlobeImage from "../assets/icons/homepage/globe.svg";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";
import { ProductGrid } from "../component/ProductGrid";
import TestimonyCard from "../component/TestimonyCard";
import { useState, useEffect } from "react";
import http from "../lib/http";
import { ArrowRight, Coffee, Leaf, MessageCircle, CreditCard } from "lucide-react";

const FEATURES = [
  { icon: Coffee,         label: "High-quality beans sourced globally" },
  { icon: Leaf,           label: "Healthy meals, customize your ingredients" },
  { icon: MessageCircle,  label: "Chat with staff for a personalized order" },
  { icon: CreditCard,     label: "Free member card on purchases above IDR 200k" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Viezh Robert",
    role: "Coffee Shop Manager",
    quote: "I am very happy to spend my whole day here. The Wi-Fi is good, and the coffee is exceptional. Very recommended!",
    rating: 5,
    image: "https://picsum.photos/seed/viezh/150/150",
  },
  {
    id: 2,
    name: "Nadia Hartono",
    role: "Freelance Designer",
    quote: "The ambiance is perfect for remote work. Great coffee selection and the staff is genuinely friendly. My go-to place.",
    rating: 5,
    image: "https://picsum.photos/seed/nadia/150/150",
  },
  {
    id: 3,
    name: "Bram Kusuma",
    role: "Software Engineer",
    quote: "Tempatnya nyaman banget, kopi-nya enak, dan makanannya juga lezat. Cocok untuk meeting atau kerja sendiri.",
    rating: 4,
    image: "https://picsum.photos/seed/bram/150/150",
  },
  {
    id: 4,
    name: "Celine Wijaya",
    role: "Food Critic",
    quote: "This coffee shop stands out with a unique blend and healthy meal options that I haven't found anywhere else.",
    rating: 5,
    image: "https://picsum.photos/seed/celine/150/150",
  },
];

const ProductSkeleton = () => (
  <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm">
    <div className="bg-slate-200 h-52 w-full" />
    <div className="p-4 space-y-2">
      <div className="h-3 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
    </div>
  </div>
);

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    http("/api/products/recommended-products")
      .then((r) => r.json())
      .then(({ data }) => {
        setProducts(
          data.map((p) => ({
            id: p.ID,
            image: p.Images?.length > 0 ? p.Images[0].path : null,
            title: p.ProductName,
            price: `IDR ${p.BasePrice.toLocaleString("id-ID")}`,
            originalPrice: `IDR ${Math.ceil(p.BasePrice * 1.15).toLocaleString("id-ID")}`,
            description: p.Description,
            rating: Math.floor(Math.random() * 2) + 4,
            reviews: 0,
            isFlashSale: Math.random() > 0.3,
          }))
        );
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="antialiased text-zinc-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] bg-zinc-950 flex overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,146,60,0.12),_transparent_60%)]" />

        {/* Left: content */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24 w-full md:w-[55%] pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-8 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-400 text-xs font-medium">Now open in 30+ locations</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Start Your Day<br />
            with <span className="text-orange-400">Great</span><br />
            Coffee.
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed max-w-[48ch] mb-10">
            High-quality beans, healthy meals, and a warm space — crafted with care for people who value a good start to their day.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/product"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition active:scale-95"
            >
              Explore Menu <ArrowRight size={16} />
            </Link>
            <Link
              to="/order-history"
              className="flex items-center gap-2 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-xl transition text-sm font-medium"
            >
              Track Orders
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-16 pt-8 border-t border-white/5">
            {[
              { val: "90+", label: "Staff" },
              { val: "30+", label: "Stores" },
              { val: "2.4k+", label: "Customers" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-orange-400">{val}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="hidden md:block absolute right-0 top-0 w-[48%] h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-10" />
          <img
            src={GrinderImage}
            alt="Coffee grinder"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* ── ABOUT / FEATURES ─────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[540px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
            <img src={BaristaImage} alt="Barista at work" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-5 tracking-tight">
              Good Coffee &<br />
              <span className="text-amber-700">Healthy Meals</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-10 max-w-[46ch]">
              Explore our curated menu — each item designed to give you the taste you deserve, made fresh every day.
            </p>

            <ul className="space-y-5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={17} className="text-orange-500" />
                  </div>
                  <span className="text-zinc-700 text-sm leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/product"
              className="inline-flex items-center gap-2 mt-10 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition active:scale-95"
            >
              Browse Menu <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ─────────────────────────────────── */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">Menu</p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                People's <span className="text-amber-700">Favorites</span>
              </h2>
            </div>
            <Link
              to="/product"
              className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-orange-500 transition"
            >
              View all products <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-16 text-zinc-400">{error}</div>
          ) : products.length > 0 ? (
            <ProductGrid
              products={products.slice(0, 4)}
              columns={4}
              qty={4}
              showOriginalPrice={false}
              showRating={false}
            />
          ) : null}
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">Locations</p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
                Find a Store<br />Near You
              </h2>
            </div>
            <p className="text-zinc-500 leading-relaxed max-w-[46ch]">
              With 30+ stores across Indonesia, there is always a Koda nearby to fuel your day.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-slate-100">
            <img src={GlobeImage} alt="Store locations map" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-zinc-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              What Our <span className="text-amber-400">Customers</span> Say
            </h2>
          </div>
          <TestimonyCard testimonies={TESTIMONIALS} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
