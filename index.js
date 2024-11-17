/*
// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// POST route to submit a report and add it to the database
app.post('/api/report', async (req, res) => {
  const { title, content, active } = req.body;

  try {
    const query = 'INSERT INTO reports (title, content, active) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, content, active];
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while submitting the report' });
  }
});

// GET route to retrieve reports with query parameters
app.get('/api/report', async (req, res) => {
  const { limit, active } = req.query;

  try {
    let query = 'SELECT * FROM reports';
    const values = [];

    if (active !== undefined) {
      query += ' WHERE active = $1';
      values.push(active === 'true');
    }

    if (limit !== undefined) {
      query += ' LIMIT $2';
      values.push(parseInt(limit, 10));
    }

    const result = await db.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching reports' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
