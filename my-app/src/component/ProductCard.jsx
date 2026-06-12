import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Cart from '../assets/user/ShoppingCart.svg';
import { useNavigate } from 'react-router-dom';
import { CartModal } from "../component/CartModal.jsx"
import http from "../lib/http";

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
      <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 bg-white">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={image || `https://picsum.photos/seed/${title || 'product'}/400/256`}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/seed/fallback-${Math.floor(Math.random()*100)}/400/256`;
            }}
          />
          
          {/* Wishlist Button */}
          <button 
            onClick={toggleFavorite}
            disabled={isLoadingFavorite}
            className="absolute top-3 left-3 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-colors disabled:opacity-50 z-10"
          >
            <Heart 
              size={20} 
              className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>

          {isFlashSale && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
              FLASH SALE!
            </div>
          )}
        </div>

        <div className="p-5 bg-white">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>

          {description && (
            <p className="text-gray-600 text-sm leading-normal mb-4">
              {description}
            </p>
          )}

          {showRating && rating !== undefined && reviews !== undefined && (
            <div className="flex items-center gap-1 mb-4">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-sm font-semibold text-gray-700">{rating}.0</span>
              <span className="text-xs text-gray-500">({reviews} reviews)</span>
            </div>
          )}

          <div className="mb-5">
            <p className="text-3xl font-medium text-orange-400">{price}</p>
            {showOriginalPrice && originalPrice && (
              <p className="text-sm text-gray-400 line-through mt-1">{originalPrice}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBuyClick} 
              className="flex-1 bg-orange-400 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-base transition duration-200"
            >
              Buy
            </button>
            <button
              onClick={handleAddToCartClick}
              className="p-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg transition duration-200 flex items-center justify-center"
              title="Add to cart"
            >
              <img src={Cart} alt="Add to cart" className="w-6 h-6" />
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