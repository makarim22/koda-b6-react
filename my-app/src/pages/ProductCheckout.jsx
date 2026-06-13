import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
import Invoice from '../component/Invoice';
import { useState, useEffect, useContext } from 'react';
import CartCtx from '../context/CartContext';

function ProductCheckout() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [deliveryMethod, setDeliveryMethod] = useState('dine-in');
  const [paymentMethod, setPaymentMethod] = useState('snap');
  
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

  const calculatePayment = () => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        order: 'IDR 0',
        delivery: 'IDR 0',
        tax: 'IDR 0',
        subtotal: 'IDR 0',
        status: 'On Progress'
      };
    }

    let totalItemPrice = 0;
    items.forEach(cart => {
      const price = parseInt(cart.price || 0);
      const quantity = cart.quantity || 1;
      totalItemPrice += price * quantity;
    });

    let delivery = 0;
    if (deliveryMethod === 'door-delivery' && items.length > 0) delivery = 5000;
    
    const tax = Math.round(totalItemPrice * 0.1);
    const subtotal = items.length > 0 ? totalItemPrice + delivery + tax : 0;

    return {
      order: `IDR ${totalItemPrice.toLocaleString('id-ID')}`,
      delivery: `IDR ${delivery.toLocaleString('id-ID')}`,
      tax: `IDR ${tax.toLocaleString('id-ID')}`,
      subtotal: `IDR ${subtotal.toLocaleString('id-ID')}`,
      rawOrder: totalItemPrice,
      rawDelivery: delivery,
      rawTax: tax,
      rawSubtotal: subtotal,
      image: items.image,
      shipping: deliveryMethod,
      payment: 'cash',
      cartHistory : items
    };
  };

  const payment = calculatePayment();

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <Header bgColor="bg-zinc-950" />
        <div className="flex items-center justify-center flex-1 flex-col gap-3">
          <div className="w-8 h-8 border-2 border-zinc-300 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm font-medium">Loading checkout...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header bgColor="bg-zinc-950" />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-8 py-12 md:py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">Checkout</p>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
            Complete your <span className="text-orange-500">Order</span>
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-8 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Cart />
            <PaymentInfo 
              onDeliveryMethodChange={setDeliveryMethod}
              selectedDeliveryMethod={deliveryMethod}
              onPaymentMethodChange={setPaymentMethod}
              user={user}
            />
          </div>
          
          <div className="lg:col-span-1 sticky top-24">
            <Invoice paymentDetails={payment} cartItems={items} user={user} paymentMethod={paymentMethod} />
          </div> 
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductCheckout;