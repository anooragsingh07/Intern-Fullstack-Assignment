// ProductList page - Displays all products with optional category filter
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import * as api from '../services/api';
import './ProductList.css';

const ProductList = () => {
  // State for products, loading, error, and selected category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch products when component mounts or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (selectedCategory === 'all') {
          data = await api.getProducts();
        } else {
          data = await api.getProductsByCategory(selectedCategory);
        }
        
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-page">
      <h1 className="page-title">Our Products</h1>

      {/* Category filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Products' : category}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
