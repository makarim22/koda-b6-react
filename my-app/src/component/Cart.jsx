import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCtx from '../context/CartContext';
import { ShoppingBag, X } from 'lucide-react';

function Cart() {
  const navigate = useNavigate();
  const [arrayItems, setArrayItems] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  const { items, removeFromCart, isRemoveShowed, showAddMenu } = useContext(CartCtx);

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
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
      <div className="flex flex-row justify-between items-center mb-6"> 
        <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
          <ShoppingBag size={20} className="text-orange-500" />
          Order Items
        </h2>
        {showAddMenu && (
          <button
            className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors bg-orange-50 px-3 py-1.5 rounded-lg"
          >
            + Add Menu
          </button>
        )}
      </div>
      
      {arrayItems.length > 0 ? (
        <div className="space-y-4">
          {arrayItems.map((item) => (
            <div 
              key={item.id} 
              className={`border border-slate-200 bg-white shadow-sm rounded-xl p-4 flex gap-4 transition-all ${
                removingId === item.id ? 'opacity-50 scale-95' : 'opacity-100'
              }`}
            >
              <div className="shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-slate-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/seed/cart-${item.id}/96/96`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="pr-4">
                    <h4 className="text-base md:text-lg font-semibold text-zinc-900 truncate">
                      {item.name}
                    </h4>
                  </div>
                  {isRemoveShowed && (
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={removingId === item.id}
                      className="text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-50 shrink-0 p-1 bg-slate-50 rounded-md hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <p className="text-xs text-zinc-500 mb-3 truncate">
                  {item.quantity}x • {item.size} • {item.temperature}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-orange-400 font-bold text-sm md:text-base">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <ShoppingBag size={32} className="text-zinc-400 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm font-medium">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;