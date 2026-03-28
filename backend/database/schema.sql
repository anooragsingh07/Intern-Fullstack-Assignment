-- ============================================
-- E-COMMERCE DATABASE SCHEMA
-- ============================================
-- This file creates all the tables needed for the e-commerce application
-- Run this file in MySQL to set up your database

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- ============================================
-- TABLE 1: PRODUCTS
-- ============================================
-- Stores all product information
-- Each row represents one product in our store

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique ID for each product (auto-generated)
    name VARCHAR(255) NOT NULL,                 -- Product name (required)
    description TEXT,                           -- Detailed product description
    price DECIMAL(10, 2) NOT NULL,              -- Price with 2 decimal places (e.g., 99.99)
    category VARCHAR(100),                      -- Product category (e.g., "Electronics")
    image_url VARCHAR(500),                     -- URL to product image
    stock INT DEFAULT 0,                        -- Number of items in stock
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When product was added
);

-- ============================================
-- TABLE 2: CART
-- ============================================
-- Stores shopping cart items
-- Links users (via session_id) to products they want to buy

CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique cart item ID
    session_id VARCHAR(255) NOT NULL,           -- Identifies the user's session (like a temporary user ID)
    product_id INT NOT NULL,                    -- Which product is in the cart
    quantity INT DEFAULT 1,                     -- How many of this product
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key: Links to products table
    -- ON DELETE CASCADE: If product is deleted, remove it from all carts
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE 3: ORDERS
-- ============================================
-- Stores completed orders
-- Created when user checks out their cart

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique order ID (order number)
    session_id VARCHAR(255) NOT NULL,           -- Which user placed this order
    customer_name VARCHAR(255) NOT NULL,        -- Customer's full name
    customer_email VARCHAR(255) NOT NULL,       -- Customer's email for confirmation
    shipping_address TEXT NOT NULL,             -- Where to ship the order
    total_amount DECIMAL(10, 2) NOT NULL,       -- Total price of the order
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When order was placed
);

-- ============================================
-- TABLE 4: ORDER_ITEMS
-- ============================================
-- Stores individual items in each order
-- One order can have many items (one-to-many relationship)

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,                      -- Which order this item belongs to
    product_id INT NOT NULL,                    -- Which product was ordered
    quantity INT NOT NULL,                      -- How many were ordered
    price DECIMAL(10, 2) NOT NULL,              -- Price at time of purchase (stored separately in case price changes later)
    
    -- Foreign Keys
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ============================================
-- INDEXES (for faster queries)
-- ============================================
-- Indexes speed up searches on frequently used columns

CREATE INDEX idx_cart_session ON cart(session_id);
CREATE INDEX idx_orders_session ON orders(session_id);
CREATE INDEX idx_products_category ON products(category);
