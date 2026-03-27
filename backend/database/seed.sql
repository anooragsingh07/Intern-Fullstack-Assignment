-- Seed data for E-Commerce Database
-- Run this after schema.sql to populate sample products

USE ecommerce_db;

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES

-- Electronics
('Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 149.99, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', 50),
('Smart Watch', 'Fitness tracking smartwatch with heart rate monitor and GPS', 299.99, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', 30),
('Bluetooth Speaker', 'Portable waterproof speaker with 360-degree sound', 79.99, 'Electronics', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300', 100),
('Laptop Stand', 'Ergonomic aluminum laptop stand for better posture', 49.99, 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', 75),

-- Clothing
('Classic White T-Shirt', 'Comfortable 100% cotton t-shirt, perfect for everyday wear', 24.99, 'Clothing', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', 200),
('Denim Jacket', 'Vintage style denim jacket with brass buttons', 89.99, 'Clothing', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300', 45),
('Running Shoes', 'Lightweight running shoes with cushioned sole', 129.99, 'Clothing', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', 60),
('Leather Belt', 'Genuine leather belt with classic buckle', 39.99, 'Clothing', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=300', 80),

-- Home & Kitchen
('Coffee Maker', 'Programmable 12-cup coffee maker with thermal carafe', 69.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300', 40),
('Stainless Steel Cookware Set', '10-piece professional cookware set', 199.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1584990347449-a5d9f800d3b5?w=300', 25),
('Plant Pot Set', 'Modern ceramic plant pots, set of 3', 34.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300', 120),
('Throw Blanket', 'Soft fleece throw blanket, perfect for cozy evenings', 44.99, 'Home & Kitchen', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300', 90),

-- Books
('JavaScript: The Good Parts', 'Essential guide to JavaScript programming', 29.99, 'Books', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300', 150),
('Clean Code', 'A handbook of agile software craftsmanship', 39.99, 'Books', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300', 100),
('The Design of Everyday Things', 'Classic book on user-centered design', 24.99, 'Books', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300', 80);

-- Verify the data was inserted
SELECT CONCAT('Inserted ', COUNT(*), ' products') as status FROM products;
