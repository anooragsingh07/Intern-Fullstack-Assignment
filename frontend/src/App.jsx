// Main App component - Sets up routing for the application
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <div className="app">
      {/* Navigation bar appears on all pages */}
      <Navbar />
      
      {/* Main content area with routes */}
      <main className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <Routes>
          {/* Home page - shows all products */}
          <Route path="/" element={<ProductList />} />
          
          {/* Product detail page */}
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Shopping cart page */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Checkout page */}
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Order confirmation page */}
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
