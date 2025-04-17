import { NextRequest, NextResponse } from 'next/server';
import { processImage, isValidImageType } from '@/lib/imageUtils';
import { withAuth } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!isValidImageType(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const result = await processImage({
      buffer: Buffer.from(buffer),
      originalname: file.name,
      mimetype: file.type,
    } as Express.Multer.File);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Error processing upload' },
      { status: 500 }
    );
  }
}

// Protect the route with authentication
export const POST = withAuth(handler, ['admin', 'member']); 