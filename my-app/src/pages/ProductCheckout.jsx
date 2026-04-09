import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
import Invoice from '../component/Invoice';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import CartCtx from '../context/CartContext'


function ProductCheckout() {

  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [deliveryMethod, setDeliveryMethod] = useState('dine-in');
  
  const { items, fetchCartFromAPI } = useContext(CartCtx);
  console.log('items from context', items)

  const getActiveUser = () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem('currentUserSession'))
      console.log('active user', activeUser)
      return activeUser
    } catch (error) {
      console.warn("tidak bisa mengambil data user", error)
      return null
    }
  }

  useEffect(() => {
    const userData = getActiveUser();
    if (userData) {
      setUser(userData);
    } else {
      console.warn('No active user session found');
    }
  }, []);

  useEffect(() => {
    if (user?.user?.token) {
      setLoading(true);
      fetchCartFromAPI(user.user.token).then(() => {
        setLoading(false);
      });
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

    let totalItemPrice = 0
    items.forEach(cart => {
      const price = parseInt(cart.price || 0)
      const quantity = cart.quantity || 1
      totalItemPrice += price * quantity
    });

    console.log("total item price", totalItemPrice)

    let delivery = 0;
    if (deliveryMethod === 'door-delivery' && items.length > 0) {
      delivery = 5000;
    } else if (deliveryMethod === 'dine-in' || deliveryMethod === 'pick-up') {
      delivery = 0;
    }

    console.log('delivery', delivery)

    const tax = Math.round(totalItemPrice * 0.1);

    console.log('tax', tax)

    let subtotal = 0
    if (items.length > 0){
      console.log("panjangnyaa", items.length)
      subtotal = totalItemPrice + delivery + tax;
    }

    return {
      order: `IDR ${totalItemPrice.toLocaleString('id-ID')}`,
      delivery: `IDR ${delivery.toLocaleString('id-ID')}`,
      tax: `IDR ${tax.toLocaleString('id-ID')}`,
      subtotal: `IDR ${subtotal.toLocaleString('id-ID')}`,
      image: items.image,
      shipping: deliveryMethod,
      payment: 'cash',
      cartHistory : items
    };
  };

  const payment = calculatePayment();

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  if (loading) {
    return (
      <div className='flex flex-col h-screen'>
        <Header bgColor="bg-black" />
        <div className='flex items-center justify-center flex-1'>
          <p className='text-lg'>Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header bgColor="bg-black" />
      
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-2 gap-4 pt-25'>
        <div className='flex flex-col'>
          <h1 className='p-6 text-3xl'>Payment Details</h1>
          <Cart />
          <PaymentInfo 
            onDeliveryMethodChange={handleDeliveryMethodChange}
            selectedDeliveryMethod={deliveryMethod}
            user={user}
          />
        </div>
        <div className='flex flex-col pt-30'>
          <Invoice paymentDetails={payment} cartItems={items} user = {user} />
        </div> 
      </div>

      <Footer />
    </div>
  )
}

export default ProductCheckout;