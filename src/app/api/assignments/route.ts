import { NextResponse } from 'next/server';
import { query } from '@/utils/client';

export async function GET() {
  try {
    const rows = await query('SELECT * FROM Assignment');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { incident_ID, unit_number, unit_type, backup_needed, status } = body;

    const result = await query(
      'INSERT INTO Assignment (incident_ID, unit_number, unit_type, backup_needed, status) VALUES (?, ?, ?, ?, ?)',
      [incident_ID, unit_number, unit_type, backup_needed, status]
    );

    return NextResponse.json({ message: 'Assignment created', id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create assignment', details: error.message },
      { status: 500 }
    );
  }
}
