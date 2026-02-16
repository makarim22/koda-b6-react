import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react'; 

export const ProductTable = ({
  products,
  onEdit, 
  onDelete,
  // onView, 
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

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
                Image
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Product Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Price
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Desc
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Product Size
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Method
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Stock
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-orange-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm font-medium">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm font-medium">
                  Rp{product.price}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-gray-500 text-xs">
                    {product.description}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm">
                  {product.sizeOptions || '-'}
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm">
                  {product.payment || 'Dine In, Deliver'}
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm font-medium">
                  {product.size}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    
                    onClick={() => onEdit?.(product)}
                    className="p-1.5 hover:bg-orange-100 rounded-lg transition-colors"
                    title="Edit"
                    disabled={!onEdit} 
                  >
                    <Edit2 size={16} className={`${onEdit ? 'text-orange-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => onDelete?.(product.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                    disabled={!onDelete} 
                  >
                    <Trash2 size={16} className={`${onDelete ? 'text-red-500' : 'text-gray-400'}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Show {paginatedProducts.length} product of {products.length} product
        </p>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    currentPage === page
                      ? ' text-orange-400'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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