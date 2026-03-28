// ============================================
// PRODUCT MODEL
// ============================================
// This file contains all database queries related to products
// We use raw MySQL queries (no ORM) for simplicity

const { pool } = require('../config/db');

const Product = {
  
  // ----------------------------------------
  // GET ALL PRODUCTS
  // ----------------------------------------
  // SQL: SELECT * FROM products
  // Returns: Array of all products
  
  getAll: async () => {
    const query = 'SELECT * FROM products';
    const [rows] = await pool.query(query);
    return rows;
  },

  // ----------------------------------------
  // GET PRODUCT BY ID
  // ----------------------------------------
  // SQL: SELECT * FROM products WHERE id = ?
  // The ? is a placeholder - prevents SQL injection attacks
  // Returns: Single product object or undefined
  
  getById: async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0]; // Return first match (or undefined if not found)
  },

  // ----------------------------------------
  // GET PRODUCTS BY CATEGORY
  // ----------------------------------------
  // SQL: SELECT * FROM products WHERE category = ?
  // Returns: Array of products in that category
  
  getByCategory: async (category) => {
    const query = 'SELECT * FROM products WHERE category = ?';
    const [rows] = await pool.query(query, [category]);
    return rows;
  },

  // ----------------------------------------
  // SEARCH PRODUCTS BY NAME
  // ----------------------------------------
  // SQL: SELECT * FROM products WHERE name LIKE '%searchTerm%'
  // LIKE with % wildcards finds partial matches
  // Example: "phone" matches "iPhone", "Smartphone", etc.
  
  searchByName: async (searchTerm) => {
    const query = 'SELECT * FROM products WHERE name LIKE ?';
    const [rows] = await pool.query(query, [`%${searchTerm}%`]);
    return rows;
  }
};

module.exports = Product;
