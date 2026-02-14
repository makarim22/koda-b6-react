import React, { useState } from 'react'
import mailIcon from '../assets/icons/mail.svg'
import Location from '../assets/icons/productPage/Location.svg'
import Profile from '../assets/icons/productPage/Profile.svg'
import { Input } from './input'
import { useEffect } from 'react'

function PaymentInfo({ 
  onDeliveryMethodChange, 
  onFormDataChange, 
  selectedDeliveryMethod = 'dine-in', 
  user
}) {
    const [deliveryMethod, setDeliveryMethod] = useState(selectedDeliveryMethod)
    console.log('userpayment', user)
    const [formData, setFormData] = useState({
        email:  '',
        fullName:  '',
        address: ''
    })

     useEffect(() => {
        if (user) {
            setFormData({
                email: user.user.email || '',           
                fullName: user.user.fullname || '',     
                address: user.user.address || ''        
            });
            console.log('User payment info:', user);
        }
    }, [user]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        
        if (onFormDataChange) {
            onFormDataChange(updatedFormData);
        }
    }

    const handleDeliveryChange = (method) => {
        setDeliveryMethod(method)
        
        if (onDeliveryMethodChange) {
            onDeliveryMethodChange(method);
        }
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
                                className={`py-3 px-3 rounded-lg font-semibold transition relative ${
                                    deliveryMethod === option.id
                                        ? 'bg-orange-500 text-white border-2 border-orange-500'
                                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
                                }`}
                            >
                                <div>{option.label}</div>
                                <div className={`text-xs mt-1 ${
                                    deliveryMethod === option.id ? 'text-orange-100' : 'text-gray-500'
                                }`}>
                                    {option.info}
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