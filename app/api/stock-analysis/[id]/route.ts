import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { stocks_analysis } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET: Read a single stock analysis by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const analysis = await db
      .select()
      .from(stocks_analysis)
      .where(eq(stocks_analysis.id, id))
      .limit(1);

    if (analysis.length === 0) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    return NextResponse.json(analysis[0]);
  } catch (error) {
    console.error('Error fetching stock analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update a single stock analysis by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const updatedAnalysis = await db
      .update(stocks_analysis)
      .set(body)
      .where(eq(stocks_analysis.id, id))
      .returning();

    if (updatedAnalysis.length === 0) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    return NextResponse.json(updatedAnalysis[0]);
  } catch (error) {
    console.error('Error updating stock analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete a single stock analysis by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    const deletedAnalysis = await db
      .delete(stocks_analysis)
      .where(eq(stocks_analysis.id, id))
      .returning();

    if (deletedAnalysis.length === 0) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
