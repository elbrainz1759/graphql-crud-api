// db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'your_password',
  database: 'graphql',
  waitForConnections: true,
  connectionLimit: 10,
});
