import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { ProductGrid } from "../component/ProductGrid";
import http from "../lib/http";
import glasses from "../assets/icons/glasses.png";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userStr = localStorage.getItem('currentUserSession');
        if (!userStr) {
          setError("Silakan login untuk melihat daftar produk favorit Anda.");
          setLoading(false);
          return;
        }
        const userSession = JSON.parse(userStr);
        const token = userSession?.token || userSession?.user?.token;
        if (!token) {
          setError("Silakan login untuk melihat daftar produk favorit Anda.");
          setLoading(false);
          return;
        }

        const response = await http("/api/wishlists", null, { method: "GET", token });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const formattedProducts = result.data.map(item => ({
              id: item.product_id,
              title: item.product_name,
              price: `IDR ${item.base_price.toLocaleString('id-ID')}`,
              image: item.image,
              description: item.description,
              rating: 5,
              reviews: "200+"
            }));
            setWishlist(formattedProducts);
          }
        } else {
          setError("Gagal mengambil data produk favorit.");
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Terjadi kesalahan sistem saat memuat produk favorit.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header bgColor="bg-zinc-950" />
      
      {/* Top Banner Context */}
      <div className="bg-zinc-950 pt-28 pb-10 px-6 md:px-8 shadow-sm isolate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up flex flex-col items-center justify-center py-10 text-center">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Heart size={28} className="text-red-500 fill-red-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
            Your <span className="text-red-400">Wishlist</span>
          </h1>
          <p className="text-zinc-400 text-lg mt-4 font-medium max-w-xl">
            {wishlist.length > 0 ? `You have ${wishlist.length} saved product${wishlist.length > 1 ? 's' : ''}.` : "Save your favorite items here."}
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 md:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 animate-fade-in-up">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin shadow-sm mb-4" />
            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">Loading favorites...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm animate-fade-in-up">
            <p className="text-red-500 text-lg font-medium">{error}</p>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm animate-fade-in-up">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="text-slate-300" />
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tighter mb-3">Wishlist is Empty</h2>
            <p className="text-zinc-500 font-medium max-w-md text-center">You haven't added any products to your wishlist yet. Explore our menu to find your favorites!</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <ProductGrid products={wishlist} columns={4} qty={wishlist.length} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
