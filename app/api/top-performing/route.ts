import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { topPerforming } from '@/lib/db/schema';

export async function GET() {
  try {
    const topPerformingAnalysts = await db.select().from(topPerforming).execute();

    return NextResponse.json(topPerformingAnalysts, { status: 200 });
  } catch (error) {
    console.error('Error fetching top performing analysts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
