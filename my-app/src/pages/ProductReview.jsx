import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductGallery from "../component/ProductGallery";
import ProductOptions from "../component/ProductOptions";
import { ProductGrid } from "../component/ProductGrid";

function ProductReview() {
  const images = [
    "./src/assets/icons/productPage/affogato.jfif",
  ];

  const thumbnails = [
        "./src/assets/icons/productPage/americano.jfif",
    "./src/assets/icons/productPage/espresso.jfif",
    "./src/assets/icons/productPage/flat-white.jfif",
  ]

  const orderItems =[
    {
        title: "Affogato",
        quantity: 1,
        price: "IDR 15.000",
        originalPrice: "IDR 20.000",
        description: "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.",
        isFlashSale: true,
        size: "Small",
        temperature: "Hot",
        
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
  },
  {
    id: 3,
    image: './src/assets/icons/productPage/mocha.jfif',
    title: 'Mocha',
    price: 'IDR 21.000',
    originalPrice: 'IDR 24.000',
    rating: 4,
    reviews: 0,
    isFlashSale: true,
  }
];


  return (
    <div>
      <Header bgColor="bg-black" />
      <section className="grid grid-cols-2 pt-16"> 
      <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <ProductGallery images={images} thumbnails={thumbnails} />
      </div>
      <div>
        <ProductOptions props={orderItems[0]}
        />
      </div>
      </section>
      <section>
        <h1 className="text-4xl font-bold text-left mt-8 mb-4">Recommended for you</h1>
        <ProductGrid products={productsData} columns={3} />
      </section>
    

      <Footer />
    </div>
  );
}

export default ProductReview;
