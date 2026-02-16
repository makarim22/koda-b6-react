import React from "react";
import BCA from "../assets/icons/productPage/BCA.svg";
import BRI from "../assets/icons/productPage/BRI.svg";
import DANA from "../assets/icons/productPage/DANA.svg";
import Gopay from "../assets/icons/productPage/gopay.svg";
import OVO from "../assets/icons/productPage/Ovo.svg";
import Paypal from "../assets/icons/productPage/Paypal.svg";
import { useNavigate } from "react-router-dom";

function Invoice(props) {
  const { paymentDetails, cartItems } = props;
  console.log("cart itemsnya", cartItems);
  console.log("cartttt", cartItems);
  const { order, delivery, tax, subtotal, image, payment, shipping } = paymentDetails;
  const navigate = useNavigate();

  const generateOrderId = () => {
    const timestampPart = Date.now().toString().slice(-7);
    return timestampPart;
  };

  const handleCheckout = () => {
    const newOrderId = generateOrderId();
    if (cartItems.length > 0) {
      const newOrder = {
        id: newOrderId,
        date: new Date().toLocaleDateString("en-ID"),
        order: order,
        delivery: delivery,
        tax: tax,
        subtotal: subtotal,
        status: "On Progress",
        image: image,
        cartHistory: cartItems,
        payment,
        shipping
      };

      console.log('newOrderr', newOrder)

      const existingOrdersString = localStorage.getItem("order");
      let existingOrders = [];

      if (existingOrdersString) {
        try {
          const parsed = JSON.parse(existingOrdersString);
          if (Array.isArray(parsed)) {
            existingOrders = parsed;
          } else {
            console.warn(
              "Data 'order' di localStorage bukan array. Menginisialisasi ulang.",
            );
          }
        } catch (error) {
          console.error(
            "Gagal parse riwayat pesanan dari localStorage:",
            error,
          );
        }
      }

      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem("order", JSON.stringify(updatedOrders));
      localStorage.removeItem("cart");
      alert("Pesanan berhasil dibuat!");
      navigate("/order-history");
    }
  };
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
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-gray-600 font-semibold">Sub Total</span>
          <span className="font-bold text-lg text-gray-900">{subtotal}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg mb-6 transition"
      >
        Checkout
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
