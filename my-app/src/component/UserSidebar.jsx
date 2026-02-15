import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, MapPin, Eye, EyeOff } from 'lucide-react';
import { useEffect } from 'react'

export default function UserSidebar({
 onClose = () => {},
 isInsert = true , 
 action,
 user = null,
}) {

    const ID_COUNTER_KEY = 'user-id-counter';


  const [formData, setFormData] = useState({
    image: null,
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    userType: 'Normal User',
  });

  useEffect(() => {
    if (!isInsert && user) {
      setFormData({
        fullName: user.fullname || '',
        email: user.email || '',
        phone: user.phone || '',
        password : user.password || '',
        address: user.address || '',
        profileImage: user.profileImage || ''
      });
    } else {
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        profileImage: ''
      });
    }
  }, [isInsert, user]);

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


  const getNextUserId = () => {
  let currentId = localStorage.getItem(ID_COUNTER_KEY);
  currentId = currentId ? parseInt(currentId) : 0;
  const nextId = currentId + 1;
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString());
  return nextId;
};

  const handleSave = () => {
    console.log('User Data:', formData);

     const userData = JSON.parse(localStorage.getItem('user-data') || '[]');

    if(isInsert){
      const newUser = {
      id : getNextUserId(),
      fullname : formData.fullName || '',
      email : formData.email || '',
      phone : formData.phone || '',
      password : formData.password || '',
      address : formData.address || '',
      isAdmin : formData.userType === 'Admin' || false,
      profileImage: formData.image 

    }
    
     userData.push(newUser)
    } else {
      const updatedData = userData.map(u => {
          if (u.id === user.id) {
            return {
              ...u,
              fullname: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              password: formData.password || u.password, 
              address: formData.address,
              profileImage: formData.profileImage || u.profileImage, 
              isAdmin: formData.userType === 'Admin'
            };
          }
          return u;
        });
        userData.length = 0;
        userData.push(...updatedData);
        console.log('User updated:', user.id);
    }
    localStorage.setItem('user-data', JSON.stringify(userData));
    onClose()
  };


  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">
        {isInsert ? 'Add New User' : `${user?.fullname}`}
      </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-red-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

      <div className="p-6 space-y-5">

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
                  className="absolute bottom-2 right-2 bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors"
                >
                  Change
                </label>
              </div>
            ) : (
              <div className=" rounded-lg  text-center hover:border-orange-500 transition-colors w-15 h-20">
                <div className="text-4xl text-gray-300 mb-2"></div>
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-orange-400 hover:bg-orange-600 text-black px-4 py-2 rounded font-medium cursor-pointer transition-colors"
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
  
        {isInsert && (<div>
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
        </div>)}
              

        <div className="flex gap-3 pt-4">
          <button
          
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-orange-400 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors"
          >
            {action}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}