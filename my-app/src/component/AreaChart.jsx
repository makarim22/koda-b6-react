import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartCustom = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState('16 - 23 January 2023');

  useEffect(() => {
    const chartData = [
      { date: '16 Jan', value: 5000 },
      { date: '17 Jan', value: 5200 },
      { date: '18 Jan', value: 5100 },
      { date: '19 Jan', value: 5400 },
      { date: '20 Jan', value: 5600 },
      { date: '21 Jan', value: 5800 },
      { date: '22 Jan', value: 6000 },
      { date: '23 Jan', value: 6200 },
    ];
    setData(chartData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total Population</h3>
          <p className="text-sm text-gray-500">100 Leads in 31 January 2023</p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
          <span>📅</span>
          <span>{dateRange}</span>
          <span>▼</span>
        </button>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              domain={[0, 7000]}
              ticks={[0, 2000, 4000, 6000]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px'
              }}
              formatter={(value) => `${value.toLocaleString('id-ID')}`}
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