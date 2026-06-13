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
        .map((product) => {
          const categoryNames = product.categories ? product.categories.map(c => c.name?.toLowerCase() || '') : [];
          return {
            id: product.id,
            image: product.images && product.images.length > 0 ? product.images[0].path : glasses,
            title: product.product_name,
            basePrice: product.base_price || 0,
            price: `IDR ${(product.base_price || 0).toLocaleString('id-ID')}`,
            originalPrice: `IDR ${Math.ceil((product.base_price || 0) * 1.15).toLocaleString('id-ID')}`,
            description: product.description,
            rating: Math.floor(Math.random() * 2) + 4,
            reviews: 0,
            // Map promo flags based on categories if they exist, otherwise fallback to false (not random anymore)
            isFlashSale: categoryNames.some(name => name.includes('flash sale')),
            isBuy1Get1: categoryNames.some(name => name.includes('buy 1 get 1')),
            isBirthdayPackage: categoryNames.some(name => name.includes('birthday')),
            categoryIds: product.categories ? product.categories.map(c => c.id) : [],
          };
        });

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
        product.categoryIds && product.categoryIds.some(id => appliedFilters.categories.includes(id))
      );
    }

    // Price range filter
    currentProducts = currentProducts.filter(product => {
      return product.basePrice >= appliedFilters.priceRange[0] && product.basePrice <= appliedFilters.priceRange[1];
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
          currentProducts.sort((a, b) => a.basePrice - b.basePrice);
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

  const [categoriesList, setCategoriesList] = useState([
    { id: 1, name: 'Favorite Product' },
    { id: 2, name: 'Coffee' },
    { id: 3, name: 'Non Coffee' },
    { id: 4, name: 'Foods' },
    { id: 5, name: 'Add-On' },
  ]);

  useEffect(() => {
    // Optionally fetch categories from backend
    const fetchCategories = async () => {
      try {
        const res = await http('/api/product-categories');
        if (res.ok) {
          const { data } = await res.json();
          if (data && data.length > 0) {
            setCategoriesList(data.map(c => ({ id: c.id, name: c.name })));
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  const sortOptions = [
    { id: 1, name: 'Buy 1 get 1' },
    { id: 2, name: 'Flash sale' },
    { id: 3, name: 'Birthday Package' },
    { id: 4, name: 'Cheap' },
  ];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Header bgColor="bg-zinc-950" />

      {/* Page Hero — clean, text-only, no blurry image */}
      <div className="bg-zinc-950 pt-28 pb-10 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">Menu</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Our <span className="text-orange-400">Products</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            {allProducts.length > 0 ? `${filteredProducts.length} items available` : "Exploring our menu..."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Promo carousel */}
        <div className="mb-8">
          <PromoSection promos={promoData} />
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            All <span className="text-amber-700">Products</span>
          </h2>
          {filteredProducts.length > 0 && (
            <span className="text-sm text-slate-400">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="w-full md:w-60 shrink-0">
            <FilterSidebar
              categories={categoriesList}
              sortOptions={sortOptions}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Product grid + pagination */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-200 h-48 w-full" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-zinc-400 mb-3">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition"
                >
                  Try Again
                </button>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-lg font-semibold text-zinc-700 mb-1">No products found</p>
                <p className="text-sm text-zinc-400 mb-4">Try adjusting your filters or search query.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 border border-slate-200 text-sm font-medium rounded-lg text-zinc-600 hover:bg-slate-100 transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <ProductGrid products={paginatedProducts} columns={3} qty={paginatedProducts.length} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm select-none">
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 rounded-full text-sm font-semibold transition ${
                          currentPage === page
                            ? "bg-zinc-900 text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                  {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;