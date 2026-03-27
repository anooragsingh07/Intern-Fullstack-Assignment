// Order Controller - Handles HTTP requests for orders
const Order = require('../models/orderModel');

// Helper function to get session ID
const getSessionId = (req) => {
  return req.headers['x-session-id'] || 'default-session';
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { customerName, customerEmail, shippingAddress } = req.body;
    
    // Validate required fields
    if (!customerName || !customerEmail || !shippingAddress) {
      return res.status(400).json({ 
        error: 'Customer name, email, and shipping address are required' 
      });
    }
    
    const result = await Order.create(
      sessionId, 
      customerName, 
      customerEmail, 
      shippingAddress
    );
    
    res.status(201).json({ 
      message: 'Order placed successfully!',
      orderId: result.orderId,
      totalAmount: result.totalAmount
    });
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.message === 'Cart is empty') {
      return res.status(400).json({ error: 'Cannot create order: Cart is empty' });
    }
    
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.getById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Get all orders for current session
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
