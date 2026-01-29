import { useState } from "react";

export default function ProductOptions({ props }) {
  const {
    title = "Hazelnut Latte",
    originalPrice = "IDR 20.000",
    price = "IDR 10.000",
    description = "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
    rating = 5.0,
    reviews = "200+",
    isFlashSale = true,
    quantity = 1,
    size = "Regular",
    temperature = "Ice",
  } = props || {};

  const [selectedSize, setSelectedSize] = useState(size);
  const [selectedTemp, setSelectedTemp] = useState(temperature);
  const [qty, setQty] = useState(quantity);

  const handleQuantityChange = (delta) => {
    setQty(Math.max(1, qty + delta));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      {isFlashSale && (
        <div className="mb-6">
          <span className="inline-block bg-red-600 text-white font-bold px-4 py-2 rounded-full text-sm">
            FLASH SALE!
          </span>
        </div>
      )}

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-500 line-through text-lg">{originalPrice}</span>
          <span className="text-3xl font-bold text-orange-500">{price}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">★</span>
            ))}
          </div>
          <span className="font-semibold text-gray-900">{rating}</span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span>{reviews} Review</span>
          <span className="mx-2">|</span>
          <span>Recommendation</span>
          <span className="ml-2 text-orange-500">👍</span>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-8">{description}</p>

      <div className="mb-8">
        <div className="flex items-center gap-2 w-fit">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 border-2 border-orange-500 text-orange-500 rounded hover:bg-orange-50 font-bold text-lg"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            readOnly
            className="w-12 h-10 text-center font-semibold border border-gray-300 rounded"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-3">Choose Size</h3>
        <div className="grid grid-cols-3 gap-3">
          {["Regular", "Medium", "Large"].map((sizeOption) => (
            <button
              key={sizeOption}
              onClick={() => setSelectedSize(sizeOption)}
              className={`py-3 px-4 rounded border-2 font-semibold transition ${
                selectedSize === sizeOption
                  ? "border-orange-500 text-orange-500 bg-orange-50"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {sizeOption}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-3">Hot/Ice?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Ice", "Hot"].map((tempOption) => (
            <button
              key={tempOption}
              onClick={() => setSelectedTemp(tempOption)}
              className={`py-3 px-4 rounded border-2 font-semibold transition ${
                selectedTemp === tempOption
                  ? "border-orange-500 text-orange-500 bg-orange-50"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {tempOption}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-orange-500 text-white font-bold py-3 px-6 rounded hover:bg-orange-600 transition">
          Buy
        </button>
        <button className="flex-1 border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded hover:bg-orange-50 transition flex items-center justify-center gap-2">
          <span>🛒</span> add to cart
        </button>
      </div>
    </div>
  );
}