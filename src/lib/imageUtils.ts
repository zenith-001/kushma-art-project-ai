import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

interface ProcessedImage {
  original: string;
  thumbnail: string;
  webp: string;
  width: number;
  height: number;
}

export async function processImage(
  file: Express.Multer.File,
  options = { quality: 80, maxWidth: 1920 }
): Promise<ProcessedImage> {
  const uniqueId = crypto.randomBytes(8).toString('hex');
  const ext = path.extname(file.originalname);
  const filename = `${uniqueId}${ext}`;
  const webpFilename = `${uniqueId}.webp`;
  const thumbnailFilename = `${uniqueId}_thumb.webp`;

  // Create upload directories if they don't exist
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  // Process original image
  const image = sharp(file.buffer);
  const metadata = await image.metadata();

  // Calculate dimensions
  const width = Math.min(metadata.width || 0, options.maxWidth);
  const height = Math.round((width * (metadata.height || 0)) / (metadata.width || 1));

  // Save original (resized if needed)
  await image
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .toFile(path.join(uploadDir, filename));

  // Create WebP version
  await image
    .webp({ quality: options.quality })
    .toFile(path.join(uploadDir, webpFilename));

  // Create thumbnail
  await image
    .resize(400, 300, { fit: 'cover' })
    .webp({ quality: options.quality })
    .toFile(path.join(uploadDir, thumbnailFilename));

  return {
    original: `/uploads/${filename}`,
    thumbnail: `/uploads/${thumbnailFilename}`,
    webp: `/uploads/${webpFilename}`,
    width,
    height,
  };
}

export async function deleteImage(filepath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), 'public', filepath);
  try {
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export function generateBlurHash(buffer: Buffer): Promise<string> {
  // Implement blur hash generation if needed
  return Promise.resolve('');
}

export async function optimizeImage(
  buffer: Buffer,
  options = { quality: 80, maxWidth: 1920 }
): Promise<Buffer> {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Calculate dimensions
  const width = Math.min(metadata.width || 0, options.maxWidth);
  const height = Math.round((width * (metadata.height || 0)) / (metadata.width || 1));

  return image
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: options.quality })
    .toBuffer();
}

export function isValidImageType(mimetype: string): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(mimetype);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
} 