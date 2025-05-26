import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import ProductSection from '../components/ProductSection';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <h1>WELCOME TO<br/>TopRoof Solutions</h1>
      </section>

      {/* Roofing Products */}
      <ProductSection 
        title="Roofing Products"
        category="roofing"
      />

      {/* Top Selling Products */}
      <ProductSection 
        title="Top Selling Products"
        category="top-selling"
      />

      {/* About Us */}
      <section className="about-section">
        <h2>About Us</h2>
        {/* Content will go here */}
      </section>

      {/* Accessories Products */}
      <ProductSection 
        title="Accessories Products"
        category="accessories"
      />

      {/* Showrooms */}
      <section className="showrooms-section">
        <h2>Showrooms</h2>
        {/* Content will go here */}
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Our Supporters */}
      <section className="supporters-section">
        <h2>Our Supporters</h2>
        {/* Logos will go here */}
      </section>

      {/* Newsletter */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;