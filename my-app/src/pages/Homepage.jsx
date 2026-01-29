import CheckmarkIcon from '../assets/icons/homepage/checklist.svg';
import GrinderImage from '../assets/icons/homepage/coffee-grinder.svg';
import BaristaImage from '../assets/icons/homepage/barista.png';
import GlobeImage from '../assets/icons/homepage/globe.svg';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../component/ProductGrid';




const HomePage = () => {

   const products = [
  {
    id: 1,
    image: './src/assets/icons/productPage/espresso.jfif',
    title: 'Espresso', 
    price: 'IDR 15.000', 
    originalPrice: 'IDR 18.000', 
    rating: 5,
    reviews: 0, 
    isFlashSale: true,
  },
  {
    id: 2,
    image: './src/assets/icons/productPage/latte.jpg',
    title: 'Latte',
    price: 'IDR 19.000',
    originalPrice: 'IDR 22.000',
    rating: 5,
    reviews: 0,
    isFlashSale: true,
  },
  {
    id: 3,
    image: './src/assets/icons/productPage/mocha.jfif',
    title: 'Mocha',
    price: 'IDR 21.000',
    originalPrice: 'IDR 24.000',
    rating: 4,
    reviews: 0,
    isFlashSale: true,
  },
  {
    id: 4,
    image: './src/assets/icons/productPage/americano.jfif',
    title: 'Americano',
    price: 'IDR 12.000', 
    originalPrice: 'IDR 15.000', 
    rating: 4,
    reviews: 0,
    isFlashSale: false,
  }
];

  return (
    <div className="font-sans antialiased text-gray-900">
      <Header />
      <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-linear-to-b from-neutral-500 to-stone-950 text-white pt-20 md:pt-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-8 md:p-16 w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Start Your Day with Coffee and Good Meals
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg">
            We provide high-quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </p>
          <button className="bg-[#FF8906] text-white font-semibold py-3 px-8 text-lg rounded-md hover:bg-orange-600 transition duration-300 mb-10">
            Get Started
          </button>
          <div className="flex justify-center md:justify-start space-x-8 md:space-x-12 mt-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-400">90+</h2>
              <p className="text-gray-300">Staff</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-400">30+</h2>
              <p className="text-gray-300">Stores</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-400">800+</h2>
              <p className="text-gray-300">Customers</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block image-section bg-cover bg-center h-full w-1/2 bg-liear-to-b from-neutral-500 to-stone-950">
          <img src={GrinderImage} alt="Barista" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center bg-white text-gray-800 ">
        <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0 py-8 md:py-24 px-8 md:px-22">
          <p className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            We Provide <strong className="text-[#DEB887]">Good Coffee </strong> and
            <strong className="text-[#DEB887]"> Healthy Meals</strong>
          </p>
          <p className="text-lg leading-relaxed mb-8">
            You can explore the menu that we provide with fun and have their own
            taste to make your day better.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 shrink-0" />
              High-quality beans
            </li>
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 shrink-0" />
              Healthy meals, you can request the ingredients
            </li>
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 shrink-0" />
              Chat with our staff to get a better experience for ordering
            </li>
            <li className="flex items-start text-lg">
              <img src={CheckmarkIcon} alt="Checkmark" className="w-6 h-6 mr-3 mt-1 shrink-0" />
              Free member card with a minimum purchase of IDR 200.000.
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center self-stretch overflow-hidden">
          <img src={BaristaImage} 
          alt="Barista" 
          className="h-full w-full object-cover shadow-lg" />
        </div>
      </section>





      <section className="py-16 md:py-24 bg-gray-100 text-gray-800 px-8 md:px-32 text-center">
        <div className="mb-12">
          <p className="text-3xl md:text-4xl font-bold mb-4">
            Here is People's <strong className="text-[#DEB887]">Favorite</strong>
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Let's choose and have a bit of taste of people's favorite. It might be
            yours too!
          </p>
        </div>
        <ProductGrid products={products} columns={4} />
      </section>

      <section className="py-16 md:py-24 bg-white text-gray-800 px-8 md:px-32 text-center">
        <p className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl mx-auto">
          <strong className="text-[#8e6447]">Visit Our Store </strong>in the Spot on
          the Map Below
        </p>
        <p className="text-lg max-w-2xl mx-auto mb-12">
          You can explore the menu that we provide with fun and have their own
          taste and make your day better.
        </p>
        <div className="flex justify-center">
          <img src={GlobeImage} alt="World Map" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-900 text-white px-8 md:px-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Placeholder for testimonials or customer reviews.
        </p>
      </section>

      <Footer />

    </div>
  );
};

export default HomePage;