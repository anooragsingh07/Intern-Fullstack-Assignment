// ============================================
// ORDER ROUTES
// ============================================
// Defines URL endpoints for order operations
// Base path: /api/orders

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders
} = require('../controllers/orderController');

// ----------------------------------------
// GET /api/orders
// ----------------------------------------
// Get all orders for current user
// Example: GET http://localhost:5000/api/orders
// Headers: x-session-id: user-123

router.get('/', getMyOrders);

// ----------------------------------------
// GET /api/orders/:id
// ----------------------------------------
// Get order details by ID
// Returns order info + array of items
// Example: GET http://localhost:5000/api/orders/1

router.get('/:id', getOrderById);

// ----------------------------------------
// POST /api/orders
// ----------------------------------------
// Create new order from cart
// This will:
// 1. Create order from cart items
// 2. Clear the cart
// 
// Example: POST http://localhost:5000/api/orders
// Body: {
//   "customerName": "John Doe",
//   "customerEmail": "john@example.com",
//   "shippingAddress": "123 Main St, City, Country"
// }
// Headers: x-session-id: user-123

router.post('/', createOrder);

module.exports = router;
