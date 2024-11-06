import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { panteraPicks } from '@/lib/db/schema';
import { desc, asc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortColumn = searchParams.get('sortColumn') || 'picked_date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validate sort column to prevent SQL injection
    const validColumns = [
      'company',
      'symbol',
      'picked_date',
      'purchase_price',
      'closed_date',
      'sell_price',
      'return_percentage',
      'spy_percentage',
      'difference_percentage',
    ];

    if (!validColumns.includes(sortColumn)) {
      return NextResponse.json(
        { error: 'Invalid sort column' },
        { status: 400 }
      );
    }

    const picks = await db
      .select()
      .from(panteraPicks)
      // .orderBy(
      //   sortOrder === 'desc'
      //     ? desc(panteraPicks[sortColumn as keyof typeof panteraPicks] as any)
      //     : asc(panteraPicks[sortColumn as keyof typeof panteraPicks] as any)
      // )
      .execute();

    // Transform the data to match our frontend camelCase format
    const transformedPicks = picks.map(pick => ({
      id: pick.id,
      company: pick.company,
      companyLogoUrl: pick.companyLogoUrl,
      symbol: pick.symbol,
      symbolHref: pick.symbolHref,
      pickedDate: pick.pickedDate,
      purchasePrice: pick.purchasePrice,
      closedDate: pick.closedDate,
      sellPrice: pick.sellPrice,
      returnPercentage: pick.returnPercentage,
      spyPercentage: pick.spyPercentage,
      differencePercentage: pick.differencePercentage,
    }));

    return NextResponse.json(transformedPicks, { status: 200 });
  } catch (error) {
    console.error('Error fetching Pantera picks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 