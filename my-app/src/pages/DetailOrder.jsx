import Footer from "../layouts/Footer";
import OrderInformation from "../component/OrderInformation";
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Cart from "../component/Cart";
import CartCtx from "../context/CartContext";
import http from "../lib/http";

function DetailOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { setItems, setIsRemoveShowed, setShowAddMenu } = useContext(CartCtx);

  // Get user from localStorage (same pattern as ProductCheckout)
  useEffect(() => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
      if (activeUser) setUser(activeUser);
    } catch (err) {
      console.warn("Tidak bisa mengambil data user", err);
    }
  }, []);

  // Fetch order detail from API
  useEffect(() => {
    const token = user?.user?.token || user?.token;
    if (!token || !id) return;

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await http(`/api/orders/${id}`, null, { method: "GET", token });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const orderData = data.data;

        console.log("order detail from API:", orderData);
        setOrder(orderData);

        // Disable remove & add buttons since this is a history view
        setIsRemoveShowed(false);
        setShowAddMenu(false);

        // Sync cart items from order history into context
        if (orderData?.items) {
          setItems(orderData.items);
        }
      } catch (err) {
        console.error("Gagal mengambil detail order:", err);
        setError("Failed to load order detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, id]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Header bgColor="bg-black" />
        <div className="flex items-center justify-center flex-1">
          <p className="text-lg">Loading order detail...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col h-screen">
        <Header bgColor="bg-black" />
        <div className="flex items-center justify-center flex-1">
          <p className="text-red-500">{error || "Order not found."}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header bgColor="bg-black" />
      <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-h-screen px-5 md:px-32">
        <div className="col-span-1">
          <OrderInformation props={order} />
        </div>
        <div className="col-span-1">
          <Cart
            items={order?.items}
            isRemoveShowed={false}
            showAddMenu={false}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailOrder;