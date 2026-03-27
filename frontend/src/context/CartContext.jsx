// Cart Context - Global state management for shopping cart
import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

// Create the context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  // State for cart items, total, and item count
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await api.getCart();
      setCartItems(data.items);
      setCartTotal(data.total);
      setItemCount(data.itemCount);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.addToCart(productId, quantity);
      await fetchCart(); // Refresh cart data
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await api.updateCartItem(cartItemId, quantity);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error updating cart:', error);
      return false;
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId) => {
    try {
      await api.removeFromCart(cartItemId);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error removing item:', error);
      return false;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      await api.clearCart();
      setCartItems([]);
      setCartTotal(0);
      setItemCount(0);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  // Value object with all cart state and functions
  const value = {
    cartItems,
    cartTotal,
    itemCount,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
