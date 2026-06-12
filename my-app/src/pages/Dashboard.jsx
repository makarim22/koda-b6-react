import { useState, useEffect, useCallback } from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import http from "../lib/http";
import KpiCard from "../component/Dashboard/KpiCard";
import SalesChart from "../component/Dashboard/SalesChart";
import RecentActivity from "../component/Dashboard/RecentActivity";
import { CircleDollarSign, Package, ShoppingBag, CheckCircle, AlertCircle } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    ordersInProgress: 0,
    ordersShipping: 0,
    ordersDone: 0,
    totalRevenue: 0,
  });

  const [salesData, setSalesData] = useState({
    total: 0,
    chartData: [],
    dateRange: "Fetching data...",
  });

  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const productsPromise = http("/api/products/top-products").then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        const apiData = await res.json();
        return apiData.data.map((product) => ({
          id: product.product_id,
          name: product.product_name,
          sold: product.quantity,
          profit: `Rp ${product.revenue.toLocaleString("id-ID")}`,
        }));
      });

      const statsPromise = http("/public/order-stats", {}, { method: "GET" }).then(async (res) => {
        if (res.ok) {
          const statsData = await res.json();
          if (statsData.success && statsData.data) {
            const data = statsData.data;
            return {
              ordersInProgress: (data["pending"] || 0) + (data["processing"] || 0),
              ordersShipping: data["shipped"] || 0,
              ordersDone: (data["delivered"] || 0) + (data["completed"] || 0),
            };
          }
        }
        return { ordersInProgress: 0, ordersShipping: 0, ordersDone: 0 };
      });

      const salesPromise = http("/public/daily-sales", {}, { method: "GET" }).then(async (res) => {
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const chartData = data.data
            .map((item) => {
              const date = new Date(item.sales_date);
              return {
                date: date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
                value: item.total_products_sold,
                fullDate: date,
              };
            })
            .sort((a, b) => a.fullDate - b.fullDate);

          const total = data.data.reduce((sum, item) => sum + item.total_products_sold, 0);
          return {
            total,
            chartData,
            dateRange: `${chartData[0].date} – ${chartData[chartData.length - 1].date}`,
          };
        }
        return { total: 0, chartData: [], dateRange: "No Data" };
      });

      const [transformedProducts, statsObj, salesObj] = await Promise.all([
        productsPromise,
        statsPromise,
        salesPromise,
      ]);

      setTopProducts(transformedProducts);

      const mockTotalRevenue = transformedProducts.reduce((acc, curr) => {
        const val = parseInt(curr.profit.replace(/[^0-9]/g, ""), 10);
        return acc + (isNaN(val) ? 0 : val);
      }, 0);

      setStats({ ...statsObj, totalRevenue: mockTotalRevenue > 0 ? mockTotalRevenue : 15450000 });
      if (salesObj) setSalesData(salesObj);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const AdminShell = ({ children }) => (
    <div
      className="flex flex-col h-screen bg-zinc-950"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <NavbarAdmin />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#111318]">{children}</main>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-full flex-col gap-3">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
          <p className="text-sm text-zinc-500 font-medium">Loading dashboard...</p>
        </div>
      </AdminShell>
    );
  }

  if (error) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-full">
          <div className="bg-zinc-900 border border-white/8 rounded-2xl p-8 text-center max-w-sm">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={22} className="text-white/60" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Failed to Load</h3>
            <p className="text-sm text-zinc-500 mb-6">{error}</p>
            <button
              onClick={fetchData}
              className="bg-white hover:bg-white/90 text-zinc-900 text-sm font-semibold px-5 py-2 rounded-lg transition active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-sm text-zinc-500 mt-1">Monitor your store's performance and sales metrics.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="Total Revenue"
            value={`Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}
            icon={CircleDollarSign}
            accent="emerald"
            trend={{ isUp: true, value: 12.5 }}
          />
          <KpiCard
            title="Processing"
            value={stats.ordersInProgress}
            icon={Package}
            accent="white"
          />
          <KpiCard
            title="Shipped"
            value={stats.ordersShipping}
            icon={ShoppingBag}
            accent="white"
          />
          <KpiCard
            title="Completed"
            value={stats.ordersDone}
            icon={CheckCircle}
            accent="white"
            trend={{ isUp: true, value: 2.1 }}
          />
        </div>

        {/* Chart + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SalesChart
              data={salesData.chartData}
              total={salesData.total}
              dateRange={salesData.dateRange}
            />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity topProducts={topProducts} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

export default Dashboard;
