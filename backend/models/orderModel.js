// ============================================
// ORDER MODEL
// ============================================
// This file handles order creation and retrieval
// Uses TRANSACTIONS to ensure data consistency

const { pool } = require('../config/db');

const Order = {
  
  // ----------------------------------------
  // CREATE NEW ORDER
  // ----------------------------------------
  // This is a complex operation that:
  // 1. Gets all items from the cart
  // 2. Creates an order record
  // 3. Copies cart items to order_items
  // 4. Clears the cart
  //
  // Uses TRANSACTION: All steps must succeed, or none do
  // This prevents partial orders (e.g., order created but cart not cleared)
  
  create: async (sessionId, customerName, customerEmail, shippingAddress) => {
    // Get a dedicated connection for the transaction
    const connection = await pool.getConnection();
    
    try {
      // START TRANSACTION - Begin atomic operation
      await connection.beginTransaction();

      // Step 1: Get all cart items with prices
      const cartQuery = `
        SELECT c.product_id, c.quantity, p.price
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.session_id = ?
      `;
      const [cartItems] = await connection.query(cartQuery, [sessionId]);

      // Check if cart is empty
      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Step 2: Calculate total amount
      // reduce() adds up (quantity × price) for each item
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.quantity * item.price), 
        0
      );

      // Step 3: Create the order record
      const orderQuery = `
        INSERT INTO orders (session_id, customer_name, customer_email, shipping_address, total_amount, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
      `;
      const [orderResult] = await connection.query(
        orderQuery,
        [sessionId, customerName, customerEmail, shippingAddress, totalAmount]
      );
      const orderId = orderResult.insertId;

      // Step 4: Copy each cart item to order_items
      const orderItemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `;
      for (const item of cartItems) {
        await connection.query(orderItemQuery, [
          orderId, 
          item.product_id, 
          item.quantity, 
          item.price
        ]);
      }

      // Step 5: Clear the cart
      const clearCartQuery = 'DELETE FROM cart WHERE session_id = ?';
      await connection.query(clearCartQuery, [sessionId]);

      // COMMIT TRANSACTION - Save all changes
      await connection.commit();

      return { orderId, totalAmount };
      
    } catch (error) {
      // ROLLBACK - Undo all changes if any step failed
      await connection.rollback();
      throw error;
    } finally {
      // Always release the connection back to the pool
      connection.release();
    }
  },

  // ----------------------------------------
  // GET ORDER BY ID (with items)
  // ----------------------------------------
  // Returns order details plus all items in the order
  
  getById: async (orderId) => {
    // Get order details
    const orderQuery = 'SELECT * FROM orders WHERE id = ?';
    const [orders] = await pool.query(orderQuery, [orderId]);

    if (orders.length === 0) {
      return null;
    }

    // Get order items with product details (using JOIN)
    const itemsQuery = `
      SELECT 
        oi.id,
        oi.quantity,
        oi.price,
        p.id AS product_id,
        p.name,
        p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `;
    const [items] = await pool.query(itemsQuery, [orderId]);

    // Combine order with its items
    return { ...orders[0], items };
  },

  // ----------------------------------------
  // GET ALL ORDERS FOR A USER
  // ----------------------------------------
  // Returns list of orders (without items)
  // Sorted by newest first
  
  getBySession: async (sessionId) => {
    const query = 'SELECT * FROM orders WHERE session_id = ? ORDER BY created_at DESC';
    const [rows] = await pool.query(query, [sessionId]);
    return rows;
  }
};

module.exports = Order;
