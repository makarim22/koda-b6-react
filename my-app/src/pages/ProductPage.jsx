import { PromoSection } from '../component/PromoSection';
import { ProductGrid } from '../component/ProductGrid';
import { FilterSidebar } from '../component/FIlterSidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Woman from '../assets/icons/productPage/coupon1.png';
import Man from '../assets/icons/productPage/coupon2.png';
import { useState } from 'react'

 const ProductPage = () => {

   const productsData = [
  {
    id: 1,
    image: './src/assets/icons/productPage/espresso.jfif',
    title: 'Espresso', 
    price: 'IDR 15.000', 
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
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
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
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
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
    originalPrice: 'IDR 24.000',
    rating: 4,
    reviews: 0,
    isFlashSale: true,
  },
  {
    id: 4,
    image: './src/assets/icons/productPage/americano.jfif',
    title: 'Americano',
    price: 'IDR 12.000', 
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
    originalPrice: 'IDR 15.000', 
    rating: 4,
    reviews: 0,
    isFlashSale: false,
  },
  {
    id: 5,
    image: './src/assets/icons/productPage/flat-white.jfif',
    title: 'Flat White',
    price: 'IDR 20.000',
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
    originalPrice: 'IDR 23.000',
    rating: 4,
    reviews: 0,
    isFlashSale: true,
  },
  {
    id: 6,
    image: './src/assets/icons/productPage/affogato.jfif',
    title: 'Affogato',
    price: 'IDR 25.000',
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
    originalPrice: 'IDR 30.000',
    rating: 5,
    reviews: 0,
    isFlashSale: false,
  },
];

    const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    sort: null,
    priceRange: [0, 100000],
    searchQuery: '',
  });


  function handleApplyFilters(filters) {
    setAppliedFilters(filters);
  }

  function handleResetFilters() {
    setAppliedFilters({
      categories: [],
      sort: null,
      priceRange: [0, 100000],
      searchQuery: '',
    });
  }

    function getFilteredProducts() {
    let currentProducts = [...productsData];

    if (appliedFilters.searchQuery) {
      const lowerCaseSearch = appliedFilters.searchQuery.toLowerCase();
      currentProducts = currentProducts.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearch) ||
        product.description.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      currentProducts = currentProducts.filter(product =>
        appliedFilters.categories.includes(product.categoryId)
      );
    }

    currentProducts = currentProducts.filter(product => {
      const price = parseInt(product.price.replace(/[^\d]/g, ''));
      return price >= appliedFilters.priceRange[0] && price <= appliedFilters.priceRange[1];
    });

    if (appliedFilters.sort) {
      switch (appliedFilters.sort) {
        case 1: 
          currentProducts.sort((a, b) => {
            if (a.isBuy1Get1 === b.isBuy1Get1) return 0;
            return a.isBuy1Get1 ? -1 : 1;
          });
          break;
        case 2: 
          currentProducts.sort((a, b) => {
            if (a.isFlashSale === b.isFlashSale) return 0;
            return a.isFlashSale ? -1 : 1;
          });
          break;
        case 3: 
          currentProducts.sort((a, b) => {
            if (a.isBirthdayPackage === b.isBirthdayPackage) return 0;
            return a.isBirthdayPackage ? -1 : 1;
          });
          break;
        case 4: 
          currentProducts.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
            const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
            return priceA - priceB;
          });
          break;
        default:
          break;
      }
    }

    return currentProducts;
  }
  
   const filteredProducts = getFilteredProducts();
   console.log("filtered products", filteredProducts)

  const promoData = [
    {
      icon: Woman,
      title: 'HAPPY MOTHER\'S DAY',
      description: 'Get up to 50% off on selected items',
      bgColor: 'bg-emerald-500',
    },
    {
      icon: Woman,
      title: 'HAPPY MOTHER\'S DAY',
      description: 'Get up to 50% off on selected items',
      bgColor: 'bg-emerald-500',
    },
     {
      icon: Woman,
      title: 'HAPPY MOTHER\'S DAY',
      description: 'Get up to 50% off on selected items',
      bgColor: 'bg-emerald-500',
    },
    {
      icon: Woman,
      title: 'HAPPY MOTHER\'S DAY',
      description: 'Get up to 50% off on selected items',
      bgColor: 'bg-emerald-500',
    },
    {
      icon: Man,
      title: 'HAPPY COFFEE DAY',
      description: 'Free drink on saturday morning',
      bgColor: 'bg-amber-400',
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
    { id: 1, name: 'Buy 1 get 1' },
    { id: 2, name: 'Flash sale' },
    { id: 3, name: 'Birthday Package' },
    { id: 4, name: 'Cheap' },
  ];

  return (
    <>
    <Header bgColor="bg-black"/>
    <div className="min-h-screen bg-gray-50">
      <div className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: 'url(./src/assets/icons/glasses.png)' }}>
        <h1 className="text-4xl font-bold text-white text-center">
          We Provide Good Coffee and Healthy Meals
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <PromoSection promos={promoData} />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Our <span className="text-yellow-800">Product</span>
          </h2>

          <div className="flex flex-col md:flex-row lg:flex-row gap-6">
            <div className="w-full md:w-64 shrink-0">
              <FilterSidebar
                categories={categories}
                sortOptions={sortOptions}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </div>
            
          
              
            <div className="flex-1">
              <ProductGrid products={filteredProducts} columns={2} qty={6}/>
             
          
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