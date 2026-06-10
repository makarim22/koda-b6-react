import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { ProductGrid } from "../component/ProductGrid";
import http from "../lib/http";
import glasses from "../assets/icons/glasses.png";

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
            // Map the wishlist data to match what ProductCard expects
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
    <>
      <Header bgColor="bg-black" />
      <div className="min-h-screen bg-gray-50 pb-16 pt-[80px]">
        <div className="bg-cover bg-center h-48 flex items-center justify-center relative"
          style={{ backgroundImage: `url(${glasses})` }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <h1 className="text-4xl font-bold text-white text-center relative z-10 flex items-center gap-3">
            Your Wishlist
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center text-gray-500 py-12 text-xl">Loading your favorite products...</div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">{error}</p>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Wishlist is Empty</h2>
              <p className="text-gray-500">You haven't added any products to your wishlist yet.</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-6 font-medium">You have {wishlist.length} favorite product{wishlist.length > 1 ? 's' : ''}</p>
              <ProductGrid products={wishlist} columns={4} qty={wishlist.length} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
