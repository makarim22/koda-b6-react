import React from 'react'

function Invoice(props) {
    const { paymentDetails } = props;
    const { order, delivery, tax, subtotal } = paymentDetails;

    return (
        <div className="bg-white rounded-lg p-6 w-full md:w-80">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Total</h3>
            <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order</span>
                    <span className="font-semibold text-gray-900">{order}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-gray-900">{delivery}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold text-gray-900">{tax}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-600 font-semibold">Sub Total</span>
                    <span className="font-bold text-lg text-gray-900">{subtotal}</span>
                </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg mb-6 transition">
                Checkout
            </button>
            <div>
                <p className="text-sm text-gray-600 mb-3">We Accept</p>
                <div className="grid grid-cols-6 gap-2 mb-4">
                    <img src="/icons/bank-central-asia.svg" alt="Bank Central Asia" className="w-full h-auto" />
                    <img src="/icons/bca.svg" alt="BCA" className="w-full h-auto" />
                    <img src="/icons/mandiri.svg" alt="Mandiri" className="w-full h-auto" />
                    <img src="/icons/bni.svg" alt="BNI" className="w-full h-auto" />
                    <img src="/icons/ovo.svg" alt="OVO" className="w-full h-auto" />
                    <img src="/icons/paypal.svg" alt="PayPal" className="w-full h-auto" />
                </div>
                <p className="text-xs text-gray-500 text-center">
                    *Get Discount if you pay with Bank Central Asia
                </p>
            </div>
        </div>
    )
}

export default Invoice