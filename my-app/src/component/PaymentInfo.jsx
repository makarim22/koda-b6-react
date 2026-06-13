import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Building2, Mail, User, MapPin } from 'lucide-react';
import BCA from '../assets/icons/productPage/BCA.svg';
import BRI from '../assets/icons/productPage/BRI.svg';
import DANA from '../assets/icons/productPage/DANA.svg';
import Gopay from '../assets/icons/productPage/gopay.svg';
import OVO from '../assets/icons/productPage/Ovo.svg';

const PAYMENT_METHODS = [
  {
    id: 'snap',
    label: 'Pay with Midtrans',
    description: 'GoPay, OVO, DANA, Credit Card, Bank Transfer',
    icon: <CreditCard size={18} className="text-orange-500" />,
  },
  {
    id: 'e_wallet',
    label: 'E-Wallet',
    description: 'GoPay, OVO, DANA',
    icon: <Smartphone size={18} className="text-blue-500" />,
  },
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'BCA, BRI, Mandiri, BNI',
    icon: <Building2 size={18} className="text-emerald-500" />,
  },
];

function InputField({ label, icon: Icon, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon size={16} className="text-zinc-400" />
        </div>
        <input
          {...props}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors shadow-sm"
        />
      </div>
    </div>
  );
}

function PaymentInfo({ 
  onDeliveryMethodChange, 
  onFormDataChange,
  onPaymentMethodChange,
  selectedDeliveryMethod = 'dine-in', 
  user
}) {
  const [deliveryMethod, setDeliveryMethod] = useState(selectedDeliveryMethod);
  const [paymentMethod, setPaymentMethod] = useState('snap');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.user?.email || '',
        fullName: user.user?.fullname || '',
        address: user.user?.address || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (onPaymentMethodChange) onPaymentMethodChange('snap');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    if (onFormDataChange) onFormDataChange(updatedFormData);
  };

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    if (onDeliveryMethodChange) onDeliveryMethodChange(method);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (onPaymentMethodChange) onPaymentMethodChange(method);
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 w-full">
      <h2 className="text-xl font-bold mb-6 text-zinc-900 tracking-tight">Delivery & Info</h2>

      <form className="space-y-6">
        <div className="space-y-4">
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            icon={Mail}
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            icon={User}
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <InputField
            label="Delivery Address"
            type="text"
            name="address"
            placeholder="Enter your address"
            icon={MapPin}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        {/* Delivery Method */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Delivery Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'dine-in', label: 'Dine In' },
              { id: 'door-delivery', label: 'Door Delivery' },
              { id: 'pick-up', label: 'Pick Up' }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleDeliveryChange(option.id)}
                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  deliveryMethod === option.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-zinc-600 hover:border-slate-300 hover:text-zinc-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Payment Method
          </label>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handlePaymentMethodChange(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left group ${
                  paymentMethod === method.id
                    ? 'border-orange-500/50 bg-orange-50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-colors ${
                  paymentMethod === method.id ? 'bg-orange-100' : 'bg-slate-50 group-hover:bg-slate-100'
                }`}>
                  {method.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${paymentMethod === method.id ? 'text-orange-600' : 'text-zinc-800'}`}>
                    {method.label}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5 truncate">{method.description}</div>
                </div>

                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  paymentMethod === method.id 
                    ? 'border-orange-500' 
                    : 'border-slate-300 group-hover:border-slate-400'
                }`}>
                  {paymentMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentInfo;