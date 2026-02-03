import { ProductCard } from "./ProductCard";
export const ProductGrid = ({ 
  products, 
  columns = 2,
  showRating = true,
  showOriginalPrice = true 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} lg:grid-cols-${columns} gap-6`}>
      {products.slice(0, columns).map((product) => (
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