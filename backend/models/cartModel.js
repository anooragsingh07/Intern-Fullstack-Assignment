// ============================================
// CART MODEL
// ============================================
// This file contains all database queries related to the shopping cart
// Uses JOIN to fetch product details along with cart items

const { pool } = require('../config/db');

const Cart = {
  
  // ----------------------------------------
  // GET ALL CART ITEMS (with product details)
  // ----------------------------------------
  // Uses JOIN to combine cart and products tables
  // This way we get product name, price, image along with quantity
  //
  // SQL Explanation:
  // - SELECT: Choose which columns to return
  // - FROM cart c: "c" is an alias (shortcut) for cart table
  // - JOIN products p: Combine with products table (alias "p")
  // - ON c.product_id = p.id: Match cart items to their products
  // - WHERE c.session_id = ?: Only get items for this user
  
  getItems: async (sessionId) => {
    const query = `
      SELECT 
        c.id,                           
        c.quantity,                     
        p.id AS product_id,             
        p.name,                         
        p.price,                        
        p.image_url,
        (c.quantity * p.price) AS subtotal  
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.session_id = ?
    `;
    const [rows] = await pool.query(query, [sessionId]);
    return rows;
  },

  // ----------------------------------------
  // ADD ITEM TO CART
  // ----------------------------------------
  // First checks if item already exists in cart
  // If yes: Update quantity (add more)
  // If no: Insert new row
  
  addItem: async (sessionId, productId, quantity = 1) => {
    // Step 1: Check if this product is already in user's cart
    const checkQuery = 'SELECT id, quantity FROM cart WHERE session_id = ? AND product_id = ?';
    const [existing] = await pool.query(checkQuery, [sessionId, productId]);

    if (existing.length > 0) {
      // Product exists in cart - update quantity
      const newQuantity = existing[0].quantity + quantity;
      const updateQuery = 'UPDATE cart SET quantity = ? WHERE id = ?';
      await pool.query(updateQuery, [newQuantity, existing[0].id]);
      return { id: existing[0].id, quantity: newQuantity };
    } else {
      // Product not in cart - insert new item
      const insertQuery = 'INSERT INTO cart (session_id, product_id, quantity) VALUES (?, ?, ?)';
      const [result] = await pool.query(insertQuery, [sessionId, productId, quantity]);
      return { id: result.insertId, quantity };
    }
  },

  // ----------------------------------------
  // UPDATE CART ITEM QUANTITY
  // ----------------------------------------
  // SQL: UPDATE cart SET quantity = ? WHERE id = ?
  
  updateQuantity: async (cartId, quantity) => {
    const query = 'UPDATE cart SET quantity = ? WHERE id = ?';
    await pool.query(query, [quantity, cartId]);
  },

  // ----------------------------------------
  // REMOVE ITEM FROM CART
  // ----------------------------------------
  // SQL: DELETE FROM cart WHERE id = ?
  
  removeItem: async (cartId) => {
    const query = 'DELETE FROM cart WHERE id = ?';
    await pool.query(query, [cartId]);
  },

  // ----------------------------------------
  // CLEAR ENTIRE CART
  // ----------------------------------------
  // Removes all items for a specific user
  // Used after order is placed
  
  clearCart: async (sessionId) => {
    const query = 'DELETE FROM cart WHERE session_id = ?';
    await pool.query(query, [sessionId]);
  },

  // ----------------------------------------
  // GET CART TOTAL
  // ----------------------------------------
  // Uses SUM to calculate total price
  // SUM(quantity * price) adds up all subtotals
  
  getTotal: async (sessionId) => {
    const query = `
      SELECT SUM(c.quantity * p.price) AS total
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.session_id = ?
    `;
    const [rows] = await pool.query(query, [sessionId]);
    return rows[0].total || 0; // Return 0 if cart is empty
  }
};

module.exports = Cart;
