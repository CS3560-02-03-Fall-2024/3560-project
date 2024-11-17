//empty skeleton

/*
// get incidents
export async function GET(request: Request) {
    
}

// create them
export async function POST(request: Request) {

}

// update them
export async function PUT(request: Request) {


}


// no delete since prof doesn't want that

*/

//past version I didn't want to delete yet

/*
import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Promisify the query method
const query = promisify(pool.query).bind(pool);


export async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
      const { param } = request.body;
  
      const result: any = await query(
        'INSERT INTO reports (param) VALUES (?)',
        [param]
      );
  
      response.status(201).json({ id: result.insertId, param });
    } catch (error) {
      response.status(500).json({ error: 'Error creating report' });
    }
  }
  
  export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {
      const { limit, active } = request.query;
  
      let queryStr = 'SELECT * FROM reports';
      const conditions: string[] = [];
      const params: any[] = [];
  
      if (active) {
        conditions.push('isActive = ?');
        params.push(active === 'true');
      }
  
      if (conditions.length) {
        queryStr += ' WHERE ' + conditions.join(' AND ');
      }
  
      if (limit) {
        queryStr += ' LIMIT ?';
        params.push(parseInt(limit as string, 10));
      }
  
      const rows: any = await query(queryStr);
  
      response.status(200).json(rows);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching reports' });
    }
  }
    */
   //notes for ideas to research
  //thunderclient**, postman
  //discord --> how to rebase 


  //current implementation

  // /api/report/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Types
interface Report {
// "report" object components? modify later
  
  id?: number;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  is_active: boolean;
  created_at?: string;
  
}

export async function POST(request: NextRequest) {
  try {
    const body: Omit<Report, 'id' | 'created_at'> = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.severity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert the report
    const { data, error } = await supabase
      .from('reports')
      .insert({
        title: body.title,
        description: body.description,
        severity: body.severity,
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating report:', error);
      return NextResponse.json(
        { error: 'Failed to create report' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters, likely modify later
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const isActive = searchParams.get('isActive');
    const severity = searchParams.get('severity');
    const search = searchParams.get('search');

    // Calculate offset
    const offset = (page - 1) * limit;

    // Start building the query
    let query = supabase
      .from('reports')
      .select('*', { count: 'exact' });

    // Add filters
    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true');
    }

    if (severity) {
      query = query.eq('severity', severity);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Add ordering and pagination
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching reports:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reports' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        total: count ?? 0,
        page,
        limit,
        pages: Math.ceil((count ?? 0) / limit)
      }
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}