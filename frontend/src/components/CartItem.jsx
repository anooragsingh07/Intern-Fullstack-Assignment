// CartItem component - Single item in shopping cart
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  // Handle quantity change
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity >= 1) {
      await updateQuantity(item.id, newQuantity);
    }
  };

  // Handle remove item
  const handleRemove = async () => {
    await removeItem(item.id);
  };

  return (
    <div className="cart-item">
      {/* Product image */}
      <div className="cart-item-image">
        <img 
          src={item.image_url} 
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
          }}
        />
      </div>

      {/* Product details */}
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="cart-item-subtotal">
        ${item.subtotal.toFixed(2)}
      </div>

      {/* Remove button */}
      <button 
        className="cart-item-remove"
        onClick={handleRemove}
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
