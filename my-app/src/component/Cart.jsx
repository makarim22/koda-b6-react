import React from 'react'
import { useNavigate } from 'react-router-dom';

function Cart({items}) {
    // const navigate = useNavigate();
    
    

    console.log("itemsnya", items);

    let arrayItems = [];

    if (items){
        if(Array.isArray(items)){
            arrayItems = items;
        } else if(typeof items === "object"){
            const singleItem = {
                id: items.id || 'unknown-id', 
                name: items.title || "Produk Pesanan", 
                quantity: items.quantity || 1, 
                originalPrice: items.originalPrice || "IDR 20.000", 
                temperature: items.temperature || "Normal", 
                size: items.size || "Reguler", 
                price: items.price || "IDR 20.000", 
                image: items.image 

            }
            arrayItems = [singleItem];
        }
    }

    console.log("arrayItems", arrayItems);


    
    return (
        <div className="bg-white rounded-lg p-6">
            <div className='flex flex-row justify-between'> 
                <h3 className="text-xl font-bold mb-6">Your Order</h3>
            <button
            // onClick={navigate('/product')}
             className="bg-orange-400 text-black w-35 rounded-lg">
                {" "}
                + Add Menu
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
                {arrayItems.map((item, idx) => (
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

        </div>
    )
}

export default Cart