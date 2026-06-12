import { ChevronRight, ChevronLeft, Package, ArrowRight, Clock } from 'lucide-react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../lib/http';

const ORDERS_PER_PAGE = 5;

const STATUS_STYLES = {
  pending:    { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-400' },
  processing: { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-400' },
  shipped:    { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  delivered:  { bg: 'bg-emerald-50',text: 'text-emerald-700',dot: 'bg-emerald-400' },
  completed:  { bg: 'bg-emerald-50',text: 'text-emerald-700',dot: 'bg-emerald-400' },
  cancelled:  { bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-400' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
}

function SkeletonRow() {
  return (
    <div className="animate-pulse bg-white rounded-xl p-5 flex gap-4 border border-slate-100">
      <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-slate-200 rounded w-1/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-200 rounded w-1/3" />
      </div>
      <div className="h-6 w-20 bg-slate-200 rounded-full self-center" />
    </div>
  );
}

function convertISOToReadable(isoString) {
  if (!isoString) return '—';
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(isoString));
  } catch { return isoString; }
}

const STATUS_FILTERS = ['All', 'pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'];

export default function HistoryOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const getActiveUser = () => {
    try { return JSON.parse(localStorage.getItem('currentUserSession')); }
    catch { return null; }
  };

  const user = getActiveUser();
  const token = user?.user?.token || user?.token;

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    http('/api/orders', null, { method: 'GET', token })
      .then(r => r.json())
      .then(d => setOrders(d.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = activeFilter === 'All'
    ? orders
    : orders.filter(o => o.status?.toLowerCase() === activeFilter);

  const totalPages = Math.ceil(filtered.length / ORDERS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);

  const handleFilter = (f) => { setActiveFilter(f); setCurrentPage(1); };
  const handlePage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Header bgColor="bg-zinc-950" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 pt-28">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm text-slate-500 font-medium mb-1">Account</p>
          <div className="flex items-end justify-between">
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Order History
              <span className="ml-3 text-lg font-medium text-slate-400">({orders.length})</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: Order List */}
          <div className="lg:col-span-2">
            {/* Status Filter Tabs */}
            <div className="flex gap-2 flex-wrap mb-6">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Order Cards */}
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              ) : paginated.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <Package className="text-slate-400" size={28} />
                  </div>
                  <p className="font-semibold text-zinc-800 mb-1">No orders found</p>
                  <p className="text-sm text-slate-500 mb-6">
                    {activeFilter === 'All' ? "You haven't placed any orders yet." : `No orders with status "${activeFilter}".`}
                  </p>
                  <button
                    onClick={() => navigate('/product')}
                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition active:scale-[0.98]"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                paginated.map((order, index) => (
                  <div
                    key={order?.id ?? index}
                    onClick={() => navigate(`/detail-order/${order?.id}`)}
                    className="group bg-white rounded-xl p-5 flex gap-4 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    {/* Product image */}
                    <div className="w-16 h-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                      {order.items?.[0]?.image ? (
                        <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="text-slate-300" size={20} />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-400">#{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 truncate">
                        {order.items?.[0]?.name || 'Order Item'}
                        {order.items?.length > 1 && <span className="text-slate-400 font-normal"> +{order.items.length - 1} more</span>}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={12} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{convertISOToReadable(order.created_at)}</span>
                      </div>
                    </div>

                    {/* Total & Arrow */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <p className="text-sm font-bold text-zinc-900">
                        Rp{Number(order.subtotal || 0).toLocaleString('id-ID')}
                      </p>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition ${
                      currentPage === p ? 'bg-zinc-900 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => handlePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Summary card */}
            <div className="bg-white rounded-xl border border-slate-100 p-6 mb-4">
              <h3 className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Summary</h3>
              <div className="space-y-3">
                {Object.entries(
                  orders.reduce((acc, o) => {
                    const s = o.status?.toLowerCase() || 'unknown';
                    acc[s] = (acc[s] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([status, count]) => {
                  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="text-sm text-slate-600 capitalize">{status}</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900">{count}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between">
                <span className="text-sm font-medium text-slate-600">Total Orders</span>
                <span className="text-sm font-bold text-zinc-900">{orders.length}</span>
              </div>
            </div>

            {/* Help card */}
            <div className="bg-zinc-950 rounded-xl p-6 text-white">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-2">Need Help?</p>
              <h3 className="font-semibold text-base mb-2">Having an issue with your order?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                Describe your problem and we will get back to you with a solution as fast as possible.
              </p>
              <button className="w-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold py-2.5 rounded-lg transition active:scale-[0.98]">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}