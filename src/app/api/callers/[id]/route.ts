import { NextResponse } from 'next/server';
import { query } from '@/utils/client';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { first_name, last_name, address, phone_number } = body;

    const result = await query(
      'UPDATE Caller SET first_name = ?, last_name = ?, address = ?, phone_number = ? WHERE caller_ID = ?',
      [first_name, last_name, address, phone_number, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Caller not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Caller updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update caller', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await query('DELETE FROM Caller WHERE caller_ID = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Caller not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Caller deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete caller', details: error.message },
      { status: 500 }
    );
  }
}

