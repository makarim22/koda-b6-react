import { ChevronRight, ChevronLeft, Package, ArrowRight, Clock } from 'lucide-react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../lib/http';
import { Button } from '../component/Button';

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
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
}

function SkeletonRow() {
  return (
    <div className="animate-pulse bg-white rounded-3xl p-6 flex gap-6 border border-slate-200">
      <div className="w-20 h-20 bg-slate-200 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-5 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-200 rounded w-1/3 mt-2" />
      </div>
      <div className="h-8 w-24 bg-slate-200 rounded-xl self-center" />
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header bgColor="bg-zinc-950" />

      {/* Top Banner Context */}
      <div className="bg-zinc-950 pt-28 pb-10 px-6 md:px-8 shadow-sm isolate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up flex flex-col items-center justify-center py-10 text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm backdrop-blur-sm">
            <Package size={28} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
            Order <span className="text-orange-400">History</span>
          </h1>
          <p className="text-zinc-400 text-lg mt-4 font-medium max-w-xl">
            You have <span className="text-white">{orders.length}</span> orders in your history.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main: Order List */}
          <div className="lg:col-span-2">
            {/* Status Filter Tabs */}
            <div className="flex gap-2 flex-wrap mb-8 pb-6 border-b border-slate-200">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    activeFilter === f
                      ? 'bg-zinc-950 text-white shadow-md'
                      : 'bg-white text-zinc-600 border border-slate-200 hover:border-orange-400 hover:text-orange-500 hover:shadow-sm'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Order Cards */}
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              ) : paginated.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center py-32 text-center shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Package className="text-slate-300" size={32} />
                  </div>
                  <p className="text-2xl font-extrabold text-zinc-950 mb-2 tracking-tighter">No orders found</p>
                  <p className="text-base text-zinc-500 mb-8 max-w-sm">
                    {activeFilter === 'All' ? "You haven't placed any orders yet." : `No orders with status "${activeFilter}".`}
                  </p>
                  <Button variant="primary" onClick={() => navigate('/product')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                paginated.map((order, index) => (
                  <div
                    key={order?.id ?? index}
                    onClick={() => navigate(`/detail-order/${order?.id}`)}
                    className="group bg-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6 border border-slate-200 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all cursor-pointer"
                  >
                    {/* Product image */}
                    <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 shrink-0 overflow-hidden flex items-center justify-center">
                      {order.items?.[0]?.image ? (
                        <img
                          src={order.items[0].image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://picsum.photos/seed/order-${order.id}/128/128`;
                          }}
                        />
                      ) : (
                        <Package className="text-slate-300" size={28} />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold font-mono text-zinc-400 bg-slate-100 px-2 py-1 rounded-md">#{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-lg font-extrabold text-zinc-950 truncate mb-1">
                        {order.items?.[0]?.name || 'Order Item'}
                        {order.items?.length > 1 && <span className="text-zinc-500 font-medium ml-1"> +{order.items.length - 1} more</span>}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Clock size={14} className="text-zinc-400" />
                        <span className="text-sm font-medium text-zinc-500">{convertISOToReadable(order.created_at)}</span>
                      </div>
                    </div>

                    {/* Total & Arrow */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 gap-4">
                      <p className="text-xl font-extrabold text-orange-500 tracking-tighter">
                        Rp{Number(order.subtotal || 0).toLocaleString('id-ID')}
                      </p>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white text-zinc-400 transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto">
                <button
                  onClick={() => handlePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:bg-slate-50 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      currentPage === p ? 'bg-zinc-950 text-white shadow-md' : 'text-zinc-600 hover:bg-slate-50 hover:text-zinc-950'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => handlePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:bg-slate-50 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            {/* Summary card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-6 shadow-sm">
              <h3 className="font-extrabold text-zinc-950 mb-6 text-sm uppercase tracking-widest border-b border-slate-100 pb-4">Summary</h3>
              <div className="space-y-4">
                {Object.entries(
                  orders.reduce((acc, o) => {
                    const s = o.status?.toLowerCase() || 'unknown';
                    acc[s] = (acc[s] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([status, count]) => {
                  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
                  return (
                    <div key={status} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${s.dot} shadow-sm`} />
                        <span className="text-sm font-bold text-zinc-700 capitalize tracking-wide">{status}</span>
                      </div>
                      <span className="text-sm font-extrabold text-zinc-950 bg-white px-2.5 py-1 rounded-md shadow-sm">{count}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-slate-200 mt-6 pt-6 flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Total Orders</span>
                <span className="text-2xl font-extrabold text-zinc-950 tracking-tighter">{orders.length}</span>
              </div>
            </div>

            {/* Help card */}
            <div className="bg-zinc-950 rounded-3xl p-8 text-white shadow-lg shadow-zinc-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[40px]" />
              <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-3 relative z-10">Need Help?</p>
              <h3 className="font-extrabold text-xl mb-3 tracking-tight relative z-10">Having an issue with your order?</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-medium relative z-10">
                Describe your problem and we will get back to you with a solution as fast as possible.
              </p>
              <Button variant="primary" className="w-full relative z-10">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}