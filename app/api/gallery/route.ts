import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(images)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  try {
    const { url, caption } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })
    const count = await prisma.galleryImage.count()
    const img = await prisma.galleryImage.create({ data: { url, caption, sortOrder: count } })
    return NextResponse.json(img, { status: 201 })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
