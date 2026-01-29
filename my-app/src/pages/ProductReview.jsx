import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductGallery from "../component/ProductGallery";
import ProductOptions from "../component/ProductOptions";

function ProductReview() {
  const images = [
    "./src/assets/icons/productPage/affogato.jfif",
    "./src/assets/icons/productPage/affogato.jfif",
    "./src/assets/icons/productPage/affogato.jfif",
    "./src/assets/icons/productPage/affogato.jfif",
  ];

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

  return (
    <div>
      <Header bgColor="bg-black" />
      <section className="grid grid-cols-2 pt-16"> 
      <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <ProductGallery images={images} />
      </div>
      <div>
        <ProductOptions props={orderItems[0]}
        />
      </div>
      </section>
    

      <Footer />
    </div>
  );
}

export default ProductReview;
