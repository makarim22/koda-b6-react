import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductGallery from "../component/ProductGallery";
import ProductOptions from "../component/ProductOptions";
import { ProductGrid } from "../component/ProductGrid";
import { getRecommendedProducts } from "../utils/product";
import ReviewSection from "../component/ReviewSection";
import http from "../lib/http";

function ProductReview() {
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [productVariants, setProductVariants] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await http(`/api/products/${productId}`);
      const { data } = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductVariants = async () => {
    try {
      const res = await http(`/api/products/${productId}/variants`);
      const { data } = await res.json();
      setProductVariants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductSizes = async () => {
    try {
      const res = await http(`/api/products/${productId}/sizes`);
      const { data } = await res.json();
      setProductSizes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductImages = async () => {
    try {
      const response = await http(`/api/products/${productId}/images`);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setThumbnails(data.images || []);
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

  const productsData = useMemo(() => {
    return getRecommendedProducts(productId);
  }, [productId]);

  const getActiveUser = () => {
    try {
      return JSON.parse(localStorage.getItem("currentUserSession"));
    } catch {
      return null;
    }
  };

  const user = getActiveUser();

  if (!products) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <Header bgColor="bg-zinc-950" />
        <div className="flex items-center justify-center flex-1 flex-col gap-3">
          <div className="w-8 h-8 border-2 border-zinc-300 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm font-medium">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header bgColor="bg-zinc-950" />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-8 py-12 md:py-20">
        
        {/* Breadcrumb / Section identifier */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">Product Detail</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 items-start mb-24">
          <div className="w-full">
            <ProductGallery thumbnails={thumbnails} />
          </div>
          <div className="w-full">
            <ProductOptions 
              props={products}
              user={user}
              productSizes={productSizes}
              productVariants={productVariants} 
            />
          </div>
        </section>

        <section className="border-t border-slate-200 pt-16 mb-24">
          <ReviewSection productId={productId} />
        </section>

        <section className="border-t border-slate-200 pt-16 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
              Recommended <span className="text-orange-500">for you</span>
            </h2>
          </div>
          <ProductGrid products={productsData} columns={3} qty={3} />
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default ProductReview;
