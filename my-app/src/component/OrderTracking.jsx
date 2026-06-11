import React, { useState, useEffect } from 'react';
import http from '../lib/http';
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
    const className = `w-6 h-6 ${isCurrent ? 'text-orange-500' : 'text-gray-400'}`;
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className={className} />;
      case 'processing': return <Package className={className} />;
      case 'shipped': return <Truck className={className} />;
      case 'delivered': return <CheckCircle2 className={className} />;
      case 'cancelled': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <Circle className={className} />;
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('id-ID', { 
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div className="p-4 text-gray-500 text-sm">Loading tracking details...</div>;
  if (error) return <div className="p-4 text-red-500 text-sm">{error}</div>;
  if (!trackingHistory || trackingHistory.length === 0) return <div className="p-4 text-gray-500 text-sm">No tracking information available yet.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Order Tracking</h3>
      
      <div className="relative border-l-2 border-gray-200 ml-3 md:ml-4">
        {trackingHistory.map((track, index) => {
          const isLast = index === trackingHistory.length - 1;
          return (
            <div key={track.id} className="mb-8 last:mb-0 relative">
              <div className="absolute -left-[17px] bg-white p-1">
                {getStatusIcon(track.status, isLast)}
              </div>
              <div className="pl-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className={`text-base font-semibold capitalize ${isLast ? 'text-orange-600' : 'text-gray-700'}`}>
                    {track.status}
                  </h4>
                  <span className="text-xs text-gray-500 mt-1 sm:mt-0 font-medium bg-gray-100 px-2 py-1 rounded">
                    {formatTime(track.created_at)}
                  </span>
                </div>
                {track.description && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded border border-gray-100">
                    {track.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
