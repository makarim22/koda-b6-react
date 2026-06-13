import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Cart from '../assets/user/ShoppingCart.svg';
import { useNavigate } from 'react-router-dom';
import { CartModal } from "../component/CartModal.jsx"
import http from "../lib/http";
import { Button } from "./Button";

export const ProductCard = ({ 
  image, 
  title, 
  description,
  price, 
  originalPrice, 
  rating, 
  reviews,
  isFlashSale = false,
  onAddToCart,
  showRating = true,
  showOriginalPrice = true,
  product
}) => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!product?.id) return;
      try {
        const userStr = localStorage.getItem('currentUserSession');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const token = user?.token || user?.user?.token;
        if (!token) return;

        const response = await http(`/api/wishlists/${product.id}/status`, null, { method: 'GET', token });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setIsFavorite(result.data.is_favorite);
          }
        }
      } catch (err) {
        console.error("Failed to fetch favorite status:", err);
      }
    };
    fetchFavoriteStatus();
  }, [product?.id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // prevent navigating if card is clickable
    if (!product?.id) return;
    
    const userStr = localStorage.getItem('currentUserSession');
    if (!userStr) {
      alert("Silakan login terlebih dahulu untuk menyimpan produk favorit");
      return;
    }
    const user = JSON.parse(userStr);
    const token = user?.token || user?.user?.token;
    if (!token) {
      alert("Silakan login terlebih dahulu untuk menyimpan produk favorit");
      return;
    }

    setIsLoadingFavorite(true);
    try {
      if (isFavorite) {
        const res = await http(`/api/wishlists/${product.id}`, null, { method: 'DELETE', token });
        if (res.ok) setIsFavorite(false);
      } else {
        const res = await http(`/api/wishlists`, { product_id: product.id }, { method: 'POST', token });
        if (res.ok) setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setIsLoadingFavorite(false);
    }
  };

  const handleBuyClick = () => {
    navigate(`/product-review/${product?.id}`);
  };

  const handleAddToCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg shadow-zinc-900/5 bg-white border border-slate-200 group transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/10 flex flex-col">
        <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0">
          <img
            src={image || `https://picsum.photos/seed/${title || 'product'}/400/256`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/seed/fallback-${Math.floor(Math.random()*100)}/400/256`;
            }}
          />
          
          {/* Wishlist Button */}
          <button 
            onClick={toggleFavorite}
            disabled={isLoadingFavorite}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:bg-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 z-10"
          >
            <Heart 
              size={18} 
              className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-500'}`} 
            />
          </button>

          {isFlashSale && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-md shadow-orange-500/20">
              Flash Sale
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col grow">
          <h3 className="font-extrabold text-2xl text-zinc-950 mb-2 tracking-tighter leading-tight line-clamp-1" title={title}>{title}</h3>

          {description && (
            <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {showRating && rating !== undefined && reviews !== undefined && (
            <div className="flex items-center gap-1.5 mb-4 mt-auto">
              <span className="text-orange-400 text-lg leading-none">★</span>
              <span className="text-sm font-bold text-zinc-700">{rating}.0</span>
              <span className="text-xs font-medium text-zinc-400">({reviews} reviews)</span>
            </div>
          )}

          <div className="mb-6 mt-auto">
            <p className="text-2xl font-extrabold text-orange-500 tracking-tighter">{price}</p>
            {showOriginalPrice && originalPrice && (
              <p className="text-sm font-medium text-zinc-400 line-through mt-0.5">{originalPrice}</p>
            )}
          </div>

          <div className="flex gap-3 mt-auto">
            <Button
              variant="primary"
              onClick={handleBuyClick} 
              className="flex-1 py-3 px-4 shadow-none"
            >
              Buy Now
            </Button>
            <button
              onClick={handleAddToCartClick}
              className="p-3 bg-orange-50 text-orange-500 hover:bg-orange-100 rounded-xl transition duration-200 flex items-center justify-center shrink-0 border border-orange-100"
              title="Add to cart"
            >
              <img src={Cart} alt="Add to cart" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(85%) saturate(1210%) hue-rotate(344deg) brightness(101%) contrast(96%)' }} />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CartModal
          product={product}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};