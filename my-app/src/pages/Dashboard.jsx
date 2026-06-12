import { useState, useEffect, useCallback } from "react";

import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import Cup from "../assets/admin/glass.svg";
import Truck from "../assets/admin/truck.svg";
import UserChecked from "../assets/admin/user-checked.svg";
import ArrowRise from "../assets/admin/arrowRise.svg";
import Calendar from "../assets/admin/Calendar.svg";
import Chart from "../assets/admin/chart.svg";
import http from "../lib/http";
import AreaChartCustom from "../component/AreaChart"

function Dashboard() {

  const [stats, setStats] = useState({
    ordersInProgress: 0,
    ordersShipping: 0,
    ordersDone: 0,
  });

  const [salesData, setSalesData] = useState({
    total: 0,
    products: [],
    dateRange: "16 - 23 January 2023",
  });

  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Top Products
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

      // Fetch Order Stats
      const statsPromise = http("/public/order-stats", {}, { method: 'GET' }).then(async (res) => {
        if (res.ok) {
          const statsData = await res.json();
          if (statsData.success && statsData.data) {
            const data = statsData.data;
            const inProgress = (data["pending"] || 0) + (data["processing"] || 0);
            const shipping = data["shipped"] || 0;
            const done = (data["delivered"] || 0) + (data["completed"] || 0);
            return { ordersInProgress: inProgress, ordersShipping: shipping, ordersDone: done };
          }
        }
        return { ordersInProgress: 0, ordersShipping: 0, ordersDone: 0 };
      });

      // Fetch Sales Data
      const salesPromise = http(`/public/daily-sales`, {}, { method: 'GET' }).then(async (res) => {
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const chartData = data.data.map((item) => {
            const date = new Date(item.sales_date);
            return {
              date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
              value: item.total_products_sold,
              fullDate: date,
            };
          });

          chartData.sort((a, b) => a.fullDate - b.fullDate);

          const firstDate = chartData[0].date;
          const lastDate = chartData[chartData.length - 1].date;
          const dateRange = `${firstDate} - ${lastDate}`;
          const total = data.data.reduce((sum, item) => sum + item.total_products_sold, 0);

          return { total, chartData, dateRange };
        }
        return null;
      });

      const [transformedProducts, statsObj, salesObj] = await Promise.all([
        productsPromise,
        statsPromise,
        salesPromise
      ]);

      setTopProducts(transformedProducts);
      setStats(statsObj);
      if (salesObj) {
        setSalesData(salesObj);
      }

    } catch (err) {
      setError(err.message);
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <NavbarAdmin />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="text-xl text-gray-600">Loading dashboard...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen">
        <NavbarAdmin />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800 flex flex-col items-center">
              <p className="font-semibold text-lg mb-2">Error loading dashboard</p>
              <p className="text-sm mb-4">{error}</p>
              <button 
                onClick={fetchData}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow transition"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <NavbarAdmin />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-50 text-white  bg-green-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    <img src={Cup} alt="Progress" />
                  </div>
                  <p className="text-lg font-semibold">Order On Progress</p>
                </div>
                <div className="flex items-baseline">
                  <h2 className="text-4xl font-bold">
                    {stats.ordersInProgress}
                  </h2>
                  <span className="flex items-center text-white text-base">
                    <img src={ArrowRise} alt="Up" className="w-4 h-4 mr-1" />
                    +11.01%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-50 text-white bg-indigo-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    <img src={Truck} alt="Shipping" />
                  </div>
                  <p className="text-lg font-semibold">Order Shipping</p>
                </div>
                <div className="flex items-baseline">
                  <h2 className="text-4xl font-bold">{stats.ordersShipping}</h2>
                  <span className="flex items-center text-white text-base">
                    <img src={ArrowRise} alt="Up" className="w-4 h-4 mr-1" />
                    +4.01%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-50 text-white bg-pink-400">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    <img src={UserChecked} alt="Done" />
                  </div>
                  <p className="text-lg font-semibold">Order Done</p>
                </div>
                <div className="flex items-baseline">
                  <h2 className="text-4xl font-bold">{stats.ordersDone}</h2>
                  <span className="flex items-center text-white text-base">
                    <img src={ArrowRise} alt="Up" className="w-4 h-4 mr-1" />
                    +2.01%
                  </span>
                </div>
              </div>
            </section>
            
  
              <AreaChartCustom 
              data={salesData.chartData} 
              dateRange={salesData.dateRange}
              total={salesData.total}
            />

            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Produk Terlaris
                </h2>
                <div className="flex items-center space-x-2 border rounded-md px-3 py-2 text-gray-700 bg-white">
                  <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                  <select className="bg-transparent outline-none cursor-pointer text-sm">
                    <option>{salesData.dateRange}</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Produk
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Terjual
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Keuntungan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topProducts.map((product, index) => (
                      <tr
                        key={product.id || index}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {product.sold} Cup
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">
                          {product.profit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
