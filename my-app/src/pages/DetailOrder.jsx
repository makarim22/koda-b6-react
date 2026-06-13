import Footer from "../layouts/Footer";
import OrderInformation from "../component/OrderInformation";
import Header from "../layouts/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Cart from "../component/Cart";
import CartCtx from "../context/CartContext";
import http from "../lib/http";
import OrderTracking from "../component/OrderTracking";
import { ArrowLeft, Package, AlertCircle, Truck } from "lucide-react";
import { Button } from "../component/Button";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {sharedHeader}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 pt-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin shadow-sm" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-zinc-500 font-semibold uppercase tracking-widest"
          >
            Loading order details...
          </motion.p>
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border border-red-100 shadow-sm mb-2"
          >
            <AlertCircle className="text-red-500" size={32} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">{error || "Order not found."}</p>
            <p className="text-base text-zinc-500 max-w-sm mx-auto mb-8">The order you're looking for doesn't exist or you don't have access to it.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="primary" onClick={() => navigate('/order-history')} className="px-8 bg-zinc-950 text-white hover:bg-zinc-800 border-none">
              Back to Orders
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {sharedHeader}

      {/* Asymmetric Top Hero Banner */}
      <div className="bg-zinc-950 pt-32 pb-16 px-6 md:px-8 border-b border-zinc-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col items-start"
          >
            <button
              onClick={() => navigate('/order-history')}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors mb-8 group"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                <ArrowLeft size={12} />
              </div>
              Back to Orders
            </button>
            <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tighter leading-none mb-4">
              Order Detail
            </h1>
            <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
              Review your purchase information, track shipping progress, and see a summary of your items.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="hidden lg:flex w-40 h-40 bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-800 rounded-[2.5rem] items-center justify-center shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] rounded-[2.5rem] pointer-events-none" />
            <Package size={64} className="text-zinc-700" strokeWidth={1} />
          </motion.div>
        </div>
      </div>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12"
      >
        {/* Bento 2.0 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Order Info & Tracking */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              <OrderInformation props={order} />
            </motion.div>

            {user && (
              <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                    <Truck size={18} className="text-zinc-600" />
                  </div>
                  <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Shipping Tracking</h2>
                </div>
                <OrderTracking orderId={id} token={user?.user?.token || user?.token} />
              </motion.div>
            )}
          </div>

          {/* Right Column: Items Summary */}
          <div className="lg:col-span-5">
            <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                  <Package size={18} className="text-zinc-600" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight">Items Ordered</h2>
              </div>
              <Cart
                items={order?.items}
                isRemoveShowed={false}
                showAddMenu={false}
              />
            </motion.div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}

export default DetailOrder;