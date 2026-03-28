// ============================================
// PRODUCT CONTROLLER
// ============================================
// Handles HTTP requests for product-related operations
// Each function receives (req, res) and sends a response

const Product = require('../models/productModel');

// ----------------------------------------
// GET /api/products
// ----------------------------------------
// Returns all products from the database
// Response: Array of product objects

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from database
    const products = await Product.getAll();
    
    // Send products as JSON response
    res.json(products);
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching products:', error);
    
    // Send error response with 500 status (Internal Server Error)
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// ----------------------------------------
// GET /api/products/:id
// ----------------------------------------
// Returns a single product by its ID
// URL param: id (e.g., /api/products/5)
// Response: Single product object or 404 error

const getProductById = async (req, res) => {
  try {
    // Extract 'id' from URL parameters
    // Example: /api/products/5 → id = "5"
    const { id } = req.params;
    
    // Fetch product from database
    const product = await Product.getById(id);
    
    // If product not found, send 404 error
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Send product as JSON response
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// ----------------------------------------
// GET /api/products/category/:category
// ----------------------------------------
// Returns products filtered by category
// URL param: category (e.g., /api/products/category/Electronics)

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.getByCategory(category);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// ----------------------------------------
// GET /api/products/search?q=keyword
// ----------------------------------------
// Searches products by name
// Query param: q (e.g., /api/products/search?q=phone)

const searchProducts = async (req, res) => {
  try {
    // Extract 'q' from query string
    const { q } = req.query;
    
    // Validate: search query is required
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const products = await Product.searchByName(q);
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
};

// Export all controller functions
module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts
};
