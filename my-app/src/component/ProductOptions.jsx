import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Plus, Minus, Star, ChevronRight } from "lucide-react";
import http from "../lib/http";
import SuccessModal from "../component/SuccessModal.jsx";

export default function ProductOptions({
  props,
  user,
  productSizes = [],
  productVariants = [],
}) {
  const apiProduct = props || {};

  const {
    id = 1,
    title = "Hazelnut Latte",
    description = "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
    rating = 5.0,
    reviews = "200+",
    isFlashSale = false,
    stock = 0,
    quantity = 1,
    temperature = "Ice",
  } = {
    id: apiProduct.id || 1,
    title: apiProduct.product_name || "Hazelnut Latte",
    description:
      apiProduct.description ||
      "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
    rating: apiProduct.rating || 5.0,
    reviews: apiProduct.reviews || "200+",
    isFlashSale: apiProduct.isFlashSale || false,
    stock: apiProduct.stock || 0,
  };

  const originalPriceText = apiProduct.originalPrice || "IDR 20.000";

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(quantity);
  const [sizeAdditionalPrice, setSizeAdditionalPrice] = useState(0);
  const [variantAdditionalPrice, setVariantAdditionalPrice] = useState(0);
  
  const [fetchedSizes, setFetchedSizes] = useState([]);
  const [fetchedVariants, setFetchedVariants] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [loadingVariants, setLoadingVariants] = useState(true);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        setLoadingSizes(true);
        const response = await http(`/api/products/${id}/sizes`);
        if (!response.ok) throw new Error("Failed to fetch sizes");
        const json = await response.json();
        setFetchedSizes(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        setFetchedSizes([]);
      } finally {
        setLoadingSizes(false);
      }
    };
    if (id) fetchSizes();
  }, [id]);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        setLoadingVariants(true);
        const response = await http(`/api/products/${id}/variants`);
        if (!response.ok) throw new Error("Failed to fetch variants");
        const json = await response.json();
        setFetchedVariants(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        setFetchedVariants([]);
      } finally {
        setLoadingVariants(false);
      }
    };
    if (id) fetchVariants();
  }, [id]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!id) return;
      try {
        const userStr = localStorage.getItem('currentUserSession');
        if (!userStr) return;
        const userSession = JSON.parse(userStr);
        const token = userSession?.token || userSession?.user?.token;
        if (!token) return;

        const response = await http(`/api/wishlists/${id}/status`, null, { method: 'GET', token });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) setIsFavorite(result.data.is_favorite);
        }
      } catch (err) {}
    };
    fetchFavoriteStatus();
  }, [id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!id) return;
    
    const userStr = localStorage.getItem('currentUserSession');
    if (!userStr) {
      alert("Please login first to save favorites.");
      return;
    }
    const userSession = JSON.parse(userStr);
    const token = userSession?.token || userSession?.user?.token;
    if (!token) {
      alert("Please login first to save favorites.");
      return;
    }

    setIsLoadingFavorite(true);
    try {
      if (isFavorite) {
        const res = await http(`/api/wishlists/${id}`, null, { method: 'DELETE', token });
        if (res.ok) setIsFavorite(false);
      } else {
        const res = await http(`/api/wishlists`, { product_id: id }, { method: 'POST', token });
        if (res.ok) setIsFavorite(true);
      }
    } catch (err) {} finally {
      setIsLoadingFavorite(false);
    }
  };

  const handleSizeSelect = (sizeOption) => {
    setSelectedSize(sizeOption.id);
    setSizeAdditionalPrice(sizeOption.additional_price || 0);
  };

  const handleVariantSelect = (variantOption) => {
    if (selectedVariant === variantOption.id) {
      setSelectedVariant(null);
      setVariantAdditionalPrice(0);
    } else {
      setSelectedVariant(variantOption.id); 
      setVariantAdditionalPrice(variantOption.additional_price || 0);
    }
  };

  const basePrice = apiProduct.base_price || 0;
  const totalItemPrice = basePrice + sizeAdditionalPrice + variantAdditionalPrice;
  const totalCheckoutPrice = qty * totalItemPrice;

  const formatPrice = (priceValue) => `IDR ${priceValue.toLocaleString("id-ID")}`;

  const handleQuantityChange = (delta) => setQty(Math.max(1, qty + delta));

  const handleBuy = async () => {
    if (!user) {
      alert("Silakan Login terlebih dahulu");
      return;
    }
    const { token } = user.user;
    const cartPayload = {
      product_id: parseInt(id, 10),
      size_id: selectedSize ? parseInt(selectedSize, 10) : null,
      variant_id: selectedVariant ? parseInt(selectedVariant, 10) : null,
      quantity: qty,
    };

    try {
      const response = await http("/cart", cartPayload, { method: "POST", token });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      setModalMessage(`${qty}x ${title} - Total: ${formatPrice(totalCheckoutPrice)}`);
      setShowSuccessModal(true);
    } catch (error) {
      alert(`Gagal menambahkan ke keranjang: ${error.message}`);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-slate-50 md:pl-8">
      {/* Product Header Info */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-col gap-2">
            {isFlashSale && (
              <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                FLASH SALE!
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              {title}
            </h1>
          </div>
          <button 
            onClick={toggleFavorite}
            disabled={isLoadingFavorite}
            className={`p-3 shrink-0 rounded-xl border transition-all disabled:opacity-50 group shadow-sm ${
              isFavorite 
                ? 'bg-red-50 border-red-200 text-red-500' 
                : 'bg-white border-slate-200 text-zinc-400 hover:border-slate-300 hover:bg-slate-50'
            }`}
            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={22} className={`transition-transform group-hover:scale-110 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold text-orange-500 tracking-tight">
            {formatPrice(totalItemPrice)}
          </span>
          {isFlashSale && (
            <span className="text-zinc-400 line-through text-lg decoration-red-400">
              {originalPriceText}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
            <Star size={16} className="text-orange-400 fill-orange-400" />
            <span className="text-zinc-700">{rating}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <span>{reviews} Reviews</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Stock: {stock}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-600 text-sm leading-relaxed mb-8">
        {description}
      </p>

      {/* Quantity Selector */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-1 bg-white border border-slate-200 shadow-sm rounded-xl w-fit p-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            value={qty}
            readOnly
            className="w-12 h-10 text-center font-bold text-zinc-900 bg-transparent outline-none focus:outline-none focus:ring-0"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Choose Size
        </label>
        {loadingSizes ? (
          <div className="animate-pulse flex gap-3">
            {[1, 2, 3].map(i => <div key={i} className="h-14 flex-1 bg-white shadow-sm rounded-xl border border-slate-200" />)}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {fetchedSizes && fetchedSizes.length > 0
              ? fetchedSizes.map((sizeOption) => (
                  <button
                    key={sizeOption.id}
                    onClick={() => handleSizeSelect(sizeOption)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all shadow-sm ${
                      selectedSize === sizeOption.id
                        ? "border-orange-500 bg-orange-50 text-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.05)]"
                        : "border-slate-200 bg-white text-zinc-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-semibold text-sm">{sizeOption.name}</span>
                    {sizeOption.additional_price > 0 && (
                      <span className={`text-xs mt-0.5 ${selectedSize === sizeOption.id ? 'text-orange-500/80' : 'text-zinc-500'}`}>
                        +{formatPrice(sizeOption.additional_price)}
                      </span>
                    )}
                  </button>
                ))
              : ["Regular", "Medium", "Large"].map((sizeOption, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sizeOption)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all shadow-sm ${
                      selectedSize === sizeOption
                        ? "border-orange-500 bg-orange-50 text-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.05)]"
                        : "border-slate-200 bg-white text-zinc-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-semibold text-sm">{sizeOption}</span>
                  </button>
                ))}
          </div>
        )}
      </div>

      {/* Variant Selector */}
      {fetchedVariants && fetchedVariants.length > 0 && (
        <div className="mb-8">
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Choose Variant
          </label>
          {loadingVariants ? (
            <div className="animate-pulse flex gap-3">
              {[1, 2].map(i => <div key={i} className="h-14 flex-1 bg-white shadow-sm rounded-xl border border-slate-200" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {fetchedVariants.map((variantOption) => (
                <button
                  key={variantOption.id}
                  onClick={() => handleVariantSelect(variantOption)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all shadow-sm ${
                    selectedVariant === variantOption.id
                      ? "border-orange-500 bg-orange-50 text-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.05)]"
                      : "border-slate-200 bg-white text-zinc-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-semibold text-sm">{variantOption.name}</span>
                  {variantOption.additional_price > 0 && (
                    <span className={`text-xs mt-0.5 ${selectedVariant === variantOption.id ? 'text-orange-500/80' : 'text-zinc-500'}`}>
                      +{formatPrice(variantOption.additional_price)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Spacer to push actions to bottom if needed */}
      <div className="flex-1 min-h-[2rem]" />

      {/* Actions */}
      <div className="bg-white border border-slate-200 shadow-sm p-4 md:p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-zinc-500 font-medium">Total Price</span>
          <span className="text-2xl font-bold text-zinc-900 tracking-tight">
            {formatPrice(totalCheckoutPrice)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBuy}
            className="flex-1 bg-white border border-slate-200 shadow-sm text-zinc-800 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group"
          >
            <ShoppingBag size={18} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
            Add to Cart
          </button>
          <button
            onClick={handleBuy}
            className="flex-1 bg-orange-500 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-orange-400 transition-all active:scale-95 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group"
          >
            Buy Now
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={modalMessage}
          onNavigate={() => { setShowSuccessModal(false); Navigate(`/product-checkout/${id}`); }}
          onChoose={() => { setShowSuccessModal(false); Navigate(`/product`); }}
        />
      </div>
    </div>
  );
}
