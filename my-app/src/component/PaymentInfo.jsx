import React, { useState } from 'react'

import mailIcon from '../assets/icons/mail.svg'
import Location from '../assets/icons/productPage/Location.svg'
import Profile from '../assets/icons/productPage/Profile.svg'
import {User,  MapPinPen} from 'lucide-react'
import { Input } from './input'

function PaymentInfo() {
    const [deliveryMethod, setDeliveryMethod] = useState('dine-in')

    return (
        <div className="bg-white rounded-lg p-6 w-full">
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
                    />
                </div>
                <div>
                    <Input
                        label="Full Name"
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter Your Full Name"
                        required
                        icon={Profile}
                        iconAlt="User Icon"
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
                    />
                </div>
                <div>
                    <label className="block text-gray-900 font-semibold mb-3">
                        Delivery
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'dine-in', label: 'Dine in' },
                            { id: 'door-delivery', label: 'Door Delivery' },
                            { id: 'pick-up', label: 'Pick Up' }
                        ].map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setDeliveryMethod(option.id)}
                                className={`py-2 px-4 rounded-lg font-semibold transition ${
                                    deliveryMethod === option.id
                                        ? 'bg-orange-500 text-white border-2 border-orange-500'
                                        : 'bg-white text-gray-700 border-2 border-orange-500 hover:bg-orange-50'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PaymentInfo