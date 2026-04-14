import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductGallery from "../component/ProductGallery";
import ProductOptions from "../component/ProductOptions";
import { ProductGrid } from "../component/ProductGrid";
import { getRecommendedProducts } from "../utils/product";
import http from "../lib/http";

function ProductReview() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);


  const fetchProducts = async () => {
    try {
      const res = await http(`/api/products/${productId}`);
      const { data } = await res.json();
      console.log("data", data);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductVariants = async () => {
    try {
      const res = await http(`/api/products/${productId}/variants`);
      const { data } = await res.json();
      console.log("variant", data);
      setProductVariants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductSizes = async () => {
    try {
      const res = await http(`/api/products/${productId}/sizes`);
      const { data } = await res.json();
      console.log("sizes", data);
      setProductSizes(data);
    } catch (err) {
      console.error(err);
    }
  };

const fetchProductImages = async () => {
  try {
    const response = await http(`/api/products/${productId}/images`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();

    const images = data.images || [];
    
    setThumbnails(images);
    
  } catch (err) {
    console.error(err);
  } 
}

  useEffect(() => {
    if (!productId) return; 

    fetchProducts();
    fetchProductVariants();
    fetchProductSizes();
    fetchProductImages();
  }, [productId]); 

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

  return (
    <div>
      <Header bgColor="bg-black" />
      <section className="grid grid-cols-2 pt-16">
        <div className="w-full max-w-2xl mx-auto p-8 bg-white">
          <ProductGallery thumbnails={thumbnails} />
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
