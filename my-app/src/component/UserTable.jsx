import React, { useState } from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

export default function UserTable({ users = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(new Set(paginatedUsers.map(u => u.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const isAllSelected = paginatedUsers.length > 0 && 
    paginatedUsers.every(u => selectedItems.has(u.id));

  return (
    <div className="flex flex-col gap-6 bg-white p-8 rounded-lg flex-1 overflow-y-auto">
      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer accent-orange-500"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Image
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Full Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Address
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(user.id)}
                    onChange={(e) => handleSelectItem(user.id, e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-orange-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800 text-sm font-medium">
                  {user.fullName}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm max-w-xs">
                  <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.address}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {user.email}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors">
                    <Eye size={16} className="text-blue-500" />
                  </button>
                  <button className="p-1.5 hover:bg-orange-100 rounded-lg transition-colors">
                    <Edit2 size={16} className="text-orange-500" />
                  </button>
                  <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination & Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Show {paginatedUsers.length} user of {users.length} user
        </p>

        {/* Pagination */}
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
                  className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
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
}