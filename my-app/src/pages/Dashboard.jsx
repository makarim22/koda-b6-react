import React from "react";

import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import Cup from "../assets/admin/glass.svg"
import Truck from "../assets/admin/truck.svg"
import UserChecked from "../assets/admin/user-checked.svg"
import ArrowRise from "../assets/admin/arrowRise.svg"
import Calendar from "../assets/admin/Calendar.svg"
import Chart from "../assets/admin/chart.svg"

function Dashboard() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <NavbarAdmin />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-[200px] text-white  bg-green-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    <img src={Cup} alt="Progress" />
                  </div>
                  <p className="text-lg font-semibold">Order On Progress</p>
                </div>
                <div className="flex items-baseline">
                  <h2 className="text-4xl font-bold">200</h2>
                  <span className="flex items-center text-white text-base">
                    <img src={ArrowRise} alt="Up" className="w-4 h-4 mr-1"/>
                    +11.01%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-[200px] text-white bg-indigo-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    <img src={Truck} alt="Shipping"  />
                  </div>
                  <p className="text-lg font-semibold">Order Shipping</p>
                </div>
                <div className="flex items-baseline">
                  <h2 className="text-4xl font-bold">100</h2>
                  <span className="flex items-center text-white text-base">
                    <img src={ArrowRise}  alt="Up" className="w-4 h-4 mr-1"/>
                    +4.01%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-[200px] text-white bg-pink-400">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    <img src={UserChecked} alt="Done" />
                  </div>
                  <p className="text-lg font-semibold">Order Done</p>
                </div>
                <div className="flex items-baseline">
                  <h2 className="text-4xl font-bold">50</h2>
                  <span className="flex items-center text-white text-base">
                    <img src={ArrowRise}  alt="Up" className="w-4 h-4 mr-1" />
                    +2.01%
                  </span>
                </div>
              </div>
            </section>
            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col justify-between  mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Total Penjualan</h2>
                <p className="text-sm text-gray-500">
                  1000 cup (16 - 23 January 2023)
                </p>
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-3 py-2 text-gray-700 bg-white">
                  <img src={Calendar} alt="Calendar" />
                  <select>
                    <option>16 - 23 January 2023</option>
                  </select>
                </div>
         <div className="chart-container relative h-64">
              <canvas id="salesChart" className="absolute inset-0 w-full h-full" />
              <img src={Chart} alt="Chart Placeholder" className="absolute inset-0 w-full h-full object-contain" />
            </div>
            </section>
             <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Produk Terlaris</h2>
              <div className="flex items-center space-x-2 border rounded-md px-3 py-2 text-gray-700 bg-white">
                <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                <select className="bg-transparent outline-none cursor-pointer text-sm">
                  <option>16 - 23 January 2023</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terjual</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keuntungan</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Caramel Machiato</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">300 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">IDR 9.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Hazelnut Latte</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">200 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">IDR 8.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Kopi Susu</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">100 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">IDR 7.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Espresso Supreme</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">90 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">IDR 6.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Caramel Velvet Latte</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">80 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">IDR 5.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Hazelnut Dream Brew</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">70 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">IDR 4.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Vanilla Silk Mocha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">60 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">IDR 3.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dark Roast Delight</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">50 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">IDR 2.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ethiopian Yirgacheffe Euphoria</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">40 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">IDR 1.000.000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Indonesian Sumatra Reserve</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">30 Cup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 ">IDR 500.000</td>
                  </tr>
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
