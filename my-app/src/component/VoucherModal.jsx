import React, { useState, useEffect } from "react";
import http from "../lib/http";

export default function VoucherModal({ voucher, onClose, isEdit, token }) {
  const [formData, setFormData] = useState({
    code: "",
    discount_type: "PERCENTAGE",
    discount_value: 0,
    min_purchase: 0,
    max_discount: null,
    valid_from: new Date().toISOString().slice(0, 16),
    valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    usage_limit: 100,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && voucher) {
      setFormData({
        code: voucher.code || "",
        discount_type: voucher.discount_type || "PERCENTAGE",
        discount_value: voucher.discount_value || 0,
        min_purchase: voucher.min_purchase || 0,
        max_discount: voucher.max_discount || null,
        valid_from: new Date(voucher.valid_from).toISOString().slice(0, 16),
        valid_until: new Date(voucher.valid_until).toISOString().slice(0, 16),
        usage_limit: voucher.usage_limit || 100,
      });
    }
  }, [voucher, isEdit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === "number") {
      finalValue = value === "" ? "" : parseFloat(value);
    }
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      setError("Voucher code is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = isEdit ? `/api/vouchers/${voucher.id}` : "/api/vouchers";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...formData,
        valid_from: new Date(formData.valid_from).toISOString(),
        valid_until: new Date(formData.valid_until).toISOString(),
        max_discount: formData.max_discount === "" || formData.max_discount === null ? undefined : parseFloat(formData.max_discount)
      };

      const res = await http(endpoint, payload, { method, token });
      if (res.ok) {
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || data.message || "An error occurred");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-y-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. SUMMER24"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 uppercase"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (Rp)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
              <input
                type="number"
                name="discount_value"
                value={formData.discount_value}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Purchase *</label>
              <input
                type="number"
                name="min_purchase"
                value={formData.min_purchase}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (Opt)</label>
              <input
                type="number"
                name="max_discount"
                value={formData.max_discount || ""}
                onChange={handleChange}
                min="0"
                placeholder="No limit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid From *</label>
              <input
                type="datetime-local"
                name="valid_from"
                value={formData.valid_from}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until *</label>
              <input
                type="datetime-local"
                name="valid_until"
                value={formData.valid_until}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit *</label>
            <input
              type="number"
              name="usage_limit"
              value={formData.usage_limit}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          {loading && <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></span>}
          {isEdit ? "Save Changes" : "Create Voucher"}
        </button>
      </div>
    </form>
  );
}
