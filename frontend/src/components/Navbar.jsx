// Navbar component - Navigation bar with cart icon
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  // Get item count from cart context
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          🛒 ShopEase
        </Link>

        {/* Navigation links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Products
          </Link>
          
          {/* Cart link with item count badge */}
          <Link to="/cart" className="nav-link cart-link">
            🛍️ Cart
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
