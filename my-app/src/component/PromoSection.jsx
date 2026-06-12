import React, { useState, useRef } from 'react';
import { PromoCard } from './PromoCard';

export const PromoSection = ({ promos }) => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    // Each card is w-72 (288px) + gap-4 (16px) = 304px total width per item
    const cardTotalWidth = 288 + 16;
    const newCurrent = Math.round(scrollPosition / cardTotalWidth);
    setCurrent(newCurrent);
  };

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const cardTotalWidth = 288 + 16;
    scrollRef.current.scrollTo({
      left: index * cardTotalWidth,
      behavior: 'smooth',
    });
    setCurrent(index);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Today <span className="text-yellow-800">Promo</span>
      </h2>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {promos.map((promo, index) => (
          <div key={index} className="shrink-0 w-72 snap-start">
            <PromoCard {...promo} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === current ? 'bg-orange-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};