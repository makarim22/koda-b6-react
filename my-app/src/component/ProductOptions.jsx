import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../lib/http";
import SuccessModal from "../component/SuccessModal.jsx"

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
    originalPrice = "IDR 20.000",
    price = "IDR 10.000",
    description = "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
    rating = 5.0,
    reviews = "200+",
    isFlashSale = false,
    stock = 0,
    quantity = 1,
    size = "Regular",
    temperature = "Ice",
  } = {
    id: apiProduct.id || 1,
    title: apiProduct.product_name || "Hazelnut Latte",
    price: apiProduct.base_price
      ? `IDR ${apiProduct.base_price.toLocaleString("id-ID")}`
      : "IDR 10.000",
    originalPrice: apiProduct.originalPrice || "IDR 20.000",
    description:
      apiProduct.description ||
      "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
    rating: apiProduct.rating || 5.0,
    reviews: apiProduct.reviews || "200+",
    isFlashSale: apiProduct.isFlashSale || false,
    stock: apiProduct.stock || 0,
    image: apiProduct.images || apiProduct.image || "",
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedTemp, setSelectedTemp] = useState(temperature);
  const [qty, setQty] = useState(quantity);
  const [sizeAdditionalPrice, setSizeAdditionalPrice] = useState(0);
  const [variantAdditionalPrice, setVariantAdditionalPrice] = useState(0);
  const [fetchedSizes, setFetchedSizes] = useState([]);
  const [fetchedVariants, setFetchedVariants] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [loadingVariants, setLoadingVariants] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const Navigate = useNavigate();

  // Fetch sizes from API
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        setLoadingSizes(true);
        const response = await http(`api/products/${id}/sizes`);
        console.log("response", response);
        if (!response.ok) throw new Error("Failed to fetch sizes");
        const data = await response.json();
        setFetchedSizes(Array.isArray(data) ? data : []);
        console.log("Sizes fetched:", data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
        setFetchedSizes([]);
      } finally {
        setLoadingSizes(false);
      }
    };

    if (id) {
      fetchSizes();
    }
  }, [id]);

  // Fetch variants from API
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        setLoadingVariants(true);
        const response = await http(`api/products/${id}/variants`);
        console.log("response", response);
        if (!response.ok) throw new Error("Failed to fetch variants");
        const data = await response.json();
        setFetchedVariants(Array.isArray(data) ? data : []);
        console.log("Variants fetched:", data);
      } catch (error) {
        console.error("Error fetching variants:", error);
        setFetchedVariants([]);
      } finally {
        setLoadingVariants(false);
      }
    };

    if (id) {
      fetchVariants();
    }
  }, [id]);

  console.log("usernyaa", user);
  console.log("productSizes", productSizes);
  console.log("product variants", productVariants);
  console.log("fetchedSizes", fetchedSizes);
  console.log("fetchedVariants", fetchedVariants);
  console.log("selectedProduct API data:", apiProduct);

  // Handle size selection with additional price
  const handleSizeSelect = (sizeOption) => {
    setSelectedSize(sizeOption.name);
    setSizeAdditionalPrice(sizeOption.additional_price || 0);
    console.log(
      "Size selected:",
      sizeOption.name,
      "Additional price:",
      sizeOption.additional_price,
    );
  };

  // Handle variant selection with additional price
  const handleVariantSelect = (variantOption) => {
    if (selectedVariant === variantOption.name) {
      // Toggle off if clicking same variant
      setSelectedVariant(null);
      setVariantAdditionalPrice(0);
      console.log("Variant deselected");
    } else {
      setSelectedVariant(variantOption.name);
      setVariantAdditionalPrice(variantOption.additional_price || 0);
      console.log(
        "Variant selected:",
        variantOption.name,
        "Additional price:",
        variantOption.additional_price,
      );
    }
  };

  // Calculate total price including additional charges
  const basePrice = apiProduct.base_price || 0;
  const totalItemPrice =
    basePrice + sizeAdditionalPrice + variantAdditionalPrice;
  const totalCheckoutPrice = qty * totalItemPrice;

  // Format price for display
  const formatPrice = (priceValue) => {
    return `IDR ${priceValue.toLocaleString("id-ID")}`;
  };

  const handleQuantityChange = (delta) => {
    setQty(Math.max(1, qty + delta));
  };

  const handleBuy = () => {
    if (!user) {
      alert("Silakan Login terlebih dahulu");
      return;
    }
    const orderData = {
      customer: user.user.fullname,
      customerId: user.user.id,
      address: user.user.address,
      phone: user.user.phone,
      id,
      title,
      price,
      originalPrice,
      quantity: qty,
      size: selectedSize,
      variant: selectedVariant,
      temperature: selectedTemp,
      image: apiProduct.images || apiProduct.image || "",
      totalPrice: totalCheckoutPrice,
      sizeAdditionalPrice,
      variantAdditionalPrice,
      timestamp: new Date().toISOString(),
    };

    let currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    console.log("current cart", currentCart);

    currentCart.push(orderData);

    localStorage.setItem("cart", JSON.stringify(currentCart));
    console.log("Order data tersimpan:", orderData);

    // alert(
    //   `Order dibuat! ${qty}x ${title} - Total: ${formatPrice(totalCheckoutPrice)}`,
    // );
    // Navigate(`/product-checkout/${id}`);

        // Show success modal instead of alert
    setModalMessage(
      `${qty}x ${title} - Total: ${formatPrice(totalCheckoutPrice)}`
    );
    setShowSuccessModal(true);
  };

   const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleNavigateToCheckout = () => {
    setShowSuccessModal(false);
    Navigate(`/product-checkout/${id}`);
  };

  const handleNavigateToMenu = () => {
    setShowSuccessModal(false);
    Navigate(`/product`)
  }
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
          <span className="text-gray-500 line-through text-lg">
            {originalPrice}
          </span>
          <span className="text-3xl font-bold text-orange-500">
            {formatPrice(totalItemPrice)}
          </span>
          {/* {(sizeAdditionalPrice > 0 || variantAdditionalPrice > 0) && (
            <span className="text-sm text-gray-600">
              (Base: {formatPrice(basePrice)}
              {sizeAdditionalPrice > 0 && ` + Size: ${formatPrice(sizeAdditionalPrice)}`}
              {variantAdditionalPrice > 0 && ` + Variant: ${formatPrice(variantAdditionalPrice)}`})
            </span>
          )} */}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">
                ★
              </span>
            ))}
          </div>
          <span className="font-semibold text-gray-900">{rating}</span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span>{reviews} Review</span>
          <span className="mx-2">|</span>
          <span>Stock: {stock}</span>
          {/* <span className="ml-2 text-orange-500">📦</span> */}
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-8">
        {description}
      </p>

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
        {loadingSizes ? (
          <div className="text-gray-500 text-sm">Loading sizes...</div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {productSizes && productSizes.length > 0
              ? productSizes.map((sizeOption) => (
                  <button
                    key={sizeOption.id}
                    onClick={() => handleSizeSelect(sizeOption)}
                    className={`py-3 px-4 rounded border-2 font-semibold transition ${
                      selectedSize === sizeOption.name
                        ? "border-orange-500 text-orange-500 bg-orange-50"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div>{sizeOption.name}</div>
                    {sizeOption.additional_price > 0 && (
                      <div className="text-xs text-gray-600">
                        +{formatPrice(sizeOption.additional_price)}
                      </div>
                    )}
                  </button>
                ))
              : ["Regular", "Medium", "Large"].map((sizeOption) => (
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
        )}
      </div>
      {productVariants && productVariants.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-3">Choose Variant</h3>
          {loadingVariants ? (
            <div className="text-gray-500 text-sm">Loading variants...</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {productVariants.map((variantOption) => (
                <button
                  key={variantOption.id}
                  onClick={() => handleVariantSelect(variantOption)}
                  className={`py-3 px-4 rounded border-2 font-semibold transition ${
                    selectedVariant === variantOption.name
                      ? "border-orange-500 text-orange-500 bg-orange-50"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div>{variantOption.name}</div>
                  {variantOption.additional_price > 0 && (
                    <div className="text-xs text-gray-600">
                      +{formatPrice(variantOption.additional_price)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="text-2xl font-bold text-orange-600 mb-4 pb-3 border-b-2 border-orange-200">
        Total: {formatPrice(totalCheckoutPrice)}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBuy}
          className="flex-1 bg-orange-500 text-white font-bold py-3 px-6 rounded hover:bg-orange-600 transition"
        >
          Buy
        </button>
        <button className="flex-1 border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded hover:bg-orange-50 transition flex items-center justify-center gap-2">
          <span></span> add to cart
        </button>

        <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        message={modalMessage}
        onNavigate={handleNavigateToCheckout}
        onChoose={handleNavigateToMenu}
      />
      </div>
    </div>
  );
}
