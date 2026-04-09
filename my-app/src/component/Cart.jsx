import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import CartCtx from '../context/CartContext';

function Cart() {
    const navigate = useNavigate();
    const [arrayItems, setArrayItems] = useState([]);
    const [removingId, setRemovingId] = useState(null);

    const { items, removeFromCart, isRemoveShowed, showAddMenu } = useContext(CartCtx)

    useEffect(() => {
        let processedItems = [];

        if (items && Array.isArray(items)) {
            processedItems = items.map(item => ({
                id: item.id,
                name: item.product_name || "Produk Pesanan", 
                quantity: item.quantity || 1, 
                originalPrice: item.price ? `IDR ${item.price.toLocaleString('id-ID')}` : "IDR 0", 
                temperature: item.variant_name || "Normal", 
                size: item.size_name || "Reguler", 
                price: item.price ? `IDR ${item.price.toLocaleString('id-ID')}` : "IDR 0", 
                image: item.image || "/api/placeholder/96/96",
                subtotal: item.subtotal || item.price
            }));
        }

        setArrayItems(processedItems);
    }, [items]); 

    const handleRemoveItem = async (itemId) => {
        setRemovingId(itemId);
        try {
            await removeFromCart(itemId);
            console.log('Item removed successfully');
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setRemovingId(null);
        }
    };

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
                    {arrayItems.map((item) => (
                        <div 
                            key={item.id} 
                            className={`border border-gray-200 rounded-lg p-4 flex gap-4 transition-opacity ${
                                removingId === item.id ? 'opacity-50' : 'opacity-100'
                            }`}
                        >
                            <div className="shrink-0">
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
                                            onClick={() => handleRemoveItem(item.id)}
                                            disabled={removingId === item.id}
                                            className="text-red-500 text-2xl font-bold hover:text-red-700 hover:scale-110 transition-all disabled:opacity-50"
                                            title="Remove item"
                                        >
                                            {removingId === item.id ? '...' : '✕'}
                                        </button>
                                    ) : (
                                        <div></div>
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
                    <p className="text-gray-500">Your cart is empty</p>
                </div>
            )}
        </div>
    )
}

export default Cart