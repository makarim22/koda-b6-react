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
    return (
      <div className="w-full max-w-2xl mx-auto p-4 flex items-center justify-center min-h-[400px] border border-slate-200 rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-300 border-t-orange-500 rounded-full animate-spin" />
          <span className="text-sm font-medium text-zinc-500">Loading images...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden aspect-square w-full relative group">
        <img
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://picsum.photos/seed/main-product/600/600`;
          }}
        />
        <div className="absolute inset-0 border border-slate-100 rounded-2xl pointer-events-none" />
      </div>

      {thumbnails.length > 1 && (
        <div className="flex flex-row gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {thumbnails.map((img) => (
            <button
              key={img.id}
              onClick={() => setMainImage(img.path)}
              className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden snap-center transition-all duration-300 ${
                mainImage === img.path 
                  ? 'ring-2 ring-orange-500 scale-95 opacity-100 shadow-lg shadow-orange-500/20' 
                  : 'ring-1 ring-slate-200 opacity-70 hover:opacity-100 hover:ring-slate-300'
              }`}
            >
              <img
                src={img.path}
                alt={`Thumbnail ${img.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://picsum.photos/seed/thumb-${img.id}/80/80`;
                }}
              />
            </button>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}