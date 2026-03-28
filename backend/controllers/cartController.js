// ============================================
// CART CONTROLLER
// ============================================
// Handles HTTP requests for shopping cart operations
// Uses session_id to identify which user's cart to modify

const Cart = require('../models/cartModel');

// ----------------------------------------
// HELPER: Get Session ID from Request
// ----------------------------------------
// Session ID identifies the user (like a temporary user ID)
// In a real app, this would come from authentication
// Here we use a custom header 'x-session-id'

const getSessionId = (req) => {
  return req.headers['x-session-id'] || 'default-session';
};

// ----------------------------------------
// GET /api/cart
// ----------------------------------------
// Returns all items in the user's cart
// Uses JOIN to include product details (name, price, image)
// Also returns total price and item count

const getCartItems = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    
    // Get cart items with product details (uses JOIN in model)
    const items = await Cart.getItems(sessionId);
    
    // Calculate total price
    const total = await Cart.getTotal(sessionId);
    
    // Calculate total number of items
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Send response with items, total, and count
    res.json({ 
      items, 
      total,
      itemCount
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// ----------------------------------------
// POST /api/cart
// ----------------------------------------
// Adds an item to the cart
// Request body: { productId: number, quantity: number }
// If item already exists, increases quantity

const addToCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    
    // Extract data from request body
    const { productId, quantity = 1 } = req.body;
    
    // Validate: productId is required
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    // Add item to cart (handles duplicate detection in model)
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

// ----------------------------------------
// PUT /api/cart/:id
// ----------------------------------------
// Updates the quantity of a cart item
// URL param: id (cart item ID)
// Request body: { quantity: number }

const updateCartItem = async (req, res) => {
  try {
    // Get cart item ID from URL
    const { id } = req.params;
    
    // Get new quantity from request body
    const { quantity } = req.body;
    
    // Validate: quantity must be at least 1
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

// ----------------------------------------
// DELETE /api/cart/:id
// ----------------------------------------
// Removes a single item from the cart
// URL param: id (cart item ID)

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

// ----------------------------------------
// DELETE /api/cart
// ----------------------------------------
// Clears all items from the cart

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
