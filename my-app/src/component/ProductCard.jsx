export const ProductCard = ({ 
  image, 
  title, 
  price, 
  originalPrice, 
  rating = 5, 
  reviews = 50,
  isFlashSale = false,
  onAddToCart 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {isFlashSale && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            FLASH SALE!
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2">{title}</h3>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-500">★</span>
          <span className="text-xs font-medium">{rating}</span>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        <div className="mb-3">
          <p className="text-lg font-bold text-orange-500">{price}</p>
          {originalPrice && (
            <p className="text-xs text-gray-400 line-through">{originalPrice}</p>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium text-sm transition"
        >
          Buy
        </button>
      </div>
    </div>
  );
};