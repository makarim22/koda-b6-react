// pages/ProductPage.jsx
// import { useState } from 'react';
import { PromoSection } from '../component/PromoSection';
import { ProductGrid } from '../component/ProductGrid';
import { FilterSidebar } from '../component/FIlterSidebar';
import { ProductCard } from '../component/ProductCard';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
 const ProductPage = () => {
  // const [filteredProducts, setFilteredProducts] = useState(PRODUCTS_DATA);

  const promoData = [
    {
      icon: '👩',
      title: 'HAPPY MOTHER\'S DAY',
      description: 'Get up to 50% off on selected items',
      bgColor: 'bg-green-100',
    },
    {
      icon: '👩',
      title: 'HAPPY MOTHER\'S DAY',
      description: 'Get up to 50% off on selected items',
      bgColor: 'bg-green-100',
    },
    {
      icon: '☕',
      title: 'HAPPY COFFEE DAY',
      description: 'Free drink on saturday morning',
      bgColor: 'bg-yellow-100',
    },
  ];

  const categories = [
    { id: 1, name: 'Favorite Product' },
    { id: 2, name: 'Coffee' },
    { id: 3, name: 'Non Coffee' },
    { id: 4, name: 'Foods' },
    { id: 5, name: 'Add-On' },
  ];

  const sortOptions = [
    { id: 1, name: 'Buy (get!)' },
    { id: 2, name: 'Flash sale' },
    { id: 3, name: 'Birthday Package' },
    { id: 4, name: 'Cheap' },
  ];

  const productsData = [
    {
      id: 1,
      image: '/images/hazelnut-latte.jpg',
      title: 'Hazelnut Latte',
      price: 'IDR 10.000',
      originalPrice: 'IDR 15.000',
      rating: 5,
      reviews: 50,
      isFlashSale: true,
    },
    // ... more products
  ];

  // const handleCategoryChange = (categoryId) => {
  //   // Filter logic
  // };

  // const handleSortChange = (sortId) => {
  //   // Sort logic
  // };

  // const handlePriceChange = (range) => {
  //   // Price filter logic
  // };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: 'url(/images/banner.jpg)' }}>
        <h1 className="text-4xl font-bold text-white text-center">
          We Provide Good Coffee and Healthy Meals
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Promo Section */}
        <PromoSection promos={promoData} />

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Our <span className="text-orange-500">Product</span>
          </h2>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <FilterSidebar
                categories={categories}
                sortOptions={sortOptions}
                // onCategoryChange={handleCategoryChange}
                // onSortChange={handleSortChange}
                // onPriceChange={handlePriceChange}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid products={productsData} columns={3} />

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <button className="w-8 h-8 rounded-full bg-orange-500 text-white">‹</button>
                <button className="w-8 h-8 rounded-full bg-orange-500 text-white">1</button>
                <button className="w-8 h-8 rounded-full bg-gray-300">2</button>
                <button className="w-8 h-8 rounded-full bg-gray-300">3</button>
                <button className="w-8 h-8 rounded-full bg-orange-500 text-white">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProductPage;