import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonyCard({ testimonies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonies.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimony = testimonies[currentIndex];

  return (
    <div className="bg-stone-950 text-white p-8 rounded-lg">
      <div className="flex gap-8 max-w-4xl">
        <div className="shrink-0">
          <img
            src={currentTestimony.image}
            alt={currentTestimony.name}
            className="w-80 h-80 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">
              Testimonial
            </p>
            <h3 className="text-4xl font-bold mb-1">{currentTestimony.name}</h3>
            <p className="text-orange-500 text-sm mb-6">{currentTestimony.role}</p>

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < currentTestimony.rating
                      ? 'text-orange-500'
                      : 'text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-gray-400 ml-2">{currentTestimony.rating}</span>
            </div>
          </div>

          <p className="text-gray-300 mb-8 leading-relaxed">
            "{currentTestimony.quote}"
          </p>

          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <button
                onClick={goToPrevious}
                className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex gap-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentIndex
                      ? 'bg-orange-500 w-6'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}