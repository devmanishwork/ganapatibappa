import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEFAULT_CATEGORIES = [
  { name: 'Small Murtis', nameMarathi: 'छोट्या मूर्ती', slug: 'small-murtis' },
  { name: 'Medium Murtis', nameMarathi: 'मध्यम मूर्ती', slug: 'medium-murtis' },
  { name: 'Large Murtis', nameMarathi: 'मोठ्या मूर्ती', slug: 'large-murtis' },
  { name: 'Special Designs', nameMarathi: 'विशेष डिझाईन', slug: 'special-designs' },
  { name: 'Household Ganapati', nameMarathi: 'घरगुती गणपती', slug: 'household-ganapati' },
  { name: 'Mandal Murtis', nameMarathi: 'मंडळ मूर्ती', slug: 'mandal-murtis' },
]

export async function GET() {
  try {
    let categories = await prisma.category.findMany({
      orderBy: { id: 'asc' },
      include: { _count: { select: { products: true } } },
    })

    // Auto-seed default categories if empty
    if (categories.length === 0) {
      await prisma.category.createMany({
        data: DEFAULT_CATEGORIES,
      })
      categories = await prisma.category.findMany({
        orderBy: { id: 'asc' },
        include: { _count: { select: { products: true } } },
      })
    }

    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
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
