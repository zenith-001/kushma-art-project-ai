'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const content = {
  title: {
    en: 'Featured Programs',
    ne: 'विशेष कार्यक्रमहरू',
  },
  subtitle: {
    en: 'Discover our current initiatives and ongoing projects',
    ne: 'हाम्रा वर्तमान पहल र चालू परियोजनाहरू पत्ता लगाउनुहोस्',
  },
  programs: [
    {
      title: {
        en: 'Young Artists Workshop',
        ne: 'युवा कलाकार कार्यशाला',
      },
      description: {
        en: 'A six-week intensive program for emerging artists to develop their skills and showcase their work.',
        ne: 'उदीयमान कलाकारहरूको लागि छ हप्ताको गहन कार्यक्रम जसमा उनीहरूले आफ्नो सीप विकास र प्रदर्शन गर्न सक्छन्।',
      },
      image: '/images/programs/young-artists.jpg',
    },
    {
      title: {
        en: 'Cultural Heritage Preservation',
        ne: 'सांस्कृतिक सम्पदा संरक्षण',
      },
      description: {
        en: 'Documenting and preserving traditional art forms and cultural practices of Kushma region.',
        ne: 'कुश्मा क्षेत्रको परम्परागत कला र सांस्कृतिक अभ्यासहरूको अभिलेखीकरण र संरक्षण।',
      },
      image: '/images/programs/heritage.jpg',
    },
    {
      title: {
        en: 'Community Art Space',
        ne: 'सामुदायिक कला स्थल',
      },
      description: {
        en: 'A dedicated space for local artists to create, collaborate, and exhibit their work.',
        ne: 'स्थानीय कलाकारहरूको लागि सृजना, सहकार्य र प्रदर्शनको लागि समर्पित स्थान।',
      },
      image: '/images/programs/community-space.jpg',
    },
  ],
};

export default function FeaturedPrograms() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useAppSelector((state) => state.ui);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + content.programs.length) % content.programs.length;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {content.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {content.subtitle[language]}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={content.programs[currentIndex].image}
                    alt={content.programs[currentIndex].title[language]}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {content.programs[currentIndex].title[language]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {content.programs[currentIndex].description[language]}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {content.programs.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 