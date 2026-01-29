import React, { useState } from 'react';
import { PromoCard } from './PromoCard';
export const PromoSection = ({ promos }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Today <span className="text-yellow-800">Promo</span>
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {promos.map((promo, index) => (
          <div key={index} className="shrink-0 w-72">
            <PromoCard {...promo} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === current ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};