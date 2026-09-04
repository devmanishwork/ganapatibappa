import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    })
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { productId, name, nameMarathi, description, price, height, images, status, featured, categoryId } = body

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        productId,
        name,
        nameMarathi: nameMarathi || null,
        description: description || null,
        price: parseFloat(price),
        height,
        images: JSON.stringify(images || []),
        status,
        featured: featured || false,
        categoryId: categoryId ? parseInt(categoryId) : null,
      },
      include: { category: true },
    })
    return NextResponse.json(product)
  } catch { return NextResponse.json({ error: 'Failed to update' }, { status: 500 }) }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Failed to delete' }, { status: 500 }) }
}
