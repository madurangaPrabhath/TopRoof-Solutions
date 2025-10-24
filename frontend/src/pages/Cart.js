import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import '../assets/styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchCartItems(parsedUser.id);
  }, [navigate]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setCartItems(cartItems.map(item => 
          item.id === cartItemId ? updatedItem : item
        ));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (cartItemId) => {
    if (!window.confirm('Remove this item from cart?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${cartItemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
        alert('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Clear all items from cart?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/cart/user/${user.id}/clear`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCartItems([]);
        alert('Cart cleared');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const shippingAddress = prompt('Please enter your shipping address:');
    if (!shippingAddress) return;

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress: shippingAddress,
          paymentMethod: 'Cash on Delivery'
        })
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]);
        navigate('/dashboard');
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="cart-page">
          <p style={{ textAlign: 'center', padding: '100px 20px' }}>Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="cart-page">
        <h2 className="cart-title">Your Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <FaShoppingCart className="empty-cart-icon" />
            <p className="empty-cart-text">Your cart is currently empty.</p>
            <a href="/products" className="shop-now-button">Browse Products</a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-price">Rs. {item.product.price.toFixed(2)}</p>
                    <p className="cart-item-description">{item.product.description}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-total">
                    <p>Rs. {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>Rs. {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rs. {calculateTotal().toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Cart;
