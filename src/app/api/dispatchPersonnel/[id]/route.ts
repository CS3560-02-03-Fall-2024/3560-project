import { NextResponse } from 'next/server';
import { query } from '@/utils/client';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { first_name, last_name } = body;

    const result = await query(
      'UPDATE DispatchPersonnel SET first_name = ?, last_name = ? WHERE personnel_ID = ?',
      [first_name, last_name, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Dispatch personnel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Dispatch personnel updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update dispatch personnel', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await query('DELETE FROM DispatchPersonnel WHERE personnel_ID = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Dispatch personnel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Dispatch personnel deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete dispatch personnel', details: error.message },
      { status: 500 }
    );
  }
}

