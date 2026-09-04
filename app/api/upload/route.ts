import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('file') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const urls: string[] = []

    const uploadsDir = process.env.UPLOAD_DIR
      ? path.resolve(process.env.UPLOAD_DIR)
      : path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) continue
      if (file.size > 5 * 1024 * 1024) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `img_${Date.now()}_${Math.random().toString(36).substr(2, 7)}.${ext}`
      await writeFile(path.join(uploadsDir, filename), buffer)
      urls.push(`/uploads/${filename}`)
    }

    if (urls.length === 0) return NextResponse.json({ error: 'No valid images' }, { status: 400 })

    // Return single URL for backwards compat, plus array
    return NextResponse.json({ url: urls[0], urls })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
