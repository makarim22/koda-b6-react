import React, { useState } from 'react';
import { Eye, Edit2, Trash2, NotebookText  } from 'lucide-react';

const getStatusStyles = (status) => {
  const baseStyles = 'px-3 py-1 rounded-full text-xs font-semibold';
  
  switch (status) {
    case 'Done':
      return `${baseStyles} bg-green-100 text-green-700`;
    case 'Pending':
      return `${baseStyles} bg-red-100 text-red-700`;
    case 'On Progress':
      return `${baseStyles} bg-yellow-100 text-yellow-700`;
    case 'Waiting':
      return `${baseStyles} bg-gray-200 text-gray-700`;
    default:
      return `${baseStyles} bg-gray-100 text-gray-700`;
  }
};

export const OrderTable = ({
  orders,
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);


  return (
    <div className="flex flex-col gap-6 bg-white p-8 rounded-lg flex-1 overflow-y-auto">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer accent-orange-500"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                No. Order
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Order
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Total
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-orange-500"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm font-medium ">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {order.date}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-gray-700 text-sm flex items-center gap-1"
                      >
                        <span className="text-gray-400">•</span>
                        <span>
                          {item.name} {item.quantity}x
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={getStatusStyles(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm font-medium">
                  {order.total}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                    title="View"
                  >
                    <NotebookText size={16} className="text-amber-600" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-orange-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} className="text-orange-500" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Show {paginatedOrders.length} Order of {orders.length} order
        </p>
        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 9) }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 text-sm  rounded transition-colors ${
                    currentPage === page
                      ? ' text-black'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};