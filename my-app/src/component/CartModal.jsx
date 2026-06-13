import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../lib/http";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShoppingBag, Plus, Minus } from "lucide-react";

export const CartModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeAdditionalPrice, setSizeAdditionalPrice] = useState(0);
  const [variantAdditionalPrice, setVariantAdditionalPrice] = useState(0);
  const [fetchedSizes, setFetchedSizes] = useState([]);
  const [fetchedVariants, setFetchedVariants] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [loadingVariants, setLoadingVariants] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch sizes from API
  useEffect(() => {
    if (!isOpen || !product?.id) return;

    const fetchSizes = async () => {
      try {
        setLoadingSizes(true);
        const response = await http(`/api/products/${product.id}/sizes`);
        if (!response.ok) throw new Error("Failed to fetch sizes");
        const json = await response.json();
        const data = json.data || [];
        setFetchedSizes(Array.isArray(data) ? data : []);
      } catch (error) {
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
        const json = await response.json();
        const data = json.data || [];
        setFetchedVariants(Array.isArray(data) ? data : []);
      } catch (error) {
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
      setErrorMessage("");
    }
  }, [isOpen]);

  const basePrice = parseInt(product?.price, 10) || 0;
  const totalItemPrice = basePrice + sizeAdditionalPrice + variantAdditionalPrice;
  const totalCheckoutPrice = quantity * totalItemPrice;

  const formatPrice = (priceValue) => {
    return `IDR ${priceValue.toLocaleString("id-ID")}`;
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

  const handleAddToCart = async () => {
    setErrorMessage("");

    if (!selectedSize || (!selectedVariant && fetchedVariants.length > 0)) {
      setErrorMessage("Please select both a size and a variant.");
      return;
    }

    try {
      setIsLoading(true);

      const getActiveUser = () => {
        try {
          return JSON.parse(localStorage.getItem('currentUserSession'));
        } catch (error) {
          return null;
        }
      };
  
      const user = getActiveUser();
      const token = user?.user?.token || user?.token;
      if (!token) {
        setErrorMessage("Please sign in first to add items to your cart.");
        return;
      }

      const cartData = {
        product_id: parseInt(product?.id, 10),
        variant_id: selectedVariant ? parseInt(selectedVariant, 10) : null,
        size_id: parseInt(selectedSize, 10),
        quantity: quantity
      };

      const response = await http("/cart", cartData, { method: "POST", token });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        setErrorMessage("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { 
      opacity: 1, 
      backdropFilter: "blur(12px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0, 
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop Liquid Glass Overlay */}
          <div 
            className="absolute inset-0 bg-zinc-950/40" 
            onClick={!showSuccessModal ? onClose : undefined} 
          />

          {/* Modal Surface */}
          <motion.div 
            variants={modalVariants}
            className="relative bg-white rounded-[2.5rem] w-full max-w-md max-h-[90vh] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200/50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!showSuccessModal ? (
                <motion.div 
                  key="cart-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full overflow-y-auto"
                >
                  <div className="p-8 pb-6 flex items-start justify-between">
                    <motion.div variants={itemVariants}>
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">Configure Item</p>
                      <h2 className="text-3xl tracking-tighter font-semibold text-zinc-900 leading-tight">
                        {product?.title}
                      </h2>
                    </motion.div>
                    <button 
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-slate-100 text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="px-8 pb-8 flex-1 space-y-8">
                    <AnimatePresence>
                      {errorMessage && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          className="bg-red-50 text-red-600 text-sm font-semibold p-4 rounded-xl border border-red-100"
                        >
                          {errorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Quantity Control */}
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-zinc-800">Quantity</label>
                        <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-full border border-slate-200/60">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm border border-slate-200 hover:bg-slate-100 transition active:scale-95"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-mono text-sm font-semibold text-zinc-900 w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm border border-slate-200 hover:bg-slate-100 transition active:scale-95"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Size Selection */}
                    <motion.div variants={itemVariants} className="space-y-3">
                      <label className="text-sm font-semibold text-zinc-800">Size</label>
                      <div className="grid grid-cols-2 gap-3">
                        {fetchedSizes.map((size) => {
                          const isSelected = selectedSize === size.id;
                          return (
                            <button
                              key={size.id}
                              onClick={() => handleSizeSelect(size)}
                              className={`relative p-4 rounded-2xl text-left transition-all duration-300 ${
                                isSelected 
                                  ? "bg-zinc-950 text-white shadow-lg shadow-zinc-950/20" 
                                  : "bg-white text-zinc-600 border border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                                {size.name}
                              </div>
                              {size.additional_price > 0 && (
                                <div className={`text-xs mt-1 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                  +{formatPrice(size.additional_price)}
                                </div>
                              )}
                              {isSelected && (
                                <motion.div 
                                  layoutId="active-size"
                                  className="absolute inset-0 rounded-2xl border-2 border-zinc-950 pointer-events-none"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Variant Selection */}
                    {fetchedVariants.length > 0 && (
                      <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-sm font-semibold text-zinc-800">Variant</label>
                        <div className="grid grid-cols-2 gap-3">
                          {fetchedVariants.map((variant) => {
                            const isSelected = selectedVariant === variant.id;
                            return (
                              <button
                                key={variant.id}
                                onClick={() => handleVariantSelect(variant)}
                                className={`relative p-4 rounded-2xl text-left transition-all duration-300 ${
                                  isSelected 
                                    ? "bg-zinc-950 text-white shadow-lg shadow-zinc-950/20" 
                                    : "bg-white text-zinc-600 border border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                                  {variant.name}
                                </div>
                                {variant.additional_price > 0 && (
                                  <div className={`text-xs mt-1 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                    +{formatPrice(variant.additional_price)}
                                  </div>
                                )}
                                {isSelected && (
                                  <motion.div 
                                    layoutId="active-variant"
                                    className="absolute inset-0 rounded-2xl border-2 border-zinc-950 pointer-events-none"
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Sticky Footer */}
                  <motion.div 
                    variants={itemVariants}
                    className="p-6 border-t border-slate-100 bg-slate-50/50 mt-auto"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-zinc-500">Total Price</span>
                      <span className="text-xl font-bold text-zinc-900">{formatPrice(totalCheckoutPrice)}</span>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={isLoading}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingBag size={18} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">Added to Cart</h2>
                  <p className="text-zinc-500 text-sm mb-8">
                    {quantity}x {product?.title} has been added to your cart successfully.
                  </p>
                  
                  <div className="w-full space-y-3">
                    <button
                      onClick={() => {
                        setShowSuccessModal(false);
                        navigate("/product-checkout");
                      }}
                      className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 active:scale-[0.98] text-white rounded-2xl font-bold transition-all shadow-lg shadow-zinc-900/10"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => {
                        setShowSuccessModal(false);
                        onClose();
                      }}
                      className="w-full py-4 bg-white border border-slate-200 text-zinc-700 hover:bg-slate-50 active:scale-[0.98] rounded-2xl font-bold transition-all"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
