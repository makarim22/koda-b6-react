import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export const FilterSidebar = ({
  categories,
  sortOptions,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [localSelectedCategories, setLocalSelectedCategories] = useState([]);
  const [localSelectedSort, setLocalSelectedSort] = useState(null);
  const [localPriceRange, setLocalPriceRange] = useState([0, 100000]);

  // Apply filters automatically when local state changes
  useEffect(() => {
    onApplyFilters({
      searchQuery: localSearchQuery,
      categories: localSelectedCategories,
      sort: localSelectedSort,
      priceRange: localPriceRange,
    });
  }, [localSearchQuery, localSelectedCategories, localSelectedSort, localPriceRange]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCategoryChange(categoryId) {
    if (localSelectedCategories.includes(categoryId)) {
      setLocalSelectedCategories(
        localSelectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setLocalSelectedCategories([...localSelectedCategories, categoryId]);
    }
  }

  function handleSortChange(sortId) {
    if (localSelectedSort === sortId) {
      setLocalSelectedSort(null);
    } else {
      setLocalSelectedSort(sortId);
    }
  }

  function handlePriceChange(e) {
    const newMaxPrice = parseInt(e.target.value, 10);
    setLocalPriceRange([0, newMaxPrice]);
  }

  function handleSearchInputChange(e) {
    setLocalSearchQuery(e.target.value);
  }

  function handleResetAllFilters() {
    setLocalSearchQuery('');
    setLocalSelectedCategories([]);
    setLocalSelectedSort(null);
    setLocalPriceRange([0, 100000]);
    onResetFilters();
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full lg:w-72 h-fit lg:sticky lg:top-24 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <h2 className="font-extrabold text-xl text-zinc-950 tracking-tight">Filters</h2>
        <button
          onClick={handleResetAllFilters}
          className="font-bold text-sm text-orange-500 hover:text-orange-600 transition-colors"
        >
          Reset All
        </button>
      </div>
      
      <div className="mb-8">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search size={16} className="text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={handleSearchInputChange}
            className="w-full bg-slate-50 border border-slate-200 text-zinc-950 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all placeholder:text-zinc-400 font-medium"
          />
        </div>
      </div>

      {categories && categories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Category</h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 text-sm font-medium text-zinc-700 cursor-pointer hover:text-zinc-950 group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={localSelectedCategories.includes(cat.id)}
                    onChange={() => handleCategoryChange(cat.id)}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="transition-colors">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {sortOptions && sortOptions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Sort By</h3>
          <div className="space-y-3">
            {sortOptions.map((sort) => (
              <label
                key={sort.id}
                className="flex items-center gap-3 text-sm font-medium text-zinc-700 cursor-pointer hover:text-zinc-950 group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="sort"
                    checked={localSelectedSort === sort.id}
                    onChange={() => handleSortChange(sort.id)}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all cursor-pointer"
                  />
                  <div className="absolute w-2.5 h-2.5 bg-orange-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="transition-colors">{sort.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mb-2">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Max Price</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={localPriceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 font-medium tracking-widest uppercase">IDR 0</span>
            <span className="text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-md tracking-widest uppercase">
              IDR {localPriceRange[1].toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};