import React from 'react';

const KpiCard = ({ title, value, icon: Icon, trend, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        {trend && (
          <span className={`text-xs font-medium ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
