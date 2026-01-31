import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, MapPin, Eye, EyeOff } from 'lucide-react';

export default function UserSidebar({ onClose = () => {} }) {
  const [formData, setFormData] = useState({
    image: null,
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    userType: 'Normal User',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
  };

  const handleSave = () => {
    console.log('User Data:', formData);
  };

  const handleReset = () => {
    setFormData({
      image: null,
      fullName: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      userType: 'Normal User',
    });
    setShowPassword(false);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Insert User</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-red-500" />
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-5">
        
        {/* Image User Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Image User
          </label>
          
          <div className="relative">
            {formData.image ? (
              <div className="relative w-full">
                <img
                  src={formData.image}
                  alt="User preview"
                  className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors"
                >
                  Change
                </label>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                <div className="text-4xl text-gray-300 mb-2">👤</div>
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium cursor-pointer transition-colors"
                >
                  Upload
                </label>
              </div>
            )}
            
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Phone
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Your Number"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <button
              type="button"
              className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              Set New Password
            </button>
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Your Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Your Address"
              rows="3"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        {/* Type of User */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Type of User
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleUserTypeChange('Normal User')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                formData.userType === 'Normal User'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Normal User
            </button>
            <button
              onClick={() => handleUserTypeChange('Admin')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                formData.userType === 'Admin'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}