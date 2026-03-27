// Order Routes - Define API endpoints for orders
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders
} = require('../controllers/orderController');

// GET /api/orders - Get all orders for current session
router.get('/', getMyOrders);

// GET /api/orders/:id - Get order by ID
router.get('/:id', getOrderById);

// POST /api/orders - Create new order
router.post('/', createOrder);

module.exports = router;
