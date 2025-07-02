// db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'graphql_school',
  waitForConnections: true,
  connectionLimit: 10,
});
