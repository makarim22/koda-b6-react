import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
import Invoice from '../component/Invoice';
function ProductCheckout() {
  const products = [
    {
      id: 1,
      name: 'Hazelnut Latte',
      quantity: 2,
      size: 'Regular',
      temperature: 'Hot',
      originalPrice: 'IDR 15.000',
      price: 'IDR 18.000',
      isFlashSale: true
    },
    {
      id: 2,
      name: 'Latte',
      quantity: 1,
      size: 'Medium',
      temperature: 'Ice',
      originalPrice: 'IDR 15.000',
      price: 'IDR 18.000',
      isFlashSale: true
    }
  ];

  const payment = {
    order : 'IDR 50.000',
    delivery : 'IDR 5.000',
    tax : 'IDR 1.000',
    subtotal : 'IDR 56.000'
  };


  return (
    <div>
      <Header /> 
      <div className='flex flex-row'>
        <Cart items={products} />
        <PaymentInfo />
      </div>
      <div>
        <Invoice paymentDetails={payment} />
      </div>
      <Footer />
      
    </div>
  )
}

export default ProductCheckout;