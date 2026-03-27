// Cart Routes - Define API endpoints for shopping cart
const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// GET /api/cart - Get all cart items
router.get('/', getCartItems);

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete('/', clearCart);

module.exports = router;
