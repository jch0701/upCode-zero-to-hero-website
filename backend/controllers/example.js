import { createPool } from '../config.js';

const pool = await createPool();

/*
Example controller function
document your request queries and body like so:
query:
?email=userEmail
body:
{
  assetLiability: {
    title: string,
    value: number,
    description: string,
    date: string,
    type: "asset" | "liability",
    category: "current" | "fixed",
  }
}
*/

/*
export async function exampleController(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM ExampleTable'); // Replace with your table
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/