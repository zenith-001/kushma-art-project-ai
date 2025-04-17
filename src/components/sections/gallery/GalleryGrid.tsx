'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/store';
import { X, ZoomIn } from 'lucide-react';
import ImageUpload from '@/components/common/ImageUpload';

interface Image {
  id: string;
  title: {
    en: string;
    ne: string;
  };
  description: {
    en: string;
    ne: string;
  };
  url: string;
  thumbnail: string;
  category: string;
  createdAt: string;
}

interface GalleryGridProps {
  images: Image[];
  canUpload?: boolean;
  onUpload?: (file: File) => Promise<void>;
}

const content = {
  upload: {
    en: 'Upload Image',
    ne: 'तस्वीर अपलोड गर्नुहोस्',
  },
  noImages: {
    en: 'No images to display',
    ne: 'प्रदर्शन गर्न कुनै तस्वीर छैन',
  },
};

export default function GalleryGrid({
  images,
  canUpload = false,
  onUpload,
}: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { language } = useAppSelector((state) => state.ui);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {canUpload && onUpload && (
          <div className="aspect-[3/2]">
            <ImageUpload
              onUpload={onUpload}
              className="h-full"
            />
          </div>
        )}
        
        {images.map((image) => (
          <motion.div
            key={image.id}
            layoutId={image.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aspect-[3/2] relative group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.thumbnail}
              alt={image.title[language]}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        ))}

        {images.length === 0 && !canUpload && (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            {content.noImages[language]}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              layoutId={selectedImage.id}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title[language]}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {selectedImage.title[language]}
                </h3>
                <p className="text-sm text-gray-300">
                  {selectedImage.description[language]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 