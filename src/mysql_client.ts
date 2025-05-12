import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
})

export const executeQuery = async (query: string) => {
  try {
    const [resultRows] = await connection.query(query);
    return resultRows;
  } catch (error) {
    return error;
  }
};
