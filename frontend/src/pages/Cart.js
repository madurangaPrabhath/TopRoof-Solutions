import React from 'react';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import { FaShoppingCart } from 'react-icons/fa';
import '../assets/styles/Cart.css';

const Cart = () => {
  return (
    <div>
      <Header />
      <div className="cart-page">
        <h2 className="cart-title">Your Shopping Cart</h2>
        <div className="empty-cart-container">
          <div className="empty-cart-container">
            <FaShoppingCart className="empty-cart-icon" />
            <p className="empty-cart-text">Your cart is currently empty.</p>
            <a href="/products" className="shop-now-button">Browse Products</a>
          </div>
        </div>
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Cart;
