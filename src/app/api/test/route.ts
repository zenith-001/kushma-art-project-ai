import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Test from '@/models/Test';

export async function GET() {
  try {
    await dbConnect();
    
    // Create a test document
    const test = await Test.create({ name: 'Test Connection' });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      test 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 