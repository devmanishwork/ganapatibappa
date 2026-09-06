import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ganapati-stall',
        public_id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 7)}`,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'))
        resolve(result.secure_url)
      }
    )
    uploadStream.end(buffer)
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('file') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const urls: string[] = []

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) continue
      if (file.size > 5 * 1024 * 1024) continue // 5MB limit

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const url = await uploadToCloudinary(buffer, file.name)
      urls.push(url)
    }

    if (urls.length === 0) {
      return NextResponse.json({ error: 'No valid images uploaded' }, { status: 400 })
    }

    // Return single URL for backwards compat, plus array
    return NextResponse.json({ url: urls[0], urls })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
