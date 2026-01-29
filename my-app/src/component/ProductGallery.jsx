import React, { useState } from 'react';

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="main-image">
        <img src={mainImage} alt="Product" />
      </div>
      <div className="thumbnail-gallery">
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
  );
}