import React from 'react';
import { ChevronDown, X } from 'lucide-react';

const OrderSidebar = ({
  orderNumber = '#12354-09893',
  customerName = 'Ghaluh Wizard Anggoro',
  address = 'Griya bandung indah',
  phone = '082116304338',
  paymentMethod = 'Cash',
  shipping = 'Dine In',
  status = 'On progress',
  totalTransaction = 'Idr 40.000',
  items = [],
  onUpdate = () => {},
  onClose = () => {},
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
      {/* Header with Order Number and Close Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Order {orderNumber}</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h3>

        <div className="space-y-4">
          <InformationField icon="👤" label="Full Name" value={customerName} />
          <InformationField icon="📍" label="Address" value={address} />
          <InformationField icon="📱" label="Phone" value={phone} />
          <InformationField icon="💳" label="Payment Method" value={paymentMethod} />
          <InformationField icon="🚚" label="Shipping" value={shipping} />

          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚡</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-900 font-medium">{status}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 font-medium">Total Transaksi</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{totalTransaction}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Order</h3>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No items in this order</p>
        )}
      </div>

      <button
        onClick={onUpdate}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        Update
      </button>
    </div>
  );
};

const InformationField = ({ icon, label, value }) => {
  return (
    <div className="pb-4 border-b border-gray-200">
      <div className="flex items-start gap-3">
        <span className="text-lg">{icon}</span>
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-gray-900 font-semibold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({ item }) => {
  const {
    image = '',
    name = 'Product Name',
    quantity = 1,
    details = 'Regular | Ice | Dine In',
    originalPrice = 'IDR40.000',
    price = 'IDR20.000',
  } = item;

  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
        <p className="text-xs text-gray-500 mt-1">
          {quantity}pcs {details}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-red-500 line-through">{originalPrice}</span>
          <span className="text-sm font-bold text-orange-500">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebar;