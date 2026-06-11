import React, { useState, useCallback } from "react";
import BCA from "../assets/icons/productPage/BCA.svg";
import BRI from "../assets/icons/productPage/BRI.svg";
import DANA from "../assets/icons/productPage/DANA.svg";
import Gopay from "../assets/icons/productPage/gopay.svg";
import OVO from "../assets/icons/productPage/Ovo.svg";
import Paypal from "../assets/icons/productPage/Paypal.svg";
import { useNavigate } from "react-router-dom";
import http from "../lib/http";
import { Coins } from "lucide-react";

function Invoice(props) {
  const { paymentDetails, cartItems, user } = props;
  console.log("user", user);
  console.log("cart itemsnya", cartItems);
  console.log("cartttt", cartItems);
  const { order, delivery, tax, subtotal, rawOrder, rawDelivery, rawTax, rawSubtotal} = paymentDetails;
  const navigate = useNavigate();

  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");
  const [voucherSuccess, setVoucherSuccess] = useState("");

  const [pointsBalance, setPointsBalance] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  React.useEffect(() => {
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

    const requestBody = {
      delivery_fee: rawDelivery || 0,
      tax: rawTax || 0
    };
    
    if (appliedVoucher) {
      requestBody.voucher_code = appliedVoucher.code;
    }

    if (usePoints && maxPointsToUse > 0) {
      requestBody.points_to_use = maxPointsToUse;
    }

    try {
      const response = await http(
        `/api/orders`,
        requestBody,
        { method: "POST", token }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`);
      }

      // snap_token can be at data.snap_token or data.data.snap_token
      const snapToken = data.snap_token || data?.data?.snap_token;

      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function() {
            navigate("/order-history");
          },
          onPending: function() {
            navigate("/order-history");
          },
          onError: function() {
            setCheckoutError("Payment failed. Please try again.");
          },
          onClose: function() {
            // User closed without paying — order still created, redirect
            navigate("/order-history");
          }
        });
      } else if (snapToken && !window.snap) {
        // Snap.js not loaded — fallback: redirect to Midtrans hosted page
        const redirectUrl = data.redirect_url || data?.data?.redirect_url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          navigate("/order-history");
        }
      } else {
        // No snap token returned (e.g. Midtrans key not set in backend)
        navigate("/order-history");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutError(err.message || "Failed to place order. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }, [user, rawDelivery, rawTax, rawSubtotal, appliedVoucher, usePoints, maxPointsToUse, navigate]);
  return (
    <div className="bg-white rounded-lg p-6 w-full md:w-80">
      <h3 className="text-xl font-bold mb-6 text-gray-900">Total</h3>
      <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Order</span>
          <span className="font-semibold text-gray-900">{order}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Delivery</span>
          <span className="font-semibold text-gray-900">{delivery}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold text-gray-900">{tax}</span>
        </div>
        {appliedVoucher && (
          <div className="flex justify-between items-center text-green-600">
            <span className="font-semibold">Voucher</span>
            <span className="font-semibold">-IDR {appliedVoucher.discountAmount.toLocaleString('id-ID')}</span>
          </div>
        )}
        {usePoints && maxPointsToUse > 0 && (
          <div className="flex justify-between items-center text-orange-500">
            <span className="font-semibold">Points Used ({maxPointsToUse})</span>
            <span className="font-semibold">-IDR {pointDiscount.toLocaleString('id-ID')}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-gray-600 font-semibold">Total</span>
          <span className="font-bold text-lg text-gray-900">
            IDR {finalTotal > 0 ? finalTotal.toLocaleString('id-ID') : 0}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Voucher Code</label>
        <div className="flex">
          <input 
            type="text"
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <button 
            onClick={handleApplyVoucher}
            className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition"
          >
            Apply
          </button>
        </div>
        {voucherError && <p className="text-red-500 text-sm mt-1">{voucherError}</p>}
        {voucherSuccess && <p className="text-green-500 text-sm mt-1">{voucherSuccess}</p>}
      </div>

      <div className="mb-6 bg-orange-50 p-4 rounded-lg border border-orange-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Coins size={20} className="text-orange-500" />
            <span className="font-semibold text-gray-800">My Reward Points</span>
          </div>
          <span className="font-bold text-orange-600">{pointsBalance} Pts</span>
        </div>
        
        {pointsBalance > 0 ? (
          <label className="flex items-center gap-2 cursor-pointer mt-3">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              checked={usePoints}
              onChange={(e) => setUsePoints(e.target.checked)}
              disabled={maxPointsToUse <= 0 && !usePoints}
            />
            <span className="text-sm text-gray-700">
              Use {maxPointsToUse} Pts to save IDR {(maxPointsToUse * 10).toLocaleString('id-ID')}
            </span>
          </label>
        ) : (
          <p className="text-xs text-gray-500 mt-1">You don't have any points yet. Earn points by making a purchase!</p>
        )}
      </div>

      {checkoutError && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{checkoutError}</p>
        </div>
      )}
      <button
        onClick={handleCheckout}
        disabled={checkoutLoading}
        className={`w-full font-bold py-3 px-4 rounded-lg mb-6 transition flex items-center justify-center gap-2 ${
          checkoutLoading
            ? 'bg-orange-300 cursor-not-allowed text-white'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {checkoutLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Processing...
          </>
        ) : 'Proceed to Payment'}
      </button>
      <div>
        <p className="text-sm text-gray-600 mb-3">We Accept</p>
        <div className="grid grid-cols-6 gap-2 mb-4">
          <img src={BRI} alt="Bank Central Asia" className="w-full h-auto" />
          <img src={DANA} alt="BCA" className="w-full h-auto" />
          <img src={BCA} alt="Mandiri" className="w-full h-auto" />
          <img src={Gopay} alt="BNI" className="w-full h-auto" />
          <img src={OVO} alt="OVO" className="w-full h-auto" />
          <img src={Paypal} alt="PayPal" className="w-full h-auto" />
        </div>
        <p className="text-xs text-gray-500 text-center">
          *Get Discount if you pay with Bank Central Asia
        </p>
      </div>
    </div>
  );
}

export default Invoice;
