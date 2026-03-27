// API service - Handles all HTTP requests to the backend

// Base URL for API requests
const API_BASE_URL = '/api';

// Session ID for cart (in a real app, this would be from authentication)
const SESSION_ID = 'user-session-' + Math.random().toString(36).substr(2, 9);

// Helper function to make API requests
const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': SESSION_ID,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }

  return response.json();
};

// ==================
// PRODUCT API CALLS
// ==================

// Get all products
export const getProducts = () => fetchApi('/products');

// Get single product by ID
export const getProductById = (id) => fetchApi(`/products/${id}`);

// Get products by category
export const getProductsByCategory = (category) => 
  fetchApi(`/products/category/${category}`);

// Search products
export const searchProducts = (query) => 
  fetchApi(`/products/search?q=${encodeURIComponent(query)}`);

// ==================
// CART API CALLS
// ==================

// Get cart items
export const getCart = () => fetchApi('/cart');

// Add item to cart
export const addToCart = (productId, quantity = 1) => 
  fetchApi('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });

// Update cart item quantity
export const updateCartItem = (cartItemId, quantity) => 
  fetchApi(`/cart/${cartItemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });

// Remove item from cart
export const removeFromCart = (cartItemId) => 
  fetchApi(`/cart/${cartItemId}`, {
    method: 'DELETE',
  });

// Clear entire cart
export const clearCart = () => 
  fetchApi('/cart', {
    method: 'DELETE',
  });

// ==================
// ORDER API CALLS
// ==================

// Create new order
export const createOrder = (orderData) => 
  fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });

// Get order by ID
export const getOrderById = (orderId) => fetchApi(`/orders/${orderId}`);

// Get all orders for current session
export const getMyOrders = () => fetchApi('/orders');
