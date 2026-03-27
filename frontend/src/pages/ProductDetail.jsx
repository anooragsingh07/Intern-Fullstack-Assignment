// ProductDetail page - Shows detailed information about a single product
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import * as api from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  // Get product ID from URL params
  const { id } = useParams();
  const { addToCart } = useCart();

  // State for product data and UI
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle add to cart
  const handleAddToCart = async () => {
    const success = await addToCart(product.id, quantity);
    if (success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="error-state">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Back link */}
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-detail-container">
        {/* Product image */}
        <div className="product-detail-image">
          <img 
            src={product.image_url} 
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
            }}
          />
        </div>

        {/* Product info */}
        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <p className="product-detail-description">
            {product.description}
          </p>

          {/* Stock status */}
          <p className="product-detail-stock">
            {product.stock > 0 ? (
              <span className="in-stock">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">✕ Out of Stock</span>
            )}
          </p>

          {/* Quantity selector */}
          <div className="quantity-selector">
            <span>Quantity:</span>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button 
            className="btn btn-primary add-to-cart-large"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>

          {addedToCart && (
            <Link to="/cart" className="view-cart-link">
              View Cart →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
