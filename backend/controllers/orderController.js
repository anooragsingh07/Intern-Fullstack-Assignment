// ============================================
// ORDER CONTROLLER
// ============================================
// Handles HTTP requests for order operations
// Creates orders from cart items and clears cart after

const Order = require('../models/orderModel');

// Helper function to get session ID
const getSessionId = (req) => {
  return req.headers['x-session-id'] || 'default-session';
};

// ----------------------------------------
// POST /api/orders
// ----------------------------------------
// Creates a new order from the current cart
// Request body: { customerName, customerEmail, shippingAddress }
// 
// This operation:
// 1. Takes all items from the cart
// 2. Creates an order with those items
// 3. Clears the cart
// 4. Returns the order ID and total

const createOrder = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    
    // Extract customer details from request body
    const { customerName, customerEmail, shippingAddress } = req.body;
    
    // Validate: All fields are required
    if (!customerName || !customerEmail || !shippingAddress) {
      return res.status(400).json({ 
        error: 'Customer name, email, and shipping address are required' 
      });
    }
    
    // Create the order (this also clears the cart)
    const result = await Order.create(
      sessionId, 
      customerName, 
      customerEmail, 
      shippingAddress
    );
    
    // Send success response with 201 status (Created)
    res.status(201).json({ 
      message: 'Order placed successfully!',
      orderId: result.orderId,
      totalAmount: result.totalAmount
    });
  } catch (error) {
    console.error('Error creating order:', error);
    
    // Handle specific error: empty cart
    if (error.message === 'Cart is empty') {
      return res.status(400).json({ error: 'Cannot create order: Cart is empty' });
    }
    
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// ----------------------------------------
// GET /api/orders/:id
// ----------------------------------------
// Returns a specific order with all its items
// URL param: id (order ID)
// Response includes order details + array of items

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.getById(id);
    
    // If order not found, send 404
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// ----------------------------------------
// GET /api/orders
// ----------------------------------------
// Returns all orders for the current user
// Sorted by most recent first

const getMyOrders = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const orders = await Order.getBySession(sessionId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders
};
