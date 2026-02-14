
import Footer from '../layouts/Footer'
import OrderInformation from '../component/OrderInformation'
import Header from '../layouts/Header'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Cart from '../component/Cart'

function DetailOrder() {
  const { id } = useParams();
  const [isRemoveShowed, setIsRemoveShowed] = useState(true)
  const [showAddMenu, setShowAddMenu] = useState(true)
  console.log("orderIdnyaa", id);
  const [order] = useState(() => {
    const orderData = localStorage.getItem('order');
    
    if (orderData) {
      try {
        const orderInit = JSON.parse(orderData);
        console.log("orderInit", orderInit);
        const order = orderInit.find((order) => order.id === id);
        console.log("orderThis", order);
        setIsRemoveShowed(false)
        setShowAddMenu(false)
        return order;
      } catch (error) {
        console.error('Error parsing order data:', error);
        return null;
      }
    }
    return null;
  });


 console.log("State order:", order);


    const cartHistory = order.cartHistory
    console.log("cart history", cartHistory);
    
 


return (
    <div>
      <Header bgColor="bg-black" />
      <div className='pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-h-screen px-5 md:px-32'>
  
        <div className="col-span-1"> 
          <OrderInformation props={order} /> 
        </div>
        <div className="col-span-1"> 
          <Cart items={cartHistory} isRemoveShowed={isRemoveShowed} showAddMenu={showAddMenu}/>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DetailOrder
