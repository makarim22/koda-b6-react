import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartCustom = ({ data = [], dateRange = '16 - 23 January 2023' }) => {
  const [chartData, setChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
      
      // Calculate total from the data
      const total = data.reduce((sum, item) => sum + (item.sales || item.value || 0), 0);
      setTotalSales(total);
    } else {
      // Fallback to dummy data if no API data
      const chartData = [
        { date: '16 Jan', value: 5000, sales: 5000 },
        { date: '17 Jan', value: 5200, sales: 5200 },
        { date: '18 Jan', value: 5100, sales: 5100 },
        { date: '19 Jan', value: 5400, sales: 5400 },
        { date: '20 Jan', value: 5600, sales: 5600 },
        { date: '21 Jan', value: 5800, sales: 5800 },
        { date: '22 Jan', value: 6000, sales: 6000 },
        { date: '23 Jan', value: 6200, sales: 6200 },
      ];
      setChartData(chartData);
      setTotalSales(chartData.reduce((sum, item) => sum + item.value, 0));
    }
  }, [data]);

  // Determine max value for Y-axis
  const maxValue = chartData.length > 0 
    ? Math.max(...chartData.map(item => item.value || item.sales || 0)) * 1.2
    : 7000;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total Penjualan</h3>
          <p className="text-sm text-gray-500">{totalSales} produk terjual</p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
          <span>📅</span>
          <span>{dateRange}</span>
          <span>▼</span>
        </button>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86efac" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#86efac" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              domain={[0, maxValue]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '10px'
              }}
              formatter={(value) => [value, 'Penjualan']}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartCustom;