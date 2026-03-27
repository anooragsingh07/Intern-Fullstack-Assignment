// ProductCard component - Displays a single product in the grid
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Handle add to cart click
  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    await addToCart(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Product image */}
      <div className="product-image">
        <img 
          src={product.image_url} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>

      {/* Product info */}
      <div className="product-info">
        {/* Category badge */}
        <span className="product-category">{product.category}</span>
        
        {/* Product name */}
        <h3 className="product-name">{product.name}</h3>
        
        {/* Price and add to cart */}
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
