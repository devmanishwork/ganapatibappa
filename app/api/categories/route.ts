import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    })
    return NextResponse.json(categories)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  try {
    const { name, nameMarathi, slug } = await req.json()
    if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })
    const cat = await prisma.category.create({ data: { name, nameMarathi, slug } })
    return NextResponse.json(cat, { status: 201 })
  } catch (e: any) {
    if (e.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
