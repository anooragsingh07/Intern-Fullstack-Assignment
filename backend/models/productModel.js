// Product Model - Handles all database operations for products
const { pool } = require('../config/db');

const Product = {
  // Get all products from database
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  },

  // Get a single product by its ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0]; // Return first match or undefined
  },

  // Get products by category
  getByCategory: async (category) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE category = ?', [category]);
    return rows;
  },

  // Search products by name
  searchByName: async (searchTerm) => {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE name LIKE ?',
      [`%${searchTerm}%`]
    );
    return rows;
  }
};

module.exports = Product;
