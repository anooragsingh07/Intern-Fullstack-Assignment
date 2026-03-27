// Order Model - Handles all database operations for orders
const { pool } = require('../config/db');

const Order = {
  // Create a new order from cart items
  create: async (sessionId, customerName, customerEmail, shippingAddress) => {
    // Start a transaction to ensure data consistency
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Get cart items and total
      const [cartItems] = await connection.query(
        `SELECT c.product_id, c.quantity, p.price
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.session_id = ?`,
        [sessionId]
      );

      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Calculate total amount
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.quantity * item.price), 
        0
      );

      // Create the order
      const [orderResult] = await connection.query(
        `INSERT INTO orders (session_id, customer_name, customer_email, shipping_address, total_amount, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [sessionId, customerName, customerEmail, shippingAddress, totalAmount]
      );

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of cartItems) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.price]
        );
      }

      // Clear the cart after successful order
      await connection.query(
        'DELETE FROM cart WHERE session_id = ?',
        [sessionId]
      );

      // Commit the transaction
      await connection.commit();

      return { orderId, totalAmount };
    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get order by ID with its items
  getById: async (orderId) => {
    // Get order details
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );

    if (orders.length === 0) {
      return null;
    }

    // Get order items with product details
    const [items] = await pool.query(
      `SELECT oi.*, p.name, p.image_url
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    return { ...orders[0], items };
  },

  // Get all orders for a session
  getBySession: async (sessionId) => {
    const [rows] = await pool.query(
      'SELECT * FROM orders WHERE session_id = ? ORDER BY created_at DESC',
      [sessionId]
    );
    return rows;
  }
};

module.exports = Order;
