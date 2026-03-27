// Checkout page - Form to place order
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import * as api from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, refreshCart } = useCart();
  
  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Create order
      const result = await api.createOrder(formData);
      
      // Refresh cart (it will be empty after order)
      await refreshCart();
      
      // Navigate to confirmation page
      navigate(`/order-confirmation/${result.orderId}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h1 className="page-title">Checkout</h1>
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add some items before checking out.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Checkout form */}
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h3>Shipping Information</h3>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="customerName">Full Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email Address</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping Address</label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Enter your full shipping address"
                rows="4"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary place-order-btn"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="order-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                    }}
                  />
                  <div className="order-item-info">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
