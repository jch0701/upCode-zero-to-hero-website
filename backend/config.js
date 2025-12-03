import 'dotenv/config';
import mysql from 'mysql2/promise';
/*
Very important: Do NOT commit your .env file to source control (git)
Add the following files to backend (not visible in GitHub):
.env
.gitignore
inside .env put your local database password like so:
DB_PASSWORD=yourpasswordhere
Note: No space around the = sign
inside .gitignore add the line:
.env
*/

export const config = {
  db: {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: 'UpCodeDB',
    port: 3306
  }
};

let pool;

export async function createPool() {
  if (!pool) {
    pool = mysql.createPool(config.db);
  }
  return pool;
}

// connection config used to create DB (connect without database first)
const connectionConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port
};

// SQL: create database only 
const schema = `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`;


/*
MySQL: Write your DDL statements here
Create tables, triggers, procedures, etc.
Example: Create Users table
const tableUsers = `
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
*/

export async function initDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(schema); // Create database if it doesn't exist
    await connection.query(`USE \`${config.db.database}\`;`); // Switch to the database
    // Add your DDL queries connection here
    // Example: await connection.query(tableUsers); 
    console.log("Database ensured:", config.db.database);
    await connection.end();
  } catch (err) {
    console.error("Warning: Failed to initialize database schema. Please check your database configuration.", err);
  }
}