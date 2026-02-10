import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
import Invoice from '../component/Invoice';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function ProductCheckout() {
  const {productId} = useParams();
  console.log("idnyaa", productId);

  
  const [deliveryMethod, setDeliveryMethod] = useState('dine-in');

  const getCartfromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const cartItems = getCartfromLocalStorage();
  console.log("cartItems", cartItems);

    const calculatePayment = () => {
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return {
        order: 'IDR 0',
        delivery: 'IDR 5.000',
        tax: 'IDR 0',
        subtotal: 'IDR 5.000',
        status: 'On Progress'
      };
    }

    let totalItemPrice = 0
    cartItems.forEach(cart => {
      const price = parseInt(cart.price?.replace(/\D/g, '') || 0)
      const quantity = cart.quantity || 1
      totalItemPrice += price * quantity
    });
    // const price = parseInt(cartItems.price?.replace(/\D/g, '') || 0);
    // const quantity = cartItems.quantity || 1;
    // console.log('quantity', quantity);
    // console.log('price', price);
    
    // const orderTotal = price * quantity;
    

    let delivery = 0;
    if (deliveryMethod === 'door-delivery') {
      delivery = 5000;
    } else if (deliveryMethod === 'dine-in' || deliveryMethod === 'pick-up') {
      delivery = 0;
    }

    const tax = Math.round(totalItemPrice * 0.1); 
    const subtotal = totalItemPrice + delivery + tax;

    return {
      order: `IDR ${totalItemPrice.toLocaleString('id-ID')}`,
      delivery: `IDR ${delivery.toLocaleString('id-ID')}`,
      tax: `IDR ${tax.toLocaleString('id-ID')}`,
      subtotal: `IDR ${subtotal.toLocaleString('id-ID')}`,
      image: cartItems.image,
      cartHistory : cartItems
    };
  };

  const payment = calculatePayment();

  //  const handlePaymentFormChange = (formData) => {
  //   setPaymentFormData(formData);
  //   console.log("Payment Form Data:", formData);
  // };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  return (
    <div className='flex flex-col h-screen '>
      <Header bgColor="bg-black" /> 
      <div className='grid grid-cols-2 gap-4 pt-25'>
        <div className='flex flex-col'>
          <h1 className='p-6 text-3xl'>Payment Details</h1>
        <Cart items={cartItems} />
         <PaymentInfo 
                onDeliveryMethodChange={handleDeliveryMethodChange}
                // onFormDataChange={handlePaymentFormChange}
                selectedDeliveryMethod={deliveryMethod}
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