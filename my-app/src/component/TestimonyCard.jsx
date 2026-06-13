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
    <div className="bg-transparent text-white w-full rounded-3xl">
      <div className="flex flex-col md:flex-row gap-12 max-w-5xl items-center">
        <div className="shrink-0 relative">
          <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-[30px] -z-10" />
          <img
            src={currentTestimony.image}
            alt={currentTestimony.name}
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-xl shadow-zinc-950/50 border border-white/5 animate-fade-in-up"
            key={currentTestimony.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/seed/${currentTestimony.name}/400/400`;
            }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-4">
          <div className="animate-fade-in-up" key={currentTestimony.name}>
            <div className="flex gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < currentTestimony.rating
                      ? 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                      : 'text-zinc-800'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-zinc-500 ml-2 font-bold mt-1">{currentTestimony.rating}.0</span>
            </div>

            <p className="text-zinc-300 mb-8 text-xl md:text-2xl leading-relaxed italic font-medium">
              "{currentTestimony.quote}"
            </p>

            <h3 className="text-3xl font-extrabold mb-1 tracking-tight text-white">{currentTestimony.name}</h3>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest">{currentTestimony.role}</p>
          </div>

          <div className="flex items-center gap-6 mt-12">
            <div className="flex gap-3">
              <button
                onClick={goToPrevious}
                className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 border border-white/10 active:scale-95 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-400 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex gap-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-orange-500 w-8'
                      : 'bg-zinc-800 hover:bg-zinc-600 w-3'
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