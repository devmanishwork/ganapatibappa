import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single murti
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const murti = await prisma.murti.findUnique({
      where: { id: parseInt(id) },
    })
    if (!murti) {
      return NextResponse.json({ error: 'Murti not found' }, { status: 404 })
    }
    return NextResponse.json(murti)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch murti' }, { status: 500 })
  }
}

// PUT update murti
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, nameMarathi, description, size, price, imageUrl, status } = body

    const murti = await prisma.murti.update({
      where: { id: parseInt(id) },
      data: {
        name,
        nameMarathi: nameMarathi || null,
        description: description || null,
        size,
        price: parseFloat(price),
        ...(imageUrl && { imageUrl }),
        status,
      },
    })

    return NextResponse.json(murti)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update murti' }, { status: 500 })
  }
}

// DELETE murti
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.murti.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: 'Murti deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete murti' }, { status: 500 })
  }
}
