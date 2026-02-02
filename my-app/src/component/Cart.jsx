import React from 'react'

function Cart(props) {
    const { items } = props;

    return (
        <div className="bg-white rounded-lg p-6">
            <div className='flex flex-row justify-between'> 
                <h3 className="text-xl font-bold mb-6">Your Order</h3>
            <button className="bg-orange-400 text-black w-35 rounded-lg">
                {" "}
                + Add Menu
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
                {items.map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                        <div className="flex-shrink-0">
                            <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                                        FLASH SALE!
                                    </span>
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        {item.name}
                                    </h4>
                                </div>
                                <button className="text-red-500 text-xl font-bold hover:text-red-700">
                                    ✕
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">
                                {item.quantity}pcs | {item.size} | {item.temperature} | Dine In
                            </p>
 
                            <div className="flex items-center gap-3">
                                <span className="line-through text-red-500 text-sm">
                                    {item.originalPrice}
                                </span>
                                <span className="text-orange-400 font-bold text-lg">
                                    {item.price}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                <span className="text-xl">+</span> Add Menu
            </button>
        </div>
    )
}

export default Cart