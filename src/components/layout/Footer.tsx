'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const navigation = {
  main: [
    { name: { en: 'About', ne: 'हाम्रोबारे' }, href: '/about' },
    { name: { en: 'Programs', ne: 'कार्यक्रमहरू' }, href: '/programs' },
    { name: { en: 'Gallery', ne: 'ग्यालरी' }, href: '/gallery' },
    { name: { en: 'Events', ne: 'कार्यक्रम' }, href: '/events' },
    { name: { en: 'Blog', ne: 'ब्लग' }, href: '/blog' },
    { name: { en: 'Contact', ne: 'सम्पर्क' }, href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
  ],
};

const contact = {
  email: 'info@kushmaartproject.com.np',
  phone: '+977-1-2345678',
  address: {
    en: 'Kushma, Parbat, Nepal',
    ne: 'कुश्मा, पर्वत, नेपाल',
  },
};

export default function Footer() {
  const { language } = useAppSelector((state) => state.ui);

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.href} className="pb-6">
              <Link
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {item.name[language]}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
            <Mail className="h-5 w-5" />
            <a href={`mailto:${contact.email}`} className="hover:text-gray-900 dark:hover:text-gray-300">
              {contact.email}
            </a>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
            <Phone className="h-5 w-5" />
            <a href={`tel:${contact.phone}`} className="hover:text-gray-900 dark:hover:text-gray-300">
              {contact.phone}
            </a>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
            <MapPin className="h-5 w-5" />
            <span>{contact.address[language]}</span>
          </div>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Kushma Art Project. {language === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
        </p>
      </div>
    </footer>
  );
} 