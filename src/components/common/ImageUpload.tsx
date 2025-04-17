'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2 } from 'lucide-react';
import { useAppSelector } from '@/store';
import { formatFileSize, isValidImageType } from '@/lib/imageUtils';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  maxSize?: number;
  accept?: string[];
  className?: string;
}

const content = {
  dropzone: {
    en: {
      title: 'Drop your image here',
      subtitle: 'or click to select',
      hint: 'Supports: JPG, PNG, WebP, GIF (max 5MB)',
    },
    ne: {
      title: 'यहाँ तपाईंको तस्वीर छोड्नुहोस्',
      subtitle: 'वा चयन गर्न क्लिक गर्नुहोस्',
      hint: 'समर्थन: JPG, PNG, WebP, GIF (अधिकतम 5MB)',
    },
  },
  error: {
    en: {
      invalidType: 'Invalid file type',
      tooLarge: 'File is too large',
      uploadError: 'Error uploading file',
    },
    ne: {
      invalidType: 'अमान्य फाइल प्रकार',
      tooLarge: 'फाइल धेरै ठूलो छ',
      uploadError: 'फाइल अपलोड गर्दा त्रुटि',
    },
  },
};

export default function ImageUpload({
  onUpload,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className = '',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { language } = useAppSelector((state) => state.ui);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      if (!isValidImageType(file.type)) {
        setError(content.error[language].invalidType);
        return;
      }

      if (file.size > maxSize) {
        setError(content.error[language].tooLarge);
        return;
      }

      setError(null);
      setPreview(URL.createObjectURL(file));

      try {
        setIsUploading(true);
        await onUpload(file);
      } catch (error) {
        console.error('Upload error:', error);
        setError(content.error[language].uploadError);
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onUpload, language]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700'
        }`}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              {!isUploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                {content.dropzone[language].title}
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {content.dropzone[language].subtitle}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {content.dropzone[language].hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
} 