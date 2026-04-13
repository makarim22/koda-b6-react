import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await http("/api/products/top-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const apiData = await response.json();

        const products = apiData.data;

        const transformedProducts = products.map((product) => ({
          id: product.product_id,
          name: product.product_name,
          sold: product.quantity,
          profit: `Rp ${product.revenue.toLocaleString("id-ID")}`,
        }));

        setTopProducts(transformedProducts);

        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

//     // Di dalam TotalPopulationChart.jsx
// useEffect(() => {
//   // Hitung total order per hari dari data orders
//   const groupByDate = orders.reduce((acc, order) => {
//     const date = new Date(order.date).toLocaleDateString('id-ID', { 
//       day: '2-digit', 
//       month: 'short' 
//     });
//     const existing = acc.find(d => d.date === date);
//     if (existing) {
//       existing.value += parseInt(order.subtotal.replace(/\D/g, ''));
//     } else {
//       acc.push({ date, value: parseInt(order.subtotal.replace(/\D/g, '')) });
//     }
//     return acc;
//   }, []);
  
//   setData(groupByDate);
// }, [orders]);


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
          <main className="flex-1 p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-semibold">Error loading dashboard</p>
              <p className="text-sm">{error}</p>
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
            
            <AreaChartCustom />

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
