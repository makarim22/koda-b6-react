import { useState } from 'react';

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
    const value = e.target.value
    console.log("value", value)
    setLocalSearchQuery(e.target.value);
  }

  function handleApplyFilter() {
    onApplyFilters({
      searchQuery: localSearchQuery,
      categories: localSelectedCategories,
      sort: localSelectedSort,
      priceRange: localPriceRange,
    });
  }

  function handleResetAllFilters() {
    setLocalSearchQuery('');
    setLocalSelectedCategories([]);
    setLocalSelectedSort(null);
    setLocalPriceRange([0, 100000]);
    onResetFilters();
  }

  return (
    <div className="bg-black text-white rounded-lg p-6 w-full md:w-64 h-fit sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Filter</h2>
        <button
          onClick={handleResetAllFilters}
          className="font-bold text-sm text-orange-400 hover:text-orange-500 transition-colors"
        >
          Reset
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">Search</label>
        <input
          type="text"
          placeholder="Search Your Product"
          value={localSearchQuery}
          onChange={handleSearchInputChange}
          className="w-full border bg-white text-black rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-400 transition-colors"
        />
      </div>

      {categories && categories.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-sm mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-400 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={localSelectedCategories.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="w-4 h-4 cursor-pointer accent-orange-400"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {sortOptions && sortOptions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-sm mb-3">Sort By</h3>
          <div className="space-y-2">
            {sortOptions.map((sort) => (
              <label
                key={sort.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-400 transition-colors"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={localSelectedSort === sort.id}
                  onChange={() => handleSortChange(sort.id)}
                  className="w-4 h-4 cursor-pointer accent-orange-400"
                />
                <span>{sort.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-3">Range Price</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={localPriceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>IDR 0</span>
            <span className="text-orange-400 font-semibold">
              IDR {localPriceRange[1].toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleApplyFilter}
        className="w-full bg-orange-400 text-black py-2 rounded font-medium text-sm hover:bg-orange-500 transition-colors active:scale-95"
      >
        Apply Filter
      </button>
    </div>
  );
};