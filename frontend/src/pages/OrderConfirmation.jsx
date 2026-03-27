// OrderConfirmation page - Shows order success and details
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../services/api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await api.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="order-confirmation-page">
        <div className="error-message">
          {error || 'Order not found'}
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      {/* Success message */}
      <div className="confirmation-header">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase, {order.customer_name}!</p>
      </div>

      {/* Order details card */}
      <div className="confirmation-card">
        <div className="order-info">
          <div className="info-row">
            <span>Order Number:</span>
            <strong>#{order.id}</strong>
          </div>
          <div className="info-row">
            <span>Date:</span>
            <strong>{new Date(order.created_at).toLocaleDateString()}</strong>
          </div>
          <div className="info-row">
            <span>Status:</span>
            <span className={`status-badge status-${order.status}`}>
              {order.status}
            </span>
          </div>
          <div className="info-row">
            <span>Total:</span>
            <strong className="order-total">${order.total_amount.toFixed(2)}</strong>
          </div>
        </div>

        <hr />

        {/* Shipping info */}
        <div className="shipping-info">
          <h3>Shipping Details</h3>
          <p><strong>{order.customer_name}</strong></p>
          <p>{order.customer_email}</p>
          <p>{order.shipping_address}</p>
        </div>

        <hr />

        {/* Order items */}
        <div className="order-items-section">
          <h3>Order Items</h3>
          <div className="order-items-list">
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                  }}
                />
                <div className="order-item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                </div>
                <span className="item-total">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue shopping */}
      <div className="confirmation-actions">
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
