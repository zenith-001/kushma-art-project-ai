'use client';

import { useAppSelector } from '@/store';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const content = {
  title: {
    en: 'Support Our Mission',
    ne: 'हाम्रो मिसनलाई सहयोग गर्नुहोस्',
  },
  subtitle: {
    en: 'Your contribution helps us empower artists and preserve cultural heritage',
    ne: 'तपाईंको योगदानले कलाकारहरूलाई सशक्त बनाउन र सांस्कृतिक सम्पदा संरक्षण गर्न मद्दत गर्छ',
  },
  description: {
    en: 'Every donation, big or small, makes a difference in our mission to promote art and culture in Kushma. Your support helps us organize workshops, exhibitions, and provide resources to emerging artists.',
    ne: 'कुश्मामा कला र संस्कृतिको प्रवर्द्धन गर्ने हाम्रो मिसनमा हरेक सानो ठूलो सहयोगले फरक पार्छ। तपाईंको सहयोगले हामीलाई कार्यशाला, प्रदर्शनी आयोजना गर्न र उदीयमान कलाकारहरूलाई स्रोतहरू प्रदान गर्न मद्दत गर्छ।',
  },
  cta: {
    en: 'Donate Now',
    ne: 'अहिले दान गर्नुहोस्',
  },
  impact: {
    title: {
      en: 'Your Impact',
      ne: 'तपाईंको प्रभाव',
    },
    items: [
      {
        value: '100%',
        label: {
          en: 'Goes to Programs',
          ne: 'कार्यक्रमहरूमा जान्छ',
        },
      },
      {
        value: '50+',
        label: {
          en: 'Artists Supported',
          ne: 'कलाकारहरूलाई सहयोग',
        },
      },
      {
        value: '20+',
        label: {
          en: 'Community Events',
          ne: 'सामुदायिक कार्यक्रमहरू',
        },
      },
    ],
  },
};

export default function DonationSection() {
  const { language } = useAppSelector((state) => state.ui);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-red-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.title[language]}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {content.subtitle[language]}
            </p>
            <p className="text-blue-100 mb-8">
              {content.description[language]}
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
            >
              {content.cta[language]}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-center mb-8 text-blue-100">
            {content.impact.title[language]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.impact.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="text-3xl font-bold mb-2">{item.value}</div>
                <div className="text-blue-100">{item.label[language]}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 