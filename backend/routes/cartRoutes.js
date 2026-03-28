// ============================================
// CART ROUTES
// ============================================
// Defines URL endpoints for shopping cart operations
// Base path: /api/cart

const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// ----------------------------------------
// GET /api/cart
// ----------------------------------------
// Get all cart items with product details
// Uses JOIN query to fetch product info
// Example: GET http://localhost:5000/api/cart
// Headers: x-session-id: user-123

router.get('/', getCartItems);

// ----------------------------------------
// POST /api/cart
// ----------------------------------------
// Add item to cart
// Example: POST http://localhost:5000/api/cart
// Body: { "productId": 5, "quantity": 2 }
// Headers: x-session-id: user-123

router.post('/', addToCart);

// ----------------------------------------
// PUT /api/cart/:id
// ----------------------------------------
// Update cart item quantity
// Example: PUT http://localhost:5000/api/cart/1
// Body: { "quantity": 3 }

router.put('/:id', updateCartItem);

// ----------------------------------------
// DELETE /api/cart/:id
// ----------------------------------------
// Remove single item from cart
// Example: DELETE http://localhost:5000/api/cart/1

router.delete('/:id', removeFromCart);

// ----------------------------------------
// DELETE /api/cart
// ----------------------------------------
// Clear entire cart
// Example: DELETE http://localhost:5000/api/cart
// Headers: x-session-id: user-123

router.delete('/', clearCart);

module.exports = router;
