import React, { useState, useEffect } from "react";
import http from "../lib/http";

export default function CategoryModal({ category, onClose, isEdit }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && category) {
      setName(category.name || "");
    } else {
      setName("");
    }
  }, [category, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = isEdit ? `/api/product-categories/${category.id}` : "/api/product-categories";
      const method = isEdit ? "PUT" : "POST";

      const res = await http(endpoint, { name }, { method });
      if (res.ok) {
        onClose();
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred while saving the category");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Coffee, Non-Coffee, Snack"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            required
          />
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-lg mt-auto">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          {loading ? (
            <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></span>
          ) : null}
          {isEdit ? "Save Changes" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
