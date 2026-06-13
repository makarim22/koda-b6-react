import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import Cart from '../component/Cart';
import { useState, useEffect, useContext } from 'react';
import CartCtx from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '../component/Button';
import { ArrowRight, ShoppingBag } from 'lucide-react';

function CartPage() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { items, fetchCartFromAPI } = useContext(CartCtx);

  const getActiveUser = () => {
    try {
      return JSON.parse(localStorage.getItem('currentUserSession'));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const userData = getActiveUser();
    if (userData) setUser(userData);
  }, []);

  useEffect(() => {
    if (user?.user?.token) {
      setLoading(true);
      fetchCartFromAPI(user.user.token).then(() => setLoading(false));
    }
  }, [user?.user?.token, fetchCartFromAPI]);

  const calculateSubtotal = () => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return 0;
    }

    let totalItemPrice = 0;
    items.forEach(cart => {
      const price = parseInt(cart.price || 0);
      const quantity = cart.quantity || 1;
      totalItemPrice += price * quantity;
    });

    return totalItemPrice;
  };

  const subtotal = calculateSubtotal();

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header bgColor="bg-zinc-950" />
        <div className="flex items-center justify-center flex-1 flex-col gap-4 animate-fade-in-up">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin shadow-sm" />
          <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header bgColor="bg-zinc-950" />
      
      {/* Top Banner Context */}
      <div className="bg-zinc-950 pt-28 pb-10 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex gap-2 text-sm font-medium text-zinc-500">
          <Link to="/" className="hover:text-white cursor-pointer transition-colors">Home</Link>
          <span>/</span>
          <span className="text-orange-400">Your Cart</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 md:py-16">
        <div className="mb-12 border-b border-slate-200 pb-6 animate-fade-in-up">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3">Shopping Cart</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tighter">
            Review your <span className="text-orange-500">Items</span>
          </h1>
        </div>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 flex flex-col gap-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                <Cart />
              </div>
            </div>
            
            <div className="lg:col-span-1 lg:sticky lg:top-28 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="bg-white rounded-3xl shadow-lg shadow-zinc-900/5 border border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-zinc-950 mb-6">Order Summary</h3>
                <div className="space-y-4 text-sm mb-8">
                  <div className="flex justify-between text-zinc-600 font-medium">
                    <span>Subtotal</span>
                    <span>IDR {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-xs">
                    <span>Tax & Delivery calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-6">
                  <Link to="/product-checkout" className="block">
                    <Button variant="primary" className="w-full bg-orange-500 text-white hover:bg-orange-600 border-none shadow-orange-500/20 shadow-lg justify-center py-4 text-sm font-bold">
                      Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div> 
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm animate-fade-in-up">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-zinc-300" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-950 mb-2">Your cart is empty</h3>
            <p className="text-zinc-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your cart yet. Browse our menu to find your perfect cup.</p>
            <Link to="/product">
              <Button variant="primary" className="bg-zinc-950 text-white hover:bg-zinc-800 border-none px-8">
                Explore Menu
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;
