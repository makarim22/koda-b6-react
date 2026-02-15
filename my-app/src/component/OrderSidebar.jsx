import React from 'react';
import { ChevronDown, X } from 'lucide-react';

import product1Image from '../assets/user/product1.png';
import product2Image from '../assets/user/product2.png';


const OrderSidebar = ({
  orderNumber = '#12354-09893',
  customerName = 'Ghaluh Wizard Anggoro',
  address = 'Griya bandung indah',
  phone = '082116304338', 
  paymentMethod = 'Cash',
  shipping = 'Dine In',
  status = 'On progress',
  totalTransaction = 'Idr 40.000',
  items = [
    {
      name: 'Hazelnut Latte',
      quantity: 2,
      details: 'Regular | Ice | Dine In',
      originalPrice: 'IDR40.000',
      price: 'IDR 20.000',
      image: product1Image
    },
    {
      name: 'Caramel Machiato',
      quantity: 2,
      details: 'Regular | Ice | Dine In',
      originalPrice: 'IDR40.000',
      price: 'IDR 20.000',
      image: product2Image
    },
  ],
  onClose = () => {}, 
  title='', 
  action
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Order {orderNumber}</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-5">Order Information</h3>

        <div className="space-y-4">
          <InformationField label="Full Name" value={customerName} />
          <InformationField label="Address" value={address} />
          <InformationField label="Phone" value={phone} />
          <InformationField label="Payment Method" value={paymentMethod} />
          <InformationField label="Shipping" value={shipping} />
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Status</p>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-gray-800 font-medium text-sm">{status}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50">
        <p className="text-sm text-gray-600 font-medium">Total Transaksi</p>
        <p className="text-3xl font-bold text-orange-500 mt-2">{totalTransaction}</p>
      </div>

      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Order</h3>

        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No items in this order</p>
        )}
      </div>

      <div className="p-6 bg-white">
        <button
          // onClick={onUpdate}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-base"
        >
          Update
        </button>
      </div>
    </div>
  );
};

const InformationField = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <p className="text-gray-900 font-semibold text-sm">{value}</p>
    </div>
  );
};

const OrderItem = ({ item }) => {
  const {
    image,
    name = 'Product Name',
    quantity = 1,
    details = 'Regular | Ice | Dine In',
    originalPrice = 'IDR40.000',
    price = 'IDR 20.000',
  } = item;

  return (
    <div className="flex gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight">{name}</h4>
        <p className="text-xs text-gray-500 mt-1">
          {quantity}pcs | {details}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-red-500 line-through">{originalPrice}</span>
          <span className="text-sm font-bold text-orange-500">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebar;