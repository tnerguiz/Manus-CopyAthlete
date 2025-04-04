import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { productId } = await request.json();
    
    // Here you would typically log this to a database or analytics service
    console.log(Download tracked for product: \);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking download:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
