import React from 'react';

const RecentActivity = ({ topProducts }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Sold</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {topProducts.slice(0, 5).map((product, index) => (
              <tr key={product.id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    {product.sold} units
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-emerald-600">
                  {product.profit}
                </td>
              </tr>
            ))}
            {topProducts.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500">
                  No products data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
