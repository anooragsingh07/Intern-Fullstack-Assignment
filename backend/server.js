// Main server file - Entry point for the backend application
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const { testConnection } = require('./config/db');

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();

// ===================
// MIDDLEWARE SETUP
// ===================

// Enable CORS - allows frontend to communicate with backend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ===================
// API ROUTES
// ===================

// Product routes - /api/products
app.use('/api/products', productRoutes);

// Cart routes - /api/cart
app.use('/api/cart', cartRoutes);

// Order routes - /api/orders
app.use('/api/orders', orderRoutes);

// Root route - API health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-Commerce API is running!',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders'
    }
  });
});

// ===================
// ERROR HANDLING
// ===================

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ===================
// START SERVER
// ===================

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  // Test database connection on startup
  await testConnection();
});
