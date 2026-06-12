import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ 
  products, 
  columns = 2,
  qty = 1,
  showRating = true,
  showOriginalPrice = true 
}) => {
  // Tailwind needs full class names explicitly defined in the source code to avoid purging
  const lgGridCols = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  const gridClass = lgGridCols[columns] || 'lg:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridClass} gap-6`}>
      {products.slice(0, qty).map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          product={product} 
          onAddToCart={() => console.log(`Added ${product.title} to cart`)}
          showRating={showRating} 
          showOriginalPrice={showOriginalPrice}
        />
      ))}
    </div>
  );
};