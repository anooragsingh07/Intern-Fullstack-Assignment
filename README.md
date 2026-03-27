# ShopEase - E-Commerce Application

A minimal full-stack e-commerce application built with React, Node.js, Express, and MySQL.

## Features

- **Product Listing**: Browse all products with category filtering
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout**: Place orders with shipping information
- **Order Confirmation**: View order details after purchase

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/        # Request handlers
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── models/             # Database queries
│   │   ├── productModel.js
│   │   ├── cartModel.js
│   │   └── orderModel.js
│   ├── routes/             # API routes
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── database/           # SQL scripts
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── CartItem.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── OrderConfirmation.jsx
│   │   ├── context/        # React Context
│   │   │   └── CartContext.jsx
│   │   ├── services/       # API calls
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

### 1. Database Setup

1. Start MySQL server
2. Login to MySQL:
   ```bash
   mysql -u root -p
   ```
3. Run the schema script to create tables:
   ```bash
   source backend/database/schema.sql
   ```
4. Run the seed script to add sample products:
   ```bash
   source backend/database/seed.sql
   ```

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Open `.env` file
   - Update `DB_PASSWORD` with your MySQL password
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=ecommerce_db
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=keyword` - Search products

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Browse products and click on any product to see details
3. Add items to cart using the "Add to Cart" button
4. Click on the cart icon to view your cart
5. Proceed to checkout and fill in your details
6. Place your order and see the confirmation page

## Notes

- No authentication is required - cart is managed using session IDs
- Images are loaded from Unsplash (requires internet connection)
- Free shipping is applied to all orders
