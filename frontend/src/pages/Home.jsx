import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Header />
            
            <section className="hero">
                <h1>WELCOME TO TopRoof Solutions</h1>
                <p>Your trusted source for quality roofing products in Sri Lanka</p>
                <button className="cta-button">Shop Now</button>
            </section>
            
            <section className="product-categories">
                <h2>Roofing Products</h2>
                <div className="category-grid">
                    {/* Categories will go here */}
                </div>
            </section>
            
            <section className="top-products">
                <h2>Top Selling Products</h2>
                <div className="product-grid">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </section>
            
            <Testimonial />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;