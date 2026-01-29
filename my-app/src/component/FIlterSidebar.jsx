import { useState } from "react";
export const FilterSidebar = ({ 
  categories, 
  sortOptions, 
  onCategoryChange, 
  onSortChange,
  onPriceChange 
}) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);

  return (
    <div className="bg-black text-white rounded-lg p-6 w-full md:w-64">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Your Product"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onChange={() => onCategoryChange(cat.id)}
                className="w-4 h-4"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((sort) => (
            <label key={sort.id} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="sort"
                onChange={() => onSortChange(sort.id)}
                className="w-4 h-4"
              />
              {sort.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-3">Range Price</h3>
        <input
          type="range"
          min="0"
          max="100000"
          value={priceRange[1]}
          onChange={(e) => {
            setPriceRange([0, parseInt(e.target.value)]);
            onPriceChange(priceRange);
          }}
          className="w-full"
        />
        <div className="text-xs text-gray-600 mt-2">
          IDR 0 - IDR {priceRange[1].toLocaleString()}
        </div>
      </div>

      <button className="w-full bg-orange-500 text-white py-2 rounded font-medium text-sm">
        Apply Filter
      </button>
    </div>
  );
};