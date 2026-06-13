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
import { Button } from '../component/Button';

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

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await http('/api/products');
      const { data } = await res.json();

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
    setCurrentPage(1); 
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

    if (appliedFilters.searchQuery) {
      const lowerCaseSearch = appliedFilters.searchQuery.toLowerCase();
      currentProducts = currentProducts.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearch) ||
        product.description.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      currentProducts = currentProducts.filter(product =>
        product.categoryIds && product.categoryIds.some(id => appliedFilters.categories.includes(id))
      );
    }

    currentProducts = currentProducts.filter(product => {
      return product.basePrice >= appliedFilters.priceRange[0] && product.basePrice <= appliedFilters.priceRange[1];
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
          currentProducts.sort((a, b) => a.basePrice - b.basePrice);
          break;
        default:
          break;
      }
    }

    return currentProducts;
  }

  const filteredProducts = getFilteredProducts();
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
    <div className="min-h-screen bg-slate-50">
      <Header bgColor="bg-zinc-950" />

      {/* Page Hero — clean, text-only */}
      <div className="bg-zinc-950 pt-32 pb-16 px-6 md:px-8 shadow-sm isolate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4">Explore Our Menu</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
            Our <span className="text-orange-400">Products</span>
          </h1>
          <p className="text-zinc-400 text-lg mt-4 font-medium max-w-xl">
            {allProducts.length > 0 ? `Discover ${filteredProducts.length} premium crafted items available.` : "Exploring our menu..."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        {/* Promo carousel */}
        <div className="mb-12">
          <PromoSection promos={promoData} />
        </div>

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tighter">
            All <span className="text-orange-500">Products</span>
          </h2>
          {filteredProducts.length > 0 && (
            <span className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mt-2 sm:mt-0">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filter sidebar */}
          <div className="w-full lg:w-72 shrink-0">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                    <div className="bg-slate-200 h-56 w-full" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-5 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-zinc-500 text-lg mb-4 font-medium">{error}</p>
                <Button onClick={fetchProducts} variant="primary">
                  Try Again
                </Button>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-2xl font-extrabold text-zinc-950 tracking-tighter mb-2">No products found</p>
                <p className="text-base text-zinc-500 mb-8 max-w-sm">Try adjusting your filters or search query to find what you're looking for.</p>
                <Button onClick={handleResetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <ProductGrid products={paginatedProducts} columns={3} qty={paginatedProducts.length} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-zinc-400 font-bold tracking-widest select-none">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                          currentPage === page
                            ? "bg-zinc-950 text-white shadow-md"
                            : "text-zinc-600 hover:bg-slate-50 hover:text-zinc-950"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
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