import { NextResponse } from 'next/server';
import { query } from '@/utils/client';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { unit_number, unit_type, backup_needed, status } = body;

    const result = await query(
      'UPDATE Assignment SET unit_number = ?, unit_type = ?, backup_needed = ?, status = ? WHERE assignment_ID = ?',
      [unit_number, unit_type, backup_needed, status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Assignment updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update assignment', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await query('DELETE FROM Assignment WHERE assignment_ID = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Assignment deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete assignment', details: error.message },
      { status: 500 }
    );
  }
}

