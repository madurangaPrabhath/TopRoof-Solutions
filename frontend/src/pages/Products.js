import React from 'react';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Products = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '40px' }}>

        <h2>Products Page</h2>
        <p>This is a basic product listing page for testing purposes.</p>
        <ul>
          <li>Colorbond Roofing Sheet - Rs.2,200+</li>
          <li>Square Gutter - Rs.1,500+</li>
          <li>Downspout Pipe - Rs.950+</li>
          <li>Roof Ridge Cap - Rs.1,800+</li>
        </ul>

      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Products;
