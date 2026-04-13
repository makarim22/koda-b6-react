import { X } from "lucide-react";
import { useState } from "react";
import http from "../lib/http";

export default function VariantSidebar({
  onClose = () => {},
  onSuccess = () => {},
  variantType = "size",
}) {
  const isSize = variantType === "size";

  const [formData, setFormData] = useState({
    name: "",
    additionalPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const title = isSize ? "Add Size" : "Add Variant";

  if (!isSize && variantType !== "variant") {
    console.error("variantType must be 'size' or 'variant'");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        // type: isSize ? "size" : "variant",
        name: formData.name,
        additionalPrice: formData.additionalPrice ? parseFloat(formData.additionalPrice) : 0,
      };

      let response = ""
      if (payload.type === "size" ){
        response = await http(`/api/variants`, payload, {
        method: "POST"
      });
      } else {
         response = await http(`/api/sizes`, payload, {
         method: "POST"
      });
    }

     const result = await response.json()
     console.log("result", result);
     

      if (!response.ok) {
        throw new Error("Failed to create variant");
      }

      setMessage({ type: "success", text: `${title} added successfully` });
      setFormData({ name: "", additionalPrice: "" });

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to save" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", additionalPrice: ""});
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {message.text && (
            <div
              className={`p-4 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              {isSize ? "Size" : "Variant"} Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={`Enter ${isSize ? "size" : "variant"} name`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Additional Price
            </label>
            <input
              type="number"
              name="additionalPrice"
              value={formData.additionalPrice}
              onChange={handleInputChange}
              placeholder="0 (optional)"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-orange-400 hover:bg-orange-600 disabled:bg-orange-300 text-black font-semibold rounded-lg transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}