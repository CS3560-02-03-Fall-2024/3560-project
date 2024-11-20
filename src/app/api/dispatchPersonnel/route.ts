import { NextResponse } from 'next/server';
import { query } from '@/utils/client';

export async function GET() {
  try {
    const rows = await query('SELECT * FROM DispatchPersonnel');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch dispatch personnel', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name } = body;

    const result = await query(
      'INSERT INTO DispatchPersonnel (first_name, last_name) VALUES (?, ?)',
      [first_name, last_name]
    );

    return NextResponse.json({ message: 'Dispatch personnel added', id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to add dispatch personnel', details: error.message },
      { status: 500 }
    );
  }
}
