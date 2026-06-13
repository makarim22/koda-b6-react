import GrinderImage from "../assets/icons/homepage/coffee-grinder.svg";
import BaristaImage from "../assets/icons/homepage/barista.png";
import GlobeImage from "../assets/icons/homepage/globe.svg";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";
import LocationsMap from "../component/LocationsMap";
import { ProductGrid } from "../component/ProductGrid";
import TestimonyCard from "../component/TestimonyCard";
import { useState, useEffect } from "react";
import http from "../lib/http";
import { ArrowRight, Coffee, Leaf, MessageCircle, CreditCard } from "lucide-react";
import { Button } from "../component/Button";

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
  <div className="animate-pulse bg-white rounded-3xl overflow-hidden shadow-lg shadow-zinc-900/5 border border-slate-200">
    <div className="bg-slate-200 h-52 w-full" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-5 bg-slate-200 rounded w-1/2" />
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
    <div className="bg-slate-50">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] bg-zinc-950 flex overflow-hidden isolate">
        {/* Background texture */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,146,60,0.12),_transparent_60%)]" />

        {/* Left: content */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24 w-full md:w-[55%] pt-20 pb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8 w-fit backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">Now open in 30+ locations</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tighter mb-8 drop-shadow-2xl">
            Start Your Day<br />
            with <span className="text-orange-400">Great</span><br />
            Coffee.
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-[48ch] mb-12 font-medium">
            High-quality beans, healthy meals, and a warm space — crafted with care for people who value a good start to their day.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/product">
              <Button variant="primary" className="bg-orange-500 text-white hover:bg-orange-600 border-none shadow-orange-500/20 shadow-lg px-10">
                Explore Menu <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/order-history">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 bg-transparent hover:bg-zinc-900 px-8">
                Track Orders
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-20 pt-10 border-t border-white/10">
            {[
              { val: "90+", label: "Staff" },
              { val: "30+", label: "Stores" },
              { val: "2.4k+", label: "Customers" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-orange-400 tracking-tighter">{val}</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="hidden md:block absolute right-0 top-0 w-[48%] h-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-10" />
          <img
            src={GrinderImage}
            alt="Coffee grinder"
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/seed/koda-home/800/1000"; }}
          />
        </div>
      </section>

      {/* ── ABOUT / FEATURES ─────────────────────────────────── */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] shadow-lg shadow-zinc-900/5 border border-slate-200 group">
            <img 
              src={BaristaImage} 
              alt="Barista at work" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/seed/koda-barista/600/800"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="animate-fade-in-up">
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 leading-tight mb-6 tracking-tighter">
              Good Coffee &<br />
              <span className="text-orange-500">Healthy Meals</span>
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-12 max-w-[46ch]">
              Explore our curated menu — each item designed to give you the taste you deserve, made fresh every day with premium ingredients.
            </p>

            <ul className="space-y-6 mb-12">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 hover:shadow-orange-500/5 transition-all">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-orange-500" />
                  </div>
                  <span className="text-zinc-700 font-medium">{label}</span>
                </li>
              ))}
            </ul>

            <Link to="/product">
              <Button>
                Browse Menu <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ─────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4">Menu</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tighter">
                People's <span className="text-orange-500">Favorites</span>
              </h2>
            </div>
            <Link
              to="/product"
              className="flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-orange-500 transition-colors"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-24 text-zinc-500 font-medium bg-slate-50 rounded-3xl border border-slate-200">{error}</div>
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
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4">Locations</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tighter leading-tight">
                Find a Store<br />Near You
              </h2>
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed max-w-[46ch]">
              With 30+ stores across Indonesia, there is always a Koda nearby to fuel your day. Come visit us!
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg shadow-zinc-900/5 border border-slate-200 bg-white p-2 relative z-0">
            <LocationsMap />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-zinc-950 py-24 md:py-32 relative overflow-hidden isolate">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-16 text-center md:text-left">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              What Our <span className="text-orange-500">Customers</span> Say
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
