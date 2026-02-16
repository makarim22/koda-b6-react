import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
import Invoice from '../component/Invoice';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductCheckout() {
  const {productId} = useParams();
  console.log("idnyaa", productId);

  const [isRemoveShowed] = useState(true)
  const [showAddMenu] = useState(true)
  const [user, setUser]= useState('')

  const [deliveryMethod, setDeliveryMethod] = useState('dine-in');

    const [cartItems, setCartItems] = useState([]);
    console.log('cartItems', cartItems)

    function getCartFromLocalStorage() {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error reading cart from localStorage:', error);
            return [];
        }
    }

     const getActiveUser = () => {
      try{
     const activeUser = JSON.parse(localStorage.getItem('currentUserSession'))
     console.log('active user', activeUser)
     return activeUser
      } catch (error){
        console.warn("tidak bisa mengabil data user", error)
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
        const cartLoad = getCartFromLocalStorage();
        console.log("data Cart:", cartLoad);
        
        
        setCartItems(cartLoad);
        
    }, []);

    function saveCartToLocalStorage(updatedCart) {
        try {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            console.log('Tidak dapat menyimpan ke localstorage:', updatedCart);
        } catch (error) {
            console.error('Error menyimpan keranjang ke localstorage:', error);
        }
    }


        function handleRemoveItem(arrayIndex) {
      
        const updatedCart = cartItems.filter((item, idx) => idx !== arrayIndex);
        
        setCartItems(updatedCart);
        
        saveCartToLocalStorage(updatedCart);
    }

    const calculatePayment = () => {
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return {
        order: 'IDR 0',
        delivery: 'IDR 0',
        tax: 'IDR 0',
        subtotal: 'IDR 0',
        status: 'On Progress'
      };
    }

    let totalItemPrice = 0
    cartItems.forEach(cart => {
      const price = parseInt(cart.price?.replace(/\D/g, '') || 0)
      const quantity = cart.quantity || 1
      totalItemPrice += price * quantity
    });

    console.log("total item price", totalItemPrice)

    let delivery = 0;
    if (deliveryMethod === 'door-delivery' && cartItems.length > 0) {
      delivery = 5000;
    } else if (deliveryMethod === 'dine-in' || deliveryMethod === 'pick-up') {
      delivery = 0;
    }

    console.log('delivery', delivery)

    const tax = Math.round(totalItemPrice * 0.1); 

    console.log('tax', tax)

    let subtotal = 0
    if (cartItems.length > 0){
      console.log("panjangnyaa", cartItems.length)
      subtotal = totalItemPrice + delivery + tax;
    }


    return {
      order: `IDR ${totalItemPrice.toLocaleString('id-ID')}`,
      delivery: `IDR ${delivery.toLocaleString('id-ID')}`,
      tax: `IDR ${tax.toLocaleString('id-ID')}`,
      subtotal: `IDR ${subtotal.toLocaleString('id-ID')}`,
      image: cartItems.image,
      shipping: deliveryMethod,
      payment: 'cash',
      cartHistory : cartItems
    };
  };

  const payment = calculatePayment();

  console.log('paymentnya', payment)

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  return (
    <div className='flex flex-col h-screen '>
      <Header bgColor="bg-black" /> 
      <div className='grid grid-cols-2 gap-4 pt-25'>
        <div className='flex flex-col'>
          <h1 className='p-6 text-3xl'>Payment Details</h1>
        <Cart 
        items={cartItems}
         onRemoveItem={handleRemoveItem}
         isRemoveShowed={isRemoveShowed} 
         showAddMenu={showAddMenu}/>
         <PaymentInfo 
                onDeliveryMethodChange={handleDeliveryMethodChange}
                selectedDeliveryMethod={deliveryMethod}
                user= {user}
              />
      </div>
      <div className='flex flex-col pt-30 '>
        <Invoice paymentDetails={payment} cartItems={cartItems}/>
      </div>

      </div>
    
      <Footer />
      
    </div>
  )
}

export default ProductCheckout;