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
import { Button } from "../component/Button";

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
    <Header bgColor="bg-zinc-950" />
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {sharedHeader}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pt-16 animate-fade-in-up">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin shadow-sm" />
          <p className="text-sm text-zinc-500 font-semibold uppercase tracking-widest">Loading order details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {sharedHeader}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pt-16 text-center px-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border border-red-100 shadow-sm mb-2 animate-fade-in-up">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="text-2xl font-extrabold text-zinc-950 mb-2 tracking-tighter">{error || "Order not found."}</p>
            <p className="text-base font-medium text-zinc-500 max-w-sm mx-auto mb-8">The order you're looking for doesn't exist or you don't have access to it.</p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Button variant="primary" onClick={() => navigate('/order-history')} className="px-8">
              Back to Orders
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {sharedHeader}

      {/* Top Banner Context */}
      <div className="bg-zinc-950 pt-28 pb-10 px-6 md:px-8 shadow-sm isolate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/order-history')}
              className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors mb-6 group"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                <ArrowLeft size={12} />
              </div>
              Back to Orders
            </button>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight flex items-center gap-4">
              Order <span className="text-orange-400">Detail</span>
            </h1>
            <p className="text-zinc-400 text-lg mt-2 font-mono tracking-wider">
              #{id}
            </p>
          </div>
          <div className="hidden md:flex w-24 h-24 bg-white/5 border border-white/10 rounded-3xl items-center justify-center backdrop-blur-sm shadow-xl">
            <Package size={40} className="text-white" />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 md:py-16">
        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Info + Tracking */}
          <div className="lg:col-span-3 space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <OrderInformation props={order} />
            </div>

            {user && (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Shipping Tracking</h2>
                <OrderTracking orderId={id} token={user?.user?.token || user?.token} />
              </div>
            )}
          </div>

          {/* Right: Cart summary */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Items Ordered</h2>
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