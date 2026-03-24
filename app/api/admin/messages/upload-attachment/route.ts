import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: `File "${file.name}" exceeds the 2 MB limit` },
        { status: 413 }
      );
    }

    // Convert file to base64 buffer for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary in the email-attachments folder
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'email-attachments',
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      filename_override: file.name,
    });

    return NextResponse.json({
      success: true,
      attachment: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: file.name,
        size: file.size,
        resourceType: result.resource_type,
      }
    });

  } catch (error: any) {
    console.error('Attachment Upload Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
