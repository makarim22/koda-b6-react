
import Footer from '../layouts/Footer'
import OrderInformation from '../component/OrderInformation'
import Header from '../layouts/Header'
import { ProductGrid } from '../component/ProductGrid'

function DetailOrder() {
    const orderData = [
        {
   name : "John Doe",
   address: "123 Main St, Anytown, USA",
   paymentMethod: "Credit Card",
   phone: "123-456-7890",
   shipping: "Standard",
   status: "Shipped",
   total: "$100.00",
        }
    ]

     const productsData = [
  {
    id: 1,
    image: './src/assets/icons/productPage/espresso.jfif',
    title: 'Espresso', 
    price: 'IDR 15.000', 
    originalPrice: 'IDR 18.000', 
    rating: 5,
    reviews: 0, 
    isFlashSale: true,
  },
  {
    id: 2,
    image: './src/assets/icons/productPage/latte.jpg',
    title: 'Latte',
    price: 'IDR 19.000',
    originalPrice: 'IDR 22.000',
    rating: 5,
    reviews: 0,
    isFlashSale: true,
  }
];

  return (
    <div>
      <Header bgColor="bg-black" />
      <div className='pt-20 flex flex-row '>
      <OrderInformation props={orderData[0]} />
      <div>
      <ProductGrid products={productsData} columns={1} />
      </div>
      
      </div>
      
      <Footer />
    </div>
  )
}

export default DetailOrder
