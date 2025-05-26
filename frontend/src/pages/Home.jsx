import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import HeroImage from '../assets/images/hero.jpg';

const Home = () => {
    const featuredProducts = [
        {
            id: 1,
            name: 'Galvanized Roofing Sheet',
            price: 4500,
            image: 'roofing-sheet.jpg'
        },
        {
            id: 2,
            name: 'PVC Gutter System',
            price: 3800,
            image: 'gutter-system.jpg'
        },
        {
            id: 3,
            name: 'Roofing Nails',
            price: 1200,
            image: 'roofing-nails.jpg'
        }
    ];

    return (
        <div className="home-page">
            <Header />
            
            <section className="hero">
                <div className="hero-content">
                    <h1>Premium Roofing Solutions for Sri Lanka</h1>
                    <p>High-quality gutters and roofing sheets for all your construction needs</p>
                    <Link to="/products" className="cta-button">Shop Now</Link>
                </div>
            </section>
            
            <section className="featured-products">
                <div className="container">
                    <h2>Top Selling Products</h2>
                    <div className="product-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Home;