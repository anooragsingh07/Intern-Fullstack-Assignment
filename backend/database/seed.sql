-- ============================================
-- SEED DATA FOR E-COMMERCE DATABASE
-- ============================================
-- Run this file after schema.sql to add sample products
-- Contains 10 products across 3 categories

USE ecommerce_db;

-- Clear existing products (optional - remove if you want to keep existing data)
-- DELETE FROM products;

-- ============================================
-- INSERT 10 SAMPLE PRODUCTS
-- ============================================

INSERT INTO products (name, price, description, image_url, category, stock) VALUES

-- ============================================
-- ELECTRONICS (4 products)
-- ============================================

(
    'Wireless Bluetooth Headphones',
    79.99,
    'Premium noise-cancelling wireless headphones with 30-hour battery life, deep bass, and comfortable over-ear cushions. Perfect for music lovers and professionals.',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    'Electronics',
    50
),

(
    'Smart Watch Pro',
    199.99,
    'Advanced fitness tracking smartwatch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water resistant up to 50 meters.',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    'Electronics',
    35
),

(
    'Portable Bluetooth Speaker',
    49.99,
    'Compact waterproof speaker with 360-degree sound, 12-hour playtime, and built-in microphone for hands-free calls. Perfect for outdoor adventures.',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    'Electronics',
    100
),

(
    'Wireless Earbuds Pro',
    129.99,
    'True wireless earbuds with active noise cancellation, transparency mode, and premium sound quality. Includes wireless charging case with 24-hour total battery.',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    'Electronics',
    75
),

-- ============================================
-- FASHION (3 products)
-- ============================================

(
    'Classic Denim Jacket',
    89.99,
    'Timeless denim jacket with vintage wash finish, brass buttons, and comfortable cotton lining. Available in multiple sizes. Perfect for casual everyday wear.',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
    'Fashion',
    40
),

(
    'Premium Leather Sneakers',
    149.99,
    'Handcrafted leather sneakers with cushioned insole, durable rubber outsole, and minimalist design. Comfortable for all-day wear.',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    'Fashion',
    60
),

(
    'Cotton Casual T-Shirt',
    29.99,
    '100% organic cotton t-shirt with relaxed fit and reinforced stitching. Soft, breathable, and perfect for everyday comfort. Pre-shrunk fabric.',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    'Fashion',
    200
),

-- ============================================
-- BOOKS (3 products)
-- ============================================

(
    'The Art of Programming',
    39.99,
    'Comprehensive guide to modern software development covering algorithms, data structures, and best practices. Perfect for beginners and intermediate developers.',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    'Books',
    80
),

(
    'Business Strategy Masterclass',
    34.99,
    'Learn proven strategies from top business leaders. Covers market analysis, competitive positioning, and growth hacking techniques for startups and enterprises.',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    'Books',
    65
),

(
    'Mindfulness and Productivity',
    24.99,
    'Transform your daily routine with practical mindfulness techniques. Boost focus, reduce stress, and achieve work-life balance with science-backed methods.',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    'Books',
    90
);

-- ============================================
-- VERIFY INSERTED DATA
-- ============================================

SELECT 
    id,
    name,
    price,
    category,
    stock
FROM products
ORDER BY category, name;

-- Show count by category
SELECT 
    category,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price
FROM products
GROUP BY category;
