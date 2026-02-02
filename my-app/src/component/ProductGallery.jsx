import React, { useState } from 'react';

export default function ProductGallery({ images, thumbnails }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-white">
      <div className="bg-white w-145 rounded-lg overflow-hidden shadow-md">
        <div className="mb-4 w-full">
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="flex flex-row h-50 justify-between gap-1">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product thumbnail ${idx + 1}`}
              className={`w-48 object-cover rounded-md cursor-pointer border-2 transition-all duration-200
                          ${thumbnails === img ? 'border-blue-500 shadow-md' : 'border-gray-300 hover:border-blue-300'}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}