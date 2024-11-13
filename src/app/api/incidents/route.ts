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
  //thunderclient**, postman
  //discord --> how to rebase 