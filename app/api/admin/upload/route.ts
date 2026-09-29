import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { sanityWriteClient } from '@/lib/sanity/write-client';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!sanityWriteClient) {
    return NextResponse.json({ error: 'Sanity write client not configured' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await sanityWriteClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      assetId: asset._id,
      url: asset.url,
    });
  } catch (err: any) {
    console.error('Image upload failed:', err);
    return NextResponse.json({ error: err.message || 'Image upload failed' }, { status: 500 });
  }
}
