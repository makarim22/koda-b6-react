import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Cart({ items, onRemoveItem, isRemoveShowed, showAddMenu }) {
    const navigate = useNavigate();
    const [arrayItems, setArrayItems] = useState([]);

    useEffect(() => {
        let processedItems = [];

        if (items) {
            if (Array.isArray(items)) {
                processedItems = items;
            } else if (typeof items === "object") {
                const singleItem = {
                    id: items.id || `item-${Date.now()}`,
                    name: items.title || "Produk Pesanan", 
                    quantity: items.quantity || 1, 
                    originalPrice: items.originalPrice || "IDR 20.000", 
                    temperature: items.temperature || "Normal", 
                    size: items.size || "Reguler", 
                    price: items.price || "IDR 20.000", 
                    image: items.image 
                }
                processedItems = [singleItem];
            }
        }

        setArrayItems(processedItems);
        console.log("arrayItems updated:", processedItems);
    }, [items]); 

     function handleRemove(arrayIndex) {
        console.log("yg mau di remove pada index:", arrayIndex);
        
        const updatedCart = arrayItems.filter((item, idx) => idx !== arrayIndex);
        setArrayItems(updatedCart);
        
        if (onRemoveItem) {
            onRemoveItem(arrayIndex);
        }
    
    }
    return (
        <div className="bg-white rounded-lg p-6">
            <div className='flex flex-row justify-between items-center mb-6'> 
                {showAddMenu ? (
                <button
                    onClick={() => navigate('/product')} 
                    className="bg-orange-400 text-black px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors font-semibold"
                >
                    + Add Menu
                </button>
                ) : (
                 <div></div>
                )}
            </div>
            
            {arrayItems.length > 0 ? (
                <div className="space-y-4 mb-6">
                    {arrayItems.map((item, arrayIndex) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
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
                                    {isRemoveShowed ? (
 <button 
                                         onClick={() => handleRemove(arrayIndex)}
                                        className="text-red-500 text-2xl font-bold hover:text-red-700 hover:scale-110 transition-all"
                                        title="Remove item"
                                    >
                                        ✕
                                    </button>
                                    ): (
                                        <div>
                                            </div>
                                    )}
                                   
                                </div>

                                <p className="text-sm text-gray-600 mb-3">
                                    {item.quantity} pcs | {item.size} | {item.temperature} | Dine In
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
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                </div>
            )}
        </div>
    )
}

export default Cart