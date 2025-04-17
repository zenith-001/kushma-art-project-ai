'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store';
import GalleryGrid from '@/components/GalleryGrid';

const content = {
  title: {
    en: 'Art Gallery',
    ne: 'कला दीर्घा',
  },
  description: {
    en: 'Explore our collection of artworks from talented artists.',
    ne: 'प्रतिभाशाली कलाकारहरूको कलाकृतिहरूको हाम्रो संग्रह अन्वेषण गर्नुहोस्।',
  },
  categories: {
    all: {
      en: 'All',
      ne: 'सबै',
    },
    paintings: {
      en: 'Paintings',
      ne: 'चित्रहरू',
    },
    sculptures: {
      en: 'Sculptures',
      ne: 'मूर्तिहरू',
    },
    digital: {
      en: 'Digital Art',
      ne: 'डिजिटल कला',
    },
  },
};

const sampleImages = [
  {
    id: '1',
    src: '/images/art1.jpg',
    alt: 'Art piece 1',
    category: 'Paintings',
    title: 'Abstract Harmony',
    description: 'A vibrant exploration of color and form'
  },
  {
    id: '2',
    src: '/images/art2.jpg',
    alt: 'Art piece 2',
    category: 'Sculptures',
    title: 'Nature\'s Dance',
    description: 'Inspired by natural movements'
  },
  {
    id: '3',
    src: '/images/art3.jpg',
    alt: 'Art piece 3',
    category: 'Digital',
    title: 'Digital Dreams',
    description: 'A fusion of technology and art'
  },
  // Add more sample images as needed
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { language } = useAppSelector((state) => state.ui);
  const [images] = useState(sampleImages);

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(image => image.category === selectedCategory);

  const handleUpload = async (file: File) => {
    // TODO: Implement image upload logic
    console.log('Uploading file:', file);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {content.title[language]}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {content.description[language]}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(content.categories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {value[language]}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="min-h-[400px]"
      >
        <GalleryGrid
          images={filteredImages}
          canUpload={true}
          onUpload={handleUpload}
        />
      </motion.div>
    </div>
  );
} 