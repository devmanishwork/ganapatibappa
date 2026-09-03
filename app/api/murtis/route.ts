import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all murtis
export async function GET() {
  try {
    const murtis = await prisma.murti.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(murtis)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch murtis' }, { status: 500 })
  }
}

// POST create new murti
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, nameMarathi, description, size, price, imageUrl, status } = body

    if (!name || !size || !price || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const murti = await prisma.murti.create({
      data: {
        name,
        nameMarathi: nameMarathi || null,
        description: description || null,
        size,
        price: parseFloat(price),
        imageUrl,
        status: status || 'AVAILABLE',
      },
    })

    return NextResponse.json(murti, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create murti' }, { status: 500 })
  }
}
