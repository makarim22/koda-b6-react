import React, { useState, useRef } from 'react';
import { PromoCard } from './PromoCard';

export const PromoSection = ({ promos }) => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardTotalWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
    const newCurrent = Math.round(scrollPosition / cardTotalWidth);
    setCurrent(newCurrent);
  };

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const cardTotalWidth = 320 + 24;
    scrollRef.current.scrollTo({
      left: index * cardTotalWidth,
      behavior: 'smooth',
    });
    setCurrent(index);
  };

  return (
    <div className="mb-8">
      <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-widest mb-6">
        Today's <span className="text-orange-500">Promos</span>
      </h2>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {promos.map((promo, index) => (
          <div key={index} className="shrink-0 w-80 snap-center">
            <PromoCard {...promo} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-2">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-orange-500 w-8' : 'bg-slate-200 hover:bg-slate-300 w-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
};