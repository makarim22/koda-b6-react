import React from 'react';
import Cart from '../assets/user/ShoppingCart.svg';

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
  showOriginalPrice = true
}) => {
  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 bg-white">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x256?text=Image+Not+Found';
              console.error(`Failed to load product image: ${image}`);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Provided
          </div>
        )}
        
        {isFlashSale && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            FLASH SALE!
          </div>
        )}
      </div>

      {/* Content Container - Positioned BELOW image, not overlapping */}
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
            onClick={onAddToCart}
            className="flex-1 bg-orange-400 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-base transition duration-200"
          >
            Buy
          </button>
          <button
            onClick={onAddToCart}
            className="p-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg transition duration-200 flex items-center justify-center"
            title="Add to cart"
          >
            <img src={Cart} alt="Add to cart" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};