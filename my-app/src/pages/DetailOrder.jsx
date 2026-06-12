import Footer from "../layouts/Footer";
import OrderInformation from "../component/OrderInformation";
import Header from "../layouts/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Cart from "../component/Cart";
import CartCtx from "../context/CartContext";
import http from "../lib/http";
import OrderTracking from "../component/OrderTracking";
import { ArrowLeft, Package, AlertCircle } from "lucide-react";

function DetailOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { setItems, setIsRemoveShowed, setShowAddMenu } = useContext(CartCtx);

  useEffect(() => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
      if (activeUser) setUser(activeUser);
    } catch (err) {
      console.warn("Could not parse user session", err);
    }
  }, []);

  useEffect(() => {
    const token = user?.user?.token || user?.token;
    if (!token || !id) return;

    setLoading(true);
    setError(null);

    http(`/api/orders/${id}`, null, { method: "GET", token })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        const orderData = data.data;
        setOrder(orderData);
        setIsRemoveShowed(false);
        setShowAddMenu(false);
        if (orderData?.items) setItems(orderData.items);
      })
      .catch(err => {
        console.error("Failed to fetch order detail:", err);
        setError("Failed to load order detail.");
      })
      .finally(() => setLoading(false));
  }, [user, id]);

  const sharedHeader = (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Header bgColor="bg-zinc-950" />
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {sharedHeader}
        <main className="flex-1 flex flex-col items-center justify-center gap-3 pt-16">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Loading order details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {sharedHeader}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pt-16 text-center px-4">
          <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="text-red-500" size={28} />
          </div>
          <div>
            <p className="font-semibold text-zinc-900 mb-1">{error || "Order not found."}</p>
            <p className="text-sm text-slate-500">The order you're looking for doesn't exist or you don't have access to it.</p>
          </div>
          <button
            onClick={() => navigate('/order-history')}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg transition active:scale-[0.98]"
          >
            Back to Orders
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {sharedHeader}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 pt-28">
        {/* Back nav + Title */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/order-history')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-zinc-900 transition mb-4 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Orders
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package size={18} className="text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Order Detail</h1>
              <p className="text-sm text-slate-400 font-mono">#{id}</p>
            </div>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Info + Tracking */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]">
              <OrderInformation props={order} />
            </div>

            {user && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-4">Shipping Tracking</h2>
                <OrderTracking orderId={id} token={user?.user?.token || user?.token} />
              </div>
            )}
          </div>

          {/* Right: Cart summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sticky top-28">
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-4">Items Ordered</h2>
              <Cart
                items={order?.items}
                isRemoveShowed={false}
                showAddMenu={false}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DetailOrder;