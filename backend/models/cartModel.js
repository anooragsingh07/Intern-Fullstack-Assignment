// Cart Model - Handles all database operations for shopping cart
const { pool } = require('../config/db');

const Cart = {
  // Get all items in cart (using session_id to identify cart)
  getItems: async (sessionId) => {
    const [rows] = await pool.query(
      `SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.image_url,
              (c.quantity * p.price) as subtotal
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.session_id = ?`,
      [sessionId]
    );
    return rows;
  },

  // Add item to cart
  addItem: async (sessionId, productId, quantity = 1) => {
    // Check if item already exists in cart
    const [existing] = await pool.query(
      'SELECT id, quantity FROM cart WHERE session_id = ? AND product_id = ?',
      [sessionId, productId]
    );

    if (existing.length > 0) {
      // Update quantity if item exists
      const newQuantity = existing[0].quantity + quantity;
      await pool.query(
        'UPDATE cart SET quantity = ? WHERE id = ?',
        [newQuantity, existing[0].id]
      );
      return { id: existing[0].id, quantity: newQuantity };
    } else {
      // Insert new item if it doesn't exist
      const [result] = await pool.query(
        'INSERT INTO cart (session_id, product_id, quantity) VALUES (?, ?, ?)',
        [sessionId, productId, quantity]
      );
      return { id: result.insertId, quantity };
    }
  },

  // Update item quantity in cart
  updateQuantity: async (cartId, quantity) => {
    await pool.query(
      'UPDATE cart SET quantity = ? WHERE id = ?',
      [quantity, cartId]
    );
  },

  // Remove item from cart
  removeItem: async (cartId) => {
    await pool.query('DELETE FROM cart WHERE id = ?', [cartId]);
  },

  // Clear entire cart
  clearCart: async (sessionId) => {
    await pool.query('DELETE FROM cart WHERE session_id = ?', [sessionId]);
  },

  // Get cart total
  getTotal: async (sessionId) => {
    const [rows] = await pool.query(
      `SELECT SUM(c.quantity * p.price) as total
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.session_id = ?`,
      [sessionId]
    );
    return rows[0].total || 0;
  }
};

module.exports = Cart;
