import React from 'react'
import Header from '../layouts/header';
import GrinderImage from '../assets/icons/homepage/coffee-grinder.svg';

function ChatPage() {
    return (
    <div className="font-sans antialiased text-gray-900">
      
      <Header />
  
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white pt-20 md:pt-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-8 md:p-16 w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Start Your Day with Coffee and Good Meals
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg">
            We provide high-quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </p>
          <button className="bg-[#FF8906] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition duration-300 mb-10">
            Get Started
          </button>
          <div className="flex justify-center md:justify-start space-x-8 md:space-x-12 mt-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">90+</h2>
              <p className="text-gray-300">Staff</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">30+</h2>
              <p className="text-gray-300">Stores</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">800+</h2>
              <p className="text-gray-300">Customers</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block image-section bg-cover bg-center h-full w-1/2 bg-gray-800">
          <img src={GrinderImage} alt="Barista" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
}

export default ChatPage
