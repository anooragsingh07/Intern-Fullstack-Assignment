// ============================================
// PRODUCT ROUTES
// ============================================
// Defines URL endpoints for product operations
// Base path: /api/products

const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts
} = require('../controllers/productController');

// ----------------------------------------
// GET /api/products
// ----------------------------------------
// Get all products
// Example: GET http://localhost:5000/api/products

router.get('/', getAllProducts);

// ----------------------------------------
// GET /api/products/search?q=keyword
// ----------------------------------------
// Search products by name
// Example: GET http://localhost:5000/api/products/search?q=phone

router.get('/search', searchProducts);

// ----------------------------------------
// GET /api/products/category/:category
// ----------------------------------------
// Get products by category
// Example: GET http://localhost:5000/api/products/category/Electronics

router.get('/category/:category', getProductsByCategory);

// ----------------------------------------
// GET /api/products/:id
// ----------------------------------------
// Get single product by ID
// Example: GET http://localhost:5000/api/products/5
// Note: This route must come LAST to avoid matching "search" or "category" as :id

router.get('/:id', getProductById);

module.exports = router;
