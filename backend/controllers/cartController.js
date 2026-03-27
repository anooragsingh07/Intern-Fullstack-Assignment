// Cart Controller - Handles HTTP requests for shopping cart
const Cart = require('../models/cartModel');

// Helper function to get session ID from request
// In a real app, this would come from authentication/session middleware
const getSessionId = (req) => {
  // Use a header or generate a simple session ID
  return req.headers['x-session-id'] || 'default-session';
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const items = await Cart.getItems(sessionId);
    const total = await Cart.getTotal(sessionId);
    
    res.json({ 
      items, 
      total,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    const result = await Cart.addItem(sessionId, productId, quantity);
    res.json({ 
      message: 'Item added to cart', 
      ...result 
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }
    
    await Cart.updateQuantity(id, quantity);
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.removeItem(id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    await Cart.clearCart(sessionId);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
