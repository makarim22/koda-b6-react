export const getAllProducts = () => [
    {
      id: 1,
      image: "./src/assets/icons/productPage/espresso.jfif",
      title: "Espresso",
      price: "IDR 15.000",
      originalPrice: "IDR 18.000",
      description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
      rating: 5,
      reviews: 0,
      isFlashSale: true,
    },
    {
      id: 2,
      image: "./src/assets/icons/productPage/latte.jpg",
      title: "Latte",
      price: "IDR 19.000",
      originalPrice: "IDR 22.000",
      description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
      rating: 5,
      reviews: 0,
      isFlashSale: true,
    },
    {
      id: 3,
      image: "./src/assets/icons/productPage/mocha.jfif",
      title: "Mocha",
      price: "IDR 21.000",
      originalPrice: "IDR 24.000",
      description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
      rating: 4,
      reviews: 0,
      isFlashSale: true,
    },
    {
      id: 4,
      image: "./src/assets/icons/productPage/americano.jfif",
      title: "Americano",
      price: "IDR 12.000",
      originalPrice: "IDR 15.000",
      description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
      rating: 4,
      reviews: 0,
      isFlashSale: false,
    },
    
  {
    id: 5,
    image: './src/assets/icons/productPage/flat-white.jfif',
    title: 'Flat White',
    price: 'IDR 20.000',
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
    originalPrice: 'IDR 23.000',
    rating: 4,
    reviews: 0,
    isFlashSale: true,
  },
  {
    id: 6,
    image: './src/assets/icons/productPage/affogato.jfif',
    title: 'Affogato',
    price: 'IDR 25.000',
    description: 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
    originalPrice: 'IDR 30.000',
    rating: 5,
    reviews: 0,
    isFlashSale: false,
  },
  
]

export const findProductById = (productId) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === parseInt(productId));
};

export const getRecommendedProducts = (currentProductId) => {
  const allProducts = getAllProducts();
  return allProducts.filter(p => p.id !== parseInt(currentProductId));
};