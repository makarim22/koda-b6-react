import React from 'react';
import StarIcon from '../../icons/star.svg';
import productImages from '../../utils/productImages';

const ProductCard = ({ products = [] }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-100 text-gray-800 px-8 md:px-32">
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
            >

              {product.isFlashSale && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  Flash Sale
                </span>
              )}

              {product.image && productImages[product.image] ? (
                <img
                  src={productImages[product.image]}
                  alt={product.name || 'Product Image'} 
                  className="w-full h-48 object-cover object-center"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">{product.name || 'Untitled Product'}</h3>

                {product.rating && product.rating > 0 && (
                  <div className="flex items-center mb-2">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <img key={i} src={StarIcon} alt="Star Rating" className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.rating}.0)</span>
                  </div>
                )}

                {product.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-baseline mb-4">
                  {product.isFlashSale && product.discountedPrice && product.price ? (
                    <> 
                      <p className="text-lg font-bold text-red-600 mr-2">
                        {formatCurrency(product.discountedPrice)}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </p>
                    </>
                  ) : product.price ? (
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(product.price)}
                    </p>
                  ) : ( 
                    <p className="text-md text-gray-500">Price N/A</p>
                  )}
                </div>

                <button className="w-full bg-[#FF8906] text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">No products available.</p>
        )}
      </div>
    </section>
  );
};

export default ProductCard;