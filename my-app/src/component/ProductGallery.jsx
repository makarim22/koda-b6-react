import { useState, useEffect } from 'react';

export default function ProductGallery({ thumbnails = [] }) {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (!thumbnails || thumbnails.length === 0) {
      setMainImage(null);
      return;
    }

    const primaryImage = thumbnails.find(img => img.is_primary);
    setMainImage(primaryImage?.path || thumbnails[0].path);
  }, [thumbnails]);

  if (!mainImage) {
    return <div className="w-full max-w-2xl mx-auto p-4 text-center text-gray-500">Loading images...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-white">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="mb-4 w-full">
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full h-auto object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/seed/main-product/600/400`;
            }}
          />
        </div>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2">
          {thumbnails.map((img) => (
            <img
              key={img.id}
              src={img.path}
              alt={`Product thumbnail ${img.id}`}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 flex-shrink-0
                          ${mainImage === img.path ? 'border-orange-500 shadow-md' : 'border-gray-300 hover:border-orange-300'}`}
              onClick={() => setMainImage(img.path)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/seed/thumb-${img.id}/80/80`;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}