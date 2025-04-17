'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppSelector } from '@/store';

const content = {
  title: {
    en: 'Empowering Art & Culture',
    ne: 'कला र संस्कृतिको सशक्तिकरण',
  },
  subtitle: {
    en: 'Kushma Art Project is a platform dedicated to promoting and preserving the rich artistic heritage of Nepal while fostering contemporary creative expressions.',
    ne: 'कुश्मा आर्ट प्रोजेक्ट नेपालको समृद्ध कलात्मक सम्पदाको संरक्षण र समकालीन सृजनात्मक अभिव्यक्तिहरूको प्रवर्द्धनमा समर्पित एक मञ्च हो।',
  },
  cta: {
    en: 'Explore Our Work',
    ne: 'हाम्रो काम हेर्नुहोस्',
  },
};

export default function HeroSection() {
  const { language } = useAppSelector((state) => state.ui);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {content.title[language]}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {content.subtitle[language]}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {content.cta[language]}
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 