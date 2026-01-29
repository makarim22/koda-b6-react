import { ProductCard } from "./ProductCard";
export const ProductGrid = ({ products, columns = 2 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={() => console.log(`Added ${product.title} to cart`)}
        />
      ))}
    </div>
  );
};