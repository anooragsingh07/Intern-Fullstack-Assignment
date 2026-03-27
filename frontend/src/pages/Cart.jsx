// Cart page - Shows all items in shopping cart
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, loading } = useCart();

  // Loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any items yet.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart items list */}
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart summary */}
        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
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

            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
