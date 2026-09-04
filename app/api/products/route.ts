import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status    = searchParams.get('status')
    const categoryId = searchParams.get('categoryId')
    const featured  = searchParams.get('featured')
    const search    = searchParams.get('search')
    const sort      = searchParams.get('sort') || 'newest'

    const where: any = {}
    if (status)     where.status = status
    if (categoryId) where.categoryId = parseInt(categoryId)
    if (featured === 'true') where.featured = true
    if (search)     where.OR = [
      { name:        { contains: search } },
      { nameMarathi: { contains: search } },
      { productId:   { contains: search } },
    ]

    const orderBy: any =
      sort === 'price_asc'  ? { price: 'asc' }  :
      sort === 'price_desc' ? { price: 'desc' } :
      { createdAt: 'desc' }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: { category: true },
    })

    return NextResponse.json(products)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, name, nameMarathi, description, price, height, images, status, featured, categoryId } = body

    if (!productId || !name || !price || !height) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        productId,
        name,
        nameMarathi: nameMarathi || null,
        description: description || null,
        price: parseFloat(price),
        height,
        images: JSON.stringify(images || []),
        status: status || 'AVAILABLE',
        featured: featured || false,
        categoryId: categoryId ? parseInt(categoryId) : null,
      },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (e: any) {
    if (e.code === 'P2002') return NextResponse.json({ error: 'Product ID already exists' }, { status: 400 })
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
