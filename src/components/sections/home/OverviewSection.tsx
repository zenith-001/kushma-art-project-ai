'use client';

import { useAppSelector } from '@/store';
import { motion } from 'framer-motion';
import { Palette, Users, Target, Globe } from 'lucide-react';

const content = {
  title: {
    en: 'Our Mission & Impact',
    ne: 'हाम्रो लक्ष्य र प्रभाव',
  },
  description: {
    en: 'We are dedicated to nurturing artistic talent, preserving cultural heritage, and creating a vibrant creative community in Kushma and beyond.',
    ne: 'हामी कुश्मा र त्यस बाहिरको कलात्मक प्रतिभा, सांस्कृतिक सम्पदाको संरक्षण र एक जीवन्त सृजनात्मक समुदाय निर्माणमा समर्पित छौं।',
  },
  stats: [
    {
      icon: Palette,
      value: '50+',
      label: {
        en: 'Art Projects',
        ne: 'कला परियोजनाहरू',
      },
    },
    {
      icon: Users,
      value: '200+',
      label: {
        en: 'Artists Supported',
        ne: 'कलाकारहरूलाई सहयोग',
      },
    },
    {
      icon: Target,
      value: '20+',
      label: {
        en: 'Exhibitions',
        ne: 'प्रदर्शनीहरू',
      },
    },
    {
      icon: Globe,
      value: '5+',
      label: {
        en: 'International Collaborations',
        ne: 'अन्तर्राष्ट्रिय सहकार्य',
      },
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function OverviewSection() {
  const { language } = useAppSelector((state) => state.ui);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {content.title[language]}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {content.description[language]}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-700 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label[language]}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 