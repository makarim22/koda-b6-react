import React, { useState, useEffect } from 'react';
import http from '../lib/http';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Package, Truck, XCircle } from 'lucide-react';

const OrderTracking = ({ orderId, token }) => {
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracking = async () => {
      if (!orderId || !token) return;
      
      try {
        setLoading(true);
        const response = await http(`/api/orders/${orderId}/tracking`, null, { method: "GET", token });
        if (!response.ok) throw new Error("Failed to fetch tracking history");
        
        const data = await response.json();
        if (data.success && data.data) {
          setTrackingHistory(data.data);
        }
      } catch (err) {
        console.error("Error fetching tracking:", err);
        setError("Could not load tracking history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [orderId, token]);

  const getStatusIcon = (status, isCurrent) => {
    const className = `w-6 h-6 ${isCurrent ? 'text-orange-500 relative z-10' : 'text-zinc-300 relative z-10 bg-white'}`;
    
    // Live Breathing Animation for the current status
    const IconWrapper = isCurrent ? motion.div : "div";
    const animationProps = isCurrent ? {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    } : {};

    const renderIcon = () => {
      switch (status.toLowerCase()) {
        case 'pending': return <Clock className={className} fill={isCurrent ? "white" : "none"} />;
        case 'processing': return <Package className={className} fill={isCurrent ? "white" : "none"} />;
        case 'shipped': return <Truck className={className} fill={isCurrent ? "white" : "none"} />;
        case 'delivered': return <CheckCircle2 className={className} fill={isCurrent ? "white" : "none"} />;
        case 'cancelled': return <XCircle className="w-6 h-6 text-red-500 bg-white" fill="white" />;
        default: return <Circle className={className} fill={isCurrent ? "white" : "none"} />;
      }
    };

    return (
      <div className="relative flex items-center justify-center">
        {isCurrent && status.toLowerCase() !== 'cancelled' && (
          <motion.div 
            className="absolute inset-0 bg-orange-100 rounded-full z-0"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <IconWrapper {...animationProps} className="bg-white rounded-full">
          {renderIcon()}
        </IconWrapper>
      </div>
    );
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('id-ID', { 
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  if (loading) return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-5 h-5 border-2 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
      <span className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">Loading tracking...</span>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 text-red-600 text-sm font-semibold p-4 rounded-xl border border-red-100">
      {error}
    </div>
  );
  
  if (!trackingHistory || trackingHistory.length === 0) return (
    <div className="text-zinc-400 text-sm italic p-4">No tracking information available yet.</div>
  );

  return (
    <div className="w-full">
      <div className="relative ml-3 md:ml-4">
        {/* Continuous Line */}
        <div className="absolute top-2 bottom-6 left-[11px] w-[2px] bg-slate-100 -z-10" />

        {trackingHistory.map((track, index) => {
          const isLast = index === trackingHistory.length - 1;
          return (
            <motion.div variants={itemVariants} key={track.id} className="mb-8 last:mb-0 relative flex gap-6 items-start">
              <div className="pt-0.5">
                {getStatusIcon(track.status, isLast)}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1 gap-2">
                  <h4 className={`text-base font-semibold capitalize tracking-tight ${isLast ? 'text-zinc-900' : 'text-zinc-500'}`}>
                    {track.status}
                  </h4>
                  <span className="font-mono text-xs text-zinc-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 w-fit">
                    {formatTime(track.created_at)}
                  </span>
                </div>
                {track.description && (
                  <p className="text-sm text-zinc-600 leading-relaxed mt-2 max-w-md">
                    {track.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
