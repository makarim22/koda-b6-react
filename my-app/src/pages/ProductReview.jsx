import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductGallery from "../component/ProductGallery";
import ProductOptions from "../component/ProductOptions";
import { ProductGrid } from "../component/ProductGrid";
import { findProductById, getRecommendedProducts } from '../utils/product';

function ProductReview() {
  const { productId } = useParams();
  console.log("idnyaa", productId);

  const thumbnails = [
    "./src/assets/icons/productPage/americano.jfif",
    "./src/assets/icons/productPage/espresso.jfif",
    "./src/assets/icons/productPage/flat-white.jfif",
  ];

  const selectedProduct = useMemo(() => {
    return findProductById(productId);
  }, [productId]);

  const productsData = useMemo(() => {
    return getRecommendedProducts(productId);
  }, [productId]);

  if (!selectedProduct) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header bgColor="bg-black" />
        <div className="grow flex items-center justify-center text-xl text-gray-600">
          Loading product details...
        </div>
        <Footer />
      </div>
    );
  }

  const images = [selectedProduct.image];

  return (
    <div>
      <Header bgColor="bg-black" />
      <section className="grid grid-cols-2 pt-16"> 
        <div className="w-full max-w-2xl mx-auto p-8 bg-white">
          <ProductGallery images={images} thumbnails={thumbnails} />
        </div>
        <div>
          <ProductOptions props={selectedProduct} />
        </div>
      </section>
      <section className="px-4">
        <h1 className="text-4xl font-bold text-left mt-8 mb-4">Recommended for you</h1>
        <ProductGrid products={productsData} columns={3} />
      </section>

      <Footer />
    </div>
  );
}

export default ProductReview;