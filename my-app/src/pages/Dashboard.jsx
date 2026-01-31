import React from 'react'

import NavbarAdmin from '../layouts/NavbarAdmin';
import Sidebar from '../layouts/Sidebar';

function Dashboard() {
  return (
    <>
    <div>
      
      <NavbarAdmin />
      <Sidebar />
      {/* CONTENT WRAPPER */}
      <div className="flex flex-col gap-8 p-8 flex-1 overflow-y-auto">
        {/* STAT CARDS */}
        <section className="flex gap-6 justify-between">
          <div className="flex flex-col gap-4 p-6 rounded-lg flex-1 min-w-[200px] text-white">
            <div className="flex ">
              <div className="stat-icon icon-progress">
                <img src="./src/icons/dashboard/cup.svg" alt="Progress" />
              </div>
              <p className="stat-title">Order On Progress</p>
            </div>
            <div className="stat-content">
              <h2 className="stat-number">200</h2>
              <span className="stat-change positive">
                <img src="./src/icons/dashboard/Arrow-rise.svg" alt="Up" />
                +11.01%
              </span>
            </div>
          </div>
          <div className="stat-card card-shipping">
            <div className="stat-header">
              <div className="stat-icon icon-shipping">
                <img src="./src/icons/dashboard/truck.svg" alt="Shipping" />
              </div>
              <p className="stat-title">Order Shipping</p>
            </div>
            <div className="stat-content">
              <h2 className="stat-number">100</h2>
              <span className="stat-change positive">
                <img src="./src/icons/dashboard/Arrow-rise.svg" alt="Up" />
                +4.01%
              </span>
            </div>
          </div>
          <div className="stat-card card-done">
            <div className="stat-header">
              <div className="stat-icon icon-done">
                <img src="./src/icons/dashboard/customers.svg" alt="Done" />
              </div>
              <p className="stat-title">Order Done</p>
            </div>
            <div className="stat-content">
              <h2 className="stat-number">50</h2>
              <span className="stat-change positive">
                <img src="./src/icons/dashboard/Arrow-rise.svg" alt="Up" />
                +2.01%
              </span>
            </div>
          </div>
        </section>
        {/* CHART SECTION */}
        <section className="chart-section">
          <div className="chart-header">
            <h2>Total Penjualan</h2>
            <p className="chart-subtitle">1000 cup (16 - 23 January 2023)</p>
            <div className="chart-date-picker">
              <img src="./src/icons/calendar.svg" alt="Calendar" />
              <select>
                <option>16 - 23 January 2023</option>
              </select>
            </div>
          </div>
          <div className="chart-container">
            <canvas id="salesChart" />
            <div>
              <img src="./src/icons/dashboard/dashboard.jpg" alt="Chart" />
              <img src="./src/icons/dashboard/graph.svg" alt="Chart" />
            </div>
          </div>
        </section>
        {/* TABLE SECTION */}
        <section className="table-section">
          <div className="table-header">
            <h2>Produk Terlaris</h2>
            <div className="table-date-picker">
              <img src="./src/icons/calendar.svg" alt="Calendar" />
              <select>
                <option>16 - 23 January 2023</option>
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Produk</th>
                  <th>Terjual</th>
                  <th>Keuntungan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Caramel Machiato</td>
                  <td>300 Cup</td>
                  <td>
                    <span className="revenue">IDR 9.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Hazelnut Latte</td>
                  <td>200 Cup</td>
                  <td>
                    <span className="revenue">IDR 8.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Kopi Susu</td>
                  <td>100 Cup</td>
                  <td>
                    <span className="revenue">IDR 7.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Espresso Supreme</td>
                  <td>90 Cup</td>
                  <td>
                    <span className="revenue">IDR 6.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Caramel Velvet Latte</td>
                  <td>80 Cup</td>
                  <td>
                    <span className="revenue">IDR 5.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Hazelnut Dream Brew</td>
                  <td>70 Cup</td>
                  <td>
                    <span className="revenue">IDR 4.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Vanilla Silk Mocha</td>
                  <td>60 Cup</td>
                  <td>
                    <span className="revenue">IDR 3.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Dark Roast Delight</td>
                  <td>50 Cup</td>
                  <td>
                    <span className="revenue">IDR 2.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Ethiopian Yirgacheffe Euphoria</td>
                  <td>40 Cup</td>
                  <td>
                    <span className="revenue">IDR 1.000.000</span>
                  </td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Indonesian Sumatra Reserve</td>
                  <td>30 Cup</td>
                  <td>
                    <span className="revenue">IDR 500.000</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
      </div>
      </>

  )
}

export default Dashboard
