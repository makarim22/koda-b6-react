import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../lib/http";
import SuccessModal from "./SuccessModal.jsx";

export const CartModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  //   const [selectedTemperature, setSelectedTemperature] = useState('panas');
  const [quantity, setQuantity] = useState(1);
  const [sizeAdditionalPrice, setSizeAdditionalPrice] = useState(0);
  const [variantAdditionalPrice, setVariantAdditionalPrice] = useState(0);
  const [fetchedSizes, setFetchedSizes] = useState([]);
  const [fetchedVariants, setFetchedVariants] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [loadingVariants, setLoadingVariants] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  console.log("produknya", product);

  // Fetch sizes from API
  useEffect(() => {
    if (!isOpen || !product?.id) return;

    const fetchSizes = async () => {
      try {
        setLoadingSizes(true);
        const response = await http(`/api/products/${product.id}/sizes`);
        if (!response.ok) throw new Error("Failed to fetch sizes");
        const data = await response.json();

        // Extract sizes array from whatever structure the API returns
        let sizes = [];
        if (Array.isArray(data)) {
          sizes = data;
        } else if (data?.sizes && Array.isArray(data.sizes)) {
          sizes = data.sizes;
        } else if (data?.data && Array.isArray(data.data)) {
          sizes = data.data;
        }

        setFetchedSizes(sizes);
        console.log("Sizes fetched:", sizes);
      } catch (error) {
        console.error("Error fetching sizes:", error);
        setFetchedSizes([]);
      } finally {
        setLoadingSizes(false);
      }
    };

    fetchSizes();
  }, [isOpen, product?.id]);

  // Fetch variants from API
  useEffect(() => {
    if (!isOpen || !product?.id) return;

    const fetchVariants = async () => {
      try {
        setLoadingVariants(true);
        const response = await http(`/api/products/${product.id}/variants`);
        if (!response.ok) throw new Error("Failed to fetch variants");
        const data = await response.json();

        // Extract variants array from whatever structure the API returns
        let variants = [];
        if (Array.isArray(data)) {
          variants = data;
        } else if (data?.variants && Array.isArray(data.variants)) {
          variants = data.variants;
        } else if (data?.data && Array.isArray(data.data)) {
          variants = data.data;
        }

        setFetchedVariants(variants);
        console.log("Variants fetched:", variants);
      } catch (error) {
        console.error("Error fetching variants:", error);
        setFetchedVariants([]);
      } finally {
        setLoadingVariants(false);
      }
    };

    fetchVariants();
  }, [isOpen, product?.id]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null);
      setSelectedVariant(null);
      setQuantity(1);
      setSizeAdditionalPrice(0);
      setVariantAdditionalPrice(0);
      setShowSuccessModal(false);
    }
  }, [isOpen]);

  const basePrice = product?.price || 0;
  const totalItemPrice =
    basePrice + sizeAdditionalPrice + variantAdditionalPrice;
  const totalCheckoutPrice = quantity * totalItemPrice;

  const formatPrice = (priceValue) => {
    return `IDR ${priceValue.toLocaleString("id-ID")}`;
  };

  const handleSizeSelect = (sizeOption) => {
    setSelectedSize(sizeOption.name);
    setSizeAdditionalPrice(sizeOption.additional_price || 0);
  };

  const handleVariantSelect = (variantOption) => {
    if (selectedVariant === variantOption.name) {
      setSelectedVariant(null);
      setVariantAdditionalPrice(0);
    } else {
      setSelectedVariant(variantOption.name);
      setVariantAdditionalPrice(variantOption.additional_price || 0);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedVariant) {
      alert("Silakan pilih ukuran dan varian terlebih dahulu");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu");
        return;
      }

      const cartData = {
        productId: product?.id,
        size: selectedSize,
        variant: selectedVariant,
        quantity: quantity,
        price: totalItemPrice,
      };

      const response = await http("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        setModalMessage(
          `${quantity}x ${product?.title} - Total: ${formatPrice(totalCheckoutPrice)}`,
        );
        setShowSuccessModal(true);
      } else {
        alert("Gagal menambahkan ke keranjang");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Terjadi kesalahan saat menambahkan ke keranjang");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col pointer-events-auto">

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-4 pt-4">
            <div>Add {product.title} to Cart</div>

            {/* Quantity Selection */}
            <div className="mb-4 mt-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Qty
              </label>
              <div className="flex items-center gap-1 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border-2 border-orange-500 text-orange-500 rounded hover:bg-orange-50 font-bold text-sm"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-10 h-8 text-center font-semibold border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Choose Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {fetchedSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeSelect(size)}
                    className={`py-2 px-2 rounded border-2 font-semibold text-xs transition text-center ${
                      selectedSize === size.name
                        ? "border-orange-500 text-orange-500 bg-orange-50"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div>{size.name}</div>
                    {size.additional_price > 0 && (
                      <div className="text-xs text-gray-600">
                        +{formatPrice(size.additional_price)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            {fetchedVariants.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Choose Variant
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fetchedVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      className={`py-2 px-2 rounded border-2 font-semibold text-xs transition ${
                        selectedVariant === variant.name
                          ? "border-orange-500 text-orange-500 bg-orange-50"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <div>{variant.name}</div>
                      {variant.additional_price > 0 && (
                        <div className="text-xs text-gray-600">
                          +{formatPrice(variant.additional_price)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Sticky Action Buttons */}
          <div className="flex gap-2 p-4 border-t bg-white">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition text-sm"
            >
              Batal
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 px-3 bg-orange-400 hover:bg-orange-600 text-white rounded-lg font-semibold transition text-sm"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl text-green-600">✓</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h2>
            <p className="text-gray-600 mb-6">
              {quantity}x {product?.title} ditambahkan ke keranjang
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/product");
                }}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition"
              >
                Lanjut Belanja
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/product-checkout");
                }}
                className="flex-1 py-3 px-4 bg-orange-400 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
              >
                Ke Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
