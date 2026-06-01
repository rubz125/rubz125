import { NextRequest, NextResponse } from 'next/server'
import { getSnapshot } from '@/lib/integrations/reolink'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return new NextResponse('Missing id', { status: 400 })

  const upstream = await getSnapshot(id)
  if (!upstream) return new NextResponse('Camera unavailable', { status: 503 })

  const body = await upstream.arrayBuffer()
  return new NextResponse(body, {
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'image/jpeg',
      'Cache-Control': 'no-store',
    },
  })
}
