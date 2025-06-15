import React from 'react';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Cart = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '40px' }}>
        <h2>Your Shopping Cart</h2>
        <p>No items in your cart yet.</p>
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>

  );
};

export default Cart;
