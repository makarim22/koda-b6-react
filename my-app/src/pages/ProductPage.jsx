import { PromoSection } from '../component/PromoSection';
import { ProductGrid } from '../component/ProductGrid';
import { FilterSidebar } from '../component/FIlterSidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Woman from '../assets/icons/productPage/coupon1.png';
import Man from '../assets/icons/productPage/coupon2.png';
import { useState, useEffect } from 'react'
import glasses from '../assets/icons/glasses.png'
import http from '../lib/http'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 6;

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    sort: null,
    priceRange: [0, 100000],
    searchQuery: '',
  });

  // Fetch all products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await http('/api/products');
      const { data } = await res.json();

      console.log("data", data);

      const mappedProducts = data
        .filter(product => product.images && product.images.length > 0)
        .map((product) => ({
          id: product.id,
          image: product.images[0].path,
          title: product.product_name,
          price: `IDR ${product.base_price.toLocaleString('id-ID')}`,
          originalPrice: `IDR ${Math.ceil(product.base_price * 1.15).toLocaleString('id-ID')}`,
          description: product.description,
          rating: Math.floor(Math.random() * 2) + 4,
          reviews: 0,
          isFlashSale: Math.random() > 0.3,
        }));

      setAllProducts(mappedProducts);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleApplyFilters(filters) {
    setAppliedFilters(filters);
    setCurrentPage(1); // reset to first page on filter change
  }

  function handleResetFilters() {
    setAppliedFilters({
      categories: [],
      sort: null,
      priceRange: [0, 100000],
      searchQuery: '',
    });
    setCurrentPage(1);
  }

  function getFilteredProducts() {
    let currentProducts = [...allProducts];

    // Search filter
    if (appliedFilters.searchQuery) {
      const lowerCaseSearch = appliedFilters.searchQuery.toLowerCase();
      currentProducts = currentProducts.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearch) ||
        product.description.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Category filter
    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      currentProducts = currentProducts.filter(product =>
        appliedFilters.categories.includes(product.categoryId)
      );
    }

    // Price range filter
    currentProducts = currentProducts.filter(product => {
      const price = parseInt(product.price.replace(/[^\d]/g, ''));
      return price >= appliedFilters.priceRange[0] && price <= appliedFilters.priceRange[1];
    });

    // Sorting
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

  // --- Pagination ---
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const delta = 2;
    const pages = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

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
      <Header bgColor="bg-black" />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-cover bg-center h-64 flex items-center justify-center"
          style={{ backgroundImage: `url(${glasses})` }}>
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
                {/* Pass only the current page's slice — qty prop removed since we slice manually */}
                <ProductGrid products={paginatedProducts} columns={2} qty={paginatedProducts.length} />

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <>
                    <div className="flex justify-center items-center gap-2 mt-8">
                      {/* Prev */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {/* Page numbers */}
                      {getPageNumbers().map((page, i) =>
                        page === '...' ? (
                          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-500 select-none text-sm">
                            …
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded-full text-sm font-semibold transition ${
                              currentPage === page
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      {/* Next */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Page info */}
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                    </p>
                  </>
                )}
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