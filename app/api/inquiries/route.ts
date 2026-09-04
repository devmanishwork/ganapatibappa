import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(inquiries)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, productId, productName, message } = await req.json()
    if (!name || !phone) return NextResponse.json({ error: 'Name and phone required' }, { status: 400 })
    const inquiry = await prisma.inquiry.create({ data: { name, phone, productId, productName, message } })
    return NextResponse.json(inquiry, { status: 201 })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
