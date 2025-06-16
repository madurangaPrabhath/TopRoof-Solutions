import React from 'react';
import Header from '../components/Header';
import RoofingProducts from '../components/RoofingProducts';
import TopSellingProducts from '../components/TopSellingProducts';
import AccessoriesProducts from '../components/AccessoriesProducts';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import '../assets/styles/Products.css';

const Products = () => {
  return (
    <div>
      <Header />
      <section className="products-hero">
        <div className="hero-content">
          <h1>Explore Our Roofing & Gutter Products</h1>
          <p>High-quality roofing sheets, gutters, ridges and accessories crafted for durability and performance in Sri Lankan conditions.</p>
        </div>
      </section>
      <section id="roofing-products">
        <RoofingProducts />
      </section>
      <section id="top-selling-products">
        <TopSellingProducts />
      </section>
      <section id="accessories-products">
        <AccessoriesProducts />
      </section>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Products;
