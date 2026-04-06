import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductGallery from "../component/ProductGallery";
import ProductOptions from "../component/ProductOptions";
import { ProductGrid } from "../component/ProductGrid";
import { getRecommendedProducts } from "../utils/product";

import americano from "./../assets/icons/productPage/americano.jfif";
import espresso from "./../assets/icons/productPage/espresso.jfif";
import flatWhite from "./../assets/icons/productPage/flat-white.jfif";
import http from "../lib/http";

function ProductReview() {
  const { productId } = useParams();
  console.log("product id nyaa", productId);
  const [products, setProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  console.log("idnyaa", productId);

  const fetchProducts = async () => {
    try {
      const res = await http(`/admin/products/${productId}`);
      const { data } = await res.json();
      console.log("data", data);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductVariants = async () => {
    try {
      const res = await http(`/admin/products/${productId}/variants`);
      const { data } = await res.json();
      console.log("variant", data);
      setProductVariants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductSizes = async () => {
    try {
      const res = await http(`/admin/products/${productId}/sizes`);
      const { data } = await res.json();
      console.log("sizes", data);
      setProductSizes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!productId) return; 

    fetchProducts();
    fetchProductVariants();
    fetchProductSizes();
  }, [productId]); 

  const thumbnails = [americano, espresso, flatWhite];

  const selectedProduct = useMemo(() => {
    return products; 
  }, [products]);


  const productsData = useMemo(() => {
    return getRecommendedProducts(productId);
  }, [productId]);

  const getActiveUser = () => {
    const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
    console.log("active user", activeUser);
    return activeUser;
  };

  const user = getActiveUser();

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

  console.log("selectedProducts", selectedProduct);
  return (
    <div>
      <Header bgColor="bg-black" />
      <section className="grid grid-cols-2 pt-16">
        <div className="w-full max-w-2xl mx-auto p-8 bg-white">
          <ProductGallery images={images} thumbnails={thumbnails} />
        </div>
        <div>
          <ProductOptions 
           props={selectedProduct}
           user={user}
           productSizes={productSizes}
           productVariants={productVariants} />
        </div>
      </section>
      <section className="px-4">
        <h1 className="text-4xl font-bold text-left mt-8 mb-4">
          Recommended for you
        </h1>
        <ProductGrid products={productsData} columns={3} qty={3} />
      </section>

      <Footer />
    </div>
  );
}

export default ProductReview;
