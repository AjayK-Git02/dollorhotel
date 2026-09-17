"use client";

import { useState } from "react";

export default function RoomGallery({ images, title }: { images: string[], title: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const validImages = images?.filter((img) => img.trim() !== "") || [];
  if (validImages.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">More Photos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validImages.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt={`${title} view ${idx + 1}`} 
            onClick={() => setSelectedImage(img)}
            className="w-full h-64 md:h-48 object-cover rounded-xl shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 text-4xl font-bold p-4 z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img 
            src={selectedImage} 
            alt={`${title} full view`} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl relative z-[105]" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}
