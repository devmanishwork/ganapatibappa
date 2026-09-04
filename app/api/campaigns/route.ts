import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let campaign = await prisma.campaign.findFirst()
    if (!campaign) {
      campaign = await prisma.campaign.create({ data: {} })
    }
    return NextResponse.json(campaign)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    let campaign = await prisma.campaign.findFirst()
    if (!campaign) {
      campaign = await prisma.campaign.create({ data: body })
    } else {
      campaign = await prisma.campaign.update({ where: { id: campaign.id }, data: body })
    }
    return NextResponse.json(campaign)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
