import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
import Invoice from '../component/Invoice';
function ProductCheckout() {
  const products = [
    {
      id: 1,
      image: './src/assets/icons/productPage/espresso.jfif',
      name: 'Hazelnut Latte',
      quantity: 2,
      size: 'Regular',
      temperature: 'Hot',
      originalPrice: 'IDR 25.000',
      price: 'IDR 18.000',
      isFlashSale: true
    },
    {
      id: 2,
      name: 'Latte',
      image: './src/assets/icons/productPage/latte.jpg',
      quantity: 1,
      size: 'Medium',
      temperature: 'Ice',
      originalPrice: 'IDR 40.000',
      price: 'IDR 20.000',
      isFlashSale: true
    }
  ];

  const payment = {
    order : 'IDR 38.000',
    delivery : 'IDR 5.000',
    tax : 'IDR 1.000',
    subtotal : 'IDR 44.000'
  };


  return (
    <div className='flex flex-col h-screen '>
      <Header bgColor="bg-black" /> 
      <div className='grid grid-cols-2 gap-4 pt-25'>
        <div className='flex flex-col'>
          <h1 className='p-6 text-3xl'>Payment Details</h1>
        <Cart items={products} />
        <PaymentInfo />
      </div>
      <div className='flex flex-col pt-30 '>
        <Invoice paymentDetails={payment} />
      </div>

      </div>
    
      <Footer />
      
    </div>
  )
}

export default ProductCheckout;