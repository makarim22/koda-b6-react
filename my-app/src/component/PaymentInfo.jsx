import React, { useState, useEffect } from 'react'
import mailIcon from '../assets/icons/mail.svg'
import Location from '../assets/icons/productPage/Location.svg'
import Profile from '../assets/icons/productPage/Profile.svg'
import BCA from '../assets/icons/productPage/BCA.svg'
import BRI from '../assets/icons/productPage/BRI.svg'
import DANA from '../assets/icons/productPage/DANA.svg'
import Gopay from '../assets/icons/productPage/gopay.svg'
import OVO from '../assets/icons/productPage/Ovo.svg'
import { Input } from './Input'
import { CreditCard, Smartphone, Building2 } from 'lucide-react'

const PAYMENT_METHODS = [
  {
    id: 'snap',
    label: 'Pay with Midtrans',
    description: 'GoPay, OVO, DANA, Credit Card, Bank Transfer',
    icon: <CreditCard size={20} className="text-orange-500" />,
  },
  {
    id: 'e_wallet',
    label: 'E-Wallet',
    description: 'GoPay, OVO, DANA',
    icon: <Smartphone size={20} className="text-blue-500" />,
  },
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'BCA, BRI, Mandiri, BNI',
    icon: <Building2 size={20} className="text-green-600" />,
  },
]

function PaymentInfo({ 
  onDeliveryMethodChange, 
  onFormDataChange,
  onPaymentMethodChange,
  selectedDeliveryMethod = 'dine-in', 
  user
}) {
    const [deliveryMethod, setDeliveryMethod] = useState(selectedDeliveryMethod)
    const [paymentMethod, setPaymentMethod] = useState('snap')
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        address: ''
    })

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.user?.email || '',
                fullName: user.user?.fullname || '',
                address: user.user?.address || ''
            });
        }
    }, [user]);

    // Notify parent on mount with default payment method
    useEffect(() => {
        if (onPaymentMethodChange) onPaymentMethodChange('snap');
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        if (onFormDataChange) onFormDataChange(updatedFormData);
    }

    const handleDeliveryChange = (method) => {
        setDeliveryMethod(method)
        if (onDeliveryMethodChange) onDeliveryMethodChange(method);
    }

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method)
        if (onPaymentMethodChange) onPaymentMethodChange(method);
    }

    return (
        <div className="bg-white rounded-lg p-6 w-full shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment Info & Delivery</h2>

            <form className="space-y-5">
                <div>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                        icon={mailIcon}
                        iconAlt="Email Icon"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Input
                        label="Full Name"
                        type="text"
                        id="fullname"
                        name="fullName"
                        placeholder="Enter Your Full Name"
                        required
                        icon={Profile}
                        iconAlt="User Icon"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Input
                        label="Address"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter Your Address"
                        required
                        icon={Location}
                        iconAlt="Location Icon"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Delivery Method */}
                <div>
                    <label className="block text-gray-900 font-semibold mb-3">
                        Delivery Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'dine-in', label: 'Dine In' },
                            { id: 'door-delivery', label: 'Door Delivery' },
                            { id: 'pick-up', label: 'Pick Up' }
                        ].map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleDeliveryChange(option.id)}
                                className={`py-3 px-3 rounded-lg font-semibold transition ${
                                    deliveryMethod === option.id
                                        ? 'bg-orange-500 text-white border-2 border-orange-500'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <label className="block text-gray-900 font-semibold mb-3">
                        Payment Method
                    </label>
                    <div className="space-y-3">
                        {PAYMENT_METHODS.map((method) => (
                            <button
                                key={method.id}
                                type="button"
                                onClick={() => handlePaymentMethodChange(method.id)}
                                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition text-left ${
                                    paymentMethod === method.id
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 bg-white hover:border-orange-300'
                                }`}
                            >
                                <div className={`p-2 rounded-full ${paymentMethod === method.id ? 'bg-orange-100' : 'bg-gray-100'}`}>
                                    {method.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800 text-sm">{method.label}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{method.description}</div>
                                </div>
                                {method.id === 'snap' && (
                                    <div className="flex gap-1 items-center">
                                        <img src={Gopay} alt="GoPay" className="h-5 w-auto" />
                                        <img src={OVO} alt="OVO" className="h-5 w-auto" />
                                        <img src={DANA} alt="DANA" className="h-5 w-auto" />
                                    </div>
                                )}
                                {method.id === 'bank_transfer' && (
                                    <div className="flex gap-1 items-center">
                                        <img src={BCA} alt="BCA" className="h-5 w-auto" />
                                        <img src={BRI} alt="BRI" className="h-5 w-auto" />
                                    </div>
                                )}
                                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                                    paymentMethod === method.id 
                                        ? 'border-orange-500 bg-orange-500' 
                                        : 'border-gray-300'
                                }`}>
                                    {paymentMethod === method.id && (
                                        <div className="w-full h-full rounded-full bg-white scale-[0.4] transform" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PaymentInfo;