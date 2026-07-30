import mysql from 'mysql2/promise';

try {
  const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER || 'mora_local',
    password: process.env.DB_PASSWORD || 'mora_local_pass',
    database: process.env.DB_NAME || 'mora_local'
  });
  const conn = await pool.getConnection();
  const [rows] = await conn.query('SELECT COUNT(*) as cnt FROM cities');
  console.log('✅ Cities count:', rows[0].cnt);
  conn.release();
  pool.end();
} catch (e) {
  console.error('❌ Error:', e.message);
}
