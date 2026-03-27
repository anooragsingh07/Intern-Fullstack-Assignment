// Database connection configuration using MySQL2
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool for better performance
// Pool manages multiple connections and reuses them
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Maximum number of connections in pool
  queueLimit: 0         // Unlimited queueing
});

// Convert pool to use promises for async/await support
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release(); // Release connection back to pool
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

module.exports = { pool: promisePool, testConnection };
