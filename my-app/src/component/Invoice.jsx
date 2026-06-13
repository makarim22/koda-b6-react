import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../lib/http";
import { Coins, Loader2, Tag, ChevronRight, CheckCircle2 } from "lucide-react";

import BCA from "../assets/icons/productPage/BCA.svg";
import BRI from "../assets/icons/productPage/BRI.svg";
import DANA from "../assets/icons/productPage/DANA.svg";
import Gopay from "../assets/icons/productPage/gopay.svg";
import OVO from "../assets/icons/productPage/Ovo.svg";
import Paypal from "../assets/icons/productPage/Paypal.svg";

function Invoice({ paymentDetails, user }) {
  const { order, delivery, tax, rawOrder, rawDelivery, rawTax, rawSubtotal } = paymentDetails;
  const navigate = useNavigate();

  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");
  const [voucherSuccess, setVoucherSuccess] = useState("");

  const [pointsBalance, setPointsBalance] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      const token = user?.token || user?.user?.token;
      if (!token) return;
      try {
        const res = await http(`/api/users/points`, null, { method: "GET", token });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setPointsBalance(data.data.points_balance || 0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch points", err);
      }
    };
    fetchPoints();
  }, [user]);

  const maxPointsToUse = Math.min(
    pointsBalance,
    Math.floor((rawSubtotal - (appliedVoucher?.discountAmount || 0)) / 10)
  );

  const pointDiscount = usePoints ? maxPointsToUse * 10 : 0;
  const finalTotal = rawSubtotal - (appliedVoucher?.discountAmount || 0) - pointDiscount;

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;
    setVoucherError("");
    setVoucherSuccess("");
    
    const token = user?.token || user?.user?.token;
    try {
      const response = await http(
        `/api/vouchers/validate`,
        { code: voucherCode, subtotal: rawOrder },
        { method: "POST", token }
      );
      
      const data = await response.json();
      if (!response.ok) {
        setVoucherError(data.message || "Invalid voucher code");
        setAppliedVoucher(null);
        return;
      }
      
      if (data.valid) {
        setAppliedVoucher({
          code: data.code || voucherCode,
          discountAmount: data.discount_amount
        });
        setVoucherSuccess(`Voucher applied: -IDR ${data.discount_amount.toLocaleString('id-ID')}`);
      } else {
        setVoucherError(data.message || "Invalid voucher code");
        setAppliedVoucher(null);
      }
    } catch (err) {
      setVoucherError("Error applying voucher");
      setAppliedVoucher(null);
    }
  };

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = useCallback(async () => {
    const token = user?.token || user?.user?.token;
    if (!token) {
      setCheckoutError("You must be logged in to checkout.");
      return;
    }
    if (!rawSubtotal || rawSubtotal <= 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError("");

    const requestBody = { delivery_fee: rawDelivery || 0, tax: rawTax || 0 };
    if (appliedVoucher) requestBody.voucher_code = appliedVoucher.code;
    if (usePoints && maxPointsToUse > 0) requestBody.points_to_use = maxPointsToUse;

    try {
      const response = await http(`/api/orders`, requestBody, { method: "POST", token });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || data.error || `HTTP ${response.status}`);

      const snapToken = data.snap_token || data?.data?.snap_token;
      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: () => navigate("/order-history"),
          onPending: () => navigate("/order-history"),
          onError: () => setCheckoutError("Payment failed. Please try again."),
          onClose: () => navigate("/order-history")
        });
      } else if (snapToken && !window.snap) {
        const redirectUrl = data.redirect_url || data?.data?.redirect_url;
        if (redirectUrl) window.location.href = redirectUrl;
        else navigate("/order-history");
      } else {
        navigate("/order-history");
      }
    } catch (err) {
      setCheckoutError(err.message || "Failed to place order.");
    } finally {
      setCheckoutLoading(false);
    }
  }, [user, rawDelivery, rawTax, rawSubtotal, appliedVoucher, usePoints, maxPointsToUse, navigate]);

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 w-full">
      <h3 className="text-xl font-bold mb-6 text-zinc-900 tracking-tight">Order Summary</h3>
      
      {/* Line Items */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-500">Subtotal</span>
          <span className="font-semibold text-zinc-900">{order}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-500">Delivery Fee</span>
          <span className="font-semibold text-zinc-900">{delivery}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-500">Tax (10%)</span>
          <span className="font-semibold text-zinc-900">{tax}</span>
        </div>
        
        {appliedVoucher && (
          <div className="flex justify-between items-center text-sm text-emerald-500">
            <span className="flex items-center gap-1.5"><Tag size={14} /> Voucher</span>
            <span className="font-semibold">-IDR {appliedVoucher.discountAmount.toLocaleString('id-ID')}</span>
          </div>
        )}
        
        {usePoints && maxPointsToUse > 0 && (
          <div className="flex justify-between items-center text-sm text-orange-500">
            <span className="flex items-center gap-1.5"><Coins size={14} /> Points ({maxPointsToUse})</span>
            <span className="font-semibold">-IDR {pointDiscount.toLocaleString('id-ID')}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100 mb-8">
        <span className="text-zinc-600 font-semibold">Total</span>
        <span className="font-bold text-2xl text-orange-500">
          IDR {finalTotal > 0 ? finalTotal.toLocaleString('id-ID') : 0}
        </span>
      </div>

      {/* Voucher Input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Voucher Code
        </label>
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-colors uppercase"
            placeholder="ENTER CODE"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
          />
          <button 
            onClick={handleApplyVoucher}
            disabled={!voucherCode}
            className="bg-slate-100 text-zinc-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>
        {voucherError && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"/>{voucherError}</p>}
        {voucherSuccess && <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> {voucherSuccess}</p>}
      </div>

      {/* Points */}
      <div className="mb-8 bg-orange-50 border border-orange-200 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <Coins size={12} className="text-orange-500" />
            </div>
            <span className="font-semibold text-sm text-orange-900">Reward Points</span>
          </div>
          <span className="font-bold text-sm text-orange-500">{pointsBalance} Pts</span>
        </div>
        
        {pointsBalance > 0 ? (
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="pt-0.5">
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-orange-500 bg-white border-slate-300 rounded cursor-pointer"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
                disabled={maxPointsToUse <= 0 && !usePoints}
              />
            </div>
            <span className={`text-xs leading-tight ${maxPointsToUse <= 0 && !usePoints ? 'text-zinc-400' : 'text-orange-600/80 group-hover:text-orange-600'}`}>
              Use {maxPointsToUse} Pts to save IDR {(maxPointsToUse * 10).toLocaleString('id-ID')}
            </span>
          </label>
        ) : (
          <p className="text-xs text-orange-500/60">Earn points by making a purchase to use on your next order!</p>
        )}
      </div>

      {checkoutError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-xs text-center">{checkoutError}</p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleCheckout}
        disabled={checkoutLoading || rawSubtotal <= 0}
        className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed group shadow-lg shadow-orange-500/20"
      >
        {checkoutLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            Proceed to Payment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {/* Payment Badges */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest text-center mb-4">Supported Payments</p>
        <div className="flex flex-wrap justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          {[BCA, BRI, DANA, Gopay, OVO, Paypal].map((src, i) => (
            <img key={i} src={src} alt="Payment" className="h-4 w-auto object-contain bg-white rounded p-0.5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Invoice;
