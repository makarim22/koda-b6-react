import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ProductSidebar({ onClose = () => {}, title='', action }) {
  
  const [formData, setFormData] = useState({
    photo: null,
    productName: '',
    price: '',
    description: '',
    selectedSizes: [],
    stock: '',
  });

  const sizeOptions = ['R', 'L', 'XL', '250 gr', '500gr'];
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter(s => s !== size)
        : [...prev.selectedSizes, size]
    }));
  };

  const handleSave = () => {
    console.log('Product Data:', formData);
  };

  const handleReset = () => {
    setFormData({
      photo: null,
      productName: '',
      price: '',
      description: '',
      selectedSizes: [],
      stock: '',
    });
  };

  return (
    <div >
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{title} Product</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        
        <div >
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Photo Product
          </label>
          
          <div className="relative w-15 m-0">
            {formData.photo ? (
              <div className="relative w-full">
                <img
                  src={formData.photo}
                  alt="Product preview"
                  className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-2 right-2 bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors"
                >
                  Change
                </label>
              </div>
            ) : (
              <div className="border-2rounded-lg text-center hover:border-orange-400 transition-colors">
                <div className="text-4xl text-gray-300 mb-2"></div>
                <label
                  htmlFor="photo-upload"
                  className="inline-block bg-orange-400 hover:bg-orange-600 text-black px-4 py-2  rounded font-medium cursor-pointer transition-colors"
                >
                  Upload
                </label>
              </div>
            )}
            
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Product name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter Product Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter Product Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Product Description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Product Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  formData.selectedSizes.includes(size)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Enter Product Stock"
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
            className="flex-1 px-4 py-3 bg-orange-400 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors"
          >
            {action} Product
          </button>
        </div>
      </div>
    </div>
  );
}