import { NextResponse } from 'next/server'
import cryptoWavesData from '@/lib/db/jsonData/crypto-waves.json'

export async function GET() {
  try {
    // Filter out empty messages
    const messages = cryptoWavesData.filter(msg => msg.time || msg.body || msg.imageSrc)
    
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch crypto waves data' },
      { status: 500 }
    )
  }
} 