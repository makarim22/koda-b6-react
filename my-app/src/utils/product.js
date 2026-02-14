import espressoImage from '../assets/icons/productPage/espresso.jfif';  
import latteImage from '../assets/icons/productPage/latte.jpg';  
import mochaImage from '../assets/icons/productPage/mocha.jfif';  
import americanoImage from '../assets/icons/productPage/americano.jfif';  
import flatWhiteImage from '../assets/icons/productPage/flat-white.jfif';  
import affogatoImage from '../assets/icons/productPage/affogato.jfif';  

const productImages = {  
    espresso: espressoImage,  
    latte: latteImage,  
    mocha: mochaImage,  
    americano: americanoImage,  
    flatWhite: flatWhiteImage, 
    affogato: affogatoImage,  
    
};  

export const getAllProducts = () => [
    {
      id: 1,
      image: productImages.espresso,
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
      image: productImages.latte,
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
      image: productImages.mocha,
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
      image: productImages.americano,
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
    image: productImages.flatWhite,
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
    image: productImages.affogato,
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