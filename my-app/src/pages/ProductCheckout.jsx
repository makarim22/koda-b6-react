import Header from '../layouts/Header';
import Footer from '../layouts/Footer'; 
import PaymentInfo from '../component/PaymentInfo';
import Cart from '../component/Cart';
function ProductCheckout() {
  return (
    <div>
      <Header /> 
      <div className='flex flex-row'>
        <Cart />
        <PaymentInfo />
      </div>
      <Footer />
      
    </div>
  )
}

export default ProductCheckout;