import React, { useState } from 'react';

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-row md:flex-col">
      <div className="bg-violet-500">
        <img src={mainImage} alt="Product" />
      </div>
      <div className="bg-red-300 flex flex-col md:flex-row">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Product ${idx + 1}`}
            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
    </div>
  );
}