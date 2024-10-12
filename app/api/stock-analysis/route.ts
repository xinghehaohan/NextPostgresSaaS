import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { stocks_analysis } from '@/lib/db/schema';
import { sql, eq } from 'drizzle-orm';

// GET: Read all stock analyses (with filtering and pagination)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sector = searchParams.get('sector');
  const analyst = searchParams.get('analyst');
  const rating = searchParams.get('rating');
  const sortBy = searchParams.get('sortBy') || 'coverage_date';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let query = db.select().from(stocks_analysis);

  if (sector) {
    query = query.where(eq(stocks_analysis.sector, sector));
  }
  if (analyst) {
    query = query.where(eq(stocks_analysis.analyst, analyst));
  }
  if (rating) {
    query = query.where(eq(stocks_analysis.rating, rating));
  }

  const validSortColumns = ['symbol', 'sector', 'analyst', 'coverage_date', 'rating','analysis'];
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'coverage_date';
  
  query = query.orderBy(sql`${stocks_analysis[sortColumn]} ${sql.raw(sortOrder === 'asc' ? 'ASC' : 'DESC')}`);

  const offset = (page - 1) * limit;
  query = query.limit(limit).offset(offset);

  try {
    const results = await query;
    const totalCount = await db.select({ count: sql<number>`count(*)` }).from(stocks_analysis);

    return NextResponse.json({
      data: results,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount[0].count / limit),
        totalItems: totalCount[0].count,
      },
    });
  } catch (error) {
    console.error('Error fetching stock analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create a new stock analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newAnalysis = await db.insert(stocks_analysis).values(body).returning();
    return NextResponse.json(newAnalysis[0], { status: 201 });
  } catch (error) {
    console.error('Error creating stock analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update an existing stock analysis
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedAnalysis = await db
      .update(stocks_analysis)
      .set(updateData)
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

// DELETE: Delete a stock analysis
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

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